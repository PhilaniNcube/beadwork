import { z } from "zod";

export const loginSchema = z.object({
	email: z.string().email(),
	password: z.string().min(6),
});

export const signUpSchema = z.object({
	email: z.string().email(),
	password: z.string().min(6),
	last_name: z.string().min(2),
	first_name: z.string().min(2),
});

export const categorySchema = z.object({
	name: z.string().min(2),
	parent_category_id: z.string().optional(),
});

export const addCategorySchema = z.object({
	name: z.string().min(2),
	parent_category_id: z.string().optional(),
  image_url: z.string().optional(),
});

export const materialsSchema = z.object({
	name: z.string(),
});

export const productSchema = z.object({
	title: z.string().min(2),
	description: z
		.string()
		.min(20, "Description must be at least 20 characters long"),
	stock: z.coerce.number().int().min(0),
	price: z.coerce.number().positive(),
	is_featured: z.boolean().default(false).optional(),
	categories: z.array(z.coerce.number()),
	materials: z.array(z.coerce.number()),
});

export const editProductSchema = z.object({
	id: z.coerce.number(),
	title: z.string().min(2),
	description: z
		.string()
		.min(20, "Description must be at least 20 characters long"),
	stock: z.coerce.number().int().min(0),
	price: z.coerce.number().positive(),
	is_featured: z.boolean().default(false).optional(),
});

export const shippingSchema = z.object({
	street_address: z.string().min(2),
	city: z.string().min(2),
	postal_code: z.string().min(2),
});

export const orderSchema = z.object({
	total_amount: z.coerce.number().positive(),
  phone_number: z.string(),
  email: z.string().email(),
  first_name: z.string(),
  last_name: z.string(),
	status: z
		.enum(["PENDING", "PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED"])
		.optional()
		.default("PENDING"),
	transaction_id: z.string().optional(),
	shipping_address_id: z.coerce.number().optional(),
});

export const orderItemSchema = z.object({
	order_id: z.string(),
	product_id: z.coerce.number(),
	quantity: z.coerce.number().int().positive(),
	price: z.coerce.number().positive(),
});

export type ProductListItemType = {
	id: number;
	title: string;
	price: number;
	product_images: { image_url: string }[];
	slug: string;
};

export type ProductCategory = {
	category_id: number;
	product_id: number;
};

export type ProductDetailsType = {
	created_at: string;
	description: string;
	id: number;
	is_featured: boolean;
	price: number;
	slug: string;
	stock: number;
	title: string;
	product_images: {
		created_at: string;
		id: number;
		image_url: string;
		is_primary: boolean;
		product_id: number;
	}[];
	categories: {
		id: number;
		name: string;
	}[];
	materials: {
		id: number;
		name: string;
	}[];
};
