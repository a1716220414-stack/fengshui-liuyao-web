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

  return alipaySdk.pageExecute("alipay.trade.page.pay", "GET", {
    notifyUrl,
    returnUrl,
    bizContent: {
      outTradeNo,
      productCode: "FAST_INSTANT_TRADE_PAY",
      totalAmount,
      subject,
      body,
    },
  });
}