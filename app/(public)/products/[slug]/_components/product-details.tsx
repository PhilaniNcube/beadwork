"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { ProductDetailsType } from "@/schema";
import { formatCurrency } from "@/utils/formatCurrency";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/stores/cart-provider";
import { useRouter } from "next/navigation";
import { startTransition, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Lightbox from "./lightbox";
import { Database } from "@/supabase";

type Props = {
  product: ProductDetailsType;
  sizes: Database['public']['Tables']['sizes']['Row'][];
};

export default function ProductDetails({ product, sizes }: Props) {

    const [isLightboxOpen, setIsLightboxOpen] = useState(false);
    const [lightboxIndex, setLightboxIndex] = useState(0);

    const imageUrls = product.product_images.map((image) => image.image_url);

      const handleImageClick = (index: number) => {
        setLightboxIndex(index);
        setIsLightboxOpen(true);
      };

  const { products: cartItems, addToCart } = useCartStore((state) => state);

  const [selectedImage, setSelectedImage] = useState(product.product_images[0]);

   const [selectedSize, setSelectedSize] = useState<string | null>(null);



  // check if the product is already in the cart and return the cart item itself
  const cartItem = cartItems.find((item) => item.id === product.id);

  const router = useRouter();

  const handleAddToCart = () => {

    // if there are no sizes, add the product to the cart
    if (sizes.length === 0 || !selectedSize) {
      startTransition(() => {
        addToCart({ ...product, quantity: cartItem ? cartItem.quantity + 1 : 1 });
        router.push("/cart");
      });
      return;
    }
    startTransition(() => {
      addToCart({
        ...product,
        quantity: cartItem ? cartItem.quantity + 1 : 1,
        size: selectedSize,
      });
      router.push("/cart");
    });
  };

  return (
    <div className="container px-0 py-12 mx-auto">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-5">
        <div className="grid col-span-1 md:col-span-2 gap-4">
          <Carousel className="relative rounded-lg aspect-square">
            <CarouselContent>
              {product.product_images.map((image) => (
                <CarouselItem key={image.id}>
                  <div className="p-1">
                    <Card>
                      <CardContent className="flex items-center justify-center p-6 aspect-square">
                        <Image
                          src={image.image_url}
                          alt={product.title}
                          width={500}
                          height={500}
                          layout="intrinsic"
                          className="object-cover w-full h-full cursor-pointer"
                          onClick={() => handleImageClick(0)}
                        />
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="z-30 " />
            <CarouselNext className="z-30" />
          </Carousel>
          <div className="grid grid-cols-5 gap-2">
            {product.product_images.map((image, index) => (
              <div
                key={image.id}
                className="col-span-1 overflow-hidden border rounded-lg"
              >
                <Image
                  src={image.image_url}
                  alt={product.title}
                  width={200}
                  height={200}
                  onClick={() => handleImageClick(index)}
                  className="object-cover w-full h-full aspect-square"
                  style={{ aspectRatio: "100/100", objectFit: "cover" }}
                />
              </div>
            ))}
            {isLightboxOpen && (
              <Lightbox
                images={imageUrls}
                initialIndex={lightboxIndex}
                onClose={() => setIsLightboxOpen(false)}
              />
            )}
          </div>
        </div>
        <div className="md:pl-7 md:col-span-3">
          <div className="">
            <h1 className="text-3xl font-bold">{product.title}</h1>
            <div className="flex flex-col items-start gap-2">
              <div className="flex items-center gap-2 mt-4 mb-4">
                <h2 className="text-sm font-medium">Category:</h2>
                {product.categories.length > 0 &&
                  product.categories.map((category) => (
                    <Badge
                      key={category.id}
                      variant="outline"
                      className="bg-muted"
                    >
                      {category.name}
                    </Badge>
                  ))}
              </div>
              <div className="flex items-center gap-2 mb-4">
                <h2 className="text-sm font-medium">Material:</h2>
                {product.materials.length > 0 &&
                  product.materials.map((material) => (
                    <Badge
                      key={material.name}
                      variant="outline"
                      className="bg-muted"
                    >
                      {material.name}
                    </Badge>
                  ))}
              </div>
            </div>
          </div>
          <p className="mb-3 text-muted-foreground">{product.description}</p>
          <div className="mb-3 text-2xl font-bold">
            <span className="text-red-600 line-through mr-3">
              {formatCurrency(product.price * 2)}
            </span>
            {formatCurrency(product.price)}
          </div>
          <div className="flex items-center gap-2 mb-3">
            <h2 className="text-sm font-medium">Stock:</h2>
            <Badge
              variant="outline"
              className={cn(
                "",
                product.stock === 0 ? "bg-red-700 text-white" : "bg-muted"
              )}
            >
              {product.stock} in stock
            </Badge>
          </div>
          {sizes.length > 0 && (
            <div className="my-4">
              <h2 className="text-sm font-medium">Select Size:</h2>
              <div className="flex mt-2 space-x-2">
                {sizes.map((size) => (
                  <div
                    key={size.name}
                    onClick={() => setSelectedSize(size.name)}
                    className={`px-6 py-4 cursor-pointer text-md lg:text-lg border rounded-md justify-center items-center flex flex-col ${
                      selectedSize === size.name
                        ? "bg-blue-500 text-white"
                        : "bg-slate-200 text-black"
                    }`}
                  >
                    <span className="uppercase">{size.name}</span>
                    <span className="text-xs">{size.dimensions}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          <Button
            className="rounded-none"
            type="button"
            disabled={cartItem && cartItem?.quantity >= product.stock}
            onClick={handleAddToCart}
            size="lg"
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
}
