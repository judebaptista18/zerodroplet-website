import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import {visionTool} from '@sanity/vision';
import { schemaTypes } from "./src/sanity/schemaTypes";
import {structure} from './src/sanity/structure';
export default defineConfig({
  name: "default",
  title: "Zero Droplet CMS",
  projectId: "wz33az8p",
  dataset: "production",
  auth: {
    loginMethod: 'token',
    redirectOnSingle: false,
    providers: [
      {
        name: 'google',
        title: 'Google',
        url: 'https://api.sanity.io/v1/auth/login/google',
      },
    ],
  },
  plugins: [structureTool({structure}), visionTool()],
  schema: { types: schemaTypes },
});
