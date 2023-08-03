import UnitForm from "@/components/landlord/addunit/unitform"

export default function AddUnit(){
    return(
        <section className="flex flex-col justify-center items-center">
            <h1 className="mb-1 text-4xl font-extrabold">Add Unit</h1>
            <UnitForm></UnitForm>
        </section>
    )
}