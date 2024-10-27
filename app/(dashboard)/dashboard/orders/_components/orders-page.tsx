"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon, SearchIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Database } from "@/supabase";
import { formatCurrency } from "@/utils/formatCurrency";



export default function OrdersPage({orders}:{orders:Database['public']['Tables']['orders']['Row'][]}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [dateRange, setDateRange] = useState({
    from: undefined,
    to: undefined,
  });

  const filteredOrders = orders.filter(
    (order) =>
      order.first_name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      order.last_name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (statusFilter === "All" || order.status === statusFilter)
  );

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Orders</h1>
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="relative w-full sm:w-64">
            <SearchIcon className="absolute left-2 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="search"
              placeholder="Search orders..."
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-4">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Statuses</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Processing">Processing</SelectItem>
                <SelectItem value="Shipped">Shipped</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
              </SelectContent>
            </Select>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-[180px] justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />

                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  initialFocus
                  mode="range"
                  defaultMonth={dateRange.from}
                  selected={dateRange}
                  numberOfMonths={2}
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </header>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Email</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">{order.email}</TableCell>
                <TableCell>{`${order.first_name} ${order.last_name}`}</TableCell>
                <TableCell>{order.created_at}</TableCell>
                <TableCell>{formatCurrency(order.total_amount)}</TableCell>
                <TableCell>
                  <Badge
                    className={cn("rounded-full text-white flex items-center justify-center",
                      order.status === "PENDING" && "bg-yellow-500",
                      order.status === "PROCESSING" && "bg-blue-500",
                      order.status === "SHIPPED" && "bg-green-500",
                      order.status === "DELIVERED" && "bg-green-700",
                      order.status === "CANCELLED" && "bg-red-500"
                    )}
                  >
                    {order.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm">
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <p className="text-sm text-gray-700">
          Showing <span className="font-medium">1</span> to{" "}
          <span className="font-medium">5</span> of{" "}
          <span className="font-medium">20</span> results
        </p>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            Previous
          </Button>
          <Button variant="outline" size="sm">
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
