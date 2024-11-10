import { getShippingAddress } from "@/utils/queries/orders";
import { MapPin } from "lucide-react";

const ShippingAddress = async ({
  shippingAddressId,
}: {
  shippingAddressId: number;
}) => {


  const { data, error } = await getShippingAddress(shippingAddressId);

  if (error || !data) {
    return <div>Could not fetch the shipping address: {error}</div>;
  }

  return (
    <div className="flex items-center space-x-4">
      <MapPin className="h-5 w-5 text-muted-foreground" />
      <div>
        <p className="text-sm font-medium">Shipping Address</p>
        <p className="text-sm text-muted-foreground">
          {data.street_address}, {data.city},{" "}
          {data.postal_code}
        </p>
      </div>
    </div>
  );
};
export default ShippingAddress;
