const NOTE_NAMES_SHARP = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
const NOTE_NAMES_FLAT = ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"];

const KEYS = [
  { name: "C", pc: 0, prefer: "sharp" },
  { name: "Db", pc: 1, prefer: "flat" },
  { name: "D", pc: 2, prefer: "sharp" },
  { name: "Eb", pc: 3, prefer: "flat" },
  { name: "E", pc: 4, prefer: "sharp" },
  { name: "F", pc: 5, prefer: "flat" },
  { name: "F#", pc: 6, prefer: "sharp" },
  { name: "G", pc: 7, prefer: "sharp" },
  { name: "Ab", pc: 8, prefer: "flat" },
  { name: "A", pc: 9, prefer: "sharp" },
  { name: "Bb", pc: 10, prefer: "flat" },
  { name: "B", pc: 11, prefer: "sharp" },
];

const SCALES = {
  major: {
    names: { en: "Major Scale", "zh-Hant": "大調音階" },
    intervals: [0, 2, 4, 5, 7, 9, 11],
    labels: ["1", "2", "3", "4", "5", "6", "7"],
    degreeIndexes: [0, 1, 2, 3, 4, 5, 6],
  },
  majorPentatonic: {
    names: { en: "Major Pentatonic", "zh-Hant": "大調五聲音階" },
    intervals: [0, 2, 4, 7, 9],
    labels: ["1", "2", "3", "5", "6"],
    degreeIndexes: [0, 1, 2, 4, 5],
  },
  majorBlues: {
    names: { en: "Major Blues", "zh-Hant": "大調藍調音階" },
    intervals: [0, 2, 3, 4, 7, 9],
    labels: ["1", "2", "♭3", "3", "5", "6"],
    degreeIndexes: [0, 1, null, 2, 4, 5],
  },
};

const STRINGS = [
  { number: 1, name: "E4", midi: 64, gauge: 2 },
  { number: 2, name: "B3", midi: 59, gauge: 2.6 },
  { number: 3, name: "G3", midi: 55, gauge: 3.1 },
  { number: 4, name: "D3", midi: 50, gauge: 3.7 },
  { number: 5, name: "A2", midi: 45, gauge: 4.3 },
  { number: 6, name: "E2", midi: 40, gauge: 4.9 },
];

const FRET_MARKERS = new Set([3, 5, 7, 9, 12, 15, 17, 19, 21, 24]);
const LANDMARK_FRETS = new Set([1, 3, 5, 7, 9, 12, 15]);
const MAJOR_DEGREE_LABELS = ["1", "2", "3", "4", "5", "6", "7"];

const I18N = {
  en: {
    documentTitle: "Solo Fretboard Scale Visualizer",
    eyebrow: "Guitar Solo Fretboard",
    title: "Scale Sight-Reading",
    language: "Language",
    key: "Key",
    scale: "Scale",
    display: "Display",
    displayNumber: "Number",
    displayNumberNote: "Number + Note",
    displayDegreeChord: "Degree Chord",
    mode: "Mode",
    modeRange: "Range",
    modeRoute: "Route",
    startFret: "Start Fret",
    endFret: "End Fret",
    showOpen: "Show Open",
    root: "Root",
    second: "Second",
    third: "Third",
    fourth: "Fourth",
    fifth: "Fifth",
    sixth: "Sixth",
    seventh: "Seventh",
    extensions: "Extensions",
    chordLabels: "Chord Labels",
    setStart: "Set Start",
    setEnd: "Set End",
    clearRoute: "Clear Route",
    alternativePositions: "Alternative Positions",
    alternativeOff: "Off",
    alternativeNeedsRoute: "Set start and end",
    alternativeNoPositions: "No alternatives",
    alternativePick: "Choose a position",
    alternativeSelected: "{name} selected",
    altCurrentPosition: "Current Position",
    altPosition: "Alt Position",
    altRouteMeta: "{start} → {end}",
    bestPath: "Best Path",
    bestPathOff: "Off",
    bestPathNeedsRoute: "Set start and end",
    bestPathNoPath: "No complete path",
    bestPathPick: "Choose a path",
    bestPathSelected: "{name} selected",
    pathStartPosition: "Start Position",
    pathCompact: "Compact",
    pathSmooth: "Smooth",
    path3Nps: "3NPS",
    pathMeta: "Frets {frets} · {changes} shifts · {notes} notes",
    manualHighlight: "Manual Highlight",
    confirmHighlight: "Confirm",
    editHighlight: "Edit",
    clearHighlight: "Clear",
    manualOff: "Off",
    manualSelecting: "Selecting {count}",
    manualConfirmed: "Highlighted {count}",
    current: "Current",
    reference: "Reference",
    controls: "Controls",
    showControls: "Show Controls",
    hideControls: "Hide Controls",
    string: "String",
    fret: "Fret",
    frets: "Frets",
    startEmpty: "Start -",
    endEmpty: "End -",
    degreeButton: "Degree {degree}",
    degreeChord: "Degree {degree} Chord",
    openShown: "Open Shown",
    openHidden: "Open Hidden",
    keyReference: "{key} Key 1 = {note}",
  },
  "zh-Hant": {
    documentTitle: "Solo 指板音階視覺化",
    eyebrow: "吉他 Solo 指板",
    title: "音階視奏",
    language: "語言",
    key: "調",
    scale: "音階",
    display: "顯示",
    displayNumber: "簡譜",
    displayNumberNote: "簡譜 + 音名",
    displayDegreeChord: "級數和弦",
    mode: "模式",
    modeRange: "範圍",
    modeRoute: "路線",
    startFret: "起始品",
    endFret: "結束品",
    showOpen: "顯示空弦",
    root: "根音",
    second: "二音",
    third: "三音",
    fourth: "四音",
    fifth: "五音",
    sixth: "六音",
    seventh: "七音",
    extensions: "延伸音",
    chordLabels: "和弦標籤",
    setStart: "設定起點",
    setEnd: "設定終點",
    clearRoute: "清除路線",
    alternativePositions: "替代把位",
    alternativeOff: "關閉",
    alternativeNeedsRoute: "請設定起點與終點",
    alternativeNoPositions: "無替代把位",
    alternativePick: "選擇把位",
    alternativeSelected: "已選擇{name}",
    altCurrentPosition: "目前把位",
    altPosition: "替代把位",
    altRouteMeta: "{start} → {end}",
    bestPath: "最佳路徑",
    bestPathOff: "關閉",
    bestPathNeedsRoute: "請設定起點與終點",
    bestPathNoPath: "無完整路徑",
    bestPathPick: "選擇路徑",
    bestPathSelected: "已選擇{name}",
    pathStartPosition: "起點把位",
    pathCompact: "緊湊",
    pathSmooth: "順手",
    path3Nps: "三音一弦",
    pathMeta: "品位 {frets} · {changes} 次換弦 · {notes} 音",
    manualHighlight: "手動高亮",
    confirmHighlight: "確認",
    editHighlight: "編輯",
    clearHighlight: "清除",
    manualOff: "關閉",
    manualSelecting: "選擇中 {count}",
    manualConfirmed: "已高亮 {count}",
    current: "目前",
    reference: "基準",
    controls: "控制",
    showControls: "顯示控制",
    hideControls: "隱藏控制",
    string: "弦",
    fret: "品",
    frets: "品",
    startEmpty: "起點 -",
    endEmpty: "終點 -",
    degreeButton: "{degree}級",
    degreeChord: "{degree}級和弦",
    openShown: "含空弦",
    openHidden: "空弦隱藏",
    keyReference: "{key} 調 1 = {note}",
  },
};

