// Inversion Lab — chord parsing, inversion generation, and voice-leading.
//
// Triads only for now; the data model is shaped so 7th chords can be
// added later by extending `intervalsFor` with a 4th interval.

export type ChordQuality = 'major' | 'minor';

export type Chord = {
  root: string;          // 'C', 'F#', 'Eb', etc. — sharp or flat spelling preserved
  quality: ChordQuality;
  raw: string;           // original token for display
};

export type Voicing = {
  midis: number[];       // ascending
  inversion: number;     // 0 = root, 1 = 1st inv, 2 = 2nd inv
  chord: Chord;
};

const PC_FROM_NAME: Record<string, number> = {
  C: 0, 'C#': 1, Db: 1, D: 2, 'D#': 3, Eb: 3, E: 4,
  F: 5, 'F#': 6, Gb: 6, G: 7, 'G#': 8, Ab: 8, A: 9,
  'A#': 10, Bb: 10, B: 11,
};

const SHARP_NAMES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

export function midiToNoteName(midi: number): string {
  const oct = Math.floor(midi / 12) - 1;
  const pc = ((midi % 12) + 12) % 12;
  return SHARP_NAMES[pc] + oct;
}

function intervalsFor(quality: ChordQuality): number[] {
  return quality === 'major' ? [0, 4, 7] : [0, 3, 7];
}

// Degree label per chord-tone position (root, 3rd, 5th). For triads only.
export function degreeLabels(quality: ChordQuality): string[] {
  return quality === 'major' ? ['R', '3', '5'] : ['R', '♭3', '5'];
}

export function inversionLabel(inv: number): string {
  if (inv === 0) return 'Root';
  if (inv === 1) return '1st inv';
  if (inv === 2) return '2nd inv';
  return `${inv}th inv`;
}

