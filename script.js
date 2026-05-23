/**
 * AI Hunter — i18n · Multi-Pet · Settings · Supabase Sync
 */
(function () {
  "use strict";

  // ==========================================
  // 1. 全球六国语言字典
  // ==========================================
  const i18n = {
    en: {
      logo: "NAKAMURA",
      selectPet: "SELECT YOUR<br>PET",
      hintSelect: "Tap to awaken your cyber companion",
      back: "◀ BACK",
      feed: "FEED (-50 Nodes)",
      drink: "DRINK (-50 Nodes)",
      recruit: "🔗 RECRUIT SQUAD (+500 NODES)",
      game: "GAME",
      missions: "MISSIONS",
      settings: "SETTINGS",
      chooseTitle: "CHOOSE YOUR COMPANION",
      rankTitle: "GLOBAL TOP 10",
      nodeLabel: "NODES COLLECTED",
      tplText: "TAP COMPANION TO MINE",
      langBtn: "🌐 LANG",
      set_title: "SETTINGS",
      set_privacy: "Privacy & Security",
      set_crypto: "VeraCrypt Drive Status",
    },
    hi: {
      logo: "नाकामुरा",
      selectPet: "अपना पालतू<br>चुनें",
      hintSelect: "अपने साइबर साथी को जगाने के लिए टैप करें",
      back: "◀ वापस",
      feed: "खिलाएं (-50 Nodes)",
      drink: "पिलाएं (-50 Nodes)",
      recruit: "🔗 दस्ता भर्ती करें (+500 NODES)",
      game: "खेल",
      missions: "मिशन",
      settings: "सेटिंग्स",
      chooseTitle: "अपना साथी चुनें",
      rankTitle: "वैश्विक शीर्ष 10",
      nodeLabel: "नोड्स एकत्र किए गए",
      tplText: "माइन करने के लिए साथी पर टैप करें",
      langBtn: "🌐 भाषा",
      set_title: "सेटिंग्स",
      set_privacy: "गोपनीयता और सुरक्षा",
      set_crypto: "वेराक्रिप्ट ड्राइव स्थिति",
    },
    ru: {
      logo: "NAKAMURA",
      selectPet: "ВЫБЕРИТЕ<br>ПИТОМЦА",
      hintSelect: "Нажмите, чтобы пробудить кибер-спутника",
      back: "◀ НАЗАД",
      feed: "КОРМИТЬ (-50 Nodes)",
      drink: "ПОИТЬ (-50 Nodes)",
      recruit: "🔗 НАЙМ ОТРЯДА (+500 NODES)",
      game: "ИГРА",
      missions: "МИССИИ",
      settings: "НАСТРОЙКИ",
      chooseTitle: "ВЫБЕРИТЕ СПУТНИКА",
      rankTitle: "МИРОВОЙ ТОП 10",
      nodeLabel: "НОДОВ СОБРАНО",
      tplText: "НАЖМИТЕ ДЛЯ МАЙНИНГА",
      langBtn: "🌐 ЯЗЫК",
      set_title: "НАСТРОЙКИ",
      set_privacy: "Конфиденциальность",
      set_crypto: "Статус VeraCrypt",
    },
    pt: {
      logo: "NAKAMURA",
      selectPet: "ESCOLHA SEU<br>PET",
      hintSelect: "Toque para acordar seu companheiro cibernético",
      back: "◀ VOLTAR",
      feed: "ALIMENTAR (-50 Nodes)",
      drink: "BEBER (-50 Nodes)",
      recruit: "🔗 RECRUTAR ESQUADRÃO (+500)",
      game: "JOGO",
      missions: "MISSÕES",
      settings: "OPÇÕES",
      chooseTitle: "ESCOLHA SEU COMPANHEIRO",
      rankTitle: "TOP 10 GLOBAL",
      nodeLabel: "NODES COLETADOS",
      tplText: "TOQUE PARA MINERAR",
      langBtn: "🌐 IDIOMA",
      set_title: "CONFIGURAÇÕES",
      set_privacy: "Privacidade e Segurança",
      set_crypto: "Status do VeraCrypt",
    },
    uk: {
      logo: "NAKAMURA",
      selectPet: "ВИБЕРІТЬ<br>ТВАРИНУ",
      hintSelect: "Натисніть, щоб розбудити кібер-супутника",
      back: "◀ НАЗАД",
      feed: "ГОДУВАТИ (-50 Nodes)",
      drink: "ПОЇТИ (-50 Nodes)",
      recruit: "🔗 НАЙНЯТИ ЗАГІН (+500 NODES)",
      game: "ГРА",
      missions: "МІСІЇ",
      settings: "НАЛАШТУВАННЯ",
      chooseTitle: "ВИБЕРІТЬ СУПУТНИКА",
      rankTitle: "СВІТОВИЙ ТОП 10",
      nodeLabel: "НОДІВ ЗІБРАНО",
      tplText: "НАТИСНІТЬ ДЛЯ МАЙНІНГУ",
      langBtn: "🌐 МОВА",
      set_title: "НАЛАШТУВАННЯ",
      set_privacy: "Конфіденційність",
      set_crypto: "Статус VeraCrypt",
    },
    id: {
      logo: "NAKAMURA",
      selectPet: "PILIH<br>HEWAN",
      hintSelect: "Ketuk untuk membangunkan pendamping siber",
      back: "◀ KEMBALI",
      feed: "BERI MAKAN (-50 Nodes)",
      drink: "BERI MINUM (-50 Nodes)",
      recruit: "🔗 REKRUT SQUAD (+500 NODES)",
      game: "GAME",
      missions: "MISI",
      settings: "PENGATURAN",
      chooseTitle: "PILIH PENDAMPING ANDA",
      rankTitle: "TOP 10 GLOBAL",
      nodeLabel: "NODE DIKUMPULKAN",
      tplText: "KETUK UNTUK MENAMBANG",
      langBtn: "🌐 BAHASA",
      set_title: "PENGATURAN",
      set_privacy: "Privasi & Keamanan",
      set_crypto: "Status Drive VeraCrypt",
    },
  };

  const CARE_COST = 50;
  const CARE_RECOVERY = 30;

  const supabaseUrl = "https://sitoruyhhzjubxvblems.supabase.co";
  const supabaseKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNpdG9ydXloaHpqdWJ4dmJsZW1zIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkxMDg4MDgsImV4cCI6MjA5NDY4NDgwOH0.sCn0WiQP8LX8qZp7YrFLcyvYmrOugozgVjHbkIDqiKg";
  const supabase =
    supabaseUrl && supabaseKey && window.supabase
      ? window.supabase.createClient(supabaseUrl, supabaseKey)
      : null;

  let decayTimer = null;

  function loadLegacyPetState() {
    try {
      const saved = localStorage.getItem("ai_hunter_pet_state");
      if (!saved) return null;
      return JSON.parse(saved);
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
    energy: legacy?.energy ?? 100,
    hydration: legacy?.hydration ?? 100,
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

  // ==========================================
  // Telegram & Supabase
  // ==========================================

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

  function clampStat(value) {
    return Math.max(0, Math.min(100, value));
  }

  function persistLocalState() {
    localStorage.setItem("userNodes", String(appState.nodes));
    localStorage.setItem("hasSelectedPet", String(appState.hasSelectedPet));
    localStorage.setItem("selectedPetEmoji", appState.selectedPetEmoji);
    localStorage.setItem("selectedPetName", appState.selectedPetName);
    localStorage.setItem(
      "ai_hunter_pet_state",
      JSON.stringify({
        hasPet: appState.hasSelectedPet,
        selectedType: appState.selectedPetName,
        energy: appState.energy,
        hydration: appState.hydration,
      })
    );
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
    } catch (e) {
      console.warn("[Sync] Score deferred to local cache.");
    }
  }

  async function fetchUserScore() {
    if (!supabase) {
      if (!localStorage.getItem("userNodes") && !appState.hasSelectedPet) {
        appState.nodes = 500;
        persistLocalState();
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

      persistLocalState();
      updateUI();
      updateLeaderboard();
    } catch {
      console.log("[System] Operating in offline mode.");
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
    } catch (e) {
      console.error("[Leaderboard Sync Error]:", e.message);
      listElement.innerHTML =
        '<div class="rank-item loading">Sync failed — check console.</div>';
    }
  }

  // ==========================================
  // i18n Engine
  // ==========================================

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
    setText("btn-back-to-select", dict.back);
    setText("btn-feed", dict.feed);
    setText("btn-drink", dict.drink);
    setText("btn-recruit", dict.recruit);
    setText("lang-toggle-btn", dict.langBtn);
    setText("choose-title", dict.chooseTitle);
    setText("rank-title", dict.rankTitle);
    setText("settings-title", dict.set_title);
    setText("set-p-1", dict.set_privacy);
    setText("set-p-2", dict.set_crypto);

    const nodesLabel = document.querySelector(".nodes-label");
    if (nodesLabel) nodesLabel.textContent = dict.nodeLabel;
    const titleSub = document.querySelector(".title-sub");
    if (titleSub) titleSub.textContent = dict.tplText;

    const tabs = document.querySelectorAll(".nav-tab");
    if (tabs.length >= 3) {
      tabs[0].textContent = dict.game;
      tabs[1].textContent = dict.missions;
      tabs[2].textContent = dict.settings;
    }
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

  // ==========================================
  // UI & Pet Lifecycle
  // ==========================================

  function updateUI() {
    if (nodesEl) nodesEl.textContent = String(appState.nodes);
    renderStatusBars();
    if (btnFeed) btnFeed.disabled = appState.nodes < CARE_COST;
    if (btnDrink) btnDrink.disabled = appState.nodes < CARE_COST;
  }

  function renderStatusBars() {
    appState.energy = clampStat(appState.energy);
    appState.hydration = clampStat(appState.hydration);

    const fillEnergy = document.getElementById("fill-energy");
    const fillHydration = document.getElementById("fill-hydration");
    const valEnergy = document.getElementById("val-energy");
    const valHydration = document.getElementById("val-hydration");

    if (fillEnergy) fillEnergy.style.width = `${appState.energy}%`;
    if (valEnergy) valEnergy.textContent = Math.round(appState.energy);
    if (fillHydration) fillHydration.style.width = `${appState.hydration}%`;
    if (valHydration) valHydration.textContent = Math.round(appState.hydration);
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
    const selectBtn = document.getElementById("btn-select-pet");
    if (selectBtn) selectBtn.classList.remove("ghost-hidden");
  }

  function spawnPlusOne(amount) {
    if (!floatLayer) return;
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

  function startLifeDecay() {
    if (decayTimer) clearInterval(decayTimer);

    decayTimer = setInterval(() => {
      if (!appState.hasSelectedPet) return;
      appState.energy = Math.max(0, appState.energy - 2);
      appState.hydration = Math.max(0, appState.hydration - 2);
      renderStatusBars();
      persistLocalState();
    }, 8000);
  }

  function handleCare(type) {
    if (appState.nodes < CARE_COST) return;
    appState.nodes -= CARE_COST;
    appState[type] = clampStat(appState[type] + CARE_RECOVERY);
    persistLocalState();
    updateUI();
    syncScoreToCloud();
  }

  function setupPetSystem() {
    const selectPetBtn = document.getElementById("btn-select-pet");
    const backBtn = document.getElementById("btn-back-to-select");

    if (selectPetBtn) {
      selectPetBtn.addEventListener("click", () => {
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
        persistLocalState();

        showGrowthStage();
        startLifeDecay();
        updateLeaderboard();
      });
    });

    if (backBtn) {
      backBtn.addEventListener("click", () => {
        if (decayTimer) clearInterval(decayTimer);
        decayTimer = null;
        showSelectionStage();
      });
    }

    if (petStage) {
      petStage.addEventListener("click", async () => {
        if (!appState.hasSelectedPet) return;
        if (appState.energy <= 0 || appState.hydration <= 0) return;

        appState.nodes += 1;
        appState.energy = Math.max(0, appState.energy - 1);
        appState.hydration = Math.max(0, appState.hydration - 1);

        persistLocalState();
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

    if (btnFeed) btnFeed.addEventListener("click", () => handleCare("energy"));
    if (btnDrink) btnDrink.addEventListener("click", () => handleCare("hydration"));
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
          } else {
            showSelectionStage();
          }
        }
      });
    });
  }

  function bootstrapReturningPlayer() {
    if (!appState.hasSelectedPet) return;

    showGrowthStage();
    startLifeDecay();
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
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initApp);
  } else {
    initApp();
  }
})();
