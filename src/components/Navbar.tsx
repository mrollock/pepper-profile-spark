import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

const NAV_LINKS = [
  { href: '#framework', label: 'Framework' },
  { href: '#speaking', label: 'Speaking' },
  { href: '#book', label: 'Book' },
  { href: '#roots', label: 'Resources' },
  { href: '#about', label: 'About' },
  { href: '#connect', label: 'Connect' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMobile = () => {
    setMobileOpen(false);
    document.body.style.overflow = '';
  };

  const toggleMobile = () => {
    setMobileOpen(prev => {
      document.body.style.overflow = prev ? '' : 'hidden';
      return !prev;
    });
  };

  return (
    <>
      <a
        href="#main"
        className="absolute -top-full left-4 z-[9999] rounded-b-md bg-gold px-4 py-2 font-semibold text-dark focus:top-0"
      >
        Skip to content
      </a>

      <nav
        className={cn(
          'fixed top-0 left-0 right-0 z-[1000] flex h-[var(--nav-height)] items-center justify-between px-[clamp(1rem,3vw,2.5rem)] transition-all duration-400',
          scrolled
            ? 'bg-cream shadow-[0_1px_12px_rgba(14,12,7,0.08)]'
            : 'bg-transparent'
        )}
        role="navigation"
        aria-label="Main navigation"
      >
        <a
          href="#"
          className={cn(
            'font-display text-[1.1rem] font-bold transition-colors duration-400',
            scrolled ? 'text-text-body' : 'text-cream'
          )}
        >
          The Pepper Sauce Principle
        </a>

        <ul className="hidden items-center gap-7 lg:flex" style={{ listStyle: 'none' }}>
          {NAV_LINKS.map(link => (
            <li key={link.href}>
              <a
                href={link.href}
                className={cn(
                  'text-[0.88rem] font-medium tracking-wide transition-colors',
                  scrolled
                    ? 'text-text-light hover:text-gold'
                    : 'text-cream-soft hover:text-gold-light'
                )}
              >
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="#quiz"
              className="rounded-md bg-gold px-5 py-2.5 text-[0.85rem] font-semibold tracking-wide text-dark transition-all hover:bg-gold-light hover:-translate-y-px"
            >
              Take the Quiz
            </a>
          </li>
        </ul>

        <button
          className={cn(
            'relative z-[1010] block h-6 w-[30px] cursor-pointer border-none bg-transparent lg:hidden'
          )}
          onClick={toggleMobile}
          aria-label="Toggle navigation"
          aria-expanded={mobileOpen}
        >
          <span
            className={cn(
              'absolute left-0 block h-[2.5px] w-full rounded-sm transition-all duration-300',
              mobileOpen
                ? 'top-[10px] rotate-45 bg-cream'
                : scrolled
                  ? 'top-0 bg-text-body'
                  : 'top-0 bg-cream'
            )}
          />
          <span
            className={cn(
              'absolute left-0 top-[10px] block h-[2.5px] w-full rounded-sm transition-all duration-300',
              mobileOpen ? 'opacity-0' : '',
              scrolled ? 'bg-text-body' : 'bg-cream'
            )}
          />
          <span
            className={cn(
              'absolute left-0 block h-[2.5px] w-full rounded-sm transition-all duration-300',
              mobileOpen
                ? 'top-[10px] -rotate-45 bg-cream'
                : scrolled
                  ? 'top-5 bg-text-body'
                  : 'top-5 bg-cream'
            )}
          />
        </button>
      </nav>

      {/* Mobile overlay */}
      <div
        className={cn(
          'fixed inset-0 z-[1005] flex flex-col items-center justify-center gap-8 bg-dark transition-opacity duration-300',
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        )}
        role="dialog"
        aria-label="Mobile navigation"
      >
        {NAV_LINKS.map(link => (
          <a
            key={link.href}
            href={link.href}
            onClick={closeMobile}
            className="font-display text-[1.6rem] text-cream-soft transition-colors hover:text-gold-light"
          >
            {link.label}
          </a>
        ))}
        <a
          href="#quiz"
          onClick={closeMobile}
          className="mt-4 rounded-md bg-gold px-8 py-3 font-body text-base font-semibold text-dark transition-all hover:bg-gold-light"
        >
          Take the Quiz
        </a>
      </div>
    </>
  );
}
