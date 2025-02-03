"use client";
import { PopularNext } from "@/components/PopularNext";
import { useState } from "react";

export default function Home() {
  const [currentPage, setCurrentPage] = useState(0);
  const onBack = () => {};

  return (
    <div>
      <PopularNext onBack={onBack} currentPage={currentPage} />
    </div>
  );
}
