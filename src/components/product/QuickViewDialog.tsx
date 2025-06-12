
"use client";

import Image from 'next/image';
import Link from 'next/link';
import type { Product, Review } from '@/types'; // Added Review
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { ExternalLink, Heart, CalendarDays } from 'lucide-react'; // Added CalendarDays
import { useWishlist } from '@/contexts/WishlistContext';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import StarRating from '@/components/ui/StarRating'; // New import
import { ScrollArea } from '@/components/ui/scroll-area'; // For scrollable reviews
import { Separator } from '@/components/ui/separator'; // To separate sections

interface QuickViewDialogProps {
  product: Product | null;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

export default function QuickViewDialog({ product, isOpen, onOpenChange }: QuickViewDialogProps) {
  const { addToWishlist, removeFromWishlist, isItemInWishlist } = useWishlist();
  const { toast } = useToast();

  if (!product) return null;

  const isInWishlist = isItemInWishlist(product.id);

  const handleWishlistToggle = () => {
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
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-4xl p-0">
        {product && (
          <div className="grid md:grid-cols-2 gap-0 max-h-[90vh]">
            <div className="relative h-96 md:h-auto md:min-h-[calc(90vh-4rem)]"> {/* Adjusted height */}
              <Image
                src={product.imageUrl}
                alt={product.name}
                layout="fill"
                objectFit="cover"
                className="rounded-t-lg md:rounded-l-lg md:rounded-t-none"
                data-ai-hint={product.dataAiHint}
              />
            </div>
            <ScrollArea className="h-full md:max-h-[calc(90vh-4rem)]"> {/* Scroll for content */}
              <div className="flex flex-col p-6">
                <DialogHeader className="mb-4">
                  <DialogTitle className="font-headline text-2xl md:text-3xl mb-2">{product.name}</DialogTitle>
                  <div className="flex items-center mb-2">
                    {reviewCount > 0 ? (
                      <>
                        <StarRating rating={averageRating} size={20} />
                        <span className="ml-2 text-sm text-muted-foreground">({reviewCount} review{reviewCount !== 1 ? 's' : ''})</span>
                      </>
                    ) : (
                      <span className="text-sm text-muted-foreground italic">No reviews yet</span>
                    )}
                  </div>
                  <DialogDescription className="text-base text-muted-foreground">
                    {product.description}
                  </DialogDescription>
                </DialogHeader>
                
                <div className="space-y-2 mb-6">
                  <p className="text-2xl font-semibold text-primary">${product.price.toFixed(2)}</p>
                  <p><span className="font-medium">Category:</span> {product.category}</p>
                  {product.brand && <p><span className="font-medium">Brand:</span> {product.brand}</p>}
                  {product.colors && product.colors.length > 0 && (
                    <p><span className="font-medium">Colors:</span> {product.colors.join(', ')}</p>
                  )}
                </div>

                <DialogFooter className="flex flex-col sm:flex-row gap-2 mb-6 sticky bottom-0 bg-background py-4 border-t border-border">
                  <Button variant="outline" onClick={handleWishlistToggle} className="w-full sm:w-auto">
                    <Heart className={cn("mr-2 h-4 w-4", isInWishlist ? 'fill-accent text-accent' : '')} />
                    {isInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
                  </Button>
                  <Button asChild className="w-full sm:w-auto bg-accent hover:bg-accent/90 text-accent-foreground">
                    <Link href={product.externalLink} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-2 h-4 w-4" /> Buy Now
                    </Link>
                  </Button>
                </DialogFooter>

                <Separator className="my-4" />

                <div>
                  <h4 className="text-lg font-semibold mb-3">Customer Reviews</h4>
                  {product.reviews && product.reviews.length > 0 ? (
                    <div className="space-y-4 max-h-60"> {/* Added max-h for review list */}
                      {product.reviews.map((review: Review) => (
                        <div key={review.id} className="border-b pb-3 last:border-b-0">
                          <div className="flex items-center justify-between mb-1">
                            <p className="font-semibold text-sm">{review.author}</p>
                            <StarRating rating={review.rating} size={14} />
                          </div>
                          <div className="flex items-center text-xs text-muted-foreground mb-1">
                            <CalendarDays className="h-3 w-3 mr-1" />
                            <span>{new Date(review.date).toLocaleDateString()}</span>
                          </div>
                          <p className="text-sm text-foreground">{review.comment}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground italic">This product has no reviews yet.</p>
                  )}
                </div>
              </div>
            </ScrollArea>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
