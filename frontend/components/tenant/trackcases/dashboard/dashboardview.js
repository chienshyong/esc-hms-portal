import ColumnWithBoxes from "./column"

export default function DashboardView({data,option}) {
    return(
        <section className="flex flex-row gap-3">
            {data.map((d,index) => (
                <ColumnWithBoxes key={index} groupbyvalue={d[option]} groupby={option} boxes={d.boxes}/>
            ))}
        </section>
    )
}