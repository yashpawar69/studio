
"use client";

import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Heart, Eye, ExternalLink } from 'lucide-react';
import { useWishlist } from '@/contexts/WishlistContext';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import StarRating from '@/components/ui/StarRating'; // New import

interface ProductCardProps {
  product: Product;
  onQuickView: (product: Product) => void;
  className?: string;
}

export default function ProductCard({ product, onQuickView, className }: ProductCardProps) {
  const { wishlistItems, addToWishlist, removeFromWishlist, isItemInWishlist } = useWishlist();
  const { toast } = useToast();
  
  const isInWishlist = isItemInWishlist(product.id);

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.stopPropagation(); 
    if (isInWishlist) {
      removeFromWishlist(product.id);
      toast({ title: `${product.name} removed from wishlist.` });
    } else {
      addToWishlist(product);
      toast({ title: `${product.name} added to wishlist!` });
    }
  };

  const averageRating = product.reviews && product.reviews.length > 0
    ? product.reviews.reduce((acc, review) => acc + review.rating, 0) / product.reviews.length
    : 0;
  
  const reviewCount = product.reviews ? product.reviews.length : 0;

  return (
    <Card className={cn("flex flex-col overflow-hidden rounded-lg shadow-lg transition-all hover:shadow-xl animation-soft-fade-in", className)}>
      <CardHeader className="p-0 relative">
        <Image
          src={product.imageUrl}
          alt={product.name}
          width={400}
          height={400}
          className="object-cover w-full h-64 sm:h-72 md:h-80"
          data-ai-hint={product.dataAiHint}
        />
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 bg-background/70 hover:bg-background text-primary rounded-full"
          onClick={handleWishlistToggle}
          aria-label={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart className={cn("h-5 w-5", isInWishlist ? 'fill-accent text-accent' : 'text-primary')} />
        </Button>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <CardTitle className="font-headline text-lg mb-1 truncate" title={product.name}>{product.name}</CardTitle>
        <CardDescription className="text-sm text-muted-foreground mb-2 h-10 overflow-hidden">
          {product.description.substring(0, 60)}...
        </CardDescription>
        <div className="flex items-center mb-2">
          {reviewCount > 0 ? (
            <>
              <StarRating rating={averageRating} size={16} />
              <span className="ml-2 text-xs text-muted-foreground">({reviewCount} review{reviewCount !== 1 ? 's' : ''})</span>
            </>
          ) : (
            <span className="text-xs text-muted-foreground italic">No reviews yet</span>
          )}
        </div>
        <p className="text-lg font-semibold text-primary">${product.price.toFixed(2)}</p>
      </CardContent>
      <CardFooter className="p-4 grid grid-cols-2 gap-2">
        <Button variant="outline" onClick={() => onQuickView(product)} className="w-full">
          <Eye className="mr-2 h-4 w-4" /> Quick View
        </Button>
        <Button asChild variant="default" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
          <Link href={product.externalLink} target="_blank" rel="noopener noreferrer">
            <ExternalLink className="mr-2 h-4 w-4" /> Buy Now
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
