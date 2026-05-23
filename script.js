/**
 * AI Hunter Master — HP · Welcome Bubble · Release · Supabase
 */
(function () {
  "use strict";

  const i18n = {
    en: {
      logo: "NAKAMURA",
      selectPet: "SELECT YOUR<br>PET",
      hintSelect: "Tap to awaken your cyber companion",
      recruit: "🔗 RECRUIT SQUAD (+500 NODES)",
      game: "GAME",
      missions: "MISSIONS",
      settings: "SETTINGS",
      chooseTitle: "CHOOSE YOUR COMPANION",
      rankTitle: "GLOBAL RANKINGS",
      nodeLabel: "NODES COLLECTED",
      tplText: "TAP COMPANION TO MINE",
      langBtn: "🌐 LANG",
      set_title: "SETTINGS",
      set_privacy: "Privacy & Security",
      set_crypto: "VeraCrypt Drive Status",
      welcomeHome: "Welcome Home! 🌸",
      releaseBtn: "💔 RELEASE COMPANION",
      releaseFarewell:
        "Thank you for the companionship along the way. May our paths cross again. 🌟",
      healthLabel: "❤️ HP",
      feedBtnText: "🍖 FOOD (-1)",
      drinkBtnText: "💧 WATER (-1)",
      feedBubble: "Yummy! 🍖",
      drinkBubble: "Refreshing! 💧",
    },
    hi: {
      logo: "नाकामुरा",
      selectPet: "अपना पालतू<br>चुनें",
      hintSelect: "अपने साइबर साथी को जगाने के लिए टैप करें",
      recruit: "🔗 दस्ता भर्ती करें (+500 NODES)",
      game: "खेल",
      missions: "मिशन",
      settings: "सेटिंग्स",
      chooseTitle: "अपना साथी चुनें",
      rankTitle: "वैश्विक रैंकिंग",
      nodeLabel: "नोड्स एकत्र किए गए",
      tplText: "माइन करने के लिए साथी पर टैप करें",
      langBtn: "🌐 भाषा",
      set_title: "सेटिंग्स",
      set_privacy: "गोपनीयता और सुरक्षा",
      set_crypto: "वेराक्रिप्ट ड्राइव स्थिति",
      welcomeHome: "घर वापसी पर स्वागत है! 🌸",
      releaseBtn: "💔 साथी को आज़ाद करें",
      releaseFarewell: "इस रास्ते में साथ देने के लिए धन्यवाद। फिर मिलेंगे। 🌟",
      healthLabel: "❤️ स्वास्थ्य",
      feedBtnText: "🍖 भोजन (-1)",
      drinkBtnText: "💧 पानी (-1)",
      feedBubble: "स्वादिष्ट! 🍖",
      drinkBubble: "तरोताज़ा! 💧",
    },
    ru: {
      logo: "NAKAMURA",
      selectPet: "ВЫБЕРИТЕ<br>ПИТОМЦА",
      hintSelect: "Нажмите, чтобы пробудить кибер-спутника",
      recruit: "🔗 НАЙМ ОТРЯДА (+500 NODES)",
      game: "ИГРА",
      missions: "МИССИИ",
      settings: "НАСТРОЙКИ",
      chooseTitle: "ВЫБЕРИТЕ СПУТНИКА",
      rankTitle: "ГЛОБАЛЬНЫЙ РЕЙТИНГ",
      nodeLabel: "НОДОВ СОБРАНО",
      tplText: "НАЖМИТЕ ДЛЯ МАЙНИНГА",
      langBtn: "🌐 ЯЗЫК",
      set_title: "НАСТРОЙКИ",
      set_privacy: "Конфиденциальность",
      set_crypto: "Статус VeraCrypt",
      welcomeHome: "С возвращением домой! 🌸",
      releaseBtn: "💔 ОТПУСТИТЬ ПИТОМЦА",
      releaseFarewell:
        "Спасибо за компанию на этом пути. До новых встреч. 🌟",
      healthLabel: "❤️ ЗДОРОВЬЕ",
      feedBtnText: "🍖 ЕДА (-1)",
      drinkBtnText: "💧 ВОДА (-1)",
      feedBubble: "Вкусно! 🍖",
      drinkBubble: "Освежает! 💧",
    },
    pt: {
      logo: "NAKAMURA",
      selectPet: "ESCOLHA SEU<br>PET",
      hintSelect: "Toque para acordar seu companheiro cibernético",
      recruit: "🔗 RECRUTAR ESQUADRÃO (+500)",
      game: "JOGO",
      missions: "MISSÕES",
      settings: "OPÇÕES",
      chooseTitle: "ESCOLHA SEU COMPANHEIRO",
      rankTitle: "RANKING GLOBAL",
      nodeLabel: "NODES COLETADOS",
      tplText: "TOQUE PARA MINERAR",
      langBtn: "🌐 IDIOMA",
      set_title: "CONFIGURAÇÕES",
      set_privacy: "Privacidade e Segurança",
      set_crypto: "Status do VeraCrypt",
      welcomeHome: "Bem-vindo de volta! 🌸",
      releaseBtn: "💔 LIBERTAR COMPANHEIRO",
      releaseFarewell:
        "Obrigado pela companhia ao longo do caminho. Que nos encontremos de novo. 🌟",
      healthLabel: "❤️ SAÚDE",
      feedBtnText: "🍖 FOME (-1)",
      drinkBtnText: "💧 ÁGUA (-1)",
      feedBubble: "Delicioso! 🍖",
      drinkBubble: "Refrescante! 💧",
    },
    uk: {
      logo: "NAKAMURA",
      selectPet: "ВИБЕРІТЬ<br>ТВАРИНУ",
      hintSelect: "Натисніть, щоб розбудити кібер-супутника",
      recruit: "🔗 НАЙНЯТИ ЗАГІН (+500 NODES)",
      game: "ГРА",
      missions: "МІСІЇ",
      settings: "НАЛАШТУВАННЯ",
      chooseTitle: "ВИБЕРІТЬ СУПУТНИКА",
      rankTitle: "ГЛОБАЛЬНИЙ РЕЙТИНГ",
      nodeLabel: "НОДІВ ЗІБРАНО",
      tplText: "НАТИСНІТЬ ДЛЯ МАЙНІНГУ",
      langBtn: "🌐 МОВА",
      set_title: "НАЛАШТУВАННЯ",
      set_privacy: "Конфіденційність",
      set_crypto: "Статус VeraCrypt",
      welcomeHome: "З поверненням додому! 🌸",
      releaseBtn: "💔 ВІДПУСТИТИ СУПУТНИКА",
      releaseFarewell:
        "Дякую за компанію на цьому шляху. До нових зустрічей. 🌟",
      healthLabel: "❤️ ЗДОРОВ'Я",
      feedBtnText: "🍖 ЇЖА (-1)",
      drinkBtnText: "💧 ВОДА (-1)",
      feedBubble: "Смачно! 🍖",
      drinkBubble: "Освіжає! 💧",
    },
    id: {
      logo: "NAKAMURA",
      selectPet: "PILIH<br>HEWAN",
      hintSelect: "Ketuk untuk membangunkan pendamping siber",
      recruit: "🔗 REKRUT SQUAD (+500 NODES)",
      game: "GAME",
      missions: "MISI",
      settings: "PENGATURAN",
      chooseTitle: "PILIH PENDAMPING ANDA",
      rankTitle: "PERINGKAT GLOBAL",
      nodeLabel: "NODE DIKUMPULKAN",
      tplText: "KETUK UNTUK MENAMBANG",
      langBtn: "🌐 BAHASA",
      set_title: "PENGATURAN",
      set_privacy: "Privasi & Keamanan",
      set_crypto: "Status Drive VeraCrypt",
      welcomeHome: "Selamat datang di rumah! 🌸",
      releaseBtn: "💔 LEPASKAN PENDAMPING",
      releaseFarewell:
        "Terima kasih atas kebersamaan di sepanjang jalan. Sampai jumpa lagi. 🌟",
      healthLabel: "❤️ HP",
      feedBtnText: "🍖 MAKAN (-1)",
      drinkBtnText: "💧 MINUM (-1)",
      feedBubble: "Enak! 🍖",
      drinkBubble: "Segar! 💧",
    },
  };

  const supabaseUrl = "https://sitoruyhhzjubxvblems.supabase.co";
  const supabaseKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNpdG9ydXloaHpqdWJ4dmJsZW1zIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkxMDg4MDgsImV4cCI6MjA5NDY4NDgwOH0.sCn0WiQP8LX8qZp7YrFLcyvYmrOugozgVjHbkIDqiKg";
  const supabase =
    supabaseUrl && supabaseKey && window.supabase
      ? window.supabase.createClient(supabaseUrl, supabaseKey)
      : null;

  let bubbleTimer = null;

  function loadLegacyPetState() {
    try {
      const saved = localStorage.getItem("ai_hunter_pet_state");
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  }

  const legacy = loadLegacyPetState();

  const appState = {
    currentLang: localStorage.getItem("appLang") || "en",
    nodes: parseInt(localStorage.getItem("userNodes"), 10) || 0,
    hasSelectedPet:
      localStorage.getItem("hasSelectedPet") === "true" ||
      legacy?.hasPet === true,
    selectedPetEmoji: localStorage.getItem("selectedPetEmoji") || "🐱",
    selectedPetName: localStorage.getItem("selectedPetName") || "Ragdoll",
    hp:
      parseInt(localStorage.getItem("petHP"), 10) ||
      legacy?.energy ||
      100,
  };

  let playerId = localStorage.getItem("ai_hunter_player_id");
  if (!playerId) {
    playerId = "Hunter_" + Math.random().toString(36).substr(2, 9);
    localStorage.setItem("ai_hunter_player_id", playerId);
  }

  const selectionStage = document.getElementById("selection-stage");
  const petSelectionPool = document.getElementById("pet-selection-pool");
  const petGrowthStage = document.getElementById("pet-growth-stage");
  const petStage = document.getElementById("pet-stage");
  const floatLayer = document.getElementById("float-layer");
  const nodesEl = document.getElementById("nodes-val");
  const btnFeed = document.getElementById("btn-feed");
  const btnDrink = document.getElementById("btn-drink");

  function clampStat(value) {
    return Math.max(0, Math.min(100, value));
  }

  function saveStateToLocal() {
    localStorage.setItem("userNodes", String(appState.nodes));
    localStorage.setItem("hasSelectedPet", String(appState.hasSelectedPet));
    localStorage.setItem("selectedPetEmoji", appState.selectedPetEmoji);
    localStorage.setItem("selectedPetName", appState.selectedPetName);
    localStorage.setItem("petHP", String(appState.hp));
    localStorage.setItem("lastSavedTime", String(Date.now()));
    localStorage.setItem(
      "ai_hunter_pet_state",
      JSON.stringify({
        hasPet: appState.hasSelectedPet,
        selectedType: appState.selectedPetName,
        energy: appState.hp,
        hydration: appState.hp,
      })
    );
  }

  function checkOfflineDecay() {
    const lastTime = localStorage.getItem("lastSavedTime");
    if (!lastTime) return;

    const diffHours =
      (Date.now() - parseInt(lastTime, 10)) / (1000 * 60 * 60);

    if (diffHours >= 12) {
      appState.hp = Math.max(0, appState.hp - 55);
      saveStateToLocal();
    }
  }

  function renderHPBar() {
    appState.hp = clampStat(appState.hp);
    const fill = document.getElementById("fill-hp");
    const val = document.getElementById("val-hp");
    if (fill) fill.style.width = `${appState.hp}%`;
    if (val) val.textContent = Math.round(appState.hp);
  }

  function updateUI() {
    if (nodesEl) nodesEl.textContent = String(appState.nodes);
    renderHPBar();
    if (btnFeed) btnFeed.disabled = appState.nodes < 1;
    if (btnDrink) btnDrink.disabled = appState.nodes < 1;
  }

  function triggerBubbleWithTimeout(text, duration) {
    const bubble = document.getElementById("pet-dialog-bubble");
    if (!bubble) return;

    if (bubbleTimer) clearTimeout(bubbleTimer);
    bubble.textContent = text;
    bubble.style.display = "block";

    if (duration > 0) {
      bubbleTimer = setTimeout(() => {
        bubble.style.display = "none";
      }, duration);
    }
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
  }

  function getReferralParam() {
    const urlParams = new URLSearchParams(window.location.search);
    let ref = urlParams.get("ref");
    if (window.Telegram?.WebApp?.initDataUnsafe?.start_param) {
      ref = window.Telegram.WebApp.initDataUnsafe.start_param;
    }
    return ref;
  }

  async function syncScoreToCloud() {
    if (!supabase) return;
    try {
      await supabase.from("clicks").upsert(
        {
          player_id: playerId,
          score: appState.nodes,
          last_clicked_at: new Date().toISOString(),
        },
        { onConflict: "player_id" }
      );
      updateLeaderboard();
    } catch {
      console.warn("[Sync] Score deferred.");
    }
  }

  async function fetchUserScore() {
    if (!supabase) {
      if (!localStorage.getItem("userNodes") && appState.nodes === 0) {
        appState.nodes = 500;
        saveStateToLocal();
      }
      updateUI();
      return;
    }

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
          score: appState.nodes || 500,
          last_clicked_at: new Date().toISOString(),
        };
        if (referrerId && referrerId !== playerId) {
          initialData.referred_by = referrerId;
        }
        await supabase.from("clicks").insert(initialData);
        appState.nodes = initialData.score;
      } else {
        appState.nodes = data.score;
      }

      saveStateToLocal();
      updateUI();
      updateLeaderboard();
    } catch {
      updateUI();
    }
  }

  async function updateLeaderboard() {
    const listElement = document.getElementById("leaderboard-list");
    if (!listElement) return;

    try {
      if (!supabase) {
        listElement.innerHTML =
          '<div class="rank-item loading">Offline — Supabase unavailable.</div>';
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
          '<div class="rank-item loading">No hunters on the board yet.</div>';
        return;
      }

      listElement.innerHTML = data
        .map((player, index) => {
          const isSelf = player.player_id === playerId;
          const name = isSelf ? `${player.player_id} (YOU)` : player.player_id;
          return `<div class="rank-item${isSelf ? " active-player" : ""}"><span>${index + 1}. ${name}</span><span>${player.score.toLocaleString()}</span></div>`;
        })
        .join("");
    } catch {
      listElement.innerHTML =
        '<div class="rank-item loading">Sync failed.</div>';
    }
  }

  function applyLanguage(lang) {
    if (!i18n[lang]) lang = "en";
    appState.currentLang = lang;
    localStorage.setItem("appLang", lang);
    const dict = i18n[lang];

    const setText = (id, text) => {
      const el = document.getElementById(id);
      if (el) el.textContent = text;
    };
    const setHTML = (id, html) => {
      const el = document.getElementById(id);
      if (el) el.innerHTML = html;
    };

    setText("logo-text", dict.logo);
    setHTML("btn-select-pet", dict.selectPet);
    const hint = document.querySelector(".hint-text");
    if (hint) hint.textContent = dict.hintSelect;
    setText("btn-recruit", dict.recruit);
    setText("lang-toggle-btn", dict.langBtn);
    setText("choose-title", dict.chooseTitle);
    setText("rank-title", dict.rankTitle);
    setText("settings-title", dict.set_title);
    setText("set-p-1", dict.set_privacy);
    setText("set-p-2", dict.set_crypto);
    setText("btn-release-pet", dict.releaseBtn);
    setText("lbl-hp", dict.healthLabel);
    setText("btn-feed", dict.feedBtnText);
    setText("btn-drink", dict.drinkBtnText);

    const nodesLabel = document.querySelector(".nodes-label");
    if (nodesLabel) nodesLabel.textContent = dict.nodeLabel;
    const titleSub = document.querySelector(".title-sub");
    if (titleSub) titleSub.textContent = dict.tplText;

    document.querySelectorAll(".nav-tab").forEach((tab, i) => {
      const labels = [dict.game, dict.missions, dict.settings];
      if (labels[i]) tab.textContent = labels[i];
    });
  }

  function showGrowthStage() {
    if (selectionStage) selectionStage.classList.add("is-hidden");
    if (petSelectionPool) petSelectionPool.style.display = "none";
    if (petGrowthStage) petGrowthStage.style.display = "flex";
    if (petStage) petStage.textContent = appState.selectedPetEmoji;
  }

  function showSelectionStage() {
    if (petGrowthStage) petGrowthStage.style.display = "none";
    if (petSelectionPool) petSelectionPool.style.display = "none";
    if (selectionStage) {
      selectionStage.classList.remove("is-hidden");
      selectionStage.style.display = "flex";
    }
    const bubble = document.getElementById("pet-dialog-bubble");
    if (bubble) bubble.style.display = "none";
  }

  function spawnPlusOne(amount) {
    if (!floatLayer) return;
    const node = document.createElement("span");
    node.className = "float-plus";
    node.textContent = `+${amount}`;
    node.style.marginLeft = `${(Math.random() - 0.5) * 48}px`;
    floatLayer.appendChild(node);
    node.addEventListener("animationend", () => node.remove());
  }

  function petBounce() {
    if (!petStage) return;
    petStage.classList.remove("pet-bounce");
    void petStage.offsetWidth;
    petStage.classList.add("pet-bounce");
  }

  function setupPetSystem() {
    const selectPetBtn = document.getElementById("btn-select-pet");

    if (selectPetBtn) {
      selectPetBtn.addEventListener("click", () => {
        if (appState.hasSelectedPet) {
          showGrowthStage();
          return;
        }
        if (selectionStage) selectionStage.classList.add("is-hidden");
        if (petSelectionPool) petSelectionPool.style.display = "flex";
      });
    }

    document.querySelectorAll(".pet-card").forEach((card) => {
      card.addEventListener("click", () => {
        const emoji = card.getAttribute("data-emoji");
        const name = card.getAttribute("data-name");

        appState.hasSelectedPet = true;
        appState.selectedPetEmoji = emoji;
        appState.selectedPetName = name;
        appState.hp = 100;
        saveStateToLocal();

        showGrowthStage();
        renderHPBar();
        triggerBubbleWithTimeout(i18n[appState.currentLang].welcomeHome, 5000);
        updateLeaderboard();
      });
    });

    if (petStage) {
      petStage.addEventListener("click", async () => {
        if (!appState.hasSelectedPet) return;
        if (appState.hp <= 0) return;

        appState.nodes += 1;
        saveStateToLocal();
        updateUI();
        spawnPlusOne(1);
        petBounce();
        if (navigator.vibrate) navigator.vibrate(10);
        await syncScoreToCloud();
      });

      petStage.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          petStage.click();
        }
      });
    }

    if (btnFeed) {
      btnFeed.addEventListener("click", () => {
        if (appState.nodes < 1) return;
        appState.nodes -= 1;
        appState.hp = clampStat(appState.hp + 10);
        saveStateToLocal();
        updateUI();
        triggerBubbleWithTimeout(i18n[appState.currentLang].feedBubble, 1500);
        syncScoreToCloud();
      });
    }

    if (btnDrink) {
      btnDrink.addEventListener("click", () => {
        if (appState.nodes < 1) return;
        appState.nodes -= 1;
        appState.hp = clampStat(appState.hp + 10);
        saveStateToLocal();
        updateUI();
        triggerBubbleWithTimeout(i18n[appState.currentLang].drinkBubble, 1500);
        syncScoreToCloud();
      });
    }

    const releaseBtn = document.getElementById("btn-release-pet");
    if (releaseBtn) {
      releaseBtn.addEventListener("click", () => {
        if (!appState.hasSelectedPet) return;

        document.querySelectorAll(".nav-tab").forEach((t) => t.classList.remove("active"));
        const gameTab = document.getElementById("btn-nav-game");
        if (gameTab) gameTab.classList.add("active");

        document.querySelectorAll(".app-view").forEach((v) => {
          v.classList.remove("active");
          v.style.display = "none";
        });
        const gameView = document.getElementById("view-game");
        if (gameView) {
          gameView.classList.add("active");
          gameView.style.display = "block";
        }

        showGrowthStage();
        triggerBubbleWithTimeout(
          i18n[appState.currentLang].releaseFarewell,
          0
        );

        setTimeout(() => {
          appState.hasSelectedPet = false;
          appState.selectedPetEmoji = "🐱";
          appState.selectedPetName = "Ragdoll";
          appState.hp = 100;

          localStorage.removeItem("hasSelectedPet");
          localStorage.removeItem("selectedPetEmoji");
          localStorage.removeItem("selectedPetName");
          localStorage.removeItem("petHP");
          localStorage.removeItem("lastSavedTime");
          localStorage.removeItem("ai_hunter_pet_state");
          localStorage.removeItem("petFood");
          localStorage.removeItem("petWater");

          const bubble = document.getElementById("pet-dialog-bubble");
          if (bubble) bubble.style.display = "none";
          showSelectionStage();
        }, 4500);
      });
    }
  }

  function setupRecruitButton() {
    const recruitBtn = document.getElementById("btn-recruit");
    if (!recruitBtn) return;

    recruitBtn.addEventListener("click", () => {
      const inviteUrl = `https://albertime-th.github.io/ai-hunter-app/?ref=${playerId}`;
      const tgText =
        "🔥 Join my Hunter Squad in AI Hunter App, secure nodes, and claim your +500 Node bonus instantly!";

      if (window.Telegram?.WebApp) {
        window.Telegram.WebApp.openTelegramLink(
          `https://t.me/share/url?url=${encodeURIComponent(inviteUrl)}&text=${encodeURIComponent(tgText)}`
        );
      } else if (navigator.clipboard) {
        navigator.clipboard.writeText(inviteUrl).then(() => {
          alert("🛸 Referral link copied to clipboard!");
        });
      }
    });
  }

  function setupNavigationTabs() {
    const tabMap = {
      "btn-nav-game": "view-game",
      "btn-nav-missions": "view-missions",
      "btn-nav-settings": "view-settings",
    };

    Object.entries(tabMap).forEach(([tabId, viewId]) => {
      const tab = document.getElementById(tabId);
      if (!tab) return;

      tab.addEventListener("click", () => {
        document.querySelectorAll(".nav-tab").forEach((t) => t.classList.remove("active"));
        tab.classList.add("active");

        document.querySelectorAll(".app-view").forEach((view) => {
          view.classList.remove("active");
          view.style.display = "none";
        });

        const activeView = document.getElementById(viewId);
        if (activeView) {
          activeView.classList.add("active");
          activeView.style.display = viewId === "view-game" ? "block" : "flex";
        }

        if (viewId === "view-game") {
          if (appState.hasSelectedPet) {
            showGrowthStage();
            renderHPBar();
          } else {
            showSelectionStage();
          }
        }
      });
    });
  }

  function setupLanguageDropdown() {
    const btn = document.getElementById("lang-toggle-btn");
    const menu = document.getElementById("lang-dropdown-menu");
    if (!btn || !menu) return;

    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      menu.style.display = menu.style.display === "block" ? "none" : "block";
    });

    document.querySelectorAll(".lang-opt").forEach((opt) => {
      opt.addEventListener("click", () => {
        applyLanguage(opt.getAttribute("data-lang"));
        menu.style.display = "none";
      });
    });

    document.addEventListener("click", () => {
      menu.style.display = "none";
    });
  }

  function bootstrapReturningPlayer() {
    if (!appState.hasSelectedPet) return;

    checkOfflineDecay();
    showGrowthStage();
    triggerBubbleWithTimeout(i18n[appState.currentLang].welcomeHome, 5000);
    renderHPBar();
  }

  async function initApp() {
    initTelegram();
    applyLanguage(appState.currentLang);
    setupLanguageDropdown();
    setupNavigationTabs();
    setupPetSystem();
    setupRecruitButton();

    await fetchUserScore();
    bootstrapReturningPlayer();
    updateLeaderboard();
    saveStateToLocal();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initApp);
  } else {
    initApp();
  }
})();
