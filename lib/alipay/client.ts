import { AlipaySdk } from "alipay-sdk";

function normalizeKey(key: string) {
  return key.replace(/\\n/g, "\n").trim();
}

function requiredEnv(name: string) {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing ${name}`);
  }

  return value;
}

export function getAlipayClient() {
  return new AlipaySdk({
    appId: requiredEnv("ALIPAY_APP_ID"),
    privateKey: normalizeKey(requiredEnv("ALIPAY_PRIVATE_KEY")),
    alipayPublicKey: normalizeKey(requiredEnv("ALIPAY_PUBLIC_KEY")),
    gateway: requiredEnv("ALIPAY_GATEWAY"),
    signType: "RSA2",
  });
}

export function createAlipayPagePayUrl({
  notifyUrl,
  returnUrl,
  outTradeNo,
  totalAmount,
  subject,
  body,
}: {
  notifyUrl: string;
  returnUrl: string;
  outTradeNo: string;
  totalAmount: string;
  subject: string;
  body: string;
}) {
  const alipaySdk = getAlipayClient();

  const payUrl = alipaySdk.pageExecute("alipay.trade.page.pay", "GET", {
    notifyUrl,
    returnUrl,
    bizContent: {
      out_trade_no: outTradeNo,
      product_code: "FAST_INSTANT_TRADE_PAY",
      total_amount: totalAmount,
      subject: subject.slice(0, 128),
      body: body.slice(0, 256),
    },
  });

  if (typeof payUrl !== "string" || !payUrl.includes("alipay.trade.page.pay")) {
    throw new Error("Failed to generate a valid Alipay payment URL.");
  }

  return payUrl;
}