import { TextField,InputAdornment} from "@mui/material"
import SubmitButton from "@/components/shared/submitbutton"
import { FileView } from "./fileview"

export default function CreateQuotation({isCurrentAction,amount,handleAmountChange,fileName,handleFileChange,isQuotationSubmitted,handleQuotationSubmitted}) {
    if (!isCurrentAction) {
        return null;
    }

    return(
        <section>
            <form onSubmit={handleQuotationSubmitted}>
                <TextField
                    id="outlined-amount-input"
                    label="Amount"
                    value={amount}
                    onChange={handleAmountChange} 
                    type="text"
                    InputProps={{
                        startAdornment: <InputAdornment position="start">$</InputAdornment>,
                        readOnly: isQuotationSubmitted
                      }}
                />
                <section>
                    <p className="text-lg mb-1">Upload Quotation</p>
                    <div className="text-xs flex items-center gap-6">
                        View Quotation:
                        <FileView fileName={fileName} /> 
                    </div>
                    <div className="mt-2">
                        <input type="file" id="fileInput" onChange={handleFileChange} disabled={isQuotationSubmitted}/>
                    </div>
                </section>
                <section className="flex gap-8 justify-center mt-12">
                    {isQuotationSubmitted === true ? null : <SubmitButton onClick={handleQuotationSubmitted}></SubmitButton>}
                </section>
            </form>
        </section>
    )
}