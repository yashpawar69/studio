"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'; // Added Chevron icons
import { useState, useEffect, useCallback } from 'react';
import { cn } from '@/lib/utils';

interface BannerItem {
  id: string;
  imageUrl: string;
  altText: string;
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  dataAiHint: string;
}

const bannerItems: BannerItem[] = [
  {
    id: '1',
    imageUrl: '/clothes.jpg',
    altText: 'Stylish outfit collection',
    title: 'Find Your Perfect Outfit',
    description: 'Explore our latest collections and discover styles curated just for you.',
    buttonText: 'Shop Collection',
    buttonLink: '#products',
    dataAiHint: '',
  },
  {
    id: '2',
    imageUrl: 'https://placehold.co/1200x500.png',
    altText: 'New arrivals showcase',
    title: 'New Season Arrivals',
    description: 'Fresh looks for the new season. Update your wardrobe today!',
    buttonText: 'Discover New',
    buttonLink: '#products',
    dataAiHint: 'clothing models',
  },
  {
    id: '3',
    imageUrl: 'https://placehold.co/1200x500.png',
    altText: 'Sale promotion',
    title: 'Seasonal Sale Now On!',
    description: 'Get up to 50% off on selected items. Limited time only.',
    buttonText: 'Shop Sale',
    buttonLink: '#products', // Should ideally link to a sale page if available
    dataAiHint: 'sale fashion',
  },
];

export default function OutfitBanner() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  const nextSlideStable = useCallback(() => {
    setCurrentIndex(prevCurrentIndex => (prevCurrentIndex + 1) % bannerItems.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlideStable();
    }, 5000); // Change slide every 5 seconds
    return () => clearInterval(timer);
  }, [nextSlideStable]);

  return (
    <section className="relative w-full h-[400px] md:h-[500px] rounded-lg overflow-hidden shadow-lg mb-12">
      {bannerItems.map((item, index) => (
        <div
          key={item.id}
          className={cn(
            "absolute inset-0 transition-opacity duration-700 ease-in-out",
            currentIndex === index ? "opacity-100 z-[5]" : "opacity-0 z-[1]"
          )}
          aria-hidden={currentIndex !== index}
        >
          <Image
            src={item.imageUrl}
            alt={item.altText}
            layout="fill"
            objectFit="cover"
            className="brightness-75"
            data-ai-hint={item.dataAiHint}
            priority={index === 0} // Prioritize loading the first banner image
          />
          {/* Keying the inner div to re-trigger animations on its children */}
          <div
            key={`text-content-${item.id}-${currentIndex === index ? 'active' : 'inactive'}`}
            className={cn(
                "absolute inset-0 flex flex-col items-center justify-center text-center p-4 bg-black/30",
                 currentIndex === index ? "opacity-100" : "opacity-0 pointer-events-none" // Ensure only active text is interactive
            )}
          >
            <h2 className={cn(
              "font-headline text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4",
              currentIndex === index && "animation-soft-fade-in"
            )}>
              {item.title}
            </h2>
            <p className={cn(
              "text-lg md:text-xl text-neutral-200 mb-8 max-w-2xl",
              currentIndex === index && "animation-soft-fade-in"
              )} style={currentIndex === index ? { animationDelay: '0.2s' } : {}}>
              {item.description}
            </p>
            <Link href={item.buttonLink} passHref>
              <Button
                size="lg"
                className={cn(
                  "bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-8 py-6 rounded-md",
                  currentIndex === index && "animation-soft-fade-in"
                )}
                style={currentIndex === index ? { animationDelay: '0.4s' } : {}}
                tabIndex={currentIndex === index ? 0 : -1} // Make button non-tabbable if not active
              >
                {item.buttonText}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      ))}

      {/* Navigation Buttons */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setCurrentIndex(prev => (prev - 1 + bannerItems.length) % bannerItems.length)}
        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-[15] bg-black/30 text-white hover:bg-black/50 rounded-full p-2"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6 sm:h-8 sm:w-8" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setCurrentIndex(prev => (prev + 1) % bannerItems.length)}
        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-[15] bg-black/30 text-white hover:bg-black/50 rounded-full p-2"
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6 sm:h-8 sm:w-8" />
      </Button>

      {/* Dot Indicators */}
      <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-[15] flex space-x-2 sm:space-x-3">
        {bannerItems.map((_, index) => (
          <button
            key={`dot-${index}`}
            onClick={() => goToSlide(index)}
            className={cn(
              "h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full transition-all duration-300 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75",
              currentIndex === index ? "bg-white scale-125" : "bg-white/50 hover:bg-white/75"
            )}
            aria-label={`Go to slide ${index + 1}`}
            aria-current={currentIndex === index}
          />
        ))}
      </div>
    </section>
  );
}
