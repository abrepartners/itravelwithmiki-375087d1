import { cn } from '@/lib/utils';

interface UrgencyBadgeProps {
  message: string;
  variant?: 'default' | 'spots' | 'discount';
  className?: string;
}

const UrgencyBadge = ({ message, variant = 'default', className }: UrgencyBadgeProps) => {
  const variants = {
    default: 'bg-accent text-accent-foreground',
    spots: 'bg-accent text-accent-foreground',
    discount: 'bg-primary text-primary-foreground',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold',
        'animate-pulse',
        variants[variant],
        className
      )}
    >
      {message}
    </span>
  );
};

export default UrgencyBadge;
