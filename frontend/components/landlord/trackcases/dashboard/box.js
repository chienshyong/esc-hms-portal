import { Description,HomeRepairService,Grid3x3,AccessTime,Boy } from '@mui/icons-material';
import { Divider} from '@mui/material';
import Link from 'next/link';

//tag represents status and category
export default function Box({id, user, timeupload, tag, address, description}) {

    const maxLength = 70
    var truncatedDescription = description

    if (description.length > maxLength){
        truncatedDescription = description.substring(0, maxLength) + "..."
    }

    const colorDictionary = {
        "Submitted": "bg-blue-400",
        "Rejected": "bg-red-400",
        "Completed": "bg-green-400",
        "Accepted": "bg-yellow-400",
        "Pending Quotation": "bg-orange-400",
        "Canceled": "bg-black-400",

        "Lighting": "bg-blue-500",
        "Electricity": "bg-yellow-500",
        "Horticulture": "bg-green-500",
        "Aircon": "bg-slate-400",
        "Cleanliness": "bg-indigo-400",
        "Security": "bg-stone-400",
        "Elevator": "bg-orange-400",
        "Others": "bg-gray-400"
    };

    return(
        <Link  href={`/tenant/timeline/${id}`} className="h-56 w-64 m-2 bg-white rounded-md hover:bg-gray-300 no-underline text-black">
            <section className="flex items-center justify-center my-3">
                <div className={`${colorDictionary[tag]} flex justify-center items-center h-5 w-36 text-white text-xs rounded-lg`}>
                    {tag}
                </div>
            </section>
            <Divider variant="middle"></Divider>
            <section className='mt-4 ml-3'>
                <p className="flex items-center gap-2 text-sm my-1.5"><AccessTime/> {timeupload}</p>
                <p className="flex items-center gap-2 text-sm my-1.5"><Grid3x3/> {id}</p>
                <p className="flex items-center gap-2 text-sm my-1.5"><Boy/> {user}</p>
                <p className="flex items-center gap-2 text-sm my-1.5"><HomeRepairService/> {address}</p>
                <p className="flex gap-2 text-sm my-1.5 pr-5">< Description/> {truncatedDescription}</p>
            </section>
        </Link>
    )
}