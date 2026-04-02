'use client';

import { useEffect, useState } from 'react';
import { ArrowUp, Check, Copy, Share2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface Heading {
  id: string;
  title: string;
  level: 1 | 2 | 3;
}

interface PostQuickActionsProps {
  headings: Heading[];
  readMinutes: number;
  title: string;
  url: string;
}

export function PostQuickActions({
  headings,
  readMinutes,
  title,
  url,
}: PostQuickActionsProps) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [copied, setCopied] = useState(false);
  const [activeHeading, setActiveHeading] = useState<string>(headings[0]?.id ?? '');

  useEffect(() => {
    const handleScroll = () => {
      const article = document.querySelector('article');
      if (!article) return;

      const rect = article.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const progress = total <= 0 ? 100 : Math.min(100, Math.max(0, ((window.innerHeight - rect.top) / (rect.height || 1)) * 100));

      setScrollProgress(progress);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!headings.length) return;

    const elements = headings
      .map((heading) => document.getElementById(heading.id))
      .filter((element): element is HTMLElement => Boolean(element));

    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible[0]?.target.id) {
          setActiveHeading(visible[0].target.id);
        }
      },
      {
        rootMargin: '-20% 0px -60% 0px',
        threshold: 0.1,
      }
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [headings]);

  async function handleShare() {
    if (navigator.share) {
      try {
        await navigator.share({ title, url });
        return;
      } catch {
        // Ignore aborted shares and fall back to copy.
      }
    }

    await handleCopy();
  }

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <aside className="hidden xl:block xl:sticky xl:top-28">
      <div className="space-y-4">
        <section className="glass rounded-[1.75rem] border-white/5 p-5">
          <div className="space-y-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.24em] text-muted-foreground/60">Reading Progress</p>
                <h2 className="mt-1 text-lg font-bold text-foreground">{Math.round(scrollProgress)}% complete</h2>
              </div>
              <div className="rounded-2xl bg-primary/10 px-3 py-2 text-sm font-bold text-primary">
                {readMinutes} min
              </div>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-gradient-to-r from-primary to-white transition-[width] duration-300"
                style={{ width: `${scrollProgress}%` }}
              />
            </div>
          </div>
        </section>

        {headings.length > 0 && (
          <section className="glass rounded-[1.75rem] border-white/5 p-5">
            <div className="mb-4 flex items-center justify-between gap-2">
              <h2 className="text-sm font-black uppercase tracking-[0.24em] text-muted-foreground/70">On This Page</h2>
              <span className="text-xs font-medium text-muted-foreground">{headings.length}</span>
            </div>
            <nav className="flex flex-col gap-1.5">
              {headings.map((heading) => (
                <a
                  key={heading.id}
                  href={`#${heading.id}`}
                  className={cn(
                    'rounded-xl px-3 py-2 text-sm text-muted-foreground transition-all hover:bg-white/5 hover:text-foreground',
                    heading.level === 1 && 'font-semibold text-foreground/90',
                    heading.level === 3 && 'pl-6 text-[13px]',
                    activeHeading === heading.id && 'bg-primary/10 text-primary'
                  )}
                >
                  {heading.title}
                </a>
              ))}
            </nav>
          </section>
        )}

        <section className="glass rounded-[1.75rem] border-white/5 p-5">
          <div className="mb-4">
            <h2 className="text-sm font-black uppercase tracking-[0.24em] text-muted-foreground/70">Quick Actions</h2>
          </div>
          <div className="grid gap-2">
            <Button onClick={handleShare} className="h-11 justify-start rounded-xl font-semibold">
              <Share2 className="h-4 w-4" />
              Share article
            </Button>
            <Button
              variant="outline"
              onClick={handleCopy}
              className="h-11 justify-start rounded-xl border-white/10 bg-white/5 font-semibold hover:bg-white/10"
            >
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              {copied ? 'Link copied' : 'Copy link'}
            </Button>
            <Button
              variant="ghost"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="h-11 justify-start rounded-xl font-semibold"
            >
              <ArrowUp className="h-4 w-4" />
              Back to top
            </Button>
          </div>
        </section>
      </div>
    </aside>
  );
}
