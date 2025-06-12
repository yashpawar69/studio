
"use client";

import { Star, StarHalf, StarOff } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StarRatingProps {
  rating: number;
  totalStars?: number;
  size?: number;
  className?: string;
  iconClassName?: string;
  showEmptyStars?: boolean;
}

export default function StarRating({
  rating,
  totalStars = 5,
  size = 16,
  className,
  iconClassName,
  showEmptyStars = true,
}: StarRatingProps) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0; // For simplicity, we'll treat >0.x as a half star visually if needed, or round. Currently, only full/empty.

  // For simplicity, this version will only show full stars and empty stars, not half stars.
  // To implement half stars, you'd need more complex logic or specific icons.

  return (
    <div className={cn("flex items-center", className)}>
      {Array.from({ length: totalStars }, (_, index) => {
        if (index < fullStars) {
          return (
            <Star
              key={`full-${index}`}
              size={size}
              className={cn("fill-yellow-400 text-yellow-400", iconClassName)}
            />
          );
        }
        // To add half-star logic:
        // if (hasHalfStar && index === fullStars) {
        //   return <StarHalf key={`half-${index}`} size={size} className={cn("fill-yellow-400 text-yellow-400", iconClassName)} />;
        // }
        if (showEmptyStars) {
          return (
            <Star
              key={`empty-${index}`}
              size={size}
              className={cn("text-gray-300", iconClassName)}
            />
          );
        }
        return null;
      })}
    </div>
  );
}
