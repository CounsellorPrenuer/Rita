import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, timestamp, boolean, pgEnum, index } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const orderStatusEnum = pgEnum("order_status", ["pending", "paid", "failed", "refunded"]);

export const adminSessions = pgTable("admin_sessions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  token: text("token").notNull().unique(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const services = pgTable("services", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  description: text("description").notNull(),
  features: text("features").array().notNull(),
  price: integer("price").notNull(),
  icon: text("icon").notNull(),
  displayOrder: integer("display_order").notNull().default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
}, (table) => ({
  displayOrderIdx: index("services_display_order_idx").on(table.displayOrder),
}));

export const testimonials = pgTable("testimonials", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  role: text("role").notNull(),
  company: text("company").notNull(),
  content: text("content").notNull(),
  image: text("image").notNull(),
  displayOrder: integer("display_order").notNull().default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
}, (table) => ({
  displayOrderIdx: index("testimonials_display_order_idx").on(table.displayOrder),
}));

export const blogPosts = pgTable("blog_posts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  excerpt: text("excerpt").notNull(),
  content: text("content").notNull(),
  category: text("category").notNull(),
  image: text("image").notNull(),
  readTime: integer("read_time").notNull(),
  published: boolean("published").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
}, (table) => ({
  publishedCreatedAtIdx: index("blog_posts_published_created_at_idx").on(table.published, table.createdAt),
  slugIdx: index("blog_posts_slug_idx").on(table.slug),
}));

export const orders = pgTable("orders", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userName: text("user_name").notNull(),
  userEmail: text("user_email").notNull(),
  userPhone: text("user_phone"),
  serviceId: varchar("service_id").notNull().references(() => services.id),
  amount: integer("amount").notNull(),
  razorpayOrderId: text("razorpay_order_id"),
  razorpayPaymentId: text("razorpay_payment_id"),
  razorpaySignature: text("razorpay_signature"),
  status: orderStatusEnum("status").notNull().default("pending"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
}, (table) => ({
  serviceIdIdx: index("orders_service_id_idx").on(table.serviceId),
  statusIdx: index("orders_status_idx").on(table.status),
  createdAtIdx: index("orders_created_at_idx").on(table.createdAt),
}));

export const insertAdminSessionSchema = createInsertSchema(adminSessions).omit({
  id: true,
  createdAt: true,
});

export const insertServiceSchema = createInsertSchema(services).omit({
  id: true,
  createdAt: true,
}).extend({
  price: z.number().int().positive().describe("Price in paise (smallest currency unit)"),
  features: z.array(z.string().min(1)).min(1).describe("At least one feature required"),
  displayOrder: z.number().int().min(0).optional(),
});

export const insertTestimonialSchema = createInsertSchema(testimonials).omit({
  id: true,
  createdAt: true,
}).extend({
  displayOrder: z.number().int().min(0).optional(),
});

export const insertBlogPostSchema = createInsertSchema(blogPosts).omit({
  id: true,
  createdAt: true,
}).extend({
  slug: z.string().min(1).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug must be lowercase with hyphens"),
  readTime: z.number().int().positive().describe("Read time in minutes"),
});

export const insertOrderSchema = createInsertSchema(orders).omit({
  id: true,
  createdAt: true,
}).extend({
  userEmail: z.string().email(),
  amount: z.number().int().positive().describe("Amount in paise"),
});

export type InsertAdminSession = z.infer<typeof insertAdminSessionSchema>;
export type AdminSession = typeof adminSessions.$inferSelect;

export type InsertService = z.infer<typeof insertServiceSchema>;
export type Service = typeof services.$inferSelect;

export type InsertTestimonial = z.infer<typeof insertTestimonialSchema>;
export type Testimonial = typeof testimonials.$inferSelect;

export type InsertBlogPost = z.infer<typeof insertBlogPostSchema>;
export type BlogPost = typeof blogPosts.$inferSelect;

export type InsertOrder = z.infer<typeof insertOrderSchema>;
export type Order = typeof orders.$inferSelect;
