import { TextField,InputAdornment,Button } from "@mui/material"
import { FileView } from "./fileview"

export default function ViewQuotation({amount,fileName,isCurrentAction,handleAccept,isRejected, handleReject}) {
    return(
        <section>
            {isRejected === false ? null : <p className="mt-0 font-light text-red-500">--- Pending Re-evaluation ---</p>}
            <TextField
                id="outlined-amount-input"
                label="Amount"
                type="text"
                value={amount}
                InputProps={{
                    readOnly: true,
                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                  }}
            />
            <section>
                <p className="text-lg mb-1">Upload Quotation</p>
                <div className="text-xs flex items-center gap-6">
                    View Quotation:
                    <FileView fileName={fileName} /> 
                </div>
            </section>
            <div>
                {isCurrentAction === true && isRejected === false ? (
                  <section className="flex gap-8 justify-center mt-12">
                    <Button variant="contained" color="success" onClick={handleAccept}>Accept</Button>
                    <Button variant="contained" color="error" onClick={handleReject}>Reject</Button>
                  </section>
                ) : null}
            </div>
        </section>
    )
}