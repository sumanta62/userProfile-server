
import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Spiner from '../../Spiner/Spiner';

const AddUser = () => {
    const { register, formState: { errors }, handleSubmit, reset } = useForm();
    const [countryValue, setCountryValue] = useState()
    const [state, setState] = useState([])
    const [stateValue, setStateValue] = useState()
    const [city, setCity] = useState([])
    const [cityValue, setCityValue] = useState();

    const navigate = useNavigate();


    const { data: countrys = [],  isLoading } = useQuery({
        queryKey: ['country'],
        queryFn: async () => {
            const res = await fetch(`https://user-create.vercel.app/country`);
            const data = await res.json();
            return data

        }
    })

    useEffect(() => {
        fetch(`https://user-create.vercel.app/state`)
            .then(res => res.json())
            .then(data => {
                if (data) {
                    const countryState = data.filter(obj => obj.country === countryValue);
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
                    setCity(stateCity);
                }
            });
    }, [])



    const handlerAddUser = (data) => {
        console.log(data)
        fetch(`https://user-create.vercel.app/users`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(result => {
                reset();
                toast("Add user successfully")
                navigate('/')
            })
    }

    if (isLoading) {
        return <Spiner />
    }

    return (
        <div className='w-full bg-gray-200 p-10'>
            <div>
                <div className='w-96 md:w-10/12 lg:w-8/12 m-auto shadow-xl p-5'>
                    <h2 className="text-4xl font-bold text-center">Add User</h2>
                    <form onSubmit={handleSubmit(handlerAddUser)} >
                        <div className="md:flex gap-5">
                            <div className="form-control w-full ">
                                <label className="label">
                                    <span className="">Full Name</span>
                                </label>
                                <input type="text" {...register("name", { required: "Name is required" })} placeholder="Your Name" className="input input-bordered w-full text-black" />
                                {errors.name && <p className='text-orange-400'>{errors.name?.message}</p>}
                            </div>
                            <div className="form-control w-full ">
                                <label className="label">
                                    <span className="">Email</span>
                                </label>
                                <input type="email" {...register("email", { required: "Email Address is required" })} placeholder="xyz@gmail.com" className="input input-bordered w-full text-black" />
                                {errors.email && <p className='text-orange-400'>{errors.email?.message}</p>}
                            </div>
                        </div>
                        <div className="md:flex gap-5">
                            <div className="form-control w-full ">
                                <label className="label">
                                    <span className="">Date of birth</span>
                                </label>
                                <input type="date" {...register("date", { required: "Date is required" })} className="input input-bordered w-full text-black" />
                                {errors.date && <p className='text-orange-400'>{errors.date?.message}</p>}
                            </div>
                            <div className="form-control w-full ">
                                <label className="label">
                                    <span className="">Gender</span>
                                </label>
                                <select
                                    {...register("gender", { required: "gender is required" })}
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
                                    {...register("country", { required: "country is required" })}
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
                                    {...register("hobby", { required: "hobby is required" })}
                                    className="select select-bordered w-full text-black">
                                    <option>Select Value</option>
                                    <option>Football</option>
                                    <option>Cricket</option>
                                </select>
                                {errors.hobby && <p className='text-orange-400'>{errors.hobby?.message}</p>}
                            </div>
                        </div>
                        <br />

                        <input className='bg-gray-800 btn text-white' value="Add User" type="submit" />
                    </form>

                </div>
            </div>
        </div>
    );
};

export default AddUser;