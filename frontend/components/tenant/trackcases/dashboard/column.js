import Box from "./box"

export default function ColumnWithBoxes({boxes,groupby,groupbyvalue}) {
    let tagKey;

    if (groupby === 'status') {
      tagKey = 'category';
    } else if (groupby === 'category') {
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
              <Box key={box.id} id={box.id} timeupload={box.timeupload} tag={box[tagKey]} leaseid={box.leaseid} description={box.description}/>
            ))}
            </div>
        </section>
    )
}