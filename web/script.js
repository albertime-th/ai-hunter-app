/**
 * Nakamura AI Core — tap feedback & +1 float
 */

(function () {
  "use strict";

  const coreBtn = document.getElementById("ai-core");
  const floatLayer = document.getElementById("float-layer");
  const energyEl = document.getElementById("energy");
  const nodesEl = document.getElementById("nodes");
  const btnLeaderboard = document.getElementById("btn-leaderboard");
  const btnMissions = document.getElementById("btn-missions");

  let energy = 0;
  let nodes = 0;
  let pressTimer = null;

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

  function bumpStats() {
    energy += 1;
    nodes += 1;
    energyEl.textContent = String(energy);
    nodesEl.textContent = String(nodes);
    bumpValue(energyEl);
    bumpValue(nodesEl);
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

  function handleTap() {
    pressFeedback(true);
    clearTimeout(pressTimer);
    pressTimer = setTimeout(() => pressFeedback(false), 140);

    spawnPlusOne();
    bumpStats();

    if (navigator.vibrate) {
      navigator.vibrate(12);
    }
  }

  function handleNav(action) {
    const tg = window.Telegram?.WebApp;
    if (tg?.showAlert) {
      tg.showAlert(`${action} — coming soon.`);
      return;
    }
    window.alert(`${action} — coming soon.`);
  }

  coreBtn.addEventListener("click", handleTap);

  coreBtn.addEventListener("pointerdown", () => pressFeedback(true));
  coreBtn.addEventListener("pointerup", () => pressFeedback(false));
  coreBtn.addEventListener("pointercancel", () => pressFeedback(false));
  coreBtn.addEventListener("pointerleave", () => pressFeedback(false));

  btnLeaderboard.addEventListener("click", () => handleNav("LEADERBOARD"));
  btnMissions.addEventListener("click", () => handleNav("MISSIONS"));

  initTelegram();
})();
