"use client"
import { UpcomingNext } from "@/components/UpComingNext"
import { First } from "@/components/First"
import { useState } from "react"

export default function Home() {

    const [currentPage, setCurrentPage] = useState(0)
    const onBack = () => {}

    return (
        <div>
            <First />
            <UpcomingNext  onBack={onBack}/>
            <div></div>
        </div>
    )
}