/**
 * Nakamura AI Core — tap feedback & +1 float
 */
(function () {
  "use strict";

  const supabaseUrl = "https://sitoruyhhzjubxvblems.supabase.co";
  const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNpdG9ydXloaHpqdWJ4dmJsZW1zIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkxMDg4MDgsImV4cCI6MjA5NDY4NDgwOH0.sCn0WiQP8LX8qZp7YrFLcyvYmrOugozgVjHbkIDqiKg";
  const supabase =
    supabaseUrl && supabaseKey && window.supabase
      ? window.supabase.createClient(supabaseUrl, supabaseKey)
      : null;

  const petStage = document.getElementById("pet-stage");
  const floatLayer = document.getElementById("float-layer");
  const nodesEl = document.getElementById("nodes");
  const valEnergyEl = document.getElementById("val-energy");
  const valHydrationEl = document.getElementById("val-hydration");
  const fillEnergyEl = document.getElementById("fill-energy");
  const fillHydrationEl = document.getElementById("fill-hydration");
  const btnFeed = document.getElementById("btn-feed");
  const btnHydrate = document.getElementById("btn-hydrate");

  const FEED_COST = 50;
  const DRINK_COST = 30;
  const FEED_RESTORE = 40;
  const DRINK_RESTORE = 35;
  const TAP_DRAIN = 2;

  // Premium hooks — TON shop (Star-Meat 2x buff, Auto-Feeder idle)
  const premium = {
    doubleNodesUntil: 0,
    autoFeeder: false,
  };

  let nodes = 0;
  let petEng = 100;
  let petHyd = 100;

  let playerId = localStorage.getItem("ai_hunter_player_id");
  if (!playerId) {
    playerId = "Hunter_" + Math.random().toString(36).substr(2, 9);
    localStorage.setItem("ai_hunter_player_id", playerId);
  }

  // ==================== GLOBAL REFERRAL SYSTEM ====================

  function getReferralParam() {
    const urlParams = new URLSearchParams(window.location.search);
    let ref = urlParams.get("ref");

    if (window.Telegram && window.Telegram.WebApp) {
      const initDataUnsafe = window.Telegram.WebApp.initDataUnsafe;
      if (initDataUnsafe && initDataUnsafe.start_param) {
        ref = initDataUnsafe.start_param;
      }
    }
    return ref;
  }

  function initTelegram() {
    const tg = window.Telegram?.WebApp;
    if (!tg) return;

    tg.ready();
    tg.expand();
    document.documentElement.style.setProperty(
      "--safe-top",
      `${tg.safeAreaInset?.top ?? 0}px`
    );
    document.documentElement.style.setProperty(
      "--safe-bottom",
      `${tg.safeAreaInset?.bottom ?? 0}px`
    );

    if (tg.themeParams?.bg_color) {
      document.body.style.background = tg.themeParams.bg_color;
    }
  }

  function clampStat(value) {
    return Math.max(0, Math.min(100, value));
  }

  function nodePerTap() {
    return Date.now() < premium.doubleNodesUntil ? 2 : 1;
  }

  function updateUI() {
    if (nodesEl) nodesEl.textContent = String(nodes);

    petEng = clampStat(petEng);
    petHyd = clampStat(petHyd);

    if (valEnergyEl) valEnergyEl.textContent = String(Math.round(petEng));
    if (valHydrationEl) valHydrationEl.textContent = String(Math.round(petHyd));
    if (fillEnergyEl) fillEnergyEl.style.width = `${petEng}%`;
    if (fillHydrationEl) fillHydrationEl.style.width = `${petHyd}%`;

    if (btnFeed) btnFeed.disabled = nodes < FEED_COST;
    if (btnHydrate) btnHydrate.disabled = nodes < DRINK_COST;
  }

  async function syncScoreToCloud() {
    if (!supabase) return;

    try {
      const { error } = await supabase.from("clicks").upsert(
        {
          player_id: playerId,
          score: nodes,
          last_clicked_at: new Date().toISOString(),
        },
        { onConflict: "player_id" }
      );

      if (!error) updateLeaderboard();
    } catch (e) {
      console.error("[Sync Error]: Update deferred.");
    }
  }

  async function fetchUserScore() {
    if (!supabase) return;

    const referrerId = getReferralParam();

    try {
      const { data } = await supabase
        .from("clicks")
        .select("*")
        .eq("player_id", playerId)
        .single();

      if (!data) {
        const initialData = {
          player_id: playerId,
          score: 0,
          last_clicked_at: new Date().toISOString(),
        };

        if (referrerId && referrerId !== playerId) {
          initialData.referred_by = referrerId;
          console.log(`[Referral] Master ID linked: ${referrerId}`);
        }

        await supabase.from("clicks").insert(initialData);
        nodes = 0;
      } else {
        nodes = data.score;
      }

      updateUI();
      updateLeaderboard();
    } catch (e) {
      console.log("[System] Profile synced or operating in offline mode.");
    }
  }

  function setupInviteButton() {
    const inviteBtn = document.getElementById("invite-btn");
    if (inviteBtn) {
      inviteBtn.addEventListener("click", () => {
        const inviteUrl = `https://albertime-th.github.io/ai-hunter-app/?ref=${playerId}`;

        if (window.Telegram && window.Telegram.WebApp) {
          const tgText =
            "🔥 Join my Hunter Squad in AI Hunter App, secure nodes, and claim your +500 Node bonus instantly!";
          window.Telegram.WebApp.openTelegramLink(
            `https://t.me/share/url?url=${encodeURIComponent(inviteUrl)}&text=${encodeURIComponent(tgText)}`
          );
        } else {
          navigator.clipboard.writeText(inviteUrl).then(() => {
            alert("🛸 Referral link copied to clipboard!");
          });
        }
      });
    }
  }

  async function updateLeaderboard() {
    const listElement = document.querySelector(
      "#view-leaderboard #leaderboard-list"
    );

    if (!listElement) {
      console.error("[Leaderboard Sync Error]: #leaderboard-list not found in view-leaderboard");
      return;
    }

    try {
      if (!supabase) {
        listElement.innerHTML =
          '<li class="loading" style="text-align: center; color: #888; font-size: 0.8rem; padding: 20px;">Offline — Supabase unavailable.</li>';
        return;
      }

      const { data, error } = await supabase
        .from("clicks")
        .select("player_id, score")
        .order("score", { ascending: false })
        .limit(10);

      if (error) throw error;

      if (!data || data.length === 0) {
        listElement.innerHTML =
          '<li class="loading" style="text-align: center; color: #888; font-size: 0.8rem; padding: 20px;">No hunters on the board yet.</li>';
        return;
      }

      listElement.innerHTML = data
        .map((player, index) => {
          const isSelf = player.player_id === playerId;
          const displayName = isSelf
            ? `👑 ${player.player_id} (YOU)`
            : `👤 ${player.player_id}`;

          return `
                    <li class="${isSelf ? "active-player" : ""}">
                        <span class="rank">#${index + 1}</span>
                        <span class="name">${displayName}</span>
                        <span class="score-val">${player.score} Nodes</span>
                    </li>
                `;
        })
        .join("");
    } catch (e) {
      console.error("[Leaderboard Sync Error]:", e.message);
      listElement.innerHTML =
        '<li class="loading" style="text-align: center; color: #888; font-size: 0.8rem; padding: 20px;">Sync failed — check console.</li>';
    }
  }

  // ==================== NAVIGATION TAB SWITCHING ====================

  function setupNavigation() {
    const tabs = {
      "btn-nav-game": "view-game",
      "btn-nav-missions": "view-missions",
      "btn-nav-leaderboard": "view-leaderboard",
    };

    Object.keys(tabs).forEach((tabId) => {
      const button = document.getElementById(tabId);
      if (button) {
        button.addEventListener("click", () => {
          // 1. Hide all views
          document.querySelectorAll(".app-view").forEach((view) => {
            view.style.display = "none";
          });

          // 2. Show the selected view
          const activeViewId = tabs[tabId];
          const activeView = document.getElementById(activeViewId);
          if (activeView) activeView.style.display = "block";

          // 3. Update nav button highlight state
          document.querySelectorAll(".nav-btn").forEach((btn) => {
            btn.classList.remove("active");
          });
          button.classList.add("active");

          // 4. Force fresh leaderboard fetch when tab opens
          if (activeViewId === "view-leaderboard") {
            updateLeaderboard();
          }
        });
      } else {
        console.warn(
          `[Warning] Navigation button with ID '${tabId}' was not found in DOM.`
        );
      }
    });
  }

  function spawnPlusOne(amount) {
    const node = document.createElement("span");
    node.className = "float-plus";
    node.textContent = `+${amount}`;

    const jitterX = (Math.random() - 0.5) * 48;
    node.style.marginLeft = `${jitterX}px`;

    floatLayer.appendChild(node);
    node.addEventListener("animationend", () => node.remove());
  }

  function petBounce() {
    if (!petStage) return;
    petStage.classList.remove("pet-bounce");
    void petStage.offsetWidth;
    petStage.classList.add("pet-bounce");
  }

  async function handlePetTap() {
    if (petEng <= 0 || petHyd <= 0) {
      console.log("[Pet] Too weak — feed or hydrate to keep mining.");
      return;
    }

    const gain = nodePerTap();
    nodes += gain;
    petEng -= TAP_DRAIN;
    petHyd -= 1;

    updateUI();
    spawnPlusOne(gain);
    petBounce();

    if (navigator.vibrate) navigator.vibrate(10);

    await syncScoreToCloud();
  }

  function handleFeed() {
    if (nodes < FEED_COST) return;

    nodes -= FEED_COST;
    petEng = clampStat(petEng + FEED_RESTORE);
    updateUI();
    syncScoreToCloud();
  }

  function handleHydrate() {
    if (nodes < DRINK_COST) return;

    nodes -= DRINK_COST;
    petHyd = clampStat(petHyd + DRINK_RESTORE);
    updateUI();
    syncScoreToCloud();
  }

  function startIdleLoop() {
    setInterval(() => {
      petEng = clampStat(petEng - 1);
      petHyd = clampStat(petHyd - 1.5);

      if (premium.autoFeeder && petEng < 40 && nodes >= FEED_COST) {
        handleFeed();
      }

      updateUI();
    }, 8000);
  }

  function setupPetInteractions() {
    if (petStage) {
      petStage.addEventListener("click", handlePetTap);
      petStage.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handlePetTap();
        }
      });
    }

    if (btnFeed) btnFeed.addEventListener("click", handleFeed);
    if (btnHydrate) btnHydrate.addEventListener("click", handleHydrate);
  }

  async function initApp() {
    await fetchUserScore();
    updateUI();
    setupInviteButton();
    setupNavigation();
    setupPetInteractions();
    startIdleLoop();
  }

  initTelegram();
  initApp();
})();
