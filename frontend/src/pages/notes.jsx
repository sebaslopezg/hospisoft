import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { PageContainer } from '@toolpad/core/PageContainer';
import { 
    Create,
    CrudProvider,
    DataSourceCache,
    Edit,
    List,
    Show,
 } from '@toolpad/core/Crud';
 import { useDemoRouter } from '@toolpad/core/internal';

//adaptando a ejemplos en documentacion, revisar muy bien
/* let notesStore = [
  { _id: 1, nombre: 'notica pa tu nota', descripcion: 'soy normal.' },
  { _id: 2, nombre: 'natilla', descripcion: 'quejeso.' },
]; */

export const notesDataSource = {
  fields: [
    { field: '_id', headerName: 'ID', flex: 1, type:'string' },
    { field: 'nombre', headerName: 'Nombre', flex: 1 },
    { field: 'descripcion', headerName: 'Descripcion', flex: 2 },
  ],

  getMany: async () => {
    // Fetch data from server
    const res = await fetch(`http://192.168.1.120:4000/api/notas/view`, {
      method: 'GET',
    });
    const resJson = await res.json();

    if (!res.ok) {
      throw new Error(resJson.error);
    }

//    return resJson.data;
    return {
      items: resJson.data,
      itemCount: resJson.data.length,
    };
  },

  getOne: async (id) => {
    // Fetch record from server
    const res = await fetch(`http://localhost:4000/api/notas/getbyid/${id}`, {
      method: 'GET',
    });
    const resJson = await res.json();
    console.log(resJson.data[0])

    if (!res.ok) {
      throw new Error(resJson.error);
    }
    return resJson.data[0]
  },
  
  createOne: async (data) => {
    // Create record in the server
    const res = await fetch('http://localhost:4000/api/notas/create', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' },
    });
    const resJson = await res.json();

    if (!res.ok) {
      throw new Error(resJson.error);
    }
    return resJson;
  },
};

  const notesCache = new DataSourceCache();

  function matchPath(pattern, pathname) {
    const regex = new RegExp(`^${pattern.replace(/:[^/]+/g, '([^/]+)')}$`);
    const match = pathname.match(regex);
    return match ? match[1] : null;
  }

export default function NotesPage() {

  const rootPath = '/notes';

  const router = useDemoRouter(rootPath);
 

  const listPath = rootPath;
  const showPath = `${rootPath}/:noteId`;
  const createPath = `${rootPath}/new`;
  const editPath = `${rootPath}/:noteId/edit`;
  //...

  const title = React.useMemo(() => {
    if (router.pathname === createPath) {
      return 'Nueva nota';
    }
    const editNoteId = matchPath(editPath, router.pathname);
    console.log(editNoteId)
    if (editNoteId) {
      return `Note ${editNoteId} - Edit`;
    }
    const showNoteId = matchPath(showPath, router.pathname);
    console.log(showNoteId)
    if (showNoteId) {
      return `Note ${showNoteId}`;
    }

    return undefined;
  }, [createPath, editPath, router.pathname, showPath]);

  const handleRowClick = React.useCallback(
    (noteId) => {
      router.navigate(`${rootPath}/${String(noteId)}`);
    },
    [router],
  );

  const handleCreateClick = React.useCallback(() => {
    router.navigate(createPath);
  }, [createPath, router]);

  const handleEditClick = React.useCallback(
    (noteId) => {
      router.navigate(`${rootPath}/${String(noteId)}/edit`);
    },
    [router],
  );

  const handleCreate = React.useCallback(() => {
    router.navigate(listPath);
  }, [listPath, router]);

  const handleEdit = React.useCallback(() => {
    router.navigate(listPath);
  }, [listPath, router]);

  const handleDelete = React.useCallback(() => {
    router.navigate(listPath);
  }, [listPath, router]);

  const showNoteId = matchPath(showPath, router.pathname);
  const editNoteId = matchPath(editPath, router.pathname);
console.log(router.pathname)
  return <>
  <PageContainer title={title}>
    <CrudProvider dataSource={notesDataSource} dataSourceCache={notesCache}>
    {router.pathname === listPath ? (
        <List
          initialPageSize={10}
          slots={{ dataGrid: DataGrid }}
          slotProps={{
            dataGrid: { getRowId: (row) => row._id },
          }}
          onRowClick={handleRowClick}
          onCreateClick={handleCreateClick}
          onEditClick={handleEditClick}
        />
      ) : null}
      {router.pathname === createPath ? (
        <Create
          initialValues={{ title: 'New note' }}
          onSubmitSuccess={handleCreate}
          resetOnSubmit={false}
        />
      ) : null}
      {router.pathname !== createPath && showNoteId ? (
        <Show
          id={showNoteId}
          onEditClick={handleEditClick}
          onDelete={handleDelete}
        />
      ) : null}
      {editNoteId ? (
        <Edit id={editNoteId} onSubmitSuccess={handleEdit} />
      ) : null}
    </CrudProvider> 
  </PageContainer>
  
  </>
}