import { TextField } from "@mui/material"
import { FileView } from "./fileview"

export default function ServiceRequest({tenantname,email,phonenumber,leaseid,description,fileName}) {
    return(
        <section>
            <section className="flex gap-10">
                <div className="flex flex-col gap-8">
                    <TextField
                        id="outlined-name-input"
                        label="Name"
                        type="text"
                        value={tenantname}
                        InputProps={{
                            readOnly: true,
                          }}
                    />
                    <TextField
                    id="outlined-number-input"
                    label="Contact Number"
                    type="tel"
                    value={phonenumber}
                    InputProps={{
                        readOnly: true,
                      }}
                  />
                </div>
                <div className="flex flex-col gap-8">
                    <TextField
                        id="outlined-email-input"
                        label="Email"
                        type="email"
                        value={email}
                        InputProps={{
                            readOnly: true,
                          }}
                      />
                    <TextField
                        id="outlined-leaseID-input"
                        label="Lease ID"
                        type="text"
                        value={leaseid}
                        InputProps={{
                            readOnly: true,
                          }}
                      />
                </div>
            </section>
            <section>
                <p className="text-lg mb-1">Upload Screenshot</p>
                <div className="text-xs flex items-center gap-6">
                    View Screenshot:
                    <FileView fileName={fileName} /> 
                </div>
            </section>
            <section>
                <p className="text-lg mb-4">Describe the Problem</p>
                <TextField
                    fullWidth
                    id="outline-description-input"
                    label="Description"
                    type="text"
                    value={description}
                    InputProps={{
                        readOnly: true,
                      }}
                />
            </section>
        </section>
    )
}