import { DataGrid } from '@mui/x-data-grid';

export default function ListView({columns,rows}) {
  return (
    <section className='mt-4'>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        disableSelectionOnClick
      />
    </section>
  );
}
