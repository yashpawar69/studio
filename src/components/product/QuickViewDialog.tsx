"use client";

import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/types';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { ExternalLink, Heart } from 'lucide-react';
import { useWishlist } from '@/contexts/WishlistContext';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

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

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl p-0">
        {product && (
          <div className="grid md:grid-cols-2 gap-0">
            <div className="relative h-96 md:h-auto">
              <Image
                src={product.imageUrl}
                alt={product.name}
                layout="fill"
                objectFit="cover"
                className="rounded-l-lg"
                data-ai-hint={product.dataAiHint}
              />
            </div>
            <div className="flex flex-col p-6">
              <DialogHeader>
                <DialogTitle className="font-headline text-2xl md:text-3xl mb-2">{product.name}</DialogTitle>
                <DialogDescription className="text-base text-muted-foreground mb-4">
                  {product.description}
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-2 mb-6 flex-grow">
                <p className="text-2xl font-semibold text-primary">${product.price.toFixed(2)}</p>
                <p><span className="font-medium">Category:</span> {product.category}</p>
                {product.brand && <p><span className="font-medium">Brand:</span> {product.brand}</p>}
                {product.colors && product.colors.length > 0 && (
                  <p><span className="font-medium">Colors:</span> {product.colors.join(', ')}</p>
                )}
              </div>

              <DialogFooter className="flex flex-col sm:flex-row gap-2">
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
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
