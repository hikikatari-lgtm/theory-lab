'use client';

import { useEffect, useMemo, useState } from 'react';
import LabHeader from '@/components/LabHeader';
import { initPiano, playNotes, isPianoReady } from '@/lib/audio';
import InversionKeyboard, {
  type KeyboardNote,
} from './components/InversionKeyboard';
import {
  annotateVoicing,
  buildVoicings,
  chordSymbol,
  commonMidis,
  inversionLabel,
  midiToNoteName,
  parseProgression,
  type Voicing,
} from './lib/inversion-theory';

type Preset = { id: string; label: string; text: string };

const PRESETS: Preset[] = [
  { id: 'i-vi-iv-v',  label: 'I – vi – IV – V (in C)',  text: 'C - Am - F - G' },
  { id: 'ii-v-i',     label: 'ii – V – I (in C)',       text: 'Dm - G - C' },
  { id: 'minor-loop', label: 'Em – Bm – Am (minor loop)', text: 'Em - Bm - Am' },
  { id: 'pop-1564',   label: 'I – V – vi – IV (in C)',  text: 'C - G - Am - F' },
  { id: 'jazz-iiv-i', label: 'ii – V – I (in F)',       text: 'Gm - C - F' },
  { id: 'circle',     label: 'Cycle of fifths fragment', text: 'C - F - Bb - Eb' },
];

const DEFAULT_TEXT = PRESETS[0].text;

