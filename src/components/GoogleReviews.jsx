
'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { cn } from '@/lib/utils';

function getReviewText(review) {
  return review?.text?.text || review?.originalText?.text || 'Lielisks serviss un kvalitāte!';
}

function getRatingValue(review) {
  const rating = Number(review?.rating) || 0;
  return Math.max(0, Math.min(5, Math.round(rating)));
}

function getCopy(locale) {
  const copy = {
    lv: {
      eyebrow: 'Atsauksmes',
      title: 'Atsauksmes no klientiem, kas jau izvēlējušies mūsu risinājumus',
      subtitle: 'Īstas atsauksmes no klientiem, kas jau izvēlējušies mūsu risinājumus.',
      ratingLabel: 'Google vērtējums',
      viewAll: 'Skatīt visas Google atsauksmes',
      loading: 'Meklējam jaunākās atsauksmes...',
      previous: 'Iepriekšējā atsauksme',
      next: 'Nākamā atsauksme',
      empty: 'Atsauksmes šobrīd nav pieejamas.',
      counter: 'atsauksme',
      counterPlural: 'atsauksmes',
    },
    en: {
      eyebrow: 'Reviews',
      title: 'Real customer impressions after installation',
      subtitle: 'Genuine reviews from customers who have already chosen our solutions.',
      ratingLabel: 'Google rating',
      viewAll: 'View all Google reviews',
      loading: 'Searching for the latest reviews...',
      previous: 'Previous review',
      next: 'Next review',
      empty: 'No reviews are available right now.',
      counter: 'review',
      counterPlural: 'reviews',
    },
    lt: {
      eyebrow: 'Atsiliepimai',
      title: 'Tikri klientų įspūdžiai po montavimo',
      subtitle: 'Tikri atsiliepimai iš klientų, kurie jau pasirinko mūsų sprendimus.',
      ratingLabel: 'Google įvertinimas',
      viewAll: 'Peržiūrėti visus Google atsiliepimus',
      loading: 'Ieškome naujausių atsiliepimų...',
      previous: 'Ankstesnis atsiliepimas',
      next: 'Kitas atsiliepimas',
      empty: 'Šiuo metu atsiliepimų nėra.',
      counter: 'atsiliepimas',
      counterPlural: 'atsiliepimai',
    },
  };

  return copy[locale] ?? copy.lv;
}

function ReviewStars({ rating }) {
  return (
    <div className="flex items-center gap-1" aria-hidden="true">
      {Array.from({ length: 5 }).map((_, index) => (
        <Star
          key={`star-${index}`}
          size={14}
          className={index < rating ? 'fill-amber-400 text-amber-400' : 'text-line'}
        />
      ))}
    </div>
  );
}

function ReviewAvatar({ name, photoUri }) {
  if (photoUri) {
    return (
      <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full border border-line/60 bg-[--color-soft]">
        <Image src={photoUri} alt={name} fill sizes="48px" className="object-cover" />
      </div>
    );
  }

  return (
    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-line/60 bg-[--color-soft] text-sm font-semibold text-muted">
      {(name || '?').slice(0, 1).toUpperCase()}
    </div>
  );
}

function ReviewCard({ review }) {
  const rating = getRatingValue(review);
  const name = review?.authorAttribution?.displayName || 'Klients';
  const photoUri = review?.authorAttribution?.photoUri;
  const published = review?.relativePublishTimeDescription || '';

  return (
    <div className="flex min-h-[340px] h-full flex-col justify-between rounded-[28px] border border-line bg-white p-7 shadow-sm transition-[box-shadow,transform,border-color] duration-300 hover:-translate-y-0.5 hover:border-[color-mix(in_oklch,var(--border),var(--foreground)_12%)] hover:shadow-premium">
      <div>
        <div className="mb-4 flex items-center justify-between">
          <div className="flex text-[var(--color-accent)]">
            {Array.from({ length: rating }).map((_, index) => (
              <Star key={`star-${index}`} size={16} className="fill-current" />
            ))}
          </div>
          <span className="rounded-full bg-[var(--color-accent)]/8 px-2.5 py-1 text-xs font-semibold text-[var(--color-accent)]">
            {rating}.0
          </span>
        </div>

        <p className="mb-6 text-[15px] italic leading-7 text-muted">
          &ldquo;{getReviewText(review)}&rdquo;
        </p>
      </div>

      <div className="flex items-center gap-3 border-t border-line pt-5">
        <ReviewAvatar name={name} photoUri={photoUri} />
        <div>
          <div className="text-sm font-semibold tracking-[-0.02em] text-ink">{name}</div>
          <span className="text-xs text-muted">{published || 'Google atsauksme'}</span>
        </div>
      </div>
    </div>
  );
}