const state = {
  language: "en",
  keyPc: 0,
  keyName: "C",
  keyPrefer: "sharp",
  scaleId: "major",
  labelMode: "jianpu",
  viewMode: "range",
  startFret: 0,
  endFret: 16,
  showOpenString: false,
  activeExtensions: new Set(),
  showChordLabels: false,
  manualHighlightEnabled: false,
  manualHighlightSelecting: false,
  pendingManualHighlights: new Set(),
  manualHighlights: new Set(),
  activeDegree: 1,
  routePick: "start",
  routeStart: null,
  routeEnd: null,
  alternativeEnabled: false,
  alternativeCandidates: [],
  selectedAlternativeId: null,
  bestPathEnabled: false,
  bestPathCandidates: [],
  selectedBestPathId: null,
  audioContext: null,
};

const els = {
  languageSelect: document.querySelector("#languageSelect"),
  keySelect: document.querySelector("#keySelect"),
  scaleSelect: document.querySelector("#scaleSelect"),
  labelModeSelect: document.querySelector("#labelModeSelect"),
  viewModeSelect: document.querySelector("#viewModeSelect"),
  startFretInput: document.querySelector("#startFretInput"),
  endFretInput: document.querySelector("#endFretInput"),
  openStringToggle: document.querySelector("#openStringToggle"),
  chordLabelToggle: document.querySelector("#chordLabelToggle"),
  manualHighlightToggle: document.querySelector("#manualHighlightToggle"),
  confirmManualButton: document.querySelector("#confirmManualButton"),
  clearManualButton: document.querySelector("#clearManualButton"),
  manualHighlightStatus: document.querySelector("#manualHighlightStatus"),
  fretboardHead: document.querySelector("#fretboardHead"),
  fretboard: document.querySelector("#fretboard"),
  degreeStrip: document.querySelector("#degreeStrip"),
  routeTools: document.querySelector("#routeTools"),
  alternativeTools: document.querySelector("#alternativeTools"),
  alternativeToggle: document.querySelector("#alternativeToggle"),
  alternativeList: document.querySelector("#alternativeList"),
  alternativeStatus: document.querySelector("#alternativeStatus"),
  bestPathTools: document.querySelector("#bestPathTools"),
  bestPathToggle: document.querySelector("#bestPathToggle"),
  bestPathList: document.querySelector("#bestPathList"),
  bestPathStatus: document.querySelector("#bestPathStatus"),
  routeReadout: document.querySelector("#routeReadout"),
  currentSummary: document.querySelector("#currentSummary"),
  octaveSummary: document.querySelector("#octaveSummary"),
  clearRouteButton: document.querySelector("#clearRouteButton"),
  mobileControlsToggle: document.querySelector("#mobileControlsToggle"),
  controlPanel: document.querySelector("#controlPanel"),
};

function init() {
  populateSelects();
  bindEvents();
  setupMobileControls();
  syncControls();
  renderStaticText();
  render();
}

function populateSelects() {
  KEYS.forEach((key) => {
    const option = document.createElement("option");
    option.value = key.name;
    option.textContent = key.name;
    els.keySelect.append(option);
  });

  Object.entries(SCALES).forEach(([id, scale]) => {
    const option = document.createElement("option");
    option.value = id;
    option.textContent = scaleName(scale);
    els.scaleSelect.append(option);
  });
}

function bindEvents() {
  els.languageSelect.addEventListener("change", () => {
    state.language = els.languageSelect.value;
    renderStaticText();
    updateScaleOptionLabels();
    syncControls();
    render();
  });

  els.keySelect.addEventListener("change", () => {
    const key = KEYS.find((item) => item.name === els.keySelect.value);
    state.keyPc = key.pc;
    state.keyName = key.name;
    state.keyPrefer = key.prefer;
    state.routeStart = null;
    state.routeEnd = null;
    resetAlternativePositions();
    resetBestPath();
    resetManualHighlight();
    render();
  });

  els.scaleSelect.addEventListener("change", () => {
    state.scaleId = els.scaleSelect.value;
    state.routeStart = null;
    state.routeEnd = null;
    resetAlternativePositions();
    resetBestPath();
    resetManualHighlight();
    render();
  });

  els.labelModeSelect.addEventListener("change", () => {
    state.labelMode = els.labelModeSelect.value;
    resetManualHighlight();
    render();
  });

  els.viewModeSelect.addEventListener("change", () => {
    state.viewMode = els.viewModeSelect.value;
    if (state.viewMode !== "route") {
      resetAlternativePositions();
      resetBestPath();
    }
    render();
  });

  els.startFretInput.addEventListener("input", () => {
    updateFretRange();
  });

  els.endFretInput.addEventListener("input", () => {
    updateFretRange();
  });

  els.openStringToggle.addEventListener("change", () => {
    state.showOpenString = els.openStringToggle.checked;
    resetAlternativePositions();
    resetBestPath();
    render();
  });

  els.chordLabelToggle.addEventListener("change", () => {
    state.showChordLabels = els.chordLabelToggle.checked;
    render();
  });

  els.manualHighlightToggle.addEventListener("change", () => {
    if (els.manualHighlightToggle.checked) {
      state.manualHighlightEnabled = true;
      state.manualHighlightSelecting = true;
      state.pendingManualHighlights = new Set(getInitialManualHighlightIds());
      state.manualHighlights = new Set();
    } else {
      resetManualHighlight();
    }
    render();
  });

  els.confirmManualButton.addEventListener("click", () => {
    if (!state.manualHighlightEnabled) {
      return;
    }

    if (!state.manualHighlightSelecting) {
      state.pendingManualHighlights = new Set(state.manualHighlights);
      state.manualHighlightSelecting = true;
      render();
      return;
    }

    state.manualHighlights = new Set(state.pendingManualHighlights);
    state.manualHighlightSelecting = false;
    render();
  });

  els.clearManualButton.addEventListener("click", () => {
    if (!state.manualHighlightEnabled) {
      return;
    }
    state.pendingManualHighlights = new Set();
    state.manualHighlights = new Set();
    state.manualHighlightSelecting = true;
    render();
  });

  els.bestPathToggle.addEventListener("change", () => {
    if (els.bestPathToggle.checked) {
      state.bestPathEnabled = true;
      state.selectedBestPathId = null;
      state.bestPathCandidates = buildBestPathCandidates();
    } else {
      resetBestPath();
    }
    render();
  });

  els.alternativeToggle.addEventListener("change", () => {
    if (els.alternativeToggle.checked) {
      state.alternativeEnabled = true;
      state.selectedAlternativeId = null;
      state.alternativeCandidates = buildAlternativePositionCandidates();
    } else {
      resetAlternativePositions();
    }
    render();
  });

  document.querySelectorAll("[data-preset]").forEach((button) => {
    button.addEventListener("click", () => {
      const [start, end] = button.dataset.preset.split("-").map(Number);
      state.startFret = start;
      state.endFret = end;
      resetAlternativePositions();
      resetBestPath();
      syncControls();
      render();
    });
  });

  document.querySelectorAll("[data-degree]").forEach((button) => {
    button.addEventListener("click", () => {
      state.activeDegree = Number(button.dataset.degree);
      render();
    });
  });

  document.querySelectorAll("[data-extension]").forEach((button) => {
    button.addEventListener("click", () => {
      const extension = Number(button.dataset.extension);
      if (state.activeExtensions.has(extension)) {
        state.activeExtensions.delete(extension);
      } else {
        state.activeExtensions.add(extension);
      }
      render();
    });
  });

  document.querySelectorAll("[data-route-pick]").forEach((button) => {
    button.addEventListener("click", () => {
      state.routePick = button.dataset.routePick;
      render();
    });
  });

  els.clearRouteButton.addEventListener("click", () => {
    state.routeStart = null;
    state.routeEnd = null;
    resetAlternativePositions();
    resetBestPath();
    render();
  });

  els.mobileControlsToggle.addEventListener("click", () => {
    const isCollapsed = els.controlPanel.classList.toggle("is-mobile-collapsed");
    els.mobileControlsToggle.setAttribute("aria-expanded", String(!isCollapsed));
    updateMobileControlsLabel();
  });
}

