import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatCurrency } from "@/utils/formatCurrency";
import { getOrderItems, getProductName } from "@/utils/queries/orders";
import Link from "next/link";

const OrderItems = async ({orderId}:{orderId:string}) => {

  const {data, error} = await getOrderItems(orderId);



  if (error || !data) {
    return <div>Could not fetch order items</div>;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Product</TableHead>
          <TableHead>SKU</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Quantity</TableHead>
          <TableHead className="text-right">Total</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map(async (item) => {

          const itemData = await getProductName(item.product_id);

          if(itemData.error) return null;

          return (
            <TableRow key={item.id}>
              <TableCell>
                <p>{itemData.data?.title}</p>
                {item.size && <p className="text-xs text-muted-foreground">Size: {item.size}</p>}
              </TableCell>
              <TableCell>
                <Link
                  href={`/dashboard/products/item.id`}
                  className="underline"
                >
                  {itemData.data?.slug}
                </Link>
              </TableCell>
              <TableCell>{formatCurrency(item.price)}</TableCell>
              <TableCell>{item.quantity}</TableCell>
              <TableCell className="text-right">
                {formatCurrency(item.price * item.quantity)}
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};
export default OrderItems;
