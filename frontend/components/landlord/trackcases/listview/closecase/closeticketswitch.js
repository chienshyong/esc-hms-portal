import { Switch, FormControlLabel } from '@mui/material';

export default function CloseCaseSwitch({checked, handleChange}) {
    return (
    <FormControlLabel
      control={<Switch checked={checked} onChange={handleChange} />}
      label="Close Case"
      className='mt-2'
    />
  );
}
