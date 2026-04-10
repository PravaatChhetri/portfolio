/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // WARNING: Wildcard hostname allows Next.js Image Optimization to proxy
    // ANY external URL. Restrict to known domains in production.
    // e.g. { hostname: "*.notion.so" }, { hostname: "s3.us-west-2.amazonaws.com" }
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },

  // ─── Security Headers ───
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), payment=()",
          },
          {
            key: "X-Powered-By",
            // Next.js normally exposes "Next.js" here — suppress it
            value: "",
          },
        ],
      },
      {
        // HSTS — only effective on HTTPS (no-op on localhost)
        source: "/(.*)",
        headers: [
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
