import VoicingLabClient from './VoicingLabClient';
import { PROGRESSIONS, DEFAULT_PROGRESSION_ID } from './data';
import { KEY_ORDER } from '@/lib/transpose';

// Reading searchParams here makes the route Dynamically rendered, which is
// what we want: SSR HTML reflects ?p=...&type=...&key=... on first paint
// instead of bailing out to a client-only Suspense fallback.
//
// `type` and `key` are only honored when the chosen progression actually
// supports them; otherwise they fall back to the per-progression defaults.
export default function VoicingLabPage({
  searchParams,
}: {
  searchParams: { p?: string; type?: string; key?: string };
}) {
  const requested = searchParams.p;
  const initialProgressionId =
    requested && PROGRESSIONS[requested]
      ? requested
      : DEFAULT_PROGRESSION_ID;
  const prog = PROGRESSIONS[initialProgressionId];

  const wantsType = searchParams.type;
  const initialVariantType: 'a' | 'b' =
    prog.displayMode === 'chords-row' &&
    !!prog.hasVariants &&
    (wantsType === 'a' || wantsType === 'b')
      ? wantsType
      : 'a';

  const wantsKey = searchParams.key;
  const matchedKey = wantsKey
    ? KEY_ORDER.find((k) => k.toLowerCase() === wantsKey.toLowerCase())
    : undefined;
  const initialKey =
    prog.displayMode === 'chords-row' && !!prog.supportsAllKeys
      ? matchedKey ?? prog.baseKey ?? 'C'
      : prog.baseKey ?? 'C';

  return (
    <VoicingLabClient
      initialProgressionId={initialProgressionId}
      initialVariantType={initialVariantType}
      initialKey={initialKey}
    />
  );
}
