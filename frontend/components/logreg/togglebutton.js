import { ToggleButtonGroup, ToggleButton } from "@mui/material";

export default function ToggleOption({role, onChange}) {
    return (
      <ToggleButtonGroup
        value={role}
        exclusive
        onChange={onChange}
        className="mt-4 mb-4"
      >
        <ToggleButton value="tenant">Tenant</ToggleButton>
        <ToggleButton value="landlord">Landlord</ToggleButton>
      </ToggleButtonGroup>
    );
}

