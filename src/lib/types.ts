// Mirrors of the Go API's JSON shapes (backend/internal/**/model.go).
// Hand-written, not codegen'd — keep in sync by hand when the backend changes.

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
}

export type StaffRole = "owner" | "manager" | "staff";

export interface AuthResponse {
  access_token: string;
  refresh_token: string;
  user_id: string;
  store_id: string;
  store_slug: string;
  staff_role: StaffRole;
}

export interface Store {
  id: string;
  slug: string;
  name: string;
  tagline: string | null;
  description: string | null;
  logo_url: string | null;
  banner_url: string | null;
  theme_color: string;
  font_family: string | null;
  instagram_url: string | null;
  whatsapp_number: string | null;
  seo_title: string | null;
  seo_description: string | null;
  is_active: boolean;
  address_line1: string | null;
  address_line2: string | null;
  city: string | null;
  state: string | null;
  pincode: string | null;
  country: string | null;
  timezone: string;
  currency: string;
  customer_accounts_mode: "disabled" | "optional" | "required";
  refund_policy: string | null;
  privacy_policy: string | null;
  terms_of_service: string | null;
  shipping_policy: string | null;
  tax_rate_percent: number;
  default_shipping_fee: number;
  created_at: string;
  updated_at: string;
}

export interface ProductImage {
  url: string;
  alt: string;
}

export interface Product {
  id: string;
  store_id: string;
  collection_id: string | null;
  name: string;
  slug: string;
  description: string | null;
  price: number;
  compare_price: number | null;
  sku: string | null;
  stock_qty: number;
  is_active: boolean;
  images: ProductImage[];
  seo_title: string | null;
  seo_description: string | null;
  created_at: string;
  updated_at: string;
}

export interface Collection {
  id: string;
  store_id: string;
  name: string;
  slug: string;
  description: string | null;
  image_url: string | null;
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export type OrderStatus = "pending" | "confirmed" | "shipped" | "delivered" | "cancelled";

export interface OrderItem {
  product_id: string;
  variant_id: string | null;
  name: string;
  variant_label: string | null;
  price: number;
  qty: number;
  subtotal: number;
}

export interface Order {
  id: string;
  store_id: string;
  status: OrderStatus;
  payment_status: string;
  subtotal: number;
  shipping_fee: number;
  tax_amount: number;
  total: number;
  razorpay_order_id: string | null;
  notes: string | null;
  items: OrderItem[];
  created_at: string;
  updated_at: string;
}

export interface DashboardStats {
  pending_orders: number;
  total_orders: number;
  total_products: number;
  total_revenue: number;
}

export interface UploadResult {
  url: string;
}
