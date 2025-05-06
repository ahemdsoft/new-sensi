// app/(auth)/reset-password/page.tsx
import ResetPassword from "@/app/components/reset-password";
import { Suspense } from "react";

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div>Loading reset password form...</div>}>
      <ResetPassword />
    </Suspense>
  );
}