function setupMobileControls() {
  const mobileQuery = window.matchMedia("(max-width: 760px)");
  const syncMobileState = () => {
    const isMobile = mobileQuery.matches;
    els.controlPanel.classList.toggle("is-mobile-collapsed", isMobile);
    els.mobileControlsToggle.setAttribute("aria-expanded", String(!isMobile));
    updateMobileControlsLabel();
  };

  syncMobileState();
  mobileQuery.addEventListener("change", syncMobileState);
}

function updateFretRange() {
  const start = clamp(Number(els.startFretInput.value), 0, 24);
  const end = clamp(Number(els.endFretInput.value), 0, 24);
  state.startFret = Math.min(start, end);
  state.endFret = Math.max(start, end);
  resetAlternativePositions();
  resetBestPath();
  syncControls();
  render();
}

function syncControls() {
  els.languageSelect.value = state.language;
  els.keySelect.value = state.keyName;
  els.scaleSelect.value = state.scaleId;
  els.labelModeSelect.value = state.labelMode;
  els.viewModeSelect.value = state.viewMode;
  els.startFretInput.value = state.startFret;
  els.endFretInput.value = state.endFret;
  els.openStringToggle.checked = state.showOpenString;
  els.chordLabelToggle.checked = state.showChordLabels;
  els.manualHighlightToggle.checked = state.manualHighlightEnabled;
  els.alternativeToggle.checked = state.alternativeEnabled;
  els.bestPathToggle.checked = state.bestPathEnabled;
}

function renderStaticText() {
  document.documentElement.lang = state.language === "zh-Hant" ? "zh-Hant" : "en";
  document.title = t("documentTitle");
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    element.textContent = t(element.dataset.i18n);
  });
  document.querySelector(".controls")?.setAttribute("aria-label", t("controls"));
  document.querySelector(".degree-strip")?.setAttribute("aria-label", t("displayDegreeChord"));
  document.querySelector(".route-tools")?.setAttribute("aria-label", t("modeRoute"));
  document.querySelector(".alternative-tools")?.setAttribute("aria-label", t("alternativePositions"));
  document.querySelector(".best-path-tools")?.setAttribute("aria-label", t("bestPath"));
  document.querySelector(".manual-tools")?.setAttribute("aria-label", t("manualHighlight"));
  document.querySelector(".fretboard-wrap")?.setAttribute("aria-label", "Fretboard");
  updateDegreeButtonLabels();
  renderManualTools();
  updateMobileControlsLabel();
}

function updateScaleOptionLabels() {
  Object.entries(SCALES).forEach(([id, scale]) => {
    const option = [...els.scaleSelect.options].find((item) => item.value === id);
    if (option) {
      option.textContent = scaleName(scale);
    }
  });
}

function updateMobileControlsLabel() {
  if (!els.mobileControlsToggle) {
    return;
  }

  if (!window.matchMedia("(max-width: 760px)").matches) {
    els.mobileControlsToggle.textContent = t("controls");
    return;
  }

  const isCollapsed = els.controlPanel.classList.contains("is-mobile-collapsed");
  els.mobileControlsToggle.textContent = isCollapsed ? t("showControls") : t("hideControls");
}

function render() {
  syncControls();
  renderDegreeStrip();
  renderRouteTools();
  renderAlternativeTools();
  renderBestPathTools();
  renderManualTools();
  renderFretboard();
  renderStatus();
}

function renderManualTools() {
  els.confirmManualButton.disabled = !state.manualHighlightEnabled;
  els.confirmManualButton.textContent =
    state.manualHighlightEnabled && !state.manualHighlightSelecting
      ? t("editHighlight")
      : t("confirmHighlight");
  els.clearManualButton.disabled = !state.manualHighlightEnabled;

  if (!state.manualHighlightEnabled) {
    els.confirmManualButton.textContent = t("confirmHighlight");
    els.manualHighlightStatus.textContent = t("manualOff");
    return;
  }

  if (state.manualHighlightSelecting) {
    els.manualHighlightStatus.textContent = t("manualSelecting", {
      count: state.pendingManualHighlights.size,
    });
    return;
  }

  els.manualHighlightStatus.textContent = t("manualConfirmed", {
    count: state.manualHighlights.size,
  });
}

