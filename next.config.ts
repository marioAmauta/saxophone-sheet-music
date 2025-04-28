import { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  logging: {
    fetches: {
      fullUrl: true
    }
  }
};

const withNextIntl = createNextIntlPlugin({
  experimental: {
    createMessagesDeclaration: "./messages/en.json"
  }
});

export default withNextIntl(nextConfig);
