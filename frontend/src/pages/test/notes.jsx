import { useMemo, useCallback } from 'react'; 
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
 import Config from '../../Config.jsx';

//adaptando a ejemplos en documentacion, revisar muy bien
/* let notesStore = [
  { _id: 1, nombre: 'notica pa tu nota', descripcion: 'soy normal.' },
  { _id: 2, nombre: 'natilla', descripcion: 'quejeso.' },
]; */

export const notesDataSource = {
  fields: [
    { field: 'nombre', headerName: 'Nombre', flex: 1 },
    { field: 'descripcion', headerName: 'Descripcion', flex: 2 },
  ],

  getMany: async () => {
    // Fetch data from server
    const res = await fetch(`${Config('urlRoot')}/notas/view`, {
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
    const res = await fetch(`${Config('urlRoot')}/notas/getbyid/${id}`, {
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
    const res = await fetch(`${Config('urlRoot')}/notas/create`, {
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

  const title = useMemo(() => {
    if (router.pathname === createPath) {
      return 'Nueva nota';
    }
    const editNoteId = matchPath(editPath, router.pathname);
    if (editNoteId) {
      return `Nota ${editNoteId} - Editar`;
    }
    const showNoteId = matchPath(showPath, router.pathname);
    if (showNoteId) {
      return `Nota ${showNoteId}`;
    }

    return undefined;
  }, [createPath, editPath, showPath,router.pathname]);

  const handleRowClick = useCallback(
    (noteId) => {
      console.log(noteId)
      router.navigate(`${rootPath}/${String(noteId)}`);
    },
    [router],
  );

  const handleCreateClick = useCallback(() => {
    router.navigate(createPath);
  }, [createPath, router]);

  const handleEditClick = useCallback(
    (noteId) => {
      router.navigate(`${rootPath}/${String(noteId)}/edit`);
    },
    [router],
  );

  const handleCreate = useCallback(() => {
    router.navigate(listPath);
  }, [listPath, router]);

  const handleEdit = useCallback(() => {
    router.navigate(listPath);
  }, [listPath, router]);

  const handleDelete = useCallback(() => {
    router.navigate(listPath);
  }, [listPath, router]);

  const showNoteId = matchPath(showPath, router.pathname);
  const editNoteId = matchPath(editPath, router.pathname);
  return <>
  <PageContainer title={title}>
    <CrudProvider dataSource={notesDataSource} dataSourceCache={notesCache}>
    {router.pathname === listPath ? (
        <List
          initialPageSize={10}
          slots={{ 
            dataGrid: DataGrid }}
          slotProps={{
            dataGrid: { 
              getRowId: (row) => row._id,             
            },
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