function renderDegreeStrip() {
  els.degreeStrip.classList.toggle("is-muted", state.labelMode !== "chord-degree");
  updateDegreeButtonLabels();
  document.querySelectorAll("[data-degree]").forEach((button) => {
    button.classList.toggle("active", Number(button.dataset.degree) === state.activeDegree);
  });
  document.querySelectorAll("[data-extension]").forEach((button) => {
    button.classList.toggle("active", state.activeExtensions.has(Number(button.dataset.extension)));
  });
}

function updateDegreeButtonLabels() {
  document.querySelectorAll("[data-degree]").forEach((button) => {
    button.textContent = t("degreeButton", { degree: button.dataset.degree });
  });
}

function renderRouteTools() {
  els.routeTools.classList.toggle("is-visible", state.viewMode === "route");
  document.querySelectorAll("[data-route-pick]").forEach((button) => {
    button.classList.toggle("active", button.dataset.routePick === state.routePick);
  });
}

function renderAlternativeTools() {
  const canUse =
    state.viewMode === "route" &&
    state.routeStart &&
    state.routeEnd &&
    isRoutePointVisible(state.routeStart) &&
    isRoutePointVisible(state.routeEnd);
  els.alternativeTools.classList.toggle("is-visible", state.viewMode === "route");
  els.alternativeToggle.disabled = !canUse;
  els.alternativeList.replaceChildren();

  if (!canUse) {
    els.alternativeStatus.textContent = t("alternativeNeedsRoute");
    return;
  }

  if (!state.alternativeEnabled) {
    els.alternativeStatus.textContent = t("alternativeOff");
    return;
  }

  if (!state.alternativeCandidates.length) {
    els.alternativeStatus.textContent = t("alternativeNoPositions");
    return;
  }

  state.alternativeCandidates.forEach((candidate) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "best-path-card";
    button.classList.toggle("active", candidate.id === state.selectedAlternativeId);
    const name = t(candidate.nameKey);
    button.innerHTML = `
      <strong>${name}</strong>
      <span>${t("altRouteMeta", {
        start: formatCompactRoutePoint(candidate.start),
        end: formatCompactRoutePoint(candidate.end),
      })}</span>
      <span>${t("pathMeta", {
        frets: candidate.fretRange,
        changes: candidate.stringChanges,
        notes: candidate.path.length,
      })}</span>
    `;
    button.addEventListener("click", () => {
      selectAlternativePosition(candidate);
    });
    els.alternativeList.append(button);
  });

  const selected = state.alternativeCandidates.find(
    (candidate) => candidate.id === state.selectedAlternativeId,
  );
  els.alternativeStatus.textContent = selected
    ? t("alternativeSelected", { name: t(selected.nameKey) })
    : t("alternativePick");
}

function renderBestPathTools() {
  const canUse =
    state.viewMode === "route" &&
    state.routeStart &&
    state.routeEnd &&
    isRoutePointVisible(state.routeStart) &&
    isRoutePointVisible(state.routeEnd);
  els.bestPathTools.classList.toggle("is-visible", state.viewMode === "route");
  els.bestPathToggle.disabled = !canUse;
  els.bestPathList.replaceChildren();

  if (!canUse) {
    els.bestPathStatus.textContent = t("bestPathNeedsRoute");
    return;
  }

  if (!state.bestPathEnabled) {
    els.bestPathStatus.textContent = t("bestPathOff");
    return;
  }

  if (!state.bestPathCandidates.length) {
    els.bestPathStatus.textContent = t("bestPathNoPath");
    return;
  }

  state.bestPathCandidates.forEach((candidate) => {
    const name = t(candidate.nameKey);
    const button = document.createElement("button");
    button.type = "button";
    button.className = "best-path-card";
    button.classList.toggle("active", candidate.id === state.selectedBestPathId);
    button.innerHTML = `
      <strong>${name}</strong>
      <span>${t("pathMeta", {
        frets: candidate.fretRange,
        changes: candidate.stringChanges,
        notes: candidate.path.length,
      })}</span>
    `;
    button.addEventListener("click", () => {
      state.selectedBestPathId = candidate.id;
      render();
    });
    els.bestPathList.append(button);
  });

  const selected = getSelectedBestPath();
  els.bestPathStatus.textContent = selected
    ? t("bestPathSelected", { name: t(selected.nameKey) })
    : t("bestPathPick");
}

function renderFretboard() {
  const visibleStartFret = getVisibleStartFret();
  const fretCount = Math.max(0, state.endFret - visibleStartFret + 1);
  els.fretboardHead.style.setProperty("--fret-count", fretCount);
  els.fretboard.style.setProperty("--fret-count", fretCount);
  els.fretboard.classList.toggle(
    "has-selected-best-path",
    state.viewMode === "route" && state.bestPathEnabled && Boolean(state.selectedBestPathId),
  );
  els.fretboardHead.replaceChildren();
  els.fretboard.replaceChildren();

  const corner = document.createElement("div");
  corner.className = "fret-label";
  corner.textContent = t("string");
  els.fretboardHead.append(corner);

  for (let fret = visibleStartFret; fret <= state.endFret; fret += 1) {
    const label = document.createElement("div");
    label.className = "fret-label";
    if (LANDMARK_FRETS.has(fret)) {
      label.classList.add("landmark-fret");
    }
    label.textContent = fret;
    els.fretboardHead.append(label);
  }

  STRINGS.forEach((string) => {
    const stringLabel = document.createElement("div");
    stringLabel.className = "string-label";
    if (string.number === 1) {
      stringLabel.classList.add("top-string-row");
    }
    stringLabel.textContent = `${t("string")} ${string.number} ${string.name}`;
    els.fretboard.append(stringLabel);

    for (let fret = visibleStartFret; fret <= state.endFret; fret += 1) {
      const midi = string.midi + fret;
      const cell = document.createElement("div");
      cell.className = "fret-cell";
      if (string.number === 1) {
        cell.classList.add("top-string-row");
      }
      cell.style.setProperty("--string-height", `${string.gauge}px`);
      if (fret === 0) {
        cell.classList.add("fret-zero");
      }
      if (LANDMARK_FRETS.has(fret)) {
        cell.classList.add("landmark-column");
      }

      const noteInfo = getScaleNoteInfo(midi);
      if (noteInfo) {
        const noteButton = createNoteButton(noteInfo, string, fret, midi);
        cell.append(noteButton);
      } else {
        const empty = document.createElement("span");
        empty.className = "empty-note";
        cell.append(empty);
      }

      if (FRET_MARKERS.has(fret) && string.number === 6) {
        const marker = document.createElement("span");
        marker.className = "fret-marker";
        cell.append(marker);
      }

      els.fretboard.append(cell);
    }
  });
}

