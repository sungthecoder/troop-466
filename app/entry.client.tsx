import { RemixBrowser } from "@remix-run/react";
import { startTransition } from "react";
import { hydrateRoot } from "react-dom/client";
import { ThemeProvider } from "@material-tailwind/react";
 
startTransition(() => {
  hydrateRoot(
    document,
    <ThemeProvider>
      <RemixBrowser />
    </ThemeProvider>
  );
});
