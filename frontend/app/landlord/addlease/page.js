import LeaseForm from "@/components/landlord/addlease/leaseform"

export default function AddLease(){
    return(
        <section className="flex flex-col justify-center items-center">
            <h1 className="mb-1 text-4xl font-extrabold">Add Lease</h1>
            <LeaseForm></LeaseForm>
        </section>
    )
}