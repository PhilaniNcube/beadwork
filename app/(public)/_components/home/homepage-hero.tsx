import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="relative h-[calc(100vh-4rem)] min-h-[600px] w-full overflow-hidden">
      <Image
        src="https://utfs.io/f/193069ff-3aa9-4d15-a2f6-9657b8a03a24-uupcoo.jpeg"
        alt="Handmade jewelry collection"
        width={1920}
        height={1080}
        className="absolute inset-0 object-cover w-full h-full"
        priority
      />
      <div className="absolute inset-0 bg-black bg-opacity-50" />
      <div className="relative flex flex-col items-center justify-center h-full px-4 text-center sm:px-6 lg:px-8">
        <h1 className="mb-4 text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
          Handcrafted Beauty, Just for You
        </h1>
        <p className="max-w-3xl mb-8 text-xl text-gray-200 sm:text-2xl">
          Discover unique, artisanal jewelry pieces that tell your story. Each
          item is lovingly crafted to bring out your inner radiance.
        </p>
        <Button size="lg" className="px-8 py-3 text-lg bg-white rounded-full text-slate-900 hover:text-white">
          Shop Collection
        </Button>
      </div>
    </section>
  );
}
