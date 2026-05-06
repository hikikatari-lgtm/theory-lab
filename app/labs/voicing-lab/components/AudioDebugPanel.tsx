'use client';

import { useEffect, useState, type ReactNode } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  getAudioDiagnostics,
  subscribeAudioDiagnostics,
  type AudioDiagnostics,
} from '@/lib/audio';

// On-screen audio diagnostic panel for iOS debugging without Mac
// remote inspector. Activated via `?debug=1` URL param.
//
// Layout: 3 collapsible sections + close button.
//   1. State            — open by default. Audio session, Tone
//                         context, pipeline flags, primer status, UA.
//   2. Video routing    — closed by default. <video> element health
//                         for the MediaStream-based iOS unmute fix
//                         (PR #32 onward). Tap header to expand.
//   3. Recent events    — open by default. Step-by-step ✓/✗ log of
//                         the audio path, capped at 16 entries.
//
// Lives until the user dismisses it with × (per-page-load state); a
// reload re-shows it as long as ?debug=1 is still in the URL.
export default function AudioDebugPanel() {
  const searchParams = useSearchParams();
  const enabled = searchParams.get('debug') === '1';

  const [hidden, setHidden] = useState(false);
  const [diag, setDiag] = useState<AudioDiagnostics | null>(null);

  useEffect(() => {
    if (!enabled) return;
    setDiag(getAudioDiagnostics());
    const unsubscribe = subscribeAudioDiagnostics(() => {
      setDiag(getAudioDiagnostics());
    });
    return unsubscribe;
  }, [enabled]);

  if (!enabled || hidden || !diag) return null;

  const uaTail = diag.ua.length > 60 ? '…' + diag.ua.slice(-60) : diag.ua;
  const v = diag.video;

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

      <CollapsibleSection title="State" defaultOpen>
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
              diag.primerStatus === 'success' ||
              diag.primerStatus === 'skipped'
            }
          />
          <DebugRow label="UA tail" value={uaTail} ok mono />
        </dl>
      </CollapsibleSection>

      <CollapsibleSection title="Video routing" defaultOpen={false}>
        {v ? (
          <dl className="vl-debug-state">
            <DebugRow
              label="attached"
              value={String(v.attached)}
              ok={v.attached}
            />
            <DebugRow
              label="muted"
              value={String(v.muted)}
              ok={v.muted === false}
            />
            <DebugRow
              label="paused"
              value={String(v.paused)}
              ok={v.paused === false}
            />
            <DebugRow
              label="readyState"
              value={`${v.readyState} (${readyStateName(v.readyState)})`}
              ok={v.readyState === 4}
            />
            <DebugRow
              label="srcObject"
              value={v.hasSrcObject ? 'MediaStream' : '(none)'}
              ok={v.hasSrcObject}
            />
          </dl>
        ) : (
          <div className="vl-debug-empty">
            (video routing not yet initialized — initPiano must run
            first)
          </div>
        )}
      </CollapsibleSection>

      <CollapsibleSection
        title={`Recent events (${diag.log.length})`}
        defaultOpen
      >
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
                    <span className="vl-debug-log-detail">
                      {' '}— {entry.detail}
                    </span>
                  ) : null}
                </li>
              ))
          )}
        </ol>
      </CollapsibleSection>
    </div>
  );
}

function readyStateName(state: number): string {
  // HTMLMediaElement readyState constants
  switch (state) {
    case 0:
      return 'HAVE_NOTHING';
    case 1:
      return 'HAVE_METADATA';
    case 2:
      return 'HAVE_CURRENT_DATA';
    case 3:
      return 'HAVE_FUTURE_DATA';
    case 4:
      return 'HAVE_ENOUGH_DATA';
    default:
      return '?';
  }
}

function CollapsibleSection({
  title,
  defaultOpen,
  children,
}: {
  title: string;
  defaultOpen: boolean;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="vl-debug-section">
      <button
        type="button"
        className="vl-debug-section-header"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <span className="vl-debug-section-twisty">{open ? '▼' : '▶'}</span>
        <span className="vl-debug-section-title">{title}</span>
      </button>
      {open ? (
        <div className="vl-debug-section-body">{children}</div>
      ) : null}
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
