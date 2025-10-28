import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import ViteYaml from "@modyfi/vite-plugin-yaml";
import { netlifyPlugin } from "@netlify/remix-adapter/plugin";
import { plugin as mdPlugin, Mode } from "vite-plugin-markdown";
import dynamicImport from "vite-plugin-dynamic-import";

export default defineConfig({
  plugins: [
    remix(),
    netlifyPlugin(),
    tsconfigPaths(),
    dynamicImport(),
    ViteYaml(),
    mdPlugin({ mode: [Mode.MARKDOWN] }),
  ],
});
