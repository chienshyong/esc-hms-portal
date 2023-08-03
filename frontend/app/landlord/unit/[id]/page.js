'use client'
import { landlordauth } from "@/app/auth"

export default function Timeline({params}) {
    landlordauth()
    return (
        <section>
            <h1 className="mb-1 text-4xl font-extrabold text-center">Viewing Unit: {params.id}</h1>
        </section>
    )
}