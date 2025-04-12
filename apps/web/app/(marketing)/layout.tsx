// File: apps/web/app/(marketing)/layout.tsx

import { MarketingLayout } from "@workspace/ui/components/layouts/marketing-layout";

export default function MarketingPageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <MarketingLayout>{children}</MarketingLayout>;
}