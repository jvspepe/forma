import { queryOptions } from '@tanstack/react-query';

import { getSession } from '@/features/auth/functions';

export function getAuthQueryOptions() {
  return queryOptions({
    queryFn: async () => await getSession(),
    queryKey: ['auth'],
  });
}
