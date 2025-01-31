"use client";
import { PopularNext } from "@/components/PopularNext";
import { useState } from "react";
import { First } from "@/components/First";

export default function Home() {
  const [currentPage, setCurrentPage] = useState(0);
  const onBack = () => {};

  //   if (showNext) {
  //     return <PopularNext onBack={() => setShowNext(false)} currentPage={page} />;
  //   }

  return (
    <div>
        <First />
      <PopularNext onBack={onBack} currentPage={currentPage} />
    </div>
  );
}
