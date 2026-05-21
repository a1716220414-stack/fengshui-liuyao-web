type PayPalLink = {
  href: string;
  rel: string;
};

type PayPalOrder = {
  id: string;
  status: string;
  links?: PayPalLink[];
  purchase_units?: Array<{
    payments?: {
      captures?: Array<{
        id?: string;
        status?: string;
        amount?: {
          currency_code?: string;
          value?: string;
        };
      }>;
    };
  }>;
};

function requiredEnv(name: string) {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing ${name}`);
  }

  return value;
}

export function getPayPalBaseUrl() {
  return process.env.PAYPAL_ENV === "live"
    ? "https://api-m.paypal.com"
    : "https://api-m.sandbox.paypal.com";
}

export function getSiteUrl() {
  return (
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.VERCEL_PROJECT_PRODUCTION_URL?.replace(/^/, "https://") ||
    "http://localhost:3000"
  ).replace(/\/$/, "");
}

export function getPayPalAiReadingPrice() {
  const raw = process.env.AI_READING_PRICE_USD || "2.99";
  const price = Number(raw);

  if (!Number.isFinite(price) || price <= 0) {
    throw new Error("Invalid AI_READING_PRICE_USD");
  }

  return price.toFixed(2);
}

export function getPayPalCurrency() {
  return process.env.PAYPAL_CURRENCY || "USD";
}

async function getPayPalAccessToken() {
  const credentials = Buffer.from(
    `${requiredEnv("PAYPAL_CLIENT_ID")}:${requiredEnv("PAYPAL_CLIENT_SECRET")}`,
  ).toString("base64");

  const response = await fetch(`${getPayPalBaseUrl()}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${credentials}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });

  const data = await response.json();

  if (!response.ok || !data.access_token) {
    throw new Error(data.error_description || "Failed to get PayPal token");
  }

  return String(data.access_token);
}

export async function createPayPalOrder({
  orderId,
  serviceType,
  subject,
}: {
  orderId: string;
  serviceType: string;
  subject: string;
}) {
  const accessToken = await getPayPalAccessToken();
  const siteUrl = getSiteUrl();

  const response = await fetch(`${getPayPalBaseUrl()}/v2/checkout/orders`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      intent: "CAPTURE",
      purchase_units: [
        {
          reference_id: orderId,
          custom_id: orderId,
          description: subject,
          amount: {
            currency_code: getPayPalCurrency(),
            value: getPayPalAiReadingPrice(),
          },
        },
      ],
      payment_source: {
        paypal: {
          experience_context: {
            brand_name: "SY Metaphysics",
            landing_page: "LOGIN",
            shipping_preference: "NO_SHIPPING",
            user_action: "PAY_NOW",
            return_url: `${siteUrl}/payment/alipay-success?provider=paypal&serviceType=${serviceType}`,
            cancel_url: `${siteUrl}/${serviceType}`,
          },
        },
      },
    }),
  });

  const data = (await response.json()) as PayPalOrder;

  if (!response.ok || !data.id) {
    throw new Error("Failed to create PayPal order");
  }

  const approveUrl = data.links?.find((link) => link.rel === "payer-action")
    ?.href;

  if (!approveUrl) {
    throw new Error("PayPal did not return an approval URL");
  }

  return {
    paypalOrderId: data.id,
    approveUrl,
  };
}

export async function capturePayPalOrder(paypalOrderId: string) {
  const accessToken = await getPayPalAccessToken();

  const response = await fetch(
    `${getPayPalBaseUrl()}/v2/checkout/orders/${encodeURIComponent(
      paypalOrderId,
    )}/capture`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    },
  );

  const data = (await response.json()) as PayPalOrder;

  if (!response.ok) {
    throw new Error("Failed to capture PayPal order");
  }

  const capture = data.purchase_units?.[0]?.payments?.captures?.[0];

  return {
    paypalOrder: data,
    captureId: capture?.id || null,
    status: data.status,
    captureStatus: capture?.status || "",
  };
}
