
"use client";

import { useRef, useState, useTransition } from "react";
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UploadIcon, XIcon } from "lucide-react";
import { UploadButton } from "@/utils/uploadthing";
import { useFormState } from "react-dom";
import { productImageUploadAction } from "@/utils/actions/image-upload-action";
import type { Database } from "@/supabase";
import Image from "next/image";


type Props = {
  productId: number;
  images: Database['public']['Tables']['product_images']['Row'][];
}

export default function ImageUpload({ productId, images }: Props) {
	const inputRef = useRef<HTMLInputElement>(null);

	const handleClick = () => {
		inputRef.current?.click();
	};

	const [state, formAction] = useFormState(productImageUploadAction, null);

	const [pending, startTransition] = useTransition();

	return (
		<Card className="flex-1">
			<CardHeader>
				<CardTitle>Upload Image</CardTitle>
				<CardDescription>Upload an image for this product</CardDescription>
			</CardHeader>
			<CardContent>
				<UploadButton
					className="flex flex-row items-center justify-center px-3 mx-0 text-white bg-blue-500 rounded-lg w-fit"
					endpoint="imageUploader"
					onClientUploadComplete={(res) => {

						const formData = new FormData();
						formData.append("productId", productId.toString());
						formData.append("image", res[0].url);
						startTransition(() => {
							formAction(formData);
						});


					}}
					onUploadError={(error: Error) => {
						// Do something with the error.
						alert(`ERROR! ${error.message}`);
					}}
				/>
				<div className="grid grid-cols-2 gap-3 mt-4">
          {images.map((image) => <Image className="object-cover w-full" key={image.id} src={image.image_url} width={100} height={100} alt="Image" />)}
        </div>
			</CardContent>
		</Card>
	);
}