function getVisibleStartFret() {
  if (!state.showOpenString && state.startFret === 0 && state.endFret > 0) {
    return 1;
  }

  return state.startFret;
}

function createNoteButton(noteInfo, string, fret, midi) {
  const button = document.createElement("button");
  const routeState = getRouteState(midi, string.number, fret);
  const chordRole = getChordRole(noteInfo.degreeIndex);
  const manualId = pointId(string.number, fret);
  const manualState = getManualHighlightState(manualId);
  const bestPathState = getBestPathPointState(manualId);
  button.type = "button";
  button.className = "note-dot";
  button.title = `${t("string")} ${string.number} · ${t("fret")} ${fret} · ${noteName(midi)} · ${noteInfo.octaveText}`;

  if (fret === 0) {
    button.classList.add("open-note");
  }

  if (noteInfo.interval === 0) {
    button.classList.add("tonic");
  }

  if (state.labelMode === "chord-degree" && chordRole) {
    button.classList.remove("tonic");
    button.classList.add(`chord-${chordRole}`);
  }

  if (state.labelMode === "chord-degree" && !chordRole) {
    button.classList.add("degree-hidden");
  }

  const chordLabel = getChordLabel(chordRole);
  if (state.labelMode === "chord-degree" && state.showChordLabels && chordLabel) {
    const label = document.createElement("span");
    label.className = "chord-tone-label";
    label.textContent = chordLabel;
    button.append(label);
  }

  if (state.viewMode === "route") {
    if (routeState.inRoute) {
      button.classList.add("route-note");
    } else if (state.routeStart && state.routeEnd && !manualState.isActive) {
      button.classList.add("dimmed");
    }

    if (routeState.isEndpoint) {
      button.classList.add("endpoint");
    }
  }

  if (state.viewMode === "route" && state.bestPathEnabled && state.selectedBestPathId) {
    if (state.manualHighlightEnabled && manualState.isActive) {
      button.classList.add("best-path-note");
    } else if (!state.manualHighlightEnabled && bestPathState.inPath) {
      button.classList.add("best-path-note");
    } else if (routeState.inRoute) {
      button.classList.add("best-path-context");
    }
  }

  if (manualState.isPending) {
    button.classList.add("pending-manual-highlight");
  }

  if (manualState.isConfirmed) {
    button.classList.add("manual-highlight");
  }

  if (
    state.manualHighlightEnabled &&
    !state.manualHighlightSelecting &&
    state.manualHighlights.size > 0 &&
    !manualState.isConfirmed
  ) {
    button.classList.add("dimmed");
  }

  const main = document.createElement("span");
  main.className = "main-label";
  main.append(createJianpuMark(noteInfo.label, noteInfo.octaveOffset));
  button.append(main);

  if (state.labelMode === "jianpu-note") {
    const sub = document.createElement("span");
    sub.className = "sub-label";
    sub.textContent = noteName(midi);
    button.append(sub);
  }

  button.addEventListener("click", () => {
    playNote(midi);
    if (state.manualHighlightEnabled && state.manualHighlightSelecting) {
      togglePendingManualHighlight(manualId);
      render();
      return;
    }

    if (state.viewMode === "route" && state.bestPathEnabled && state.selectedBestPathId) {
      return;
    }

    if (state.viewMode === "route") {
      setRoutePoint(string, fret, midi, noteInfo);
    }
  });

  return button;
}

function pointId(stringNumber, fret) {
  return `${stringNumber}:${fret}`;
}

function getManualHighlightState(id) {
  const isPending = state.manualHighlightSelecting && state.pendingManualHighlights.has(id);
  const isConfirmed = !state.manualHighlightSelecting && state.manualHighlights.has(id);
  return {
    isPending,
    isConfirmed,
    isActive: isPending || isConfirmed,
  };
}

function togglePendingManualHighlight(id) {
  if (state.pendingManualHighlights.has(id)) {
    state.pendingManualHighlights.delete(id);
    return;
  }

  state.pendingManualHighlights.add(id);
}

function getInitialManualHighlightIds() {
  const selected = getSelectedBestPath();
  if (state.viewMode === "route" && state.bestPathEnabled && selected) {
    return selected.pointIds;
  }

  return [];
}

function resetManualHighlight() {
  state.manualHighlightEnabled = false;
  state.manualHighlightSelecting = false;
  state.pendingManualHighlights = new Set();
  state.manualHighlights = new Set();
}

function resetBestPath() {
  state.bestPathEnabled = false;
  state.bestPathCandidates = [];
  state.selectedBestPathId = null;
}

function resetAlternativePositions() {
  state.alternativeEnabled = false;
  state.alternativeCandidates = [];
  state.selectedAlternativeId = null;
}

function getSelectedBestPath() {
  if (!state.selectedBestPathId) {
    return null;
  }

  return state.bestPathCandidates.find((candidate) => candidate.id === state.selectedBestPathId) ?? null;
}

function getBestPathPointState(id) {
  const selected = getSelectedBestPath();
  if (!selected) {
    return { inPath: false };
  }

  return { inPath: selected.pointIds.has(id) };
}

function buildBestPathCandidates(
  start = state.routeStart,
  end = state.routeEnd,
  modes = [
    { id: "start-position", nameKey: "pathStartPosition" },
    { id: "compact", nameKey: "pathCompact" },
    { id: "smooth", nameKey: "pathSmooth" },
    { id: "3nps", nameKey: "path3Nps" },
  ],
) {
  if (
    !start ||
    !end ||
    start.midi === end.midi ||
    !isRoutePointVisible(start) ||
    !isRoutePointVisible(end)
  ) {
    return [];
  }

  const targetMidis = buildRouteMidiSequence(start, end);
  if (targetMidis.length < 2) {
    return [];
  }

  const layers = targetMidis.map((midi, index) =>
    buildPositionCandidatesForMidi(midi, index, targetMidis.length, start, end),
  );
  if (layers.some((layer) => layer.length === 0)) {
    return [];
  }

  const context = {
    direction: start.midi < end.midi ? 1 : -1,
    preferredWindow: getPreferredFretWindow(start, end),
  };

  const seen = new Set();
  return modes
    .map((mode) => searchBestPath(layers, mode, context))
    .filter(Boolean)
    .filter((candidate) => {
      const signature = candidate.path.map((point) => point.id).join(">");
      if (seen.has(signature)) {
        return false;
      }
      seen.add(signature);
      return true;
    });
}

function buildRouteMidiSequence(start = state.routeStart, end = state.routeEnd) {
  const direction = start.midi < end.midi ? 1 : -1;
  const low = Math.min(start.midi, end.midi);
  const high = Math.max(start.midi, end.midi);
  const midis = [];

  for (let midi = low; midi <= high; midi += 1) {
    if (getScaleNoteInfo(midi)) {
      midis.push(midi);
    }
  }

  return direction === 1 ? midis : midis.reverse();
}

