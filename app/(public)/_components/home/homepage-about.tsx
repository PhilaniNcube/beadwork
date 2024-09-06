import Container from "@/components/container";
import Image from "next/image";

const HomepageAbout = () => {
	return (
    <section className="mt-8 bg-zinc-300">
      <Container>
        <div className="grid md:grid-cols-2">
          <div className="flex flex-col justify-center p-8">
            <h2 className="font-mono text-2xl font-thin text-slate-950">
              Who We Are
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              We make hand crafted jewellery that is painstakingly crafted with
              maximum attention to detail. Because of this we do not make make
              large quantities so you can be assured that you are getting a
              unique piece of jewellery that is not mass produced.
            </p>
            <p className="mt-4 text-lg text-slate-600">
              Our designs are inspired by the beauty and challenges of everyday
              life. The inspiration also comes from our background as african
              women. We are proud of our heritage and we want to share that with
              the world.
            </p>
            <p className="mt-4 text-lg text-slate-600">
              With your support and patronage we can continue to create new and
              beautiful pieces that we can get to share with the world.
            </p>
          </div>
          <div className="p-8">
            <Image
              width={640}
              height={427}
              src="https://utfs.io/f/8d2d7d6e-e2cd-4f95-bcf4-02c09f994362-23ez.jpg"
              alt="About Us"
              className="object-cover w-full h-full rounded-md"
            />
          </div>
        </div>
      </Container>
    </section>
  );
};
export default HomepageAbout;
