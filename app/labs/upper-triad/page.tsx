'use client';

import { useEffect, useMemo, useState } from 'react';
import LabHeader from '@/components/LabHeader';
import ChordCard from '@/components/ChordCard';
import Piano, { PianoHighlight } from '@/components/Piano';
import {
  KEYS,
  CHORD_STRUCTURES,
  buildChordForKey,
  getResultChordName,
  getUpperTriadName,
  midiToName,
  midiToToneName,
  type ChordMode,
} from '@/lib/chord-theory';
import {
  initPiano,
  playNotes,
  playCompare,
  playSingleNote,
} from '@/lib/audio';

type LoadState = 'loading' | 'ready' | 'error' | 'fading';

export default function UpperTriadPage() {
  const [keyIndex, setKeyIndex] = useState(0);
  const [mode, setMode] = useState<ChordMode>('major');
  const [chordIndex, setChordIndex] = useState(0);
  const [loadState, setLoadState] = useState<LoadState>('loading');

  const ready = loadState === 'ready' || loadState === 'fading';

  useEffect(() => {
    let cancelled = false;
    initPiano()
      .then(() => {
        if (cancelled) return;
        setLoadState('ready');
        setTimeout(() => {
          if (!cancelled) setLoadState('fading');
        }, 1500);
      })
      .catch(() => {
        if (cancelled) return;
        setLoadState('error');
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const currentKey = KEYS[keyIndex];
  const currentStructure = CHORD_STRUCTURES[mode][chordIndex];
  const currentChord = useMemo(
    () => buildChordForKey(currentStructure, currentKey.rootMidi, mode),
    [currentStructure, currentKey.rootMidi, mode]
  );

  const upperName = getUpperTriadName(currentStructure, currentKey.rootMidi, currentKey.useFlats);
  const resultName = getResultChordName(currentStructure, currentKey.display);
  const lhDispName = midiToName(currentChord.rootMidi, currentKey.useFlats);
  const rhDispNames = currentChord.triadMidis.map((m) =>
    midiToName(m, currentKey.useFlats)
  );

  const highlight: PianoHighlight = {
    rootMidi: currentChord.rootMidi,
    triadMidis: currentChord.triadMidis,
    triadDegrees: currentStructure.degrees.map((d) => d.deg),
    useFlats: currentKey.useFlats,
  };

  const handleModeChange = (m: ChordMode) => {
    setMode(m);
    setChordIndex(0);
  };

  const onPlayLeft = () => {
    playNotes([midiToToneName(currentChord.rootMidi)], 'block');
  };
  const onPlayRight = () => {
    playNotes(currentChord.triadMidis.map(midiToToneName), 'block');
  };
  const onPlayBlock = () => {
    playNotes(
      [midiToToneName(currentChord.rootMidi), ...currentChord.triadMidis.map(midiToToneName)],
      'block'
    );
  };
  const onPlayBroken = () => {
    playNotes(
      [midiToToneName(currentChord.rootMidi), ...currentChord.triadMidis.map(midiToToneName)],
      'broken'
    );
  };
  const onPlayCompare = () => {
    playCompare(
      midiToToneName(currentChord.rootMidi),
      currentChord.triadMidis.map(midiToToneName)
    );
  };

  const loadBarText =
    loadState === 'error'
      ? 'Load failed - reload the page'
      : loadState === 'loading'
      ? 'Loading Grand Piano...'
      : 'Grand Piano Ready';

  const loadBarClass =
    'loading-bar' +
    (loadState === 'ready' || loadState === 'fading' ? ' ready' : '') +
    (loadState === 'fading' ? ' fade-out' : '') +
    (loadState === 'error' ? ' error' : '');

  return (
    <div className="tl-container">
      <LabHeader backHref="/" backLabel="Theory Lab" />

      <header className="tl-hero">
        <div className="tl-eyebrow">Upper Structure Triad ・ 探究</div>
        <h1 className="tl-h1">
          左手は<span className="accent">ルート単音</span>。<br />
          右手の三和音で<span className="accent">色を作る</span>
        </h1>
        <div className="tl-subtitle">Tap a card  ・  Choose your key  ・  Hear the structure</div>
      </header>

      <div className="key-selector-wrap">
        <span className="key-selector-label">Key</span>
        <select
          className="key-selector"
          value={keyIndex}
          onChange={(e) => setKeyIndex(parseInt(e.target.value))}
        >
          {KEYS.map((k, i) => (
            <option key={k.name} value={i}>
              {k.display}
            </option>
          ))}
        </select>
      </div>

      <div className={loadBarClass}>
        <span className="indicator" />
        <span>{loadBarText}</span>
      </div>

      <div className="mode-switch">
        {(['major', 'minor', 'tension'] as ChordMode[]).map((m) => (
          <button
            key={m}
            className={'mode-btn' + (mode === m ? ' active' : '')}
            onClick={() => handleModeChange(m)}
          >
            {m === 'major' ? 'Major Base' : m === 'minor' ? 'Minor Base' : 'Tension Series'}
          </button>
        ))}
      </div>

      <div className="grid-cards">
        {CHORD_STRUCTURES[mode].map((s, i) => {
          const u = getUpperTriadName(s, currentKey.rootMidi, currentKey.useFlats);
          const r = getResultChordName(s, currentKey.display);
          return (
            <ChordCard
              key={`${mode}-${i}`}
              keyDisplay={currentKey.display}
              upperName={u}
              resultName={r}
              degrees={s.degrees.map((d) => d.deg)}
              active={i === chordIndex}
              disabled={!ready}
              onClick={() => setChordIndex(i)}
              delaySec={i * 0.04}
            />
          );
        })}
      </div>

      <div className="detail">
        <div className="detail-header">
          <div className="detail-title-block">
            <div className="label">Resulting Chord</div>
            <div className="detail-title">{resultName}</div>
            <div className="detail-formula">
              <span className="left">{currentKey.display}</span>{' '}
              <span style={{ color: 'var(--gold)' }}>+</span>{' '}
              <span className="right">{upperName}</span>{' '}
              <span style={{ color: 'var(--muted)' }}>
                → {currentStructure.degrees.map((d) => d.deg).join(', ')}
              </span>
            </div>
          </div>
          <div className="hand-legend">
            <span className="hand-tag left">
              左手 L.H. <span className="notes">{lhDispName}</span>
            </span>
            <span className="hand-tag right">
              右手 R.H. <span className="notes">{rhDispNames.join(' - ')}</span>
            </span>
          </div>
        </div>

        <div className="controls">
          <button className="play-btn left-only" disabled={!ready} onClick={onPlayLeft}>
            <span className="icon" />
            左手のみ
          </button>
          <button className="play-btn right-only" disabled={!ready} onClick={onPlayRight}>
            <span className="icon" />
            右手のみ
          </button>
          <button className="play-btn" disabled={!ready} onClick={onPlayBroken}>
            <span className="icon" />
            分散
          </button>
          <button className="play-btn" disabled={!ready} onClick={onPlayBlock}>
            <span className="icon" />
            同時
          </button>
          <button className="play-btn secondary" disabled={!ready} onClick={onPlayCompare}>
            Compare L → R → Full
          </button>
        </div>

        <Piano
          highlight={highlight}
          disabled={!ready}
          onKeyClick={(toneName) => {
            if (ready) playSingleNote(toneName);
          }}
        />

        <div className="breakdown">
          <div className="breakdown-block left">
            <div className="breakdown-header">
              <div className="breakdown-title">L.H. ・ Left Hand</div>
              <div className="role">Root</div>
            </div>
            <div>
              <div className="breakdown-row">
                <span className="note">{lhDispName}</span>
                <span className="deg">
                  <span className="num">1</span>Root
                </span>
              </div>
            </div>
          </div>
          <div className="breakdown-block right">
            <div className="breakdown-header">
              <div className="breakdown-title">R.H. ・ Right Hand</div>
              <div className="role">Upper Triad</div>
            </div>
            <div>
              {currentChord.triadMidis.map((m, i) => (
                <div key={m} className="breakdown-row">
                  <span className="note">{midiToName(m, currentKey.useFlats)}</span>
                  <span className="deg">
                    <span className="num">{currentStructure.degrees[i].deg}</span>
                    {currentStructure.degrees[i].jp}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <footer>Directline Studio  ・  Sensation Before Theory</footer>
    </div>
  );
}
