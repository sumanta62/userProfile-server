import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const EditUser = () => {
    const editUser = useLoaderData();
    const { register, formState: { errors }, handleSubmit, reset } = useForm();
    const [countryValue, setCountryValue] = useState()
    const [state, setState] = useState([])
    const [stateValue, setStateValue] = useState()
    const [city, setCity] = useState([])
    const [cityValue, setCityValue] = useState();

    const navigate = useNavigate();

    const { data: countrys = [], refetch } = useQuery({
        queryKey: ['country'],
        queryFn: async () => {
            const res = await fetch(`https://user-create.vercel.app/country`);
            const data = await res.json();
            refetch()
            return data

        }
    })

    useEffect(() => {
        fetch(`https://user-create.vercel.app/state`)
            .then(res => res.json())
            .then(data => {
                if (data) {
                    const countryState = data.filter(obj => obj.country === countryValue);
                    refetch();
                    setState(countryState);
                }
            });
    }, [])

    useEffect(() => {
        fetch(`https://user-create.vercel.app/city`)
            .then(res => res.json())
            .then(data => {
                if (data) {
                    const stateCity = data.filter(obj => obj.state === stateValue);
                    refetch();
                    setCity(stateCity);
                }
            });
    }, [])

    const handlerEditUser = (data) => {

        fetch( `https://user-create.vercel.app/update/${editUser?._id}`,
            {
                method: "PATCH",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify(data),
            }
        )
            .then((res) => res.json())
            .then((result) => {
                console.log(result);
                if (result.acknowledged) {
                    reset();
                    toast("Update successfully")
                    navigate("/");
                }
            });
    }




    return (
        <div className='w-full bg-gray-200 p-10'>
            <div>
                <div className='w-96 md:w-10/12 lg:w-8/12 m-auto shadow-xl p-5'>
                    <h2 className="text-4xl font-bold text-center">Edit User</h2>
                    <form onSubmit={handleSubmit(handlerEditUser)} >
                        <div className="md:flex gap-5">
                            <div className="form-control w-full ">
                                <label className="label">
                                    <span className="">Full Name</span>
                                </label>
                                <input type="text" {...register("name")} defaultValue={editUser?.name} className="input input-bordered w-full text-black" />
                                {errors.name && <p className='text-orange-400'>{errors.name?.message}</p>}
                            </div>
                            <div className="form-control w-full ">
                                <label className="label">
                                    <span className="">Email</span>
                                </label>
                                <input type="email" {...register("email")} defaultValue={editUser?.email} className="input input-bordered w-full text-black" />
                                {errors.email && <p className='text-orange-400'>{errors.email?.message}</p>}
                            </div>
                        </div>
                        <div className="md:flex gap-5">
                            <div className="form-control w-full ">
                                <label className="label">
                                    <span className="">Date of birth</span>
                                </label>
                                <input type="date" {...register("date")}defaultValue={editUser?.date} className="input input-bordered w-full text-black" />
                                {errors.date && <p className='text-orange-400'>{errors.date?.message}</p>}
                            </div>
                            <div className="form-control w-full ">
                                <label className="label">
                                    <span className="">Gender</span>
                                </label>
                                <select
                                    {...register("gender")} defaultValue={editUser?.gender}
                                    className="select select-bordered w-full text-black">
                                    <option>Select Gender</option>
                                    <option>Mail</option>
                                    <option>Female</option>
                                </select>
                                {errors.gender && <p className='text-orange-400'>{errors.gender?.message}</p>}
                            </div>
                        </div>
                        <div className="md:flex gap-5">
                            <div className="form-control w-full ">
                                <label className="label">
                                    <span className="">Country</span>
                                </label>
                                <select
                                    value={countryValue}
                                    {...register("country")} defaultValue={editUser?.country}
                                    className="select select-bordered w-full text-black" onChange={(e) => setCountryValue(e.target.value)}>
                                    <option value="">--- Select Country ---</option>
                                    {countrys.map((country, i) =>
                                        <option value={country?.country_name}>{country?.country_name}</option>
                                    )
                                    }
                                </select>
                                {errors.country && <p className='text-orange-400'>{errors.country?.message}</p>}
                            </div>
                            <div className="form-control w-full ">
                                <label className="label">
                                    <span className="">State</span>
                                </label>
                                <select
                                    value={stateValue}
                                    {...register("state")}
                                    defaultValue={editUser?.state}
                                    className="select select-bordered w-full text-black" onChange={(e) => setStateValue(e.target.value)}>
                                    <option>--- Select State ---</option>
                                    {
                                        state.map((stateName, i) =>
                                            <option value={stateName?.state_name}>{stateName?.state_name}</option>
                                        )
                                    }
                                </select>
                                {errors.state && <p className='text-orange-400'>{errors.state?.message}</p>}
                            </div>
                        </div>
                        <div className="md:flex gap-5">
                            <div className="form-control w-full ">
                                <label className="label">
                                    <span className="">City</span>
                                </label>
                                <select
                                    value={cityValue}
                                    {...register("city")}
                                    defaultValue={editUser?.city}
                                    className="select select-bordered w-full text-black" onChange={(e) => setCityValue(e.target.value)}>
                                    <option>--- Select State ---</option>
                                    {
                                        city.map((cityname, i) =>
                                            <option value={cityname?.city_name}>{cityname?.city_name}</option>
                                        )
                                    }
                                </select>
                                {errors.city && <p className='text-orange-400'>{errors.city?.message}</p>}
                            </div>
                            <div className="form-control w-full ">
                                <label className="label">
                                    <span className="">Hobby</span>
                                </label>
                                <select
                                    {...register("hobby")} defaultValue={editUser?.hobby}
                                    className="select select-bordered w-full text-black" >
                                    <option>Select Value</option>
                                    <option>Football</option>
                                    <option>Cricket</option>
                                </select>
                                {errors.hobby && <p className='text-orange-400'>{errors.hobby?.message}</p>}
                            </div>
                        </div>
                        <br />

                        <input className='bg-gray-800 btn text-white' value="Update User" type="submit" />
                    </form>

                </div>
            </div>
        </div>
    );
};

export default EditUser;