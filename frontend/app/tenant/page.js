'use client'
import { tenantauth } from "@/app/auth"

export default function TenantLanding() {
    tenantauth()
    return (
        <section className="h-full flex flex-col justify-center items-center ">
            <h1 className="mb-1 text-4xl font-extrabold text-center">Hello Tenant!</h1>
        </section>
    )
}