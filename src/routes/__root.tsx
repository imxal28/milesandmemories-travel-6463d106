import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { Toaster } from "@/components/ui/sonner";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-serif text-7xl">404</h1>
        <h2 className="mt-4 font-serif text-2xl italic">Page not found</h2>
        <p className="mt-3 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has moved.
        </p>
        <div className="mt-8">
          <Link
            to="/"
            className="inline-flex items-center px-8 py-4 border border-foreground/20 text-[11px] uppercase tracking-[0.3em] font-semibold hover:bg-accent hover:border-accent hover:text-accent-foreground transition-all duration-500"
          >
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-serif text-3xl italic">Something went amiss.</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          A moment, please. You may refresh or return home.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="px-8 py-4 bg-foreground text-background text-[11px] uppercase tracking-[0.3em] font-semibold hover:bg-accent transition-colors"
          >
            Try again
          </button>
          <a
            href="/"
            className="px-8 py-4 border border-foreground/20 text-[11px] uppercase tracking-[0.3em] font-semibold hover:border-foreground/40 transition-colors"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Miles & Memories — Bespoke Travel, Curated to a T" },
      {
        name: "description",
        content:
          "Singapore-based bespoke travel curator designing culture- and food-led journeys to India, Nepal, Bhutan, Sri Lanka, and Vietnam.",
      },
      { name: "author", content: "Miles & Memories" },
      { property: "og:title", content: "Miles & Memories — Bespoke Travel, Curated to a T" },
      {
        property: "og:description",
        content:
          "Tailor-made luxury journeys across South Asia and Vietnam, designed with culture, cuisine, and connection at heart.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Miles & Memories — Bespoke Travel, Curated to a T" },
      { name: "description", content: "Miles and Memories curates bespoke luxury travel experiences focused on culture and cuisine." },
      { property: "og:description", content: "Miles and Memories curates bespoke luxury travel experiences focused on culture and cuisine." },
      { name: "twitter:description", content: "Miles and Memories curates bespoke luxury travel experiences focused on culture and cuisine." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/699bfc84-22c7-4ad2-a6a4-072d6e78f760/id-preview-dcaa1c37--dde9a2e9-57a2-4ccd-a5c6-1c85dbbe3009.lovable.app-1779765776549.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/699bfc84-22c7-4ad2-a6a4-072d6e78f760/id-preview-dcaa1c37--dde9a2e9-57a2-4ccd-a5c6-1c85dbbe3009.lovable.app-1779765776549.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=Inter:wght@300;400;500&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
      <Toaster />
    </QueryClientProvider>
  );
}
