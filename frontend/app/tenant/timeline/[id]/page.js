'use client'
import { tenantauth } from "@/app/auth"

export default function Timeline({params}) {
    tenantauth()
    return (
        <section>
            <h1 className="mb-1 text-4xl font-extrabold text-center">Viewing Timeline: {params.id}</h1>
        </section>
    )
}