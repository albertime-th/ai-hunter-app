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
  const btnLeaderboard = document.getElementById("btn-leaderboard");
  const btnMissions = document.getElementById("btn-missions");

  let energy = 0;
  let nodes = 0;

  let playerId = localStorage.getItem("ai_hunter_player_id");
  if (!playerId) {
    playerId = "Hunter_" + Math.random().toString(36).substr(2, 9);
    localStorage.setItem("ai_hunter_player_id", playerId);
  }

  function getReferralParam() {
    const params = new URLSearchParams(window.location.search);
    const fromUrl = params.get("ref") || params.get("referrer");
    if (fromUrl) return fromUrl;

    const startParam = window.Telegram?.WebApp?.initDataUnsafe?.start_param;
    if (startParam?.startsWith("ref_")) {
      return startParam.slice(4);
    }

    return null;
  }

  function getInviteLink() {
    const base = `${window.location.origin}${window.location.pathname}`;
    return `${base}?ref=${encodeURIComponent(playerId)}`;
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

    const urlReferrer = getReferralParam();
    if (urlReferrer && urlReferrer !== playerId) {
      localStorage.setItem("ai_hunter_referred_by", urlReferrer);
    }
    const referredBy = localStorage.getItem("ai_hunter_referred_by");

    try {
      const { data, error } = await supabase
        .from("clicks")
        .select("score, referred_by")
        .eq("player_id", playerId)
        .single();

      if (data) {
        nodes = data.score ?? 0;
        updateUI();
        return;
      }

      if (error && error.code !== "PGRST116") {
        console.log("新玩家或离线模式");
        return;
      }

      const payload = {
        player_id: playerId,
        score: 0,
        last_clicked_at: new Date().toISOString(),
      };

      if (referredBy && referredBy !== playerId) {
        payload.referred_by = referredBy;
      }

      await supabase.from("clicks").upsert(payload, { onConflict: "player_id" });
    } catch (e) {
      console.log("新玩家或离线模式");
    }
  }

  function setupInviteButton() {
    const btn = document.getElementById("invite-btn");
    if (!btn) return;

    btn.addEventListener("click", async () => {
      const link = getInviteLink();
      const shareText =
        "加入 Nakamura AI Hunter！点击链接为我助力，你也斩获 500 算力 ⚡";
      const tg = window.Telegram?.WebApp;

      if (tg?.openTelegramLink) {
        const shareUrl = `https://t.me/share/url?url=${encodeURIComponent(link)}&text=${encodeURIComponent(shareText)}`;
        tg.openTelegramLink(shareUrl);
        return;
      }

      try {
        await navigator.clipboard.writeText(`${shareText}\n${link}`);
        const originalText = btn.textContent;
        btn.textContent = "✅ 链接已复制！快去分享";
        setTimeout(() => {
          btn.textContent = originalText;
        }, 2000);
      } catch (e) {
        window.prompt("复制邀请链接：", link);
      }
    });
  }

  async function updateLeaderboard() {
    try {
      if (!supabase) return;

      const { data, error } = await supabase
        .from("clicks")
        .select("player_id, score")
        .order("score", { ascending: false })
        .limit(10);

      if (error) throw error;

      const listElement = document.getElementById("leaderboard-list");
      if (listElement && data) {
        listElement.innerHTML = data
          .map((player, index) => {
            const isSelf = player.player_id === playerId;
            const displayName = isSelf
              ? `👑 ${player.player_id} (你)`
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
      }
    } catch (e) {
      console.error("排行榜拉取失败:", e.message);
    }
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
    // 本地先 +1，界面立即响应
    nodes++;
    if (typeof updateUI === "function") updateUI();
    if (typeof spawnPlusOne === "function") spawnPlusOne();

    // 再将累计总分同步到云端
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
      console.error("Sync deferred.");
    }
  };

  function handleNav(action) {
    const tg = window.Telegram?.WebApp;
    if (tg?.showAlert) {
      tg.showAlert(`${action} — coming soon.`);
      return;
    }
    window.alert(`${action} — coming soon.`);
  }

  if (coreBtn) {
    coreBtn.addEventListener("click", handleTap);

    coreBtn.addEventListener("pointerdown", () => pressFeedback(true));
    coreBtn.addEventListener("pointerup", () => pressFeedback(false));
    coreBtn.addEventListener("pointercancel", () => pressFeedback(false));
    coreBtn.addEventListener("pointerleave", () => pressFeedback(false));
  }

  btnLeaderboard.addEventListener("click", () => handleNav("LEADERBOARD"));
  btnMissions.addEventListener("click", () => handleNav("MISSIONS"));

  async function initApp() {
    await fetchUserScore();
    updateLeaderboard();
    setupInviteButton();
  }

  initTelegram();
  initApp();
})();
