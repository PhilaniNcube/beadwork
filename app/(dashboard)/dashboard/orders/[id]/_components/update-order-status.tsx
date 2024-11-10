"use client";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const UpdateOrderStatus = ({status, orderId}:{orderId:string, status:string}) => {


  return (
    <div className="flex items-center space-x-4">
      <Select defaultValue={status}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Update status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="PENDING">Pending</SelectItem>
          <SelectItem value="PROCESSING">Processing</SelectItem>
          <SelectItem value="SHIPPED">Shipped</SelectItem>
          <SelectItem value="DELIVERED">Delivered</SelectItem>
          <SelectItem value="CANCELLED">Cancelled</SelectItem>
        </SelectContent>
      </Select>
      <Button>Send Invoice</Button>
    </div>
  );
};
export default UpdateOrderStatus;
