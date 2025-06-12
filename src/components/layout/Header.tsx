"use client";

import Link from 'next/link';
import { ShoppingBag, Heart, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useWishlist } from '@/contexts/WishlistContext';
import { useState, useEffect } from 'react';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { usePathname } from 'next/navigation';


const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
  const pathname = usePathname();
  const isActive = pathname === href;
  return (
    <Link href={href} className={`text-sm font-medium transition-colors hover:text-primary ${isActive ? 'text-primary' : 'text-muted-foreground'}`}>
      {children}
    </Link>
  );
};


export default function Header() {
  const { wishlistItems } = useWishlist();
  const [wishlistCount, setWishlistCount] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setWishlistCount(wishlistItems.length);
  }, [wishlistItems]);

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/wishlist", label: "Wishlist" },
    // Add more nav items here if needed: { href: "/shop", label: "Shop" },
  ];


  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <ShoppingBag className="h-7 w-7 text-primary" />
          <span className="font-headline text-2xl font-bold text-primary">Shop Me</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <NavLink key={item.href} href={item.href}>
              {item.label}
            </NavLink>
          ))}
          <Link href="/wishlist" passHref>
            <Button variant="ghost" size="icon" aria-label="Wishlist">
              <Heart className="h-5 w-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-xs text-accent-foreground">
                  {wishlistCount}
                </span>
              )}
            </Button>
          </Link>
        </nav>

        {/* Mobile Navigation Trigger */}
        <div className="md:hidden">
           <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] p-0">
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between p-4 border-b">
                   <Link href="/" className="flex items-center gap-2" onClick={() => setIsMobileMenuOpen(false)}>
                      <ShoppingBag className="h-6 w-6 text-primary" />
                      <span className="font-headline text-xl font-bold text-primary">Shop Me</span>
                    </Link>
                  <SheetClose asChild>
                     <Button variant="ghost" size="icon">
                        <X className="h-6 w-6" />
                        <span className="sr-only">Close menu</span>
                      </Button>
                  </SheetClose>
                </div>
                <nav className="flex flex-col gap-4 p-4">
                  {navItems.map((item) => (
                     <SheetClose key={item.href} asChild>
                        <Link href={item.href} className="text-lg font-medium text-foreground hover:text-primary transition-colors">
                          {item.label}
                        </Link>
                     </SheetClose>
                  ))}
                   <SheetClose asChild>
                    <Link href="/wishlist" className="flex items-center gap-2 text-lg font-medium text-foreground hover:text-primary transition-colors">
                      <Heart className="h-5 w-5" />
                      <span>Wishlist ({wishlistCount})</span>
                    </Link>
                  </SheetClose>
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
