import { Button } from "@/components/ui/button";
import { ArrowRight, ShoppingBag } from "lucide-react";
import Link from "next/link";

export default function SaleHeroBanner() {
  return (
    <div className="relative bg-primary overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary-foreground opacity-90" />
        <div className="absolute inset-0 bg-cover bg-center" />
      </div>
      <div className="relative max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-primary-foreground sm:text-5xl md:text-6xl">
            Summer Sale Extravaganza!
          </h1>
          <p className="mt-4 text-xl text-primary-foreground/80 max-w-3xl mx-auto">
            Enjoy incredible savings across our entire collection
          </p>
          <div className="mt-8 flex flex-col items-center justify-center">
            <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-secondary text-secondary-foreground">
              Limited Time Offer
            </span>
            <p className="mt-4 text-5xl font-bold text-primary-foreground">
              50% OFF
            </p>
            <p className="mt-2 text-xl text-primary-foreground/80">
              On All Products
            </p>
          </div>
          <div className="mt-10">
            <Button asChild size="lg" className="group">
              <Link href="/shop">
                Shop Now
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
      <div className="absolute bottom-4 left-4 flex items-center space-x-2 text-primary-foreground/80">
        <ShoppingBag className="h-5 w-5" />
        <span className="text-sm font-medium">
          Free shipping on orders over R500
        </span>
      </div>
    </div>
  );
}

