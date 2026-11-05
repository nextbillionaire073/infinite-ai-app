import { cn } from '@/lib/utils';
import { Infinity as InfinityIcon } from 'lucide-react';

export function Logo({
  className,
  showWordmark = true,
  size = 'md',
}: {
  className?: string;
  showWordmark?: boolean;
  size?: 'sm' | 'md' | 'lg';
}) {
  const dim = size === 'sm' ? 'h-7 w-7' : size === 'lg' ? 'h-12 w-12' : 'h-9 w-9';
  const text =
    size === 'sm' ? 'text-base' : size === 'lg' ? 'text-2xl' : 'text-lg';
  return (
    <div className={cn('flex items-center gap-2.5', className)}>
      <div
        className={cn(
          'relative grid place-items-center rounded-xl bg-gradient-to-br from-cyan-400/20 to-cyan-600/10 ring-1 ring-cyan-400/40',
          dim
        )}
      >
        <InfinityIcon className="h-1/2 w-1/2 text-cyan-300 text-glow" strokeWidth={2.5} />
        <div className="absolute inset-0 rounded-xl ring-glow pointer-events-none" />
      </div>
      {showWordmark && (
        <div className={cn('font-display font-semibold tracking-tight', text)}>
          <span className="text-foreground">INFINITE</span>{' '}
          <span className="text-cyan-300 text-glow">AI</span>
        </div>
      )}
    </div>
  );
}
