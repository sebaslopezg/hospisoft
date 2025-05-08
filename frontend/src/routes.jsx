const router = createBrowserRouter([
    {
      Component: App, // root layout route
      children: [
        {
          path: '/',
          Component: Layout,
          children: [
            {
              path: '',
              Component: DashboardPage,
            },
            {
              path: 'orders',
              Component: OrdersPage,
            },
            {
              path: 'notes',
              Component: NotesPage,
            },
            {
              path: 'medicamentos',
              Component: MedicamentosLayout,
              children:[
                {
                  path:'',
                  Component: MedicamentosView,
                },
                {
                  path:'create',
                  Component: MedicamentosCreate,
                },
                {
                  path:'edit/:id',
                  Component: MedicamentosEdit,
                },
              ]
            },
          ],
        },
      ],
    },
  ]);