import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/Home";
import AdminLogin from "@/pages/admin/Login";
import AdminDashboard from "@/pages/admin/Dashboard";
import AdminServices from "@/pages/admin/Services";
import AdminTestimonials from "@/pages/admin/Testimonials";
import AdminBlogPosts from "@/pages/admin/BlogPosts";
import AdminOrders from "@/pages/admin/Orders";
import AdminLayout from "@/components/admin/AdminLayout";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/admin/login" component={AdminLogin} />
      <Route path="/admin/dashboard">
        <AdminLayout>
          <AdminDashboard />
        </AdminLayout>
      </Route>
      <Route path="/admin/services">
        <AdminLayout>
          <AdminServices />
        </AdminLayout>
      </Route>
      <Route path="/admin/testimonials">
        <AdminLayout>
          <AdminTestimonials />
        </AdminLayout>
      </Route>
      <Route path="/admin/blog-posts">
        <AdminLayout>
          <AdminBlogPosts />
        </AdminLayout>
      </Route>
      <Route path="/admin/orders">
        <AdminLayout>
          <AdminOrders />
        </AdminLayout>
      </Route>
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
