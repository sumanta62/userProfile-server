
import { createBrowserRouter } from 'react-router-dom';
import Home from '../Home/Home';
import AddUser from '../Pages/AddUser/AddUser';
import AllUserList from '../Pages/AllUserList/AllUserList';
import EditUser from '../Pages/EditUser/EditUser';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />,
        children: [

            {
                path: '/',
                element: <AllUserList></AllUserList>
            },
            {
                path: '/addUser',
                element: <AddUser></AddUser>
            },
            {
                path: '/editUser/:id',
                element: <EditUser />,
                loader: ({ params }) => fetch(`https://user-create.vercel.app/editUser/${params.id}`)
            }
        ]
    }
])
