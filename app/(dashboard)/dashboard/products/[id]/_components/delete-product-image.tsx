"use client";

import { deleteProductImage } from "@/utils/actions/delete-product-image";
import { CircleDashed, Trash2 } from "lucide-react";
import { startTransition, useState } from "react";
import { useFormState } from "react-dom";

const DeleteProductImage = ({imageId}:{imageId:number}) => {

  const [isLoading, setIsLoading] = useState(false);

    const [state, formAction] = useFormState(deleteProductImage, null);

  return (
    <form action={(formData) => {
      setIsLoading(true);

      startTransition(() => {
        formAction(formData);
        setIsLoading(false);
      })
    }} className="absolute top-1 right-2">
      <input type="hidden" name="image_id" value={imageId} />
      <button type="submit" className="">
        {isLoading ? <CircleDashed className="animate-spin" size={16} /> : <Trash2 className="text-red-500" size={16} />}
      </button>
    </form>
  );
};
export default DeleteProductImage;
