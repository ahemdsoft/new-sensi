"use client";

import { Suspense } from "react";
import VerifyEmail from "./components/VerifyEmail";
import TypingAnimation from "@/components/ui/loadingAnimation";

const Page = () => {
  return (
    <div>
      <Suspense
        fallback={
          <div>
            <TypingAnimation />
          </div>
        }
      >
        <VerifyEmail />
      </Suspense>
    </div>
  );
};

export default Page;
