import dwolla from "dwolla-v2";

const dwollaClient = new dwolla.Client({
  key: process.env.DWOLLA_KEY!,
  secret: process.env.DWOLLA_SECRET!,
  environment:
    process.env.DWOLLA_ENV === "production" ? "production" : "sandbox",
});

export default dwollaClient;
