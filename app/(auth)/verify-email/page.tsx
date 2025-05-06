"use client";

import { Suspense } from "react";
import VerifyEmail from "./components/VerifyEmail";

const Page = () => {
  return (
    <div>
      <Suspense
        fallback={
          <div>
          </div>
        }
      >
        <VerifyEmail />
      </Suspense>
    </div>
  );
};

export default Page;
