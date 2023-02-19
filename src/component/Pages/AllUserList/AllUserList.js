import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Spiner from '../../Spiner/Spiner';

const AllUserList = () => {


    const { data: users = [], isLoading, refetch } = useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            const res = await fetch(`https://user-create.vercel.app/users`);
            const data = await res.json();
            return data;

        }
    })

    const handlerDeleteUsers = id => {
        const proseed = window.confirm('Are you sure , you went to cancel this .User');
        if (proseed) {
            fetch(`https://user-create.vercel.app/users/${id}`, {
                method: 'DELETE',
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log(data);
                    if (data.deletedCount > 0) {
                        refetch();
                        toast("User Deleted Successfully");
                    }
                });
        }
    };

    if (isLoading) {
        return <Spiner />
    }


    return (
        <div className='m-5'>
            <h1 className='text-3xl md:text-4xl font-bold text-center my-5'>User Profile</h1>
            <div className='shadow-2xl'>
                <div className="overflow-x-auto w-full">
                    <table className="table w-full">

                        <thead>
                            <tr>
                                <th>Name & Email</th>
                                <th>Date of birth & Hobby</th>
                                <th>Country</th>
                                <th>State</th>
                                <th>City</th>
                                <th>Gender</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody >

                            {users?.map((user, i) =>

                                <tr>
                                    <td>
                                        <div className="font-bold">{user?.name}</div>
                                        <div className="text-sm opacity-50">{user?.email}</div>
                                    </td>
                                    <td>
                                        <div className="font-bold">{user?.date}</div>
                                        <div className="text-sm opacity-50">{user?.hobby}</div>
                                    </td>
                                    <td>
                                        <div className="font-bold">{user?.country}</div>
                                    </td>
                                    <td>
                                        <div className="font-bold">{user?.state}</div>

                                    </td>
                                    <td>
                                        <div className="font-bold">{user?.city}</div>

                                    </td>
                                    <td>
                                        <div className="font-bold">{user?.gender}</div>
                                    </td>
                                    <td>
                                        <div className='flex gap-2'>
                                            <Link to={`/editUser/${user?._id}`}><button className="btn btn-ghost btn-xs">Edit </button></Link>
                                            <button onClick={() => handlerDeleteUsers(user._id)} className="btn btn-ghost btn-xs" >Delete </button>
                                        </div>
                                    </td>
                                </tr>
                            )
                            }


                        </tbody>


                    </table>
                </div>
            </div>
        </div>
    );
};

export default AllUserList;