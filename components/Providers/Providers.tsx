"use client";

import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <TanStackProvider>
      {children}
    </TanStackProvider>
  );
}