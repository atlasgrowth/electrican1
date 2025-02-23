import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import HomePage from "@/pages/home";
import AdminPage from "@/pages/admin";

// Custom hook for base path
const useHashLocation = () => {
  const base = import.meta.env.MODE === 'production' ? '/electrican1' : '';
  const [location, setLocation] = useLocation();
  return [
    location.replace(base, ''),
    (to: string) => setLocation(base + to)
  ];
};

function Router() {
  return (
    <Switch hook={useHashLocation}>
      <Route path="/" component={HomePage} />
      <Route path="/admin" component={AdminPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
