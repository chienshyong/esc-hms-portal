'use client'
import { tenantauth } from "@/app/auth"
import ServiceForm from "@/components/tenant/form/serviceform"

export default function ServiceSelection({params}) {
    tenantauth()
    return (
        <section>
            <h1 className="mb-1 text-4xl font-extrabold text-center">{params.serviceform}</h1>
            <ServiceForm title={params.serviceform}></ServiceForm>
        </section>
    )
}