export default function InversionLabClient() {
  const [inputText, setInputText] = useState<string>(DEFAULT_TEXT);
  const [appliedText, setAppliedText] = useState<string>(DEFAULT_TEXT);
  const [stepIdx, setStepIdx] = useState<number>(0);
  const [startingInversion, setStartingInversion] = useState<number>(0);
  const [audioReady, setAudioReady] = useState<boolean>(false);
  const [audioLoading, setAudioLoading] = useState<boolean>(false);
  const [soundOn, setSoundOn] = useState<boolean>(false);

  const chords = useMemo(() => parseProgression(appliedText), [appliedText]);
  const voicings = useMemo<Voicing[]>(
    () => buildVoicings(chords, startingInversion),
    [chords, startingInversion]
  );

  // Reset selection whenever the progression changes.
  useEffect(() => {
    setStepIdx(0);
  }, [appliedText]);

  // Lazy piano load — only when the user toggles sound on.
  useEffect(() => {
    if (!soundOn || audioReady || audioLoading) return;
    setAudioLoading(true);
    initPiano()
      .then(() => setAudioReady(true))
      .catch(() => setAudioReady(false))
      .finally(() => setAudioLoading(false));
  }, [soundOn, audioReady, audioLoading]);

  // Play the chord whenever the step changes (only if sound is enabled
  // and the sampler has finished loading).
  useEffect(() => {
    if (!soundOn || !audioReady || !isPianoReady()) return;
    const v = voicings[stepIdx];
    if (!v) return;
    const toneNames = v.midis.map(midiToNoteName);
    void playNotes(toneNames, 'block');
  }, [stepIdx, soundOn, audioReady, voicings]);

  const currentVoicing = voicings[stepIdx] ?? null;
  const prevVoicing = stepIdx > 0 ? voicings[stepIdx - 1] ?? null : null;

  const keyboardNotes = useMemo<KeyboardNote[]>(() => {
    if (!currentVoicing) return [];
    const annotated = annotateVoicing(currentVoicing);
    const common = commonMidis(prevVoicing, currentVoicing);
    return annotated.map((n) => ({
      midi: n.midi,
      degree: n.degree,
      kind: common.has(n.midi) ? 'common' : 'moving',
    }));
  }, [currentVoicing, prevVoicing]);

  const allMidis = useMemo(
    () => voicings.flatMap((v) => v.midis),
    [voicings]
  );

  const handleApply = () => {
    setAppliedText(inputText);
  };

  const handlePreset = (id: string) => {
    const preset = PRESETS.find((p) => p.id === id);
    if (!preset) return;
    setInputText(preset.text);
    setAppliedText(preset.text);
  };

  const goPrev = () => setStepIdx((i) => Math.max(0, i - 1));
  const goNext = () =>
    setStepIdx((i) => Math.min(voicings.length - 1, i + 1));

  const canPrev = stepIdx > 0;
  const canNext = stepIdx < voicings.length - 1;

  return (
    <div className="vl-page il-page">
      <div className="tl-container">
        <LabHeader backHref="/" backLabel="Theory Lab" />

        <header className="vl-header">
          <h1>Inversion Lab</h1>
          <div className="vl-header-subtitle">
            基本形と転回形をスムーズに繋ぐ — 自動ボイスリーディング
          </div>
        </header>

        <section className="vl-progression il-controls">
          <div className="il-row">
            <label className="il-label">プリセット</label>
            <select
              className="il-select"
              defaultValue=""
              onChange={(e) => {
                if (e.target.value) handlePreset(e.target.value);
                e.currentTarget.value = '';
              }}
            >
              <option value="">— 選択 —</option>
              {PRESETS.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.label}
                </option>
              ))}
            </select>
          </div>

          <div className="il-row">
            <label className="il-label">コード進行</label>
            <input
              type="text"
              className="il-input"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleApply();
              }}
              placeholder="例: C - Am - F - G"
              spellCheck={false}
            />
            <button className="il-btn il-btn-primary" onClick={handleApply}>
              適用
            </button>
          </div>
          <div className="il-hint">
            ハイフン・カンマ区切り。対応コード: メジャー（C、F♯、Bb）/ マイナー（Cm、F♯m、Bbm）
          </div>
        </section>

        {chords.length === 0 ? (
          <div className="il-empty">
            コード進行を入力してください。
          </div>
        ) : (
          <>
            <div className="il-progression-strip">
              {voicings.map((v, i) => {
                const isCurrent = i === stepIdx;
                return (
                  <button
                    key={i}
                    type="button"
                    className={
                      'il-chip' + (isCurrent ? ' il-chip-active' : '')
                    }
                    onClick={() => setStepIdx(i)}
                  >
                    <div className="il-chip-symbol">
                      {chordSymbol(v.chord)}
                    </div>
                    <div className="il-chip-inv">
                      {inversionLabel(v.inversion)}
                    </div>
                  </button>
                );
              })}
            </div>

            <section className="il-stage">
              <div className="il-stage-header">
                <div>
                  <div className="il-stage-eyebrow">
                    {stepIdx + 1} / {voicings.length}
                  </div>
                  <div className="il-stage-symbol">
                    {currentVoicing && chordSymbol(currentVoicing.chord)}
                  </div>
                  <div className="il-stage-inv">
                    {currentVoicing && inversionLabel(currentVoicing.inversion)}
                  </div>
                </div>
                <div className="il-legend">
                  <span className="il-legend-item">
                    <span className="il-legend-swatch il-legend-common" />
                    共通音
                  </span>
                  <span className="il-legend-item">
                    <span className="il-legend-swatch il-legend-moving" />
                    移動する音
                  </span>
                </div>
              </div>

              <div className="il-inversion-picker">
                <span className="il-inversion-picker-label">
                  開始転回形
                </span>
                <div className="il-segmented" role="group">
                  {[
                    { value: 0, label: 'Root' },
                    { value: 1, label: '1st inv' },
                    { value: 2, label: '2nd inv' },
                  ].map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      className={
                        'il-segmented-btn' +
                        (startingInversion === opt.value ? ' active' : '')
                      }
                      onClick={() => setStartingInversion(opt.value)}
                      aria-pressed={startingInversion === opt.value}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
                <span className="il-inversion-picker-hint">
                  最初のコードの転回形を選ぶと、後続のコードも再計算されます
                </span>
              </div>

              <InversionKeyboard
                notes={keyboardNotes}
                rangeMidis={allMidis}
              />

              <div className="il-nav">
                <button
                  className="il-btn"
                  onClick={goPrev}
                  disabled={!canPrev}
                >
                  ← 前へ
                </button>
                <label className="il-sound-toggle">
                  <input
                    type="checkbox"
                    checked={soundOn}
                    onChange={(e) => setSoundOn(e.target.checked)}
                  />
                  サウンド
                  {soundOn && audioLoading ? (
                    <span className="il-sound-status"> 読込中…</span>
                  ) : null}
                </label>
                <button
                  className="il-btn il-btn-primary"
                  onClick={goNext}
                  disabled={!canNext}
                >
                  次へ →
                </button>
              </div>
            </section>
          </>
        )}
      </div>
    </div>
  );
}
