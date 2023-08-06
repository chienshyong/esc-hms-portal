import Box from "./box"

export default function ColumnWithBoxes({boxes, groupby}) {
    let tagKey;
    let groupbyvalue;
    
    if (groupby === 'status') {
      tagKey = 'title';
      groupbyvalue = boxes[0].status
    } else if (groupby === 'category') {
      tagKey = 'status';
      groupbyvalue = boxes[0].title
    }

    return(
        <section>
            <div className="flex flex-col bg-gray-200 p-2 mt-4 rounded">
                <div className="flex items-center justify-center gap-2">
                    <p>{groupbyvalue}</p>
                    <div className="flex justify-center items-center bg-gray-400 w-8 h-6 rounded text-sm">{boxes.length} </div>
                </div>
            {boxes.map((box) => (
              <Box key={box.id} id={box.id} timeupload={box.submit_time} tag={box[tagKey]} address={box.address} description={box.description}/>
            ))}
            </div>
        </section>
    )
}