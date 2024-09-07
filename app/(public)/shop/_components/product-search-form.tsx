"use client";

import { Input } from "@/components/ui/input";
import { redirect, useSearchParams } from "next/navigation";

const ProductSearchForm = () => {

  const searchParams = useSearchParams();

  const search = searchParams.get("q");

  return (
    <form
      action={(formData: FormData) => {
        const search = formData.get("search");
        redirect(`/shop?q=${search}`);
      }}
    >
      <Input
        type="search"
        placeholder="Search products..."
        name="search"
        defaultValue={search || ""}
        className="mb-4"
        aria-label="Search products"
      />
    </form>
  );
};
export default ProductSearchForm;
