import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

export default function PrivacyPolicy() {
  return (
    <div className="container py-10 mx-auto">
      <h1 className="mb-6 text-3xl font-bold">Privacy Policy</h1>
      <ScrollArea className="h-[600px] w-full rounded-md border p-4">
        <div className="space-y-8">
          <section>
            <h2 className="mb-3 text-2xl font-semibold">1. Introduction</h2>
            <p>
              Welcome to Glam Beads ("we", "our", or "us"). We are committed to
              protecting your personal information and your right to privacy.
              This privacy policy describes how we collect, use, and share
              information when you use our website www.glambeads.co.za (the
              "Site") to purchase handmade items.
            </p>
          </section>

          <Separator />

          <section>
            <h2 className="mb-3 text-2xl font-semibold">
              2. Information We Collect
            </h2>
            <p>
              We collect personal information that you voluntarily provide to us
              when you:
            </p>
            <ul className="mt-2 ml-4 list-disc list-inside">
              <li>Register on the Site</li>
              <li>Place an order</li>
              <li>Sign up for our newsletter</li>
              <li>Contact us via email or our contact form</li>
            </ul>
            <p className="mt-2">This information may include:</p>
            <ul className="mt-2 ml-4 list-disc list-inside">
              <li>Name</li>
              <li>Email address</li>
              <li>Phone number</li>
              <li>Shipping and billing address</li>
              <li>
                Payment information (processed securely through our payment
                processor)
              </li>
            </ul>
          </section>

          <Separator />

          <section>
            <h2 className="mb-3 text-2xl font-semibold">
              3. How We Use Your Information
            </h2>
            <p>We use your personal information to:</p>
            <ul className="mt-2 ml-4 list-disc list-inside">
              <li>Process and fulfill your orders</li>
              <li>Communicate with you about your orders and our products</li>
              <li>Send you marketing communications (if you've opted in)</li>
              <li>Improve our Site and customer service</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <Separator />

          <section>
            <h2 className="mb-3 text-2xl font-semibold">
              4. Information Sharing and Disclosure
            </h2>
            <p>We may share your personal information with:</p>
            <ul className="mt-2 ml-4 list-disc list-inside">
              <li>
                Service providers who help us operate our business (e.g.,
                payment processors, shipping companies)
              </li>
              <li>
                Legal and regulatory authorities, as required by applicable laws
              </li>
            </ul>
            <p className="mt-2">
              We do not sell or rent your personal information to third parties.
            </p>
          </section>

          <Separator />

          <section>
            <h2 className="mb-3 text-2xl font-semibold">5. Data Security</h2>
            <p>
              We implement appropriate technical and organizational measures to
              protect your personal information against unauthorized or unlawful
              processing, accidental loss, destruction, or damage. However,
              please note that no system is ever completely secure.
            </p>
          </section>

          <Separator />

          <section>
            <h2 className="mb-3 text-2xl font-semibold">6. Your Rights</h2>
            <p>
              Under South African law, specifically the Protection of Personal
              Information Act (POPIA), you have the right to:
            </p>
            <ul className="mt-2 ml-4 list-disc list-inside">
              <li>Request access to your personal information</li>
              <li>Request correction of your personal information</li>
              <li>Request deletion of your personal information</li>
              <li>Object to processing of your personal information</li>
              <li>
                Request restriction of processing your personal information
              </li>
            </ul>
          </section>

          <Separator />

          <section>
            <h2 className="mb-3 text-2xl font-semibold">
              7. Changes to This Privacy Policy
            </h2>
            <p>
              We may update this privacy policy from time to time. We will
              notify you of any changes by posting the new privacy policy on
              this page and updating the "Last Updated" date at the top of this
              page.
            </p>
          </section>

          <Separator />

          <section>
            <h2 className="mb-3 text-2xl font-semibold">8. Contact Us</h2>
            <p>
              If you have any questions about this privacy policy or our data
              practices, please contact us at:
            </p>
            <p className="mt-2">
              Glam Beads
              <br />
              9 Ferndale Road, Humewood, Port Elizabeth, 6001
              <br />
              info@glambeads.co.za
              <br />
              +27 65 944 6989
            </p>
          </section>
        </div>
      </ScrollArea>
    </div>
  );
}
