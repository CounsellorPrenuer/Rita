import { createClient } from "@sanity/client";
import {
  SANITY_API_VERSION,
  SANITY_DATASET,
  SANITY_PROJECT_ID,
} from "@/lib/platform";

export const sanityClient = createClient({
  projectId: SANITY_PROJECT_ID,
  dataset: SANITY_DATASET,
  apiVersion: SANITY_API_VERSION,
  useCdn: false,
});

export type StandardPlan = {
  planId: string;
  title: string;
  subgroup: "8-10" | "10-12" | "college" | "working";
  price: number;
  features: string[];
  order?: number;
};

export type CustomPlan = {
  planId: string;
  title: string;
  price: number;
  description: string;
  order?: number;
};

export type ServiceItem = {
  title: string;
  subtitle: string;
  features: string[];
  order?: number;
  image?: SanityImageValue;
};

export type TestimonialItem = {
  name: string;
  role: string;
  achievement?: string;
  quote: string;
  order?: number;
  photo?: SanityImageValue;
};

export type SanityImageValue = {
  asset?: { _ref?: string; _type?: string };
  alt?: string;
} | null;

export type SiteSettings = {
  siteTitle?: string;
  logo?: SanityImageValue;
  heroPortrait?: SanityImageValue;
  aboutImage?: SanityImageValue;
};

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  publishedAt: string;
  coverImage?: SanityImageValue;
  category?: string;
  readTime?: number;
};

export const SITE_SETTINGS_QUERY = `*[_type == "siteSettings"][0]{
  siteTitle,
  logo,
  heroPortrait,
  aboutImage
}`;
