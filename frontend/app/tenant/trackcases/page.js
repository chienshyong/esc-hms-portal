'use client'
import { tenantauth } from "@/app/auth"
import ListView from "@/components/tenant/listview"
export default function TrackCases() {
    tenantauth()
    return (
        <section>
            <h1 className="text-3xl font-extrabold">Service Tickets</h1>
            <ListView></ListView>
        </section>
    )
}