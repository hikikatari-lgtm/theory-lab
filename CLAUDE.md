# Theory Lab — design notes for AI assistants

Next.js 14 (App Router) site of small interactive music-theory labs.

- `app/labs/upper-triad` — Lab 01.
- `app/labs/voicing-lab` — Lab 02. The most actively-developed lab.

Audio is `lib/audio.ts` (Tone.js Salamander piano sampler). Note-name
helpers (incl. `normalizeNote`: `Eb4 → D#4`) live in `lib/chord-theory.ts`.

## Voicing Lab

`/labs/voicing-lab` shows piano voicings for chord progressions, with a
chord row, a dynamic-range keyboard, and a Walk Through player.

### Two progression display modes

| `displayMode` | Used by | Layout |
|---|---|---|
| `chords-row` | 251, Minor Turnaround | one card per chord |
| `bars-grid` | F Blues Rootless | bars × chords-per-bar |

Both are flattened by `data/index.ts:buildSequence` into a `SequenceItem[]`
that drives selection, prev-chord lookup (for common-note highlighting),
and Walk Through.

### Progression categories — 構造系 vs 楽曲系

`PROGRESSION_LIST` entries carry a `group` field:

- **構造系** (structural): teaching patterns. The 251 progression. These
  are presented in a base key but transposable to any of 12 keys, often
  with multiple voicing variants.
- **楽曲系** (song-style): full pieces in a fixed key. Minor Turnaround,
  F Blues Rootless. No variants, no key cycling.

The dropdown groups them via `<optgroup>` (`ProgressionSelector.tsx`).

### 251 Voicing — variants and 12-key transposition

`data/two-five-one.ts` defines the IIm7-V7-IM7 progression in **C** with
Type A (basic) and Type B (inverted) voicings. Each variant is a full
`ChordsRowChord[]`; both variants share **Roman-numeral-based chord IDs**
(`iim7`, `v7`, `imaj7`) so selection persists across A↔B and across keys.

`ChordsRowProgression` carries optional fields used only by structural
progressions:

- `hasVariants` + `variants: { a, b }` — opt into the Type A/B toggle
- `supportsAllKeys` + `baseKey` — opt into the 12-key switcher

The runtime view derives from these via the `viewProgression` memo in
`VoicingLabClient.tsx`:

1. Pick `progression.variants[variantType]` if `hasVariants`.
2. If `supportsAllKeys` and `currentKey !== baseKey`,
   call `transposeChords(chords, baseKey, currentKey)`.
3. Spread into `{ ...progression, chords: derived }`.

Bars-grid progressions pass through unchanged.

### Transposition — `lib/transpose.ts`

- `KEY_ORDER` = `['C','Db','D','Eb','E','F','Gb','G','Ab','A','Bb','B']`
  — semitone-ascending; key cycling wraps B → C.
- `KEY_NOTATION` decides spelling per key: flats for C, Db, Eb, F, Gb,
  Ab, Bb; sharps for D, E, G, A, B.
- Transposition is **always upward** by `(toPc - fromPc + 12) % 12`
  semitones, with `Math.floor((pc + semi) / 12)` octave carry. High keys
  (A/Bb/B) push notes up an octave; the `VoicingKeyboard` auto-range
  absorbs this.
- `transposeChord<T>` is generic — preserves `id`, `roman`,
  `degreesLabel`, etc. Only `symbol`, `lh`, and `rh[].note` are
  rewritten. Roman numerals and degree labels never change.

### Two-layer note-name convention

This is load-bearing. Don't collapse the layers.

- **Display layer**: `voicing.lh` / `voicing.rh[].note` use ASCII flats
  (`'Eb4'`, `'Ab5'`) chosen by `KEY_NOTATION`. Chord symbols use Unicode
  (`'B♭7'`, `'C♯m7'`) for visual polish, matching pre-existing data.
  The keyboard's per-key labels go through `VoicingKeyboard.rhMap`'s
  `displayName` field (the original from `voicing.rh`), then ASCII →
  Unicode for rendering.
- **Audio/keyboard-matching layer**: notes pass through `normalizeNote`
  (`Eb → D#`) before reaching Tone.Sampler or being used as
  `data-note` map keys. The keyboard generates white/black keys from a
  sharp-only `NOTE_ORDER`, so `rhMap` is keyed by the normalized form
  to line up with iteration.

### URL is the single source of truth

`progressionId`, `variantType`, `currentKey` are all URL-driven.

Format: `?p=<id>&type=<a|b>&key=<key>`. Defaults are omitted —
`?p=two-five-one` is Type A in C. Keys are lowercase in URLs
(`&key=eb`); parsed case-insensitively.

`page.tsx` (server) validates `searchParams` and seeds initial props.
`VoicingLabClient.tsx` has one URL→state effect with **a single
dep on `searchParams`** that reconciles state on every URL change
(`router.push` from a handler, or browser back/forward). Handlers
(`handleProgressionChange`, `handleVariantChange`, `cycleKey`) push the
URL only — they never call `setProgressionId`/`setVariantType`/
`setCurrentKey` directly. This avoids state↔URL races.

The other reset behaviors fall out for free:

- Switching progression drops `type`/`key` from the URL → URL→state
  effect resets variant to `a` and key to `baseKey`.
- A↔B preserves `key` (variant change doesn't touch the `key` param).
- Cycling keys preserves `type`.
- Browser back/forward replays history: cycling C→Db→D and pressing
  back twice lands on C.

### Selection persistence rules

`selectedItemId` is local state, not URL. The sequence-change effect
(`useEffect ... [sequence, stopWalk]`) keeps it stable when possible:

- A↔B variants share IDs → selection preserved.
- Key cycling preserves IDs → selection preserved.
- Progression switch → IDs differ → reset to `sequence[0]`.

Walk Through is also stopped on every sequence change.
