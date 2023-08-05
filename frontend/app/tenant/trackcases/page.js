'use client'
import { tenantauth } from "@/app/auth"
import ToggleView from "@/components/tenant/trackcases/toggleview"

export default function TrackCases() {
    tenantauth()
    return (
        <section>
            <h1 className="text-3xl font-extrabold">Service Tickets</h1>
            <ToggleView></ToggleView>
        </section>
    )
}