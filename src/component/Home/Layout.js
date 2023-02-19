import React from 'react';
import AddUser from '../Pages/AddUser/AddUser';
import AllUserList from '../Pages/AllUserList/AllUserList';

const Layout = () => {
    return (
        <div>
            <AllUserList/>
            <AddUser/>
        </div>
    );
};

export default Layout;