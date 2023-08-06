'use client'
import { landlordauth } from "@/app/auth"
import ToggleView from "@/components/landlord/trackcases/toggleview"

// export default function TrackCases() {
//     landlordauth()
//     return (
//         <section>
//             <h1 className="text-3xl font-extrabold">Service Tickets</h1>
//             <TicketSelection></TicketSelection>
//         </section>
//     )
// }

export default function TrackCases() {
    landlordauth()
    return (
        <section>
            <h1 className="text-3xl font-extrabold mb-3">Service Tickets</h1>
            <ToggleView></ToggleView>
        </section>
    )
}