"use client"
import { UpcomingNext } from "@/components/UpComingNext"
import { useState } from "react"

export default function Home() {

    const [currentPage, setCurrentPage] = useState(0)
    const onBack = () => {}

    return (
        <div>
            <UpcomingNext  onBack={onBack}/>
        </div>
    )
}