export default function GoogleReviews({ locale = 'lv' } = {}) {
  const [data, setData] = useState({ reviews: [], averageRating: 5.0, totalCount: 0, googleReviewsUrl: '' });
  const [loading, setLoading] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [viewportRef, emblaApi] = useEmblaCarousel({ align: 'start', loop: true });
  const copy = getCopy(locale);
  const displayReviews = data.reviews.slice(0, 5);

  useEffect(() => {
    const controller = new AbortController();

    async function loadReviews() {
      try {
        const res = await fetch('/api/reviews', { signal: controller.signal });
        const resData = await res.json();

        if (resData && Array.isArray(resData.reviews)) {
          setData({
            reviews: resData.reviews,
            averageRating: Number(resData.averageRating) || 5.0,
            totalCount: Number(resData.totalCount) || 0,
            googleReviewsUrl: typeof resData.googleReviewsUrl === 'string' ? resData.googleReviewsUrl : '',
          });
        } else if (Array.isArray(resData)) {
          setData({
            reviews: resData,
            averageRating: 5.0,
            totalCount: resData.length,
            googleReviewsUrl: '',
          });
        }
      } catch (err) {
        if (err?.name !== 'AbortError') {
          console.error('Neizdevās ielādēt atsauksmes:', err);
        }
      } finally {
        setLoading(false);
      }
    }

    loadReviews();

    return () => {
      controller.abort();
    };
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const syncPreference = () => setPrefersReducedMotion(mediaQuery.matches);

    syncPreference();
    mediaQuery.addEventListener?.('change', syncPreference);

    return () => {
      mediaQuery.removeEventListener?.('change', syncPreference);
    };
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    const handleSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };

    handleSelect();
    emblaApi.on('select', handleSelect);
    emblaApi.on('reInit', handleSelect);

    return () => {
      emblaApi.off('select', handleSelect);
      emblaApi.off('reInit', handleSelect);
    };
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi || prefersReducedMotion || isHovering) return;

    const timer = window.setInterval(() => {
      emblaApi.scrollNext();
    }, 5200);

    return () => {
      window.clearInterval(timer);
    };
  }, [emblaApi, prefersReducedMotion, isHovering]);

  const scrollPrev = () => emblaApi?.scrollPrev();
  const scrollNext = () => emblaApi?.scrollNext();
  const scrollTo = (index) => emblaApi?.scrollTo(index);

  if (loading) {
    return <div className="py-10 text-center text-muted">{copy.loading}</div>;
  }

  const reviewsToShow = displayReviews;
  const totalCount = data.totalCount || reviewsToShow.length;
  const averageRating = data.averageRating || 5.0;
  const googleReviewsUrl = data.googleReviewsUrl;

  return (
    <section className="mx-auto max-w-[1320px] bg-white px-4 py-16">
      <div className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-[0.28em] text-muted">{copy.eyebrow}</span>
          <h2 className="mt-3 text-[clamp(2.25rem,3.6vw,4rem)] font-semibold leading-[0.98] tracking-[-0.05em] text-ink">{copy.title}</h2>
        </div>

        <div className="flex flex-col gap-3 sm:items-end">
          <div className="inline-flex items-center gap-3 rounded-full border border-line bg-white px-4 py-3 shadow-sm">
            <span className="h-2 w-2 shrink-0 animate-pulse rounded-full bg-[var(--color-accent)]" />
            <div className="min-w-0">
              <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-muted">
                {copy.ratingLabel}
              </div>
              <div className="mt-1 flex items-baseline gap-2 whitespace-nowrap text-sm text-muted">
                <strong className="text-2xl font-semibold tracking-[-0.03em] text-ink">
                  {Number(averageRating).toString().replace('.', ',')}
                </strong>
                <span>/ 5</span>
                <span className="text-muted">
                  ({totalCount} {totalCount === 1 ? copy.counter : copy.counterPlural})
                </span>
              </div>
            </div>
          </div>

          {googleReviewsUrl ? (
            <a
              href={googleReviewsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center justify-center rounded-full border border-[var(--color-accent)]/20 bg-[var(--color-accent)]/8 px-5 text-sm font-semibold text-[var(--color-accent)] transition-[background-color,transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:bg-[var(--color-accent)]/12 hover:shadow-premium sm:self-end"
            >
              {copy.viewAll}
            </a>
          ) : null}
        </div>
      </div>

      <div
        className="overflow-hidden"
        ref={viewportRef}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <div className="-ml-4 flex touch-pan-x">
          {reviewsToShow.map((review, index) => (
            <div
              key={review?.authorAttribution?.displayName || index}
              className="min-w-0 shrink-0 basis-[90%] pl-4 sm:basis-[70%] lg:basis-[34%] xl:basis-[30%]"
            >
              <ReviewCard review={review} />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-5 flex items-center justify-center gap-2">
        {reviewsToShow.map((review, index) => {
          const isActive = index === selectedIndex;

          return (
            <button
              key={`${review?.authorAttribution?.displayName || 'review'}-dot`}
              type="button"
              onClick={() => scrollTo(index)}
              aria-label={`${copy.eyebrow} ${index + 1}`}
              className={cn(
                'h-2 rounded-full transition-all duration-300',
                isActive ? 'w-8 bg-[var(--color-accent)]' : 'w-2 bg-line hover:bg-[var(--color-accent)]/40'
              )}
            />
          );
        })}
      </div>

      <div className="mt-4 flex justify-center sm:hidden">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={scrollPrev}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line/70 bg-white text-ink shadow-sm transition-[background-color,box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:bg-[--color-soft] hover:shadow-premium"
            aria-label={copy.previous}
          >
            <ChevronLeft size={18} />
          </button>
          <button
            type="button"
            onClick={scrollNext}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line/70 bg-white text-ink shadow-sm transition-[background-color,box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:bg-[--color-soft] hover:shadow-premium"
            aria-label={copy.next}
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {reviewsToShow.length === 0 ? <p className="mt-4 text-center text-sm text-muted">{copy.empty}</p> : null}
    </section>
  );
}
