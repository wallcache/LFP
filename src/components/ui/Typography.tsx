import { cn } from '@/lib/utils';

interface HeadingProps {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
  className?: string;
  children: React.ReactNode;
}

const headingSizes = {
  xs: 'text-base md:text-lg',
  sm: 'text-lg md:text-xl',
  md: 'text-xl md:text-2xl',
  lg: 'text-2xl md:text-3xl',
  xl: 'text-3xl md:text-4xl',
  '2xl': 'text-4xl md:text-5xl',
  '3xl': 'text-5xl md:text-6xl lg:text-7xl',
};

export function Heading({
  as: Component = 'h2',
  size = 'lg',
  className,
  children,
}: HeadingProps) {
  return (
    <Component
      className={cn(
        'font-serif font-medium leading-tight tracking-tight text-[#1A1A1A]',
        headingSizes[size],
        className
      )}
    >
      {children}
    </Component>
  );
}

interface TextProps {
  as?: 'p' | 'span' | 'div';
  size?: 'sm' | 'base' | 'lg';
  muted?: boolean;
  className?: string;
  children: React.ReactNode;
}

const textSizes = {
  sm: 'text-sm',
  base: 'text-base',
  lg: 'text-lg',
};

export function Text({
  as: Component = 'p',
  size = 'base',
  muted = false,
  className,
  children,
}: TextProps) {
  return (
    <Component
      className={cn(
        'font-sans leading-relaxed',
        textSizes[size],
        muted ? 'text-[#8A8A8A]' : 'text-[#4A4A4A]',
        className
      )}
    >
      {children}
    </Component>
  );
}

interface ProseProps {
  className?: string;
  children: React.ReactNode;
}

export function Prose({ className, children }: ProseProps) {
  return (
    <div
      className={cn(
        'prose prose-slate max-w-none',
        'prose-headings:font-serif prose-headings:font-medium prose-headings:tracking-tight',
        'prose-p:text-[#4A4A4A] prose-p:leading-relaxed',
        'prose-a:text-[#3B78C6] prose-a:no-underline hover:prose-a:underline',
        'prose-strong:font-medium prose-strong:text-[#1A1A1A]',
        className
      )}
    >
      {children}
    </div>
  );
}
