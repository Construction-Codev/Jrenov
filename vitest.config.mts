import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    alias: { "@": fileURLToPath(new URL("./", import.meta.url)) },
  },
  test: {
    environment: "node",
    include: ["tests/**/*.test.ts"],
    // Aucun appel réseau réel : Resend, DNS et Cloudflare sont simulés dans les tests
    restoreMocks: true,
  },
});
