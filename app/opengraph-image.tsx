import { ImageResponse } from "next/og";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div className="flex items-center justify-center w-full h-full">
        <img
          src={
            "https://uijjfslwyuylxchlehlc.supabase.co/storage/v1/object/public/images/glambeads-new-logo.jpg"
          }
          alt="Glambeads"
          style={{
            objectFit: "cover",
            aspectRatio: "400/400",
            width: "100%",
            height: "100%",
            backgroundColor: "white",
          }}
          width={400}
          height={400}
        />
      </div>
    ),
    {
      headers: {
        "Content-Type": "image/svg+xml",
      },
      width: 400,
      height: 400,
    }
  );
}
