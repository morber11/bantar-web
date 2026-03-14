import { fetchAllIcebreakers } from '../icebreakers/api';
import { fetchAllDebates } from '../debates/api';
import { fetchToplists } from '../toplists/api';
import { fetchMindReaderPrompts } from '../mindreader/api';
import { fetchAllSlop } from '../ai-mode/api';
import { writeCache } from '../../shared/offline/offlineCache';
import type { ListItem as IcebreakerItem } from '../icebreakers/types';
import type { DebateItem } from '../debates/types';
import type { SlopItem } from '../ai-mode/types';

export async function warmOfflineCache(): Promise<void> {
    await Promise.allSettled([
        fetchAllIcebreakers().then((data: IcebreakerItem[]) => writeCache('icebreakers', data)),
        fetchAllDebates().then((data: DebateItem[]) => writeCache('debates', data)),
        fetchToplists().then(data => writeCache('toplists', data)),
        fetchMindReaderPrompts().then(data => writeCache('mindreader', data)),
        fetchAllSlop().then((data: SlopItem[]) => writeCache('slop', data)),
    ]);
}
