import { cn } from '@/lib/utils';

interface BadgeProps {
  variant?: 'default' | 'subtle' | 'outline';
  className?: string;
  children: React.ReactNode;
}

export function Badge({ variant = 'default', className, children }: BadgeProps) {
  const variants = {
    default: 'bg-[#1A1A1A] text-[#FAFAF8]',
    subtle: 'bg-[#1A1A1A]/5 text-[#4A4A4A]',
    outline: 'border border-[#1A1A1A]/20 text-[#4A4A4A]',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center px-2 py-0.5 text-xs font-sans tracking-wide',
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
