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
    third: "Third",
    fifth: "Fifth",
    seventh: "Seventh",
    setStart: "Set Start",
    setEnd: "Set End",
    clearRoute: "Clear Route",
    manualHighlight: "Manual Highlight",
    confirmHighlight: "Confirm",
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
    third: "三音",
    fifth: "五音",
    seventh: "七音",
    setStart: "設定起點",
    setEnd: "設定終點",
    clearRoute: "清除路線",
    manualHighlight: "手動高亮",
    confirmHighlight: "確認",
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
  manualHighlightEnabled: false,
  manualHighlightSelecting: false,
  pendingManualHighlights: new Set(),
  manualHighlights: new Set(),
  activeDegree: 1,
  routePick: "start",
  routeStart: null,
  routeEnd: null,
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
  manualHighlightToggle: document.querySelector("#manualHighlightToggle"),
  confirmManualButton: document.querySelector("#confirmManualButton"),
  clearManualButton: document.querySelector("#clearManualButton"),
  manualHighlightStatus: document.querySelector("#manualHighlightStatus"),
  fretboardHead: document.querySelector("#fretboardHead"),
  fretboard: document.querySelector("#fretboard"),
  degreeStrip: document.querySelector("#degreeStrip"),
  routeTools: document.querySelector("#routeTools"),
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
    resetManualHighlight();
    render();
  });

  els.scaleSelect.addEventListener("change", () => {
    state.scaleId = els.scaleSelect.value;
    state.routeStart = null;
    state.routeEnd = null;
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
    render();
  });

  els.manualHighlightToggle.addEventListener("change", () => {
    if (els.manualHighlightToggle.checked) {
      state.manualHighlightEnabled = true;
      state.manualHighlightSelecting = true;
      state.pendingManualHighlights = new Set();
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

  document.querySelectorAll("[data-preset]").forEach((button) => {
    button.addEventListener("click", () => {
      const [start, end] = button.dataset.preset.split("-").map(Number);
      state.startFret = start;
      state.endFret = end;
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

  document.querySelectorAll("[data-route-pick]").forEach((button) => {
    button.addEventListener("click", () => {
      state.routePick = button.dataset.routePick;
      render();
    });
  });

  els.clearRouteButton.addEventListener("click", () => {
    state.routeStart = null;
    state.routeEnd = null;
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
  els.manualHighlightToggle.checked = state.manualHighlightEnabled;
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
  renderManualTools();
  renderFretboard();
  renderStatus();
}

function renderManualTools() {
  els.confirmManualButton.disabled = !state.manualHighlightEnabled || !state.manualHighlightSelecting;
  els.clearManualButton.disabled = !state.manualHighlightEnabled;

  if (!state.manualHighlightEnabled) {
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

function renderFretboard() {
  const visibleStartFret = getVisibleStartFret();
  const fretCount = Math.max(0, state.endFret - visibleStartFret + 1);
  els.fretboardHead.style.setProperty("--fret-count", fretCount);
  els.fretboard.style.setProperty("--fret-count", fretCount);
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
    stringLabel.textContent = `${t("string")} ${string.number} ${string.name}`;
    els.fretboard.append(stringLabel);

    for (let fret = visibleStartFret; fret <= state.endFret; fret += 1) {
      const midi = string.midi + fret;
      const cell = document.createElement("div");
      cell.className = "fret-cell";
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

function resetManualHighlight() {
  state.manualHighlightEnabled = false;
  state.manualHighlightSelecting = false;
  state.pendingManualHighlights = new Set();
  state.manualHighlights = new Set();
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
  return 60 + state.keyPc;
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
    { degree: mod(root + 6, 7), role: "seventh" },
  ];

  return roles.find((item) => item.degree === degreeIndex)?.role ?? null;
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
