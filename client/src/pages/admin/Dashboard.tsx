import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, MessageSquare, FileText, ShoppingCart, IndianRupee } from "lucide-react";
import { Bar, BarChart, Line, LineChart, XAxis, YAxis, CartesianGrid } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import type { Service, Testimonial, BlogPost, Order } from "@shared/schema";

export default function AdminDashboard() {
  const { data: services = [] } = useQuery<Service[]>({
    queryKey: ["/api/services"],
  });

  const { data: testimonials = [] } = useQuery<Testimonial[]>({
    queryKey: ["/api/testimonials"],
  });

  const { data: blogPosts = [] } = useQuery<BlogPost[]>({
    queryKey: ["/api/blog-posts"],
  });

  const { data: orders = [] } = useQuery<Order[]>({
    queryKey: ["/api/admin/orders"],
  });

  const totalRevenue = orders
    .filter(order => order.status === "paid")
    .reduce((sum, order) => sum + order.amount, 0) / 100;

  const paidOrders = orders.filter(order => order.status === "paid").length;
  const pendingOrders = orders.filter(order => order.status === "pending").length;

  const stats = [
    {
      title: "Total Services",
      value: services.length,
      icon: Briefcase,
      color: "text-blue-600",
    },
    {
      title: "Total Testimonials",
      value: testimonials.length,
      icon: MessageSquare,
      color: "text-green-600",
    },
    {
      title: "Total Blog Posts",
      value: blogPosts.length,
      icon: FileText,
      color: "text-purple-600",
    },
    {
      title: "Total Orders",
      value: orders.length,
      icon: ShoppingCart,
      color: "text-orange-600",
    },
    {
      title: "Total Revenue",
      value: `₹${totalRevenue.toLocaleString("en-IN")}`,
      icon: IndianRupee,
      color: "text-red-600",
    },
  ];

  const recentOrders = orders.slice(0, 5);

  const orderStatusData = [
    { status: "Paid", count: paidOrders, fill: "hsl(var(--chart-1))" },
    { status: "Pending", count: pendingOrders, fill: "hsl(var(--chart-2))" },
    { status: "Failed", count: orders.filter(o => o.status === "failed").length, fill: "hsl(var(--chart-3))" },
  ];

  const orderStatusConfig: ChartConfig = {
    count: {
      label: "Orders",
      color: "hsl(var(--chart-2))",
    },
  };

  const revenueByDay = orders
    .filter(order => order.status === "paid")
    .reduce((acc: Record<string, number>, order) => {
      const date = new Date(order.createdAt).toLocaleDateString("en-IN", { month: "short", day: "numeric" });
      acc[date] = (acc[date] || 0) + (order.amount / 100);
      return acc;
    }, {});

  const revenueData = Object.entries(revenueByDay).map(([date, revenue]) => ({
    date,
    revenue,
  })).slice(-7);

  const revenueChartConfig: ChartConfig = {
    revenue: {
      label: "Revenue (₹)",
      color: "hsl(var(--chart-1))",
    },
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
        <p className="text-muted-foreground">
          Welcome to Fast Track 360 Admin Dashboard
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {stats.map((stat) => (
          <Card key={stat.title} data-testid={`card-${stat.title.toLowerCase().replace(/\s+/g, "-")}`}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold" data-testid={`text-${stat.title.toLowerCase().replace(/\s+/g, "-")}-value`}>
                {stat.value}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Orders by Status</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={orderStatusConfig} className="h-[200px] w-full">
              <BarChart data={orderStatusData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="status" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="count" fill="var(--color-count)" radius={4} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Revenue Trend (Last 7 Days)</CardTitle>
          </CardHeader>
          <CardContent>
            {revenueData.length > 0 ? (
              <ChartContainer config={revenueChartConfig} className="h-[200px] w-full">
                <LineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="var(--color-revenue)" 
                    strokeWidth={2}
                  />
                </LineChart>
              </ChartContainer>
            ) : (
              <p className="text-sm text-muted-foreground text-center py-8">
                No revenue data available
              </p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            {recentOrders.length === 0 ? (
              <p className="text-sm text-muted-foreground">No orders yet</p>
            ) : (
              <div className="space-y-3">
                {recentOrders.map((order) => (
                  <div
                    key={order.id}
                    className="flex items-center justify-between border-b pb-2 last:border-0"
                    data-testid={`order-${order.id}`}
                  >
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {order.userName}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        ₹{(order.amount / 100).toLocaleString("en-IN")}
                      </p>
                    </div>
                    <div className={`text-xs font-medium px-2 py-1 rounded ${
                      order.status === "paid"
                        ? "bg-green-100 text-green-800"
                        : order.status === "pending"
                        ? "bg-orange-100 text-orange-800"
                        : "bg-red-100 text-red-800"
                    }`}>
                      {order.status}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
