import { TextField, InputAdornment} from '@mui/material';

export default function UnitField({formData,handleInputChange}) {
    return (
    <section className='mt-4 flex flex-col gap-4 w-96'>
        <TextField
            name="address"
            label="Address"
            value={formData.Address}
            onChange={handleInputChange}
            required
          />
    </section>
  )
}