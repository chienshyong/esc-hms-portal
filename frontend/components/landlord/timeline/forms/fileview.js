import { Button } from "@mui/material";

export function FileView({ fileName }) {
    const handleViewFile = () => {
      // Need to replace the fileURL with the actual URL later
      // For now, assume fileName and URL are same
      const fileURL = fileName;
      window.open(fileURL);
    };
  
    return (
      <div className="flex flex-row gap-3">
        <p className="font-bold">{fileName}</p>
        <Button variant="contained" size="small" onClick={handleViewFile}>
          View
        </Button>
      </div>
    );
  }