import Container from "@/components/container";
import { Button } from "@/components/ui/button";
import { Hand, TimerOff, Truck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";

export default function HeroSection() {
  return (
    <Fragment>
      <section className="relative h-[calc(100vh-15rem)] min-h-[500px] w-full overflow-hidden">
        <Image
          src="https://utfs.io/f/I8dKBSGAO9kqQd1qMjVUB17I0Kc2RqMGZhJOtf8Lnvpduerg"
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
          <Link href="/categories">
            <Button
              size="lg"
              className="px-8 py-3 text-lg bg-white rounded-none text-slate-900 hover:text-white"
            >
              Shop Collection
            </Button>
          </Link>
        </div>
      </section>
      <div className="hidden text-white bg-black md:flex">
        <div className="container flex items-center justify-around py-2">
          <div className="flex items-center gap-x-3">
            <Truck size={16} />
            <span className="text-sm">
              Free shipping on all orders over R1200
            </span>
          </div>
          <div className="flex items-center gap-x-3">
            <Hand size={16} />
            <span className="text-sm">Hand crafted jewellery</span>
          </div>
          <div className="flex items-center gap-x-3">
            <TimerOff size={16} />
            <span className="text-sm">Exclusive pieces</span>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
