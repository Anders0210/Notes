import { defineConfig } from "vite";
// importer dotenv for at kunne hente environment variabler i lokalt udviklermiljø
import dotenv from "dotenv";

// Load environment variables from .env.local
dotenv.config({ path: ".env.local" });
// definere konfigurationen for Vite, i det lokale miljø
export default defineConfig({
  define: {
    "process.env": {
      FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
      FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
      FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
      FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET,
      FIREBASE_MESSAGING_SENDER_ID: process.env.FIREBASE_MESSAGING_SENDER_ID,
      FIREBASE_APP_ID: process.env.FIREBASE_APP_ID,
    },
  },
});
