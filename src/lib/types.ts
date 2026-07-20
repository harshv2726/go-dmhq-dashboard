// Mirrors of the Go API's JSON shapes (backend/internal/**/model.go).
// Hand-written, not codegen'd — keep in sync by hand when the backend changes.

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
}

// Standard envelope for every paginated list endpoint
// (backend/pkg/pagination.Result).
export interface Paginated<T> {
  items: T[];
  page: number;
  limit: number;
  total: number;
  total_pages: number;
}

export type StaffRole = "owner" | "manager" | "staff";

export interface AuthResponse {
  access_token: string;
  refresh_token: string;
  user_id: string;
  store_id: string;
  store_slug: string;
  staff_role: StaffRole;
  role: "seller" | "support";
  // Set only when this session was minted by Superboard (DMHQ support)
  // entering an approved access request — see auth.IssueActingTokens.
  access_request_id?: string;
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
  theme_background: string;
  theme_text: string;
  theme_cta_color: string;
  theme_subtle: string;
  theme_preset: string | null;
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
  tax_inclusive: boolean;
  default_shipping_fee: number;
  shipping_fee_mode: "flat" | "free" | "free_above";
  free_shipping_above_amount: number;
  ship_all_india: boolean;
  restricted_states: string[];
  delivery_estimate_text: string | null;
  whatsapp_notifications_enabled: boolean;
  meta_pixel_id: string | null;
  ga4_measurement_id: string | null;
  plan: "" | "backend" | "full";
  plan_expires_at: string | null;
  plan_cancelled_at: string | null;
  storefront_live: boolean;
  api_key: string;
  created_at: string;
  updated_at: string;
}

export type Plan = "backend" | "full";

export interface PlanInfo {
  key: Plan;
  name: string;
  priceLabel: string;
  amountPaise: number;
  description: string;
  features: string[];
}

// Prices are enforced server-side (internal/billing) — this is display
// only, kept in sync by hand.
export const PLANS: PlanInfo[] = [
  {
    key: "backend",
    name: "Backend",
    priceLabel: "₹199/mo",
    amountPaise: 19900,
    description: "Run your business from the dashboard — no public storefront.",
    features: ["Seller dashboard", "Products & inventory", "Orders & customers", "WhatsApp notifications"],
  },
  {
    key: "full",
    name: "Full access",
    priceLabel: "₹499/mo",
    amountPaise: 49900,
    description: "Everything in Backend, plus a live storefront customers can buy from.",
    features: ["Everything in Backend", "Public storefront at dmhq.in/you", "Checkout links & payments", "Storefront customization"],
  },
];

export interface SubscribeResponse {
  razorpay_order_id: string;
  amount: number;
  currency: string;
  key_id: string;
}

export interface ProductImage {
  id: string;
  url: string;
  alt: string;
}

export type ProductStatus = "active" | "draft" | "archived";
export type InventoryPolicy = "deny" | "continue";

export interface ProductOption {
  id: string;
  product_id: string;
  name: string;
  position: number;
  values: string[];
}

export interface ProductVariant {
  id: string;
  product_id: string;
  store_id: string;
  title: string;
  option1: string | null;
  option2: string | null;
  option3: string | null;
  price: number;
  compare_at_price: number | null;
  sku: string | null;
  barcode: string | null;
  position: number;
  inventory_quantity: number;
  inventory_policy: InventoryPolicy;
  requires_shipping: boolean;
  taxable: boolean;
  weight: number;
  weight_unit: string;
  image_id: string | null;
  created_at: string;
  updated_at: string;
}

// Price/SKU/inventory live entirely on variants, not the product — a
// "simple" product still gets exactly one ("Default Title") variant under
// the hood. price_min/price_max/total_inventory are computed server-side.
export interface Product {
  id: string;
  store_id: string;
  collection_id: string | null;
  name: string;
  slug: string;
  description: string | null;
  vendor: string | null;
  product_type: string | null;
  tags: string | null;
  status: ProductStatus;
  images: ProductImage[];
  seo_title: string | null;
  seo_description: string | null;
  options: ProductOption[];
  variants: ProductVariant[];
  price_min: number;
  price_max: number;
  total_inventory: number;
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

export interface Customer {
  id: string;
  store_id: string;
  name: string;
  email: string;
  phone: string;
  created_at: string;
  order_count: number;
  total_spent: number;
}

export interface UploadResult {
  url: string;
}

export type AccessRequestStatus = "pending" | "approved" | "denied" | "revoked" | "expired";

// A DMHQ support agent's request for temporary access to this store,
// awaiting (or having received) the owner's approval — see internal/support
// in the backend.
export interface AccessRequest {
  id: string;
  store_id: string;
  requested_by_id: string;
  reason: string;
  status: AccessRequestStatus;
  approved_at: string | null;
  denied_at: string | null;
  revoked_at: string | null;
  expires_at: string | null;
  created_at: string;
  updated_at: string;
}

export type MenuLinkType = "url" | "collection" | "product";

export interface MenuChild {
  id: string;
  menu_item_id: string;
  label: string;
  link_type: MenuLinkType;
  link_value: string;
  position: number;
}

export interface MenuItem {
  id: string;
  store_id: string;
  label: string;
  link_type: MenuLinkType;
  link_value: string;
  position: number;
  children: MenuChild[];
}
