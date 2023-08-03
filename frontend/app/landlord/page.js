'use client'
import { landlordauth } from "../auth"

export default function LandlordLanding() {
    landlordauth()
    return (
        <section className="h-full flex flex-col">
            <h1 className="mb-1 text-4xl font-extrabold">Hello Landlord!</h1>
        </section>
    )
}