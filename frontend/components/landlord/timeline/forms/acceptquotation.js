import { TextField,Rating} from "@mui/material"

export default function AcceptQuotation({isCurrentAction,rating,feedback}) {
    
    return(
        <section>
          {isCurrentAction === true ? (
            <section className="flex flex-col items-center">
              <div className="flex gap-3">
                Rate Our Service!:
                <Rating
                name="simple-controlled"
                value={rating}
                readOnly ={true}
              />
              </div>
              <TextField
                label="Feedback"
                variant="outlined"
                multiline
                rows={4}
                fullWidth
                value={feedback}
                margin="normal"
                InputProps={{
                  readOnly: true,
                }}
              />
            </section>
          ) : null}
        </section>
    )
}