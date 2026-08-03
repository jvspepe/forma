import { SquareIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';

export function AuthSocialProviders() {
  return (
    <div className="flex items-center gap-2">
      <Button
        type="button"
        size="sm"
        variant="outline"
      >
        <SquareIcon data-icon="inline-start" /> Google
      </Button>
      <Button
        type="button"
        size="sm"
        variant="outline"
      >
        <SquareIcon data-icon="inline-start" /> Facebook
      </Button>
      <Button
        type="button"
        size="sm"
        variant="outline"
      >
        <SquareIcon data-icon="inline-start" /> Apple
      </Button>
    </div>
  );
}
