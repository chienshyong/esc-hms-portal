import { TextField,Rating} from "@mui/material"
import SubmitButton from "@/components/shared/submitbutton"

export default function AcceptQuotation({isCurrentAction,
  rating,
  handleRatingChange,
  feedback,
  handleFeedbackChange,
  isSubmitted,
  handleFeedbackSubmit,}) {
    // isCurrentAction = true
    return(
        <section>
          {isCurrentAction === true ? (
            <form onSubmit={handleFeedbackSubmit} className="flex flex-col items-center">
              <div className="flex gap-3">
                Rate Our Service!:
                <Rating
                name="simple-controlled"
                value={rating}
                onChange={handleRatingChange}
                readOnly ={isSubmitted}
              />
              </div>
              <TextField
                label="Feedback"
                variant="outlined"
                multiline
                rows={4}
                fullWidth
                value={feedback}
                onChange={handleFeedbackChange}
                margin="normal"
                InputProps={{
                  readOnly: isSubmitted,
                }}
              />
              {isSubmitted === true ? null : <SubmitButton onClick={handleFeedbackSubmit} />}
            </form>
          ) : null}
        </section>
    )
}