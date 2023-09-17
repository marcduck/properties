// sanity.js
import { createClient } from "@sanity/client";

import imageUrlBuilder from "@sanity/image-url";
// Import using ESM URL imports in environments that supports it:
// import {createClient} from 'https://esm.sh/@sanity/client'

export const projectId = "1emj1fo4";
export const dataset = "production";

export const client = createClient({
  projectId: projectId,
  dataset: dataset,
  token: process.env.VITE_SANITY_API_KEY,
  useCdn: false, // set to `true` to fetch from edge cache
  apiVersion: `${new Date().toISOString().slice(0, 10)}`, // use current date (YYYY-MM-DD) to target the latest API version
});

const builder = imageUrlBuilder(client);

export function urlFor(source) {
  return builder.image(source);
}
