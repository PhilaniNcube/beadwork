"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { addSize } from "@/utils/actions/sizes";
import React, { useActionState, useTransition } from "react";

interface SizeOptionFormProps {
  productId: number;
}

interface Size {
  name: string;
  description?: string;
  dimensions?: string;
}

const SizeOptionForm: React.FC<SizeOptionFormProps> = ({ productId }) => {

const [isPending, startTransition] = useTransition();
  const [state, formAction] = useActionState(addSize, null);

  const handleSubmit = (formData:FormData) => {
    formAction(formData);

  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="">Add Size Option:</CardTitle>
      </CardHeader>
      <CardContent>
        <form
          action={(formData) => {
            startTransition(() => {
              formAction(formData);
            });
          }}
          className="space-y-4"
        >
          <div>
            <input type="hidden" name="product_id" value={productId} />
            <Label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Size Name
            </Label>
            <Input
              type="text"
              name="name"
              className="block w-full mt-1 border border-gray-300 rounded-md shadow-sm"
              required
            />
          </div>
          <div>
            <Label
              htmlFor="dimensions"
              className="block text-sm font-medium text-gray-700"
            >
              Dimensions
            </Label>
            <Input
              type="text"
              name="dimensions"
              required
              className="block w-full mt-1 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <Button
            disabled={isPending}
            type="submit"
            className="w-1/3 px-4 py-2 text-white bg-blue-500 rounded"
          >
            {isPending ? "Adding Size..." : "Add Size"}
          </Button>
          {state?.status === "error" && (
            <p className="text-red-500">{state.message}</p>
          )}
          {state?.status === "success" && (
            <p className="text-green-500">{state.message}</p>
          )}
        </form>
      </CardContent>
    </Card>
  );
};

export default SizeOptionForm;
