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

  const coreBtn = document.getElementById("ai-core");
  const floatLayer = document.getElementById("float-layer");
  const energyEl = document.getElementById("energy");
  const nodesEl = document.getElementById("nodes");

  let energy = 0;
  let nodes = 0;

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

  function bumpValue(el) {
    el.classList.remove("score-bump");
    void el.offsetWidth;
    el.classList.add("score-bump");
  }

  function updateUI() {
    energyEl.textContent = String(energy);
    nodesEl.textContent = String(nodes);
    bumpValue(energyEl);
    bumpValue(nodesEl);
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

  function spawnPlusOne() {
    const node = document.createElement("span");
    node.className = "float-plus";
    node.textContent = "+1";

    const jitterX = (Math.random() - 0.5) * 48;
    node.style.marginLeft = `${jitterX}px`;

    floatLayer.appendChild(node);
    node.addEventListener("animationend", () => node.remove());
  }

  function pressFeedback(on) {
    coreBtn.classList.toggle("is-pressed", on);
  }

  const handleTap = async () => {
    nodes++;
    if (typeof updateUI === "function") updateUI();
    if (typeof spawnPlusOne === "function") spawnPlusOne();

    try {
      if (supabase) {
        const { error } = await supabase
          .from("clicks")
          .upsert(
            {
              player_id: playerId,
              score: nodes,
              last_clicked_at: new Date().toISOString(),
            },
            { onConflict: "player_id" }
          );

        if (!error) updateLeaderboard();
      }
    } catch (e) {
      console.error("[Sync Error]: Update deferred.");
    }
  };

  if (coreBtn) {
    coreBtn.addEventListener("click", handleTap);

    coreBtn.addEventListener("pointerdown", () => pressFeedback(true));
    coreBtn.addEventListener("pointerup", () => pressFeedback(false));
    coreBtn.addEventListener("pointercancel", () => pressFeedback(false));
    coreBtn.addEventListener("pointerleave", () => pressFeedback(false));
  }

  async function initApp() {
    await fetchUserScore();
    setupInviteButton();
    setupNavigation();
  }

  initTelegram();
  initApp();
})();
