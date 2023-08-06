import { EditNote} from '@mui/icons-material';

export default function ServiceRequestIcon({isCurrentAction}) {
    return(
        <div className={`w-14 h-14 rounded-full ${isCurrentAction ===true ? "bg-indigo-600" : "bg-gray-300"} flex items-center justify-center`}> 
            <EditNote fontSize="large"  sx={{ fontSize: 40, color: isCurrentAction ===true ? "#FFFFFF" : "#777777" }}/>
        </div> 
    )
}