import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function AboutUs() {
  return (
    <div className="container px-4 py-10 mx-auto">
      <h1 className="mb-6 text-4xl font-bold text-center">About Glam Beads</h1>

      <div className="grid items-center grid-cols-1 gap-10 mb-12 md:grid-cols-2">
        <div>
          <h2 className="mb-4 text-2xl font-semibold">Our Story</h2>
          <p className="mb-4">
            We make hand crafted jewellery that is painstakingly crafted with
            maximum attention to detail. Because of this we do not make make
            large quantities so you can be assured that you are getting a unique
            piece of jewellery that is not mass produced.
          </p>
          <p className="mb-4">
            Our designs are inspired by the beauty and challenges of everyday
            life. The inspiration also comes from our background as african
            women. We are proud of our heritage and we want to share that with
            the world.
          </p>
          <Button className="mt-4 rounded-none">
            Our Products <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
        <div className="relative h-[400px] rounded-lg overflow-hidden">
          <Image
            src="https://utfs.io/f/8d2d7d6e-e2cd-4f95-bcf4-02c09f994362-23ez.jpg"
            alt="Artisan crafting jewelry"
            layout="fill"
            objectFit="cover"
          />
        </div>
      </div>

      <h2 className="mb-6 text-3xl font-semibold text-center">What We Offer</h2>
      <div className="grid grid-cols-1 gap-6 mb-12 md:grid-cols-3">
        <Card>
          <CardContent className="p-6">
            <div className="relative h-[200px] mb-4 rounded-md overflow-hidden">
              <Image
                src="/placeholder.svg?height=200&width=300"
                alt="Handmade bracelets"
                layout="fill"
                objectFit="cover"
              />
            </div>
            <h3 className="mb-2 text-xl font-semibold">Handmade Jewelry</h3>
            <p>
              Exquisite bracelets, anklets, necklaces, and earrings crafted with
              love and attention to detail.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="relative h-[200px] mb-4 rounded-md overflow-hidden">
              <Image
                src="/placeholder.svg?height=200&width=300"
                alt="Handwoven baskets"
                layout="fill"
                objectFit="cover"
              />
            </div>
            <h3 className="mb-2 text-xl font-semibold">Home Decor</h3>
            <p>
              Beautiful handwoven baskets, pottery, and textiles to add a touch
              of South African charm to your home.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="relative h-[200px] mb-4 rounded-md overflow-hidden">
              <Image
                src="/placeholder.svg?height=200&width=300"
                alt="Beaded artwork"
                layout="fill"
                objectFit="cover"
              />
            </div>
            <h3 className="mb-2 text-xl font-semibold">Beaded Art</h3>
            <p>
              Intricate beadwork sculptures and wall hangings showcasing
              traditional African designs and stories.
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="p-8 mb-12 rounded-lg bg-muted">
        <h2 className="mb-4 text-2xl font-semibold">Our Commitment</h2>
        <ul className="space-y-2 list-disc list-inside">
          <li>
            Supporting local artisans and preserving traditional craftsmanship
          </li>
          <li>Using sustainably sourced materials whenever possible</li>
          <li>
            Ensuring fair wages and ethical working conditions for all our
            craftspeople
          </li>
          <li>
            Providing unique, high-quality products to our customers worldwide
          </li>
        </ul>
      </div>

      <div className="text-center">
        <h2 className="mb-4 text-2xl font-semibold">Join Our Community</h2>
        <p className="mb-6">
          Follow us on social media to stay updated on new products, artisan
          stories, and exclusive offers.
        </p>
        <div className="flex justify-center space-x-4">
          <Button variant="outline">Facebook</Button>
          <Button variant="outline">Instagram</Button>
          <Button variant="outline">Twitter</Button>
        </div>
      </div>
    </div>
  );
}
