
"use client";

import { mockTestimonials } from '@/data/testimonials';
import TestimonialCard from './TestimonialCard';
import { MessageSquareText } from 'lucide-react';

export default function TestimonialSection() {
  const testimonialsToDisplay = mockTestimonials.slice(0, 3); // Display up to 3 testimonials

  return (
    <section className="py-12 bg-muted/50">
      <div className="container mx-auto px-4">
        <h2 className="font-headline text-2xl md:text-3xl font-bold mb-8 text-center flex items-center justify-center">
          <MessageSquareText className="mr-3 h-7 w-7 text-primary" />
          What Our Customers Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonialsToDisplay.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
}
