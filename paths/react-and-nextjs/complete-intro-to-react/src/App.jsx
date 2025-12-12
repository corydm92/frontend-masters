import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ErrorBoundary from "./ErrorBoundary";

const App = () => {
    const router = createRouter({ routeTree });
    const queryClient = new QueryClient();
    return (
        <StrictMode>
            <QueryClientProvider client={queryClient}>
                <RouterProvider router={router} />
            </QueryClientProvider>
        </StrictMode>
    );
};

const AppWithErrorBoundary = () => {
    return (
        <ErrorBoundary>
            <App />
        </ErrorBoundary>
    );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<AppWithErrorBoundary />);
