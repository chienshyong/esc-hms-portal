import ListUnits from "@/components/landlord/manageunits/listunits"
import AddUnitButton from "@/components/landlord/manageunits/addunitbutton"

export default function ManageUnits() {
    return (
        <section className="h-full flex flex-col">
            <h1 className="mb-1 text-4xl font-extrabold">Manage Units</h1>
            <AddUnitButton></AddUnitButton>
            <ListUnits></ListUnits>
        </section>
    )
}