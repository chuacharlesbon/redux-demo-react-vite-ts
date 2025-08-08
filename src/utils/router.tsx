import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";

const customLoader = async () => {
    // const pendingList = store.getState().todo.pendingValue;

    // if (pendingList.length !== 0) {
    //     return pendingList;
    // }

    // store.dispatch(addPending({
    //     id: 1,
    //     label: "Test",
    // }));

    const res = await fetch("https://jsonplaceholder.typicode.com/todos/1");
    return res.json();
}

const HomePage = lazy(() => import("../pages/home"));
const TestPage = lazy(() => import("../pages/test"));

export const router = createBrowserRouter([
    {
        path: "/",
        element: <HomePage />,
        loader: customLoader,
    },
    {
        path: "/test",
        element: <TestPage />,
        loader: customLoader,
    },
])

// Access the data from custom loader
// const data = useLoaderData(); // To be used inside the component

// Setup for App.tsx
// return (
//     <>
//       <NavbarCustom />
//       <Suspense fallback={<div className='p-5 bg-red-500'>Loading ...</div>}>
//         <RouterProvider router={router} />
//       </Suspense>
//       <Footer />
//     </>
// )

// Remove the <BrowserRouter> from main.tsx when using RouterProvider