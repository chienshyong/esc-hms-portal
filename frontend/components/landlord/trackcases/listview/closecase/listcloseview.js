"use client"
import { DataGrid } from '@mui/x-data-grid';

export default function ListCloseView({closecasecolumns,closecaserows,selectedIds, handleSelectionModelChange}) {
  return (
    <section>
      <DataGrid
        rows={closecaserows}
        columns={closecasecolumns}
        rowSelectionModel={selectedIds}
        onRowSelectionModelChange={handleSelectionModelChange}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
    </section>
  );
}
