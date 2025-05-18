import React from "react";
import { BaseLayout } from "@/components/layouts/BaseLayout";

export default function StyleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <BaseLayout>{children}</BaseLayout>;
} 