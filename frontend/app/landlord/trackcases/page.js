'use client'
import { landlordauth } from "@/app/auth"
import TicketSelection from "@/components/landlord/trackcases/ticketselection"

export default function TrackCases() {
    landlordauth()
    return (
        <section>
            <h1 className="text-3xl font-extrabold">Service Tickets</h1>
            <TicketSelection></TicketSelection>
        </section>
    )
}