// Parse one chord token. Accepts "C", "Cm", "F#m", "Bb", "Ebm", with
// optional whitespace and unicode accidentals (♯/♭).
export function parseChord(token: string): Chord | null {
  const cleaned = token
    .trim()
    .replace(/♯/g, '#')
    .replace(/♭/g, 'b');
  if (!cleaned) return null;
  const m = cleaned.match(/^([A-Ga-g])([#b]?)(.*)$/);
  if (!m) return null;
  const letter = m[1].toUpperCase();
  const acc = m[2] ?? '';
  const rest = (m[3] ?? '').trim().toLowerCase();
  const root = letter + acc;
  if (!(root in PC_FROM_NAME)) return null;

  // "", "maj", "M" → major; "m", "min", "minor", "-" → minor.
  // Unknown suffixes default to major rather than rejecting, so "C7"
  // shows as a C major triad — keeps the lab forgiving while triads
  // are the only supported quality.
  let quality: ChordQuality = 'major';
  if (/^(m|min|minor|-)\b/.test(rest)) quality = 'minor';
  return { root, quality, raw: token.trim() };
}

// Split a free-text progression. Accepts " - ", "-", "—", "|", "," and
// runs of whitespace as separators.
export function parseProgression(text: string): Chord[] {
  return text
    .split(/[-—|,/\n]+|\s{2,}/)
    .map((t) => t.trim())
    .filter(Boolean)
    .map(parseChord)
    .filter((c): c is Chord => c !== null);
}

// All inversions of `chord` as MIDI numbers, root inversion built from
// the lowest member ascending.
function invertedMidis(chord: Chord, baseOct: number, inversion: number): number[] {
  const rootPc = PC_FROM_NAME[chord.root];
  const intervals = intervalsFor(chord.quality);
  // Build the rotated interval list so the chosen chord tone is in the bass.
  const rotated = [
    ...intervals.slice(inversion),
    ...intervals.slice(0, inversion).map((iv) => iv + 12),
  ];
  const baseMidi = (baseOct + 1) * 12 + rootPc; // C4 = 60 → octave 4
  const bassMidi = baseMidi + rotated[0];
  return rotated.map((iv) => bassMidi + (iv - rotated[0]));
}

// Generate candidate voicings across a range of octaves for each
// inversion. Bass kept within MIDI 36..72 (C2..C5) so we don't drift
// off the keyboard.
function candidateVoicings(chord: Chord): Voicing[] {
  const candidates: Voicing[] = [];
  for (let inv = 0; inv < 3; inv++) {
    for (let oct = 2; oct <= 5; oct++) {
      const midis = invertedMidis(chord, oct, inv);
      if (midis[0] < 36 || midis[midis.length - 1] > 84) continue;
      candidates.push({ midis, inversion: inv, chord });
    }
  }
  return candidates;
}

// Sum of |a_i - b_i| after sorting both. Optimal 1D assignment for two
// equal-size sets of pitches — gives the smoothest voice leading for
// triads.
function voiceLeadingDistance(prev: number[], next: number[]): number {
  const a = [...prev].sort((x, y) => x - y);
  const b = [...next].sort((x, y) => x - y);
  let sum = 0;
  for (let i = 0; i < a.length; i++) sum += Math.abs(a[i] - b[i]);
  return sum;
}

// Tie-breakers when total movement is equal: prefer the candidate with
// more common notes to the previous voicing, then the one whose top
// note is closest to the previous top note (keeps the melodic line
// stable rather than drifting between octaves).
function preservedCount(prev: number[], next: number[]): number {
  const prevSet = new Set(prev);
  let n = 0;
  for (const m of next) if (prevSet.has(m)) n++;
  return n;
}

// Voicing of `chord` anchored around C4 at the requested inversion.
// Used as the entry point of the progression — the user picks 0/1/2
// and every subsequent chord is voice-led from there.
export function startingVoicing(chord: Chord, inversion: number = 0): Voicing {
  const safeInv = Math.max(0, Math.min(2, inversion));
  return { midis: invertedMidis(chord, 4, safeInv), inversion: safeInv, chord };
}

// Pick the candidate voicing of `chord` that voice-leads best from
// `prev`. The first chord of a progression is rendered in root
// position; from then on this function does the work.
export function pickBestVoicing(prev: Voicing, chord: Chord): Voicing {
  const candidates = candidateVoicings(chord);
  let best = candidates[0];
  let bestScore = Infinity;
  let bestCommon = -1;
  let bestTopDelta = Infinity;
  const prevTop = Math.max(...prev.midis);
  for (const c of candidates) {
    const d = voiceLeadingDistance(prev.midis, c.midis);
    const common = preservedCount(prev.midis, c.midis);
    const topDelta = Math.abs(Math.max(...c.midis) - prevTop);
    if (
      d < bestScore ||
      (d === bestScore && common > bestCommon) ||
      (d === bestScore && common === bestCommon && topDelta < bestTopDelta)
    ) {
      best = c;
      bestScore = d;
      bestCommon = common;
      bestTopDelta = topDelta;
    }
  }
  return best;
}

// Compute the full sequence of voicings for a progression, applying the
// voice-leading rule from the second chord onward. `startingInversion`
// (0/1/2) controls which inversion the first chord uses — every later
// chord is then derived by minimizing movement from its predecessor,
// so changing the starting inversion ripples through the whole
// progression.
export function buildVoicings(
  chords: Chord[],
  startingInversion: number = 0
): Voicing[] {
  if (chords.length === 0) return [];
  const out: Voicing[] = [startingVoicing(chords[0], startingInversion)];
  for (let i = 1; i < chords.length; i++) {
    out.push(pickBestVoicing(out[i - 1], chords[i]));
  }
  return out;
}

// Match each MIDI in `voicing` to its degree label (R/3/5 or R/♭3/5).
// Sort by MIDI ascending so the keyboard renders bass→top consistently.
export function annotateVoicing(voicing: Voicing): { midi: number; degree: string }[] {
  const rootPc = PC_FROM_NAME[voicing.chord.root];
  const intervals = intervalsFor(voicing.chord.quality);
  const labels = degreeLabels(voicing.chord.quality);
  const pcToLabel = new Map<number, string>();
  intervals.forEach((iv, idx) => pcToLabel.set((rootPc + iv) % 12, labels[idx]));
  return [...voicing.midis]
    .sort((a, b) => a - b)
    .map((midi) => ({ midi, degree: pcToLabel.get(((midi % 12) + 12) % 12) ?? '' }));
}

// Pretty chord symbol for display: root + 'm' for minor, with sharps
// and flats rendered as ♯/♭.
export function chordSymbol(chord: Chord): string {
  const pretty = chord.root.replace('#', '♯').replace('b', '♭');
  return pretty + (chord.quality === 'minor' ? 'm' : '');
}

// Compare two voicings to find the common (preserved) MIDI notes.
export function commonMidis(prev: Voicing | null, curr: Voicing): Set<number> {
  if (!prev) return new Set();
  const prevSet = new Set(prev.midis);
  const result = new Set<number>();
  for (const m of curr.midis) if (prevSet.has(m)) result.add(m);
  return result;
}
