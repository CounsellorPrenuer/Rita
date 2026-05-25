import { defineType, defineField } from "sanity";

const imageField = (name: string, title: string, required = false) =>
  defineField({
    name,
    title,
    type: "image",
    options: { hotspot: true },
    validation: required ? (r) => r.required() : undefined,
    fields: [
      defineField({
        name: "alt",
        type: "string",
        title: "Alt text",
        description: "Describe the image for accessibility and SEO",
      }),
    ],
  });

const siteSettings = defineType({
  name: "siteSettings",
  type: "document",
  title: "Site Settings",
  fields: [
    defineField({ name: "siteTitle", type: "string", title: "Site title" }),
    imageField("logo", "Logo (header)", false),
    imageField("heroPortrait", "Hero portrait", false),
    imageField("aboutImage", "About section image", false),
  ],
});

const standardPlan = defineType({
  name: "standardPlan",
  type: "document",
  title: "Standard Plan",
  fields: [
    defineField({ name: "planId", type: "string", validation: (r) => r.required() }),
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "subgroup",
      type: "string",
      options: { list: ["8-10", "10-12", "college", "working"] },
      validation: (r) => r.required(),
    }),
    defineField({ name: "price", type: "number", validation: (r) => r.required() }),
    defineField({ name: "features", type: "array", of: [{ type: "string" }], validation: (r) => r.required() }),
    defineField({ name: "order", type: "number" }),
  ],
});

const customPlan = defineType({
  name: "customPlan",
  type: "document",
  title: "Custom Plan",
  fields: [
    defineField({ name: "planId", type: "string", validation: (r) => r.required() }),
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "price", type: "number", validation: (r) => r.required() }),
    defineField({ name: "description", type: "text", validation: (r) => r.required() }),
    defineField({ name: "order", type: "number" }),
  ],
});

const blogPost = defineType({
  name: "blogPost",
  type: "document",
  title: "Blog Post",
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    imageField("coverImage", "Cover image", false),
    defineField({ name: "category", type: "string", title: "Category" }),
    defineField({ name: "readTime", type: "number", title: "Read time (minutes)" }),
    defineField({ name: "excerpt", type: "text", validation: (r) => r.required() }),
    defineField({ name: "content", type: "text", validation: (r) => r.required() }),
    defineField({ name: "publishedAt", type: "datetime", validation: (r) => r.required() }),
  ],
});

const services = defineType({
  name: "services",
  type: "document",
  title: "Services",
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "subtitle", type: "string" }),
    imageField("image", "Service image", false),
    defineField({ name: "features", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "order", type: "number" }),
  ],
});

const testimonials = defineType({
  name: "testimonials",
  type: "document",
  title: "Testimonials",
  fields: [
    defineField({ name: "name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "role", type: "string", validation: (r) => r.required() }),
    defineField({ name: "achievement", type: "string" }),
    imageField("photo", "Client photo", false),
    defineField({ name: "quote", type: "text", validation: (r) => r.required() }),
    defineField({ name: "order", type: "number" }),
  ],
});

export const schemaTypes = [
  siteSettings,
  standardPlan,
  customPlan,
  blogPost,
  services,
  testimonials,
];
