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

    try {
      const { data } = await supabase
        .from("clicks")
        .select("score")
        .eq("player_id", playerId)
        .single();

      if (data) {
        nodes = data.score;
        updateUI();
      }
    } catch (e) {
      console.log("新玩家或离线模式");
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
        await supabase
          .from("clicks")
          .upsert(
            {
              player_id: playerId,
              score: nodes,
              last_clicked_at: new Date().toISOString(),
            },
            { onConflict: "player_id" }
          );
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

  initTelegram();
  fetchUserScore();
})();