function buildPositionCandidatesForMidi(midi, index, layerCount, start = state.routeStart, end = state.routeEnd) {
  if (index === 0) {
    return [routePointToCandidate(start)];
  }
  if (index === layerCount - 1) {
    return [routePointToCandidate(end)];
  }

  return buildAllPositionsForMidi(midi);
}

function routePointToCandidate(point) {
  return {
    stringNumber: point.stringNumber,
    fret: point.fret,
    midi: point.midi,
    id: pointId(point.stringNumber, point.fret),
  };
}

function buildAllPositionsForMidi(midi) {
  const visibleStartFret = getVisibleStartFret();
  const candidates = [];
  STRINGS.forEach((string) => {
    for (let fret = visibleStartFret; fret <= state.endFret; fret += 1) {
      if (string.midi + fret === midi) {
        candidates.push({
          stringNumber: string.number,
          fret,
          midi,
          id: pointId(string.number, fret),
        });
      }
    }
  });
  return candidates;
}

function buildAlternativePositionCandidates() {
  if (!state.routeStart || !state.routeEnd || state.routeStart.midi === state.routeEnd.midi) {
    return [];
  }

  const starts = sortAlternativePositions(buildAllPositionsForMidi(state.routeStart.midi), state.routeStart);
  const ends = sortAlternativePositions(buildAllPositionsForMidi(state.routeEnd.midi), state.routeEnd);
  const modes = [{ id: "start-position", nameKey: "pathStartPosition" }];
  const seen = new Set();
  const candidates = [];

  starts.forEach((start) => {
    ends.forEach((end) => {
      if (start.id === end.id) {
        return;
      }

      const path = buildBestPathCandidates(
        createRoutePointFromCandidate(start),
        createRoutePointFromCandidate(end),
        modes,
      )[0];
      if (!path) {
        return;
      }

      const isCurrent = isSamePoint(state.routeStart, start.stringNumber, start.fret) &&
        isSamePoint(state.routeEnd, end.stringNumber, end.fret);
      const signature = `${start.id}>${end.id}>${path.path.map((point) => point.id).join(">")}`;
      if (seen.has(signature)) {
        return;
      }
      seen.add(signature);

      candidates.push({
        ...path,
        id: `alt-${start.id}-${end.id}-${candidates.length}`,
        nameKey: isCurrent ? "altCurrentPosition" : "altPosition",
        start,
        end,
        isCurrent,
        toneProfile: null,
        positionGroup: getPositionGroup(path),
        chainGroup: null,
      });
    });
  });

  return candidates
    .sort((a, b) => {
      if (a.isCurrent !== b.isCurrent) {
        return a.isCurrent ? -1 : 1;
      }
      return a.cost - b.cost;
    })
    .slice(0, 6);
}

function sortAlternativePositions(points, currentPoint) {
  return [...points].sort((a, b) => {
    const aCurrent = isSamePoint(currentPoint, a.stringNumber, a.fret);
    const bCurrent = isSamePoint(currentPoint, b.stringNumber, b.fret);
    if (aCurrent !== bCurrent) {
      return aCurrent ? -1 : 1;
    }
    return Math.abs(a.fret - currentPoint.fret) - Math.abs(b.fret - currentPoint.fret);
  });
}

function createRoutePointFromCandidate(candidate) {
  const noteInfo = getScaleNoteInfo(candidate.midi);
  return {
    stringNumber: candidate.stringNumber,
    fret: candidate.fret,
    midi: candidate.midi,
    label: noteInfo?.octaveText ?? "",
    note: noteName(candidate.midi),
  };
}

function selectAlternativePosition(candidate) {
  state.routeStart = createRoutePointFromCandidate(candidate.start);
  state.routeEnd = createRoutePointFromCandidate(candidate.end);
  state.routePick = "start";
  state.selectedAlternativeId = candidate.id;
  resetManualHighlight();

  state.bestPathEnabled = true;
  state.bestPathCandidates = buildBestPathCandidates();
  const startPositionPath = state.bestPathCandidates.find((path) => path.id === "start-position");
  state.selectedBestPathId = startPositionPath?.id ?? state.bestPathCandidates[0]?.id ?? null;
  render();
}

function getPositionGroup(candidate) {
  return {
    lowFret: candidate.minFret,
    highFret: candidate.maxFret,
    label: `${candidate.minFret}-${candidate.maxFret}`,
  };
}

function isRoutePointVisible(point) {
  const visibleStartFret = getVisibleStartFret();
  return point.fret >= visibleStartFret && point.fret <= state.endFret;
}

function getPreferredFretWindow(start = state.routeStart, end = state.routeEnd) {
  const startFret = start.fret;
  if (startFret === 0) {
    return { low: 0, high: 4 };
  }
  if (start.midi < end.midi) {
    return { low: startFret, high: Math.min(24, startFret + 4) };
  }
  return { low: Math.max(0, startFret - 4), high: startFret };
}

function searchBestPath(layers, mode, context) {
  let beams = layers[0].map((point) => ({
    path: [point],
    cost: nodeCost(point, mode, context, 0, layers.length),
    minFret: point.fret,
    maxFret: point.fret,
  }));

  for (let layerIndex = 1; layerIndex < layers.length; layerIndex += 1) {
    const nextBeams = [];
    beams.forEach((beam) => {
      layers[layerIndex].forEach((point) => {
        const previous = beam.path[beam.path.length - 1];
        const minFret = Math.min(beam.minFret, point.fret);
        const maxFret = Math.max(beam.maxFret, point.fret);
        const previousRange = beam.maxFret - beam.minFret;
        const nextRange = maxFret - minFret;
        nextBeams.push({
          path: [...beam.path, point],
          cost:
            beam.cost +
            transitionCost(previous, point, mode, context) +
            nodeCost(point, mode, context, layerIndex, layers.length) +
            rangeCost(nextRange - previousRange, mode),
          minFret,
          maxFret,
        });
      });
    });
    beams = nextBeams.sort((a, b) => a.cost - b.cost).slice(0, 80);
  }

  const best = beams
    .map((beam) => ({
      ...beam,
      cost: beam.cost + finalPathCost(beam, mode, context),
    }))
    .sort((a, b) => a.cost - b.cost)[0];

  if (!best) {
    return null;
  }

  return formatBestPathCandidate(best, mode);
}

