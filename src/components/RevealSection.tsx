import { forwardRef } from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { cn } from '@/lib/utils';

interface RevealSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export const RevealSection = forwardRef<HTMLDivElement, RevealSectionProps>(
  ({ children, className, delay = 0 }, _forwardedRef) => {
    const { ref, visible } = useScrollReveal();

    return (
      <div
        ref={ref}
        className={cn(
          'transition-all duration-[800ms] ease-out',
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-7',
          className
        )}
        style={{ transitionDelay: `${delay}ms` }}
      >
        {children}
      </div>
    );
  }
);

RevealSection.displayName = 'RevealSection';
