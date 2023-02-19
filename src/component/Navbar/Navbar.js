import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <div className='bg-slate-600 p-3 m-auto'>
            <Link to='/'> <button className='btn btn-sm'>All User</button></Link>
            <Link to='/addUser'> <button className='btn btn-sm'>Add User</button></Link>
        </div>
    );
};

export default Navbar;