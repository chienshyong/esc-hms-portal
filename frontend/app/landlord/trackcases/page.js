'use client'
import { landlordauth } from "@/app/auth"
import TicketSelection_old from "@/components/landlord/trackcases-old/ticketselection"

import ToggleView from "@/components/landlord/trackcases/toggleview"
import TicketSelection from "@/components/landlord/trackcases/closecase/closetickets"

// export default function TrackCases() {
//     landlordauth()
//     return (
//         <section>
//             <h1 className="text-3xl font-extrabold">Service Tickets</h1>
//             <TicketSelection_old></TicketSelection_old>
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