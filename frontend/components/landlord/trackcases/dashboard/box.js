import { Phone,Email,Grid3x3 } from '@mui/icons-material';
import { Divider} from '@mui/material';
import Link from 'next/link';

//tag represents status and category
export default function Box({id,name,timeupload,tag,phonenumber,email,leaseid}) {
    const initials = name.split(" ").map(word => word.charAt(0)).join("");

    const colorDictionary = {
        "Submitted by Tenant": "bg-blue-400",
        "Rejected by Tenant": "bg-red-400",
        "Completed by Landlord": "bg-green-400",
        "Accepted by Tenant": "bg-orange-400",

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
            <section className="flex items-center justify-between m-3 mb-1">
                <div className='flex items-center gap-1'>
                    <div className="rounded-full bg-indigo-400 h-12 w-12 flex items-center justify-center text-white font-bold text-md">
                        {initials}
                    </div>
                </div>
                <div className={`${colorDictionary[tag]} flex justify-center items-center h-5 w-36 text-white text-xs rounded-lg`}>
                        {tag}
                </div>
            </section>
            <p className='text-md font-semibold ml-3 my-0'>{name}</p>
            <p className='text-xs font-light ml-3 mt-0 mb-2'>{timeupload}</p>
            <Divider variant="middle"></Divider>
            <section className='mt-4 ml-3'>
                <p className="flex items-center gap-2 text-sm my-1"><Phone/> {phonenumber}</p>
                <p className="flex items-center gap-2 text-sm my-1"><Email/> {email}</p>
                <p className="flex items-center gap-2 text-sm my-1"><Grid3x3/> {leaseid}</p>
            </section>
        </Link>
    )
}