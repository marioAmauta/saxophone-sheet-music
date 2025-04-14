import { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  logging: {
    fetches: {
      fullUrl: true
    }
  },
  experimental: {
    ppr: "incremental",
    nodeMiddleware: true
  }
};

const withNextIntl = createNextIntlPlugin({
  experimental: {
    createMessagesDeclaration: ["./messages/en.json", "./messages/es.json"]
  }
});

export default withNextIntl(nextConfig);
