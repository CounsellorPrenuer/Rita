import { PROJECT_ID, WORKER_BASE_URL } from "@/lib/platform";

type AnyObject = Record<string, unknown>;

async function parseSafeJson(res: Response): Promise<AnyObject> {
  const text = await res.text();
  try {
    return text ? JSON.parse(text) : {};
  } catch {
    throw new Error(text || `HTTP ${res.status}`);
  }
}

async function post(path: string, payload: AnyObject): Promise<AnyObject> {
  const res = await fetch(`${WORKER_BASE_URL}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ project_id: PROJECT_ID, ...payload }),
  });
  const body = await parseSafeJson(res);
  if (!res.ok) {
    throw new Error(String(body.error || body.message || `HTTP ${res.status}`));
  }
  return body;
}

export function submitLead(payload: AnyObject) {
  return post("/api/forms/submit", payload);
}

export function previewCoupon(payload: AnyObject) {
  const { coupon_code, code, ...rest } = payload;
  return post("/api/coupons/preview", { ...rest, code: code || coupon_code });
}

function withCustomer(payload: AnyObject): AnyObject {
  const customer = (payload.customer || {}) as AnyObject;
  return {
    ...payload,
    name: payload.name ?? customer.name,
    email: payload.email ?? customer.email,
    phone: payload.phone ?? customer.phone,
  };
}

export function createOrder(payload: AnyObject) {
  return post("/api/payments/create-order", withCustomer(payload));
}

export function verifyPayment(payload: AnyObject) {
  return post("/api/payments/verify", withCustomer(payload));
}
