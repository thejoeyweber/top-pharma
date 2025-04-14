import { DashboardLayout } from "@workspace/ui/components/layouts/dashboard-layout"

export default function DashboardPageLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <DashboardLayout>{children}</DashboardLayout>
}
