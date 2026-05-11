import PracticeLabClient from './PracticeLabClient';
import { PRESETS, DEFAULT_PRESET_ID } from './data/presets';

export default function PracticeLabPage({
  searchParams,
}: {
  searchParams: { p?: string };
}) {
  const requested = searchParams.p;
  const initialPresetId =
    requested && PRESETS.some((p) => p.id === requested)
      ? requested
      : DEFAULT_PRESET_ID;
  return <PracticeLabClient initialPresetId={initialPresetId} />;
}
