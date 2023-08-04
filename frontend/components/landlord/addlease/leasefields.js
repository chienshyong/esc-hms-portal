import { TextField, InputAdornment} from '@mui/material';

export default function LeaseField({formData,handleInputChange}) {
    return (
    <section className='mt-4 flex flex-col gap-4 w-96'>
          <TextField
            name="tenantUsername"
            label="Tenant Username"
            value={formData.tenantUsername}
            onChange={handleInputChange}
            required
          />
          <TextField
            name="unitID"
            label="Unit ID"
            value={formData.unitID}
            onChange={handleInputChange}
            required
          />
          <TextField
            name="monthlyRent"
            label="Monthly Rent"
            value={formData.monthlyRent}
            onChange={handleInputChange}
            InputProps={{
                startAdornment: <InputAdornment position="start">$</InputAdornment>,
            }}
            required
          />
          <TextField
            name="commencementDate"
            label="Commencement Date"
            type="date"
            value={formData.commencementDate}
            onChange={handleInputChange}
            required
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            name="terminationDate"
            label="Termination Date"
            type="date"
            value={formData.terminationDate}
            onChange={handleInputChange}
            required
            InputLabelProps={{
              shrink: true,
            }}
         />
        <TextField
          name="expiryDate"
          label="Expiry Date"
          type="date"
          value={formData.expiryDate}
          onChange={handleInputChange}
          required
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
            name="areaInSq"
            label="Area in Sq"
            value={formData.areaInSq}
            onChange={handleInputChange}
            InputProps={{
                endAdornment: <InputAdornment position="end">sq</InputAdornment>,
            }}
            required
        />              
        <TextField
          name="tradeType"
          label="Trade Type"
          value={formData.tradeType}
          onChange={handleInputChange}
          required
        />
    </section>
  )
}