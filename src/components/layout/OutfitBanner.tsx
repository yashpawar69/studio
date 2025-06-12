
"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export default function OutfitBanner() {
  return (
    <section className="relative w-full h-[400px] md:h-[500px] rounded-lg overflow-hidden shadow-lg mb-12">
      <Image
        src="https://placehold.co/1200x500.png"
        alt="Stylish outfit collection"
        layout="fill"
        objectFit="cover"
        className="brightness-75"
        data-ai-hint="fashion outfits"
        priority
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4 bg-black/30">
        <h2 className="font-headline text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 animation-soft-fade-in">
          Find Your Perfect Outfit
        </h2>
        <p className="text-lg md:text-xl text-neutral-200 mb-8 max-w-2xl animation-soft-fade-in" style={{ animationDelay: '0.2s' }}>
          Explore our latest collections and discover styles curated just for you.
        </p>
        <Link href="#products" passHref>
          <Button 
            size="lg" 
            className="bg-primary hover:bg-primary/90 text-primary-foreground animation-soft-fade-in text-lg px-8 py-6 rounded-md"
            style={{ animationDelay: '0.4s' }}
          >
            Shop Collection
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </Link>
      </div>
    </section>
  );
}
