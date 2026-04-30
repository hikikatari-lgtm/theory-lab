import VoicingLabClient from './VoicingLabClient';
import { PROGRESSIONS, DEFAULT_PROGRESSION_ID } from './data';

// Reading searchParams here makes the route Dynamically rendered, which is
// what we want: SSR HTML reflects ?p=... on first paint instead of bailing
// out to a client-only Suspense fallback.
export default function VoicingLabPage({
  searchParams,
}: {
  searchParams: { p?: string };
}) {
  const requested = searchParams.p;
  const initialProgressionId =
    requested && PROGRESSIONS[requested]
      ? requested
      : DEFAULT_PROGRESSION_ID;
  return <VoicingLabClient initialProgressionId={initialProgressionId} />;
}