function transitionCost(previous, point, mode, context) {
  const fretMove = Math.abs(point.fret - previous.fret);
  const stringMove = Math.abs(point.stringNumber - previous.stringNumber);
  const skippedStrings = Math.max(0, stringMove - 1);
  const weights = {
    "start-position": { fret: 1.25, string: 2.2, skip: 5, jump: 8 },
    compact: { fret: 1.1, string: 2, skip: 4, jump: 7 },
    smooth: { fret: 2.3, string: 3.2, skip: 9, jump: 13 },
    "3nps": { fret: 1.4, string: 2.4, skip: 7, jump: 9 },
  }[mode.id];
  let cost =
    fretMove * weights.fret +
    stringMove * weights.string +
    skippedStrings * weights.skip +
    Math.max(0, fretMove - 5) * weights.jump;

  if (context.direction === 1 && point.stringNumber > previous.stringNumber) {
    cost += 2.5;
  }
  if (context.direction === -1 && point.stringNumber < previous.stringNumber) {
    cost += 2.5;
  }
  if (context.direction === 1 && point.stringNumber === previous.stringNumber && point.fret < previous.fret) {
    cost += 4;
  }
  if (context.direction === -1 && point.stringNumber === previous.stringNumber && point.fret > previous.fret) {
    cost += 4;
  }

  if (mode.id === "3nps") {
    if (stringMove === 1) {
      cost -= 0.6;
    }
    if (stringMove > 1) {
      cost += 8;
    }
  }

  return cost;
}

function nodeCost(point, mode, context, index, layerCount) {
  let cost = 0;
  const outsideDistance = distanceOutsideWindow(point.fret, context.preferredWindow);
  if (mode.id === "start-position") {
    cost += outsideDistance ? 18 + outsideDistance * 14 : 0;
  } else if (mode.id === "smooth") {
    cost += outsideDistance * 1.5;
  } else if (mode.id === "3nps") {
    cost += outsideDistance * 2.2;
  }

  if (point.fret === 0 && index !== 0 && index !== layerCount - 1) {
    cost += mode.id === "start-position" ? 5 : 8;
  }

  return cost;
}

function rangeCost(rangeIncrease, mode) {
  return (
    {
      "start-position": 1.2,
      compact: 6,
      smooth: 1,
      "3nps": 1.6,
    }[mode.id] * rangeIncrease
  );
}

function finalPathCost(beam, mode, context) {
  const range = beam.maxFret - beam.minFret;
  const outsideCount = beam.path.filter(
    (point) => distanceOutsideWindow(point.fret, context.preferredWindow) > 0,
  ).length;
  const stringChanges = countStringChanges(beam.path);
  return (
    {
      "start-position": outsideCount * 20 + range * 1.4,
      compact: range * 12 + stringChanges * 1.5,
      smooth: stringChanges * 4 + range * 1.8,
      "3nps": stringDistributionCost(beam.path) + range * 1.4 + stringChanges * 1.2,
    }[mode.id] ?? 0
  );
}

function stringDistributionCost(path) {
  const counts = new Map();
  path.forEach((point) => {
    counts.set(point.stringNumber, (counts.get(point.stringNumber) ?? 0) + 1);
  });

  let cost = 0;
  counts.forEach((count) => {
    if (count === 3) {
      cost -= 10;
    } else if (count === 2) {
      cost += 1.5;
    } else if (count === 1) {
      cost += 8;
    } else {
      cost += (count - 3) * 9;
    }
  });

  return cost;
}

function distanceOutsideWindow(fret, window) {
  if (fret < window.low) {
    return window.low - fret;
  }
  if (fret > window.high) {
    return fret - window.high;
  }
  return 0;
}

function formatBestPathCandidate(beam, mode) {
  const pointIds = new Set(beam.path.map((point) => point.id));
  return {
    id: mode.id,
    nameKey: mode.nameKey,
    path: beam.path,
    pointIds,
    cost: beam.cost,
    minFret: beam.minFret,
    maxFret: beam.maxFret,
    fretRange: `${beam.minFret}-${beam.maxFret}`,
    stringChanges: countStringChanges(beam.path),
  };
}

function countStringChanges(path) {
  return path.reduce((count, point, index) => {
    if (index === 0) {
      return count;
    }
    return count + (point.stringNumber === path[index - 1].stringNumber ? 0 : 1);
  }, 0);
}

function getScaleNoteInfo(midi) {
  const scale = SCALES[state.scaleId];
  const pc = mod(midi, 12);
  const interval = mod(pc - state.keyPc, 12);
  const scaleIndex = scale.intervals.indexOf(interval);

  if (scaleIndex === -1) {
    return null;
  }

  const label = scale.labels[scaleIndex];
  const referenceMidi = getReferenceTonicMidi();
  const octaveOffset = Math.floor((midi - referenceMidi) / 12);

  return {
    interval,
    label,
    octaveOffset,
    octaveText: formatJianpuOctaveText(label, octaveOffset),
    degreeIndex: scale.degreeIndexes[scaleIndex],
  };
}

function getReferenceTonicMidi() {
  return 48 + state.keyPc;
}

function createJianpuMark(label, octaveOffset) {
  const mark = document.createElement("span");
  mark.className = "jianpu-mark";

  const topDots = document.createElement("span");
  topDots.className = "octave-dots top";
  appendOctaveDots(topDots, Math.max(0, octaveOffset));

  const degree = document.createElement("span");
  degree.className = "degree-label";
  degree.textContent = label;

  const bottomDots = document.createElement("span");
  bottomDots.className = "octave-dots bottom";
  appendOctaveDots(bottomDots, Math.max(0, -octaveOffset));

  mark.append(topDots, degree, bottomDots);
  return mark;
}

function appendOctaveDots(container, count) {
  for (let index = 0; index < count; index += 1) {
    const dot = document.createElement("span");
    dot.className = "octave-dot";
    container.append(dot);
  }
}

function formatJianpuOctaveText(label, octaveOffset) {
  if (octaveOffset === 0) {
    return label;
  }

  if (octaveOffset > 0) {
    return `${label}${"'".repeat(octaveOffset)}`;
  }

  return `${".".repeat(Math.abs(octaveOffset))}${label}`;
}

function noteName(midi) {
  const names = state.keyPrefer === "flat" ? NOTE_NAMES_FLAT : NOTE_NAMES_SHARP;
  return `${names[mod(midi, 12)]}${Math.floor(midi / 12) - 1}`;
}

