import useAsync from '../hooks/useAsync'
import {DataGrid, GridColDef, GridValueGetterParams} from '@mui/x-data-grid'

const columns: GridColDef[] = [
  {field: 'age', headerName: 'AGE', width: 70, type: 'number'},
  {
    field: 'name',
    headerName: 'NAME',
    width: 130,
    valueGetter: (params: GridValueGetterParams) =>
      `${params.getValue(params.id, 'firstName') || ''} ${
        params.getValue(params.id, 'lastName') || ''
      }`,
  },
  {field: 'phone', headerName: 'Phone', width: 130},
  {
    field: 'email',
    headerName: 'EMAIL',
    width: 90,
  },
  {
    field: 'createdAt',
    headerName: 'createdAt',
    width: 90,
  },
  {
    field: '__v',
    headerName: '__v',
    type: 'number',
    width: 90,
  },
  {
    field: 'updatedAt',
    headerName: 'updatedAt',
    width: 90,
  },
  {field: '_id', headerName: 'ID', width: 70},
]

const Users = () => {
  const {data} = useAsync()

  return (
    <div>
      {data?.length && (
        <DataGrid
          getRowId={r => r._id}
          rows={data}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
        />
      )}
    </div>
  )
}

export default Users
