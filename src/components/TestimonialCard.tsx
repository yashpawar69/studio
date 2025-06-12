
"use client";

import Image from 'next/image';
import type { Testimonial } from '@/types';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star } from 'lucide-react';

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export default function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <Card className="flex flex-col h-full shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="pb-4">
        <div className="flex items-center space-x-3">
          <Avatar>
            {testimonial.avatarUrl && <AvatarImage src={testimonial.avatarUrl} alt={testimonial.author} data-ai-hint={testimonial.dataAiHint} />}
            <AvatarFallback>{testimonial.author.substring(0, 1)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold text-md">{testimonial.author}</p>
            {testimonial.location && <p className="text-xs text-muted-foreground">{testimonial.location}</p>}
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <blockquote className="text-sm text-foreground italic border-l-4 border-primary pl-4 py-2">
          "{testimonial.quote}"
        </blockquote>
      </CardContent>
      {testimonial.rating && (
        <CardFooter className="pt-4">
          <div className="flex items-center">
            {Array(5)
              .fill(0)
              .map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < testimonial.rating! ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                  }`}
                />
              ))}
          </div>
        </CardFooter>
      )}
    </Card>
  );
}
