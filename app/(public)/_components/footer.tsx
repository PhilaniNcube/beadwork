/**
 * v0 by Vercel.
 * @see https://v0.dev/t/GTSp3V8dbTu
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Facebook, Instagram, InstagramIcon, ShoppingBagIcon, TwitterIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
	return (
    <footer className="py-8 mt-8 bg-muted">
      <div className="container grid grid-cols-1 gap-4 px-4 mx-auto md:grid-cols-3 md:px-6">
        <div className="flex flex-col items-center md:items-start">
          <Link href="/" className="flex items-center gap-2" prefetch={false}>
            <Image
              src="https://uijjfslwyuylxchlehlc.supabase.co/storage/v1/object/public/images/glambeads-new-logo.jpg"
              alt="Glambeads"
              width={600}
              height={600}
              className="object-cover w-36 aspect-square"
            />

          </Link>
          <p className="mt-2 text-sm text-muted-foreground">
            Quality handcrated beadwork jewellery
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-1">
          <div className="grid gap-1">
            <h3 className="font-semibold">Quick Links</h3>
            <Link
              href="/about"
              className="text-sm hover:underline"
              prefetch={false}
            >
              About
            </Link>
            <Link
              href="/contact"
              className="text-sm hover:underline"
              prefetch={false}
            >
              Contact
            </Link>
            <Link
              href="/privacy"
              className="text-sm hover:underline"
              prefetch={false}
            >
              Privacy Policy
            </Link>
          </div>
          <div className="grid gap-1">
            <h3 className="font-semibold">Customer Service</h3>
            <Link
              href="/returns"
              className="text-sm hover:underline"
              prefetch={false}
            >
              Shipping &amp; Returns
            </Link>
            {/* <Link href="#" className="text-sm hover:underline" prefetch={false}>
              FAQ
            </Link> */}
          </div>
        </div>
        <div className="flex flex-col items-center md:items-end">
          <div className="flex gap-4">
            <Link
              href="https://twitter.com"
              className="text-muted-foreground hover:text-foreground"
              prefetch={false}
            >
              <TwitterIcon className="w-5 h-5" />
              <span className="sr-only">Twitter</span>
            </Link>
            <Link
              href="https://facebook.com"
              className="text-muted-foreground hover:text-foreground"
              prefetch={false}
            >
              <Facebook className="w-5 h-5" />
              <span className="sr-only">Facebook</span>
            </Link>
            <Link
              href="https://instagram.com"
              className="text-muted-foreground hover:text-foreground"
              prefetch={false}
            >
              <Instagram className="w-5 h-5" />
              <span className="sr-only">Instagram</span>
            </Link>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            &copy; 2024 Glambeads. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

