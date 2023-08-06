'use client'

import { landlordauth } from "@/app/auth"
import StepperView from "@/components/landlord/timeline/timeline"

export default function Timeline({params}) {
    landlordauth()
    return (
        <section>
            <h1 className="mb-1 text-3xl font-extrabold text-center">ServiceRequestID: {params.id}</h1>
            <StepperView svcid={params.id}></StepperView>
        </section>
    )
}