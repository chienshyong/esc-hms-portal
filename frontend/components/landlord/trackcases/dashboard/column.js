import Box from "./box"

// name,timeupload,status,phonenumber,email,leaseid

export default function ColumnWithBoxes({boxes,groupby,groupbyvalue}) {
    let tagKey;

    if (groupby === 'status') {
      tagKey = 'category';
    } else if (groupby === 'category' || groupby === 'tenant') {
      tagKey = 'status';
    }

    return(
        <section>
            <div className="flex flex-col bg-gray-200 p-2 mt-4 rounded">
                <div className="flex items-center justify-center gap-2">
                    <p>{groupbyvalue}</p>
                    <div className="flex justify-center items-center bg-gray-400 w-8 h-4 rounded text-sm">{boxes.length} </div>
                </div>
            {boxes.map((box) => (
              <Box key={box.id} id={box.id} name={box.name} timeupload={box.timeupload} tag={box[tagKey]} phonenumber={box.phonenumber} email={box.email} leaseid={box.leaseid}/>
            ))}
            </div>
        </section>
    )
}