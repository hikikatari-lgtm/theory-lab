'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  getAudioDiagnostics,
  subscribeAudioDiagnostics,
  type AudioDiagnostics,
} from '@/lib/audio';

// On-screen audio diagnostic panel for iOS debugging without Mac
// remote inspector. Activated via `?debug=1` URL param. The panel
// floats at the bottom-right corner, lives until the user dismisses
// it (close button); a page reload re-shows it as long as the param
// is still present.
//
// What it shows:
//   - hasAudioSessionApi  / audioSessionType  (iOS 17.4+ feature gate)
//   - Tone.context state  / sampleRate         (Web Audio life-cycle)
//   - pianoReady / toneStarted                 (our pipeline flags)
//   - primer status (silent <audio> outcome)   (silent-switch override)
//   - userAgent (last 60 chars)                (iOS version cue)
//   - Last 16 step events (audioSession.set, primer.play, Tone.start,
//     playNotes, playSustained, etc.) with ok / detail
//
// All values stream live via subscribeAudioDiagnostics — every push
// from lib/audio.ts re-renders the panel.
export default function AudioDebugPanel() {
  const searchParams = useSearchParams();
  const enabled = searchParams.get('debug') === '1';

  const [hidden, setHidden] = useState(false);
  const [diag, setDiag] = useState<AudioDiagnostics | null>(null);

  useEffect(() => {
    if (!enabled) return;
    // Seed the initial snapshot, then re-snapshot on every emit.
    setDiag(getAudioDiagnostics());
    const unsubscribe = subscribeAudioDiagnostics(() => {
      setDiag(getAudioDiagnostics());
    });
    return unsubscribe;
  }, [enabled]);

  if (!enabled || hidden || !diag) return null;

  const uaTail = diag.ua.length > 60 ? '…' + diag.ua.slice(-60) : diag.ua;

  return (
    <div
      className="vl-debug-panel"
      role="region"
      aria-label="Audio diagnostic panel"
    >
      <div className="vl-debug-header">
        <span className="vl-debug-title">🎧 Audio Debug</span>
        <button
          type="button"
          className="vl-debug-close"
          onClick={() => setHidden(true)}
          aria-label="Close debug panel"
        >
          ×
        </button>
      </div>
      <dl className="vl-debug-state">
        <DebugRow
          label="audioSession API"
          value={String(diag.hasAudioSessionApi)}
          ok={diag.hasAudioSessionApi}
        />
        <DebugRow
          label="audioSession.type"
          value={diag.audioSessionType ?? '(undefined)'}
          ok={diag.audioSessionType === 'playback'}
        />
        <DebugRow
          label="ctx.state"
          value={diag.contextState ?? '(none)'}
          ok={diag.contextState === 'running'}
        />
        <DebugRow
          label="ctx.sampleRate"
          value={diag.sampleRate ? `${diag.sampleRate} Hz` : '(none)'}
          ok={!!diag.sampleRate}
        />
        <DebugRow
          label="pianoReady"
          value={String(diag.pianoReady)}
          ok={diag.pianoReady}
        />
        <DebugRow
          label="toneStarted"
          value={String(diag.toneStarted)}
          ok={diag.toneStarted}
        />
        <DebugRow
          label="primer"
          value={diag.primerStatus}
          ok={
            diag.primerStatus === 'success' || diag.primerStatus === 'skipped'
          }
        />
        <DebugRow label="UA tail" value={uaTail} ok mono />
      </dl>

      <div className="vl-debug-log-label">Recent events ({diag.log.length})</div>
      <ol className="vl-debug-log">
        {diag.log.length === 0 ? (
          <li className="vl-debug-log-empty">
            (まだ何もイベントがありません — 再生ボタンを押してください)
          </li>
        ) : (
          diag.log
            .slice()
            .reverse()
            .map((entry, idx) => (
              <li
                key={`${entry.t}-${idx}`}
                className={
                  'vl-debug-log-item ' + (entry.ok ? 'ok' : 'fail')
                }
              >
                <span className="vl-debug-log-event">
                  {entry.ok ? '✓' : '✗'} {entry.event}
                </span>
                {entry.detail ? (
                  <span className="vl-debug-log-detail"> — {entry.detail}</span>
                ) : null}
              </li>
            ))
        )}
      </ol>
    </div>
  );
}

function DebugRow({
  label,
  value,
  ok,
  mono,
}: {
  label: string;
  value: string;
  ok: boolean;
  mono?: boolean;
}) {
  return (
    <>
      <dt className="vl-debug-key">{label}</dt>
      <dd
        className={
          'vl-debug-val ' +
          (ok ? 'ok' : 'warn') +
          (mono ? ' mono' : '')
        }
      >
        {value}
      </dd>
    </>
  );
}
