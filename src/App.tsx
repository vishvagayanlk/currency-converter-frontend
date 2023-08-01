import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import CurrencyConverter from "./pages/Converter";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CurrencyConverter />
    </QueryClientProvider>
  );
}

export default App;