function getChordRole(degreeIndex) {
  if (degreeIndex === null || degreeIndex === undefined) {
    return null;
  }

  const root = state.activeDegree - 1;
  const roles = [
    { degree: root, role: "root" },
    { degree: mod(root + 2, 7), role: "third" },
    { degree: mod(root + 4, 7), role: "fifth" },
  ];

  if (state.activeExtensions.has(2)) {
    roles.push({ degree: mod(root + 1, 7), role: "second" });
  }
  if (state.activeExtensions.has(4)) {
    roles.push({ degree: mod(root + 3, 7), role: "fourth" });
  }
  if (state.activeExtensions.has(6)) {
    roles.push({ degree: mod(root + 5, 7), role: "sixth" });
  }
  if (state.activeExtensions.has(7)) {
    roles.push({ degree: mod(root + 6, 7), role: "seventh" });
  }

  return roles.find((item) => item.degree === degreeIndex)?.role ?? null;
}

function getChordLabel(role) {
  const degree = state.activeDegree;
  const labels = {
    1: { root: "R", third: "3", fifth: "5", seventh: "7" },
    2: { root: "R", third: "♭3", fifth: "5", seventh: "♭7" },
    3: { root: "R", third: "♭3", fifth: "5", seventh: "♭7" },
    4: { root: "R", third: "3", fifth: "5", seventh: "7" },
    5: { root: "R", third: "3", fifth: "5", seventh: "♭7" },
    6: { root: "R", third: "♭3", fifth: "5", seventh: "♭7" },
    7: { root: "R", third: "♭3", fifth: "♭5", seventh: "♭7" },
  };

  return labels[degree]?.[role] ?? null;
}

function getRouteState(midi, stringNumber, fret) {
  const isStart = isSamePoint(state.routeStart, stringNumber, fret);
  const isEnd = isSamePoint(state.routeEnd, stringNumber, fret);
  const hasBoth = state.routeStart && state.routeEnd;

  if (!hasBoth) {
    return {
      inRoute: isStart || isEnd,
      isEndpoint: isStart || isEnd,
    };
  }

  const low = Math.min(state.routeStart.midi, state.routeEnd.midi);
  const high = Math.max(state.routeStart.midi, state.routeEnd.midi);
  return {
    inRoute: midi >= low && midi <= high,
    isEndpoint: isStart || isEnd,
  };
}

function setRoutePoint(string, fret, midi, noteInfo) {
  const point = {
    stringNumber: string.number,
    fret,
    midi,
    label: noteInfo.octaveText,
    note: noteName(midi),
  };

  if (state.routePick === "start") {
    state.routeStart = point;
    state.routePick = "end";
  } else {
    state.routeEnd = point;
    state.routePick = "start";
  }

  resetAlternativePositions();
  resetBestPath();
  render();
}

function isSamePoint(point, stringNumber, fret) {
  return Boolean(point && point.stringNumber === stringNumber && point.fret === fret);
}

function renderStatus() {
  const scale = SCALES[state.scaleId];
  const labelModeName = {
    jianpu: t("displayNumber"),
    "jianpu-note": t("displayNumberNote"),
    "chord-degree": t("degreeChord", { degree: state.activeDegree }),
  }[state.labelMode];
  const viewModeName = state.viewMode === "route" ? t("modeRoute") : t("modeRange");

  const openStringText = state.showOpenString ? t("openShown") : t("openHidden");
  els.currentSummary.textContent = `${state.keyName} ${scaleName(scale)} · ${labelModeName} · ${viewModeName} · ${t("frets")} ${state.startFret}-${state.endFret} · ${openStringText}`;
  els.octaveSummary.textContent = t("keyReference", {
    key: state.keyName,
    note: noteName(getReferenceTonicMidi()),
  });

  const start = state.routeStart ? formatRoutePoint(state.routeStart) : t("startEmpty");
  const end = state.routeEnd ? formatRoutePoint(state.routeEnd) : t("endEmpty");
  els.routeReadout.replaceChildren();
  [start, end].forEach((text) => {
    const span = document.createElement("span");
    span.textContent = text;
    els.routeReadout.append(span);
  });
}

function formatRoutePoint(point) {
  return `${point.label} ${point.note} · ${t("string")} ${point.stringNumber} ${t("fret")} ${point.fret}`;
}

function formatCompactRoutePoint(point) {
  return `${t("string")} ${point.stringNumber} ${t("fret")} ${point.fret}`;
}

function scaleName(scale) {
  return scale.names[state.language] ?? scale.names.en;
}

function t(key, params = {}) {
  const dictionary = I18N[state.language] ?? I18N.en;
  const template = dictionary[key] ?? I18N.en[key] ?? key;
  return Object.entries(params).reduce(
    (text, [name, value]) => text.replaceAll(`{${name}}`, value),
    template,
  );
}

function playNote(midi) {
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  if (!AudioContext) {
    return;
  }

  if (!state.audioContext) {
    state.audioContext = new AudioContext();
  }

  const context = state.audioContext;
  if (context.state === "suspended") {
    context.resume();
  }

  const now = context.currentTime;
  const frequency = 440 * 2 ** ((midi - 69) / 12);
  const output = context.createGain();
  const filter = context.createBiquadFilter();
  const compressor = context.createDynamicsCompressor();
  const oscA = context.createOscillator();
  const oscB = context.createOscillator();
  const pick = context.createBufferSource();
  const pickGain = context.createGain();

  filter.type = "bandpass";
  filter.frequency.setValueAtTime(Math.min(4200, frequency * 5.2), now);
  filter.Q.setValueAtTime(1.2, now);

  output.gain.setValueAtTime(0.0001, now);
  output.gain.exponentialRampToValueAtTime(0.55, now + 0.008);
  output.gain.exponentialRampToValueAtTime(0.2, now + 0.09);
  output.gain.exponentialRampToValueAtTime(0.0001, now + 1.15);

  oscA.type = "sawtooth";
  oscA.frequency.setValueAtTime(frequency, now);
  oscB.type = "triangle";
  oscB.frequency.setValueAtTime(frequency * 2.005, now);

  const noiseBuffer = context.createBuffer(1, context.sampleRate * 0.025, context.sampleRate);
  const samples = noiseBuffer.getChannelData(0);
  for (let index = 0; index < samples.length; index += 1) {
    samples[index] = (Math.random() * 2 - 1) * (1 - index / samples.length);
  }
  pick.buffer = noiseBuffer;
  pickGain.gain.setValueAtTime(0.13, now);
  pickGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.035);

  oscA.connect(filter);
  oscB.connect(filter);
  pick.connect(pickGain);
  pickGain.connect(filter);
  filter.connect(output);
  output.connect(compressor);
  compressor.connect(context.destination);

  oscA.start(now);
  oscB.start(now);
  pick.start(now);
  oscA.stop(now + 1.2);
  oscB.stop(now + 1.2);
  pick.stop(now + 0.04);
}

function clamp(value, min, max) {
  if (Number.isNaN(value)) {
    return min;
  }

  return Math.min(Math.max(value, min), max);
}

function mod(value, divisor) {
  return ((value % divisor) + divisor) % divisor;
}

init();
