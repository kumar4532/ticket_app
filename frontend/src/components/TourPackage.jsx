import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import formatDate from '../utils/formatDate';
import useBooking from '../hooks/useBooking';
import handleModalClose from '../utils/modalClose';

const TourPackage = () => {
    const initialFormState = {
        id: '',
        name: '',
        email: '',
        number: '',
        travelers: 1
    };

    const { loading, book } = useBooking();
    const [packages, setPackages] = useState([]);
    const [formInfo, setFormInfo] = useState(initialFormState)
    const navigate = useNavigate();

    useEffect(() => {
        const getPackage = async () => {
            try {
                const res = await fetch("/api/packages");
                const data = await res.json();
                setPackages(Array.isArray(data) ? data : []);
            } catch (error) {
                console.error("Error while fetching the packages", error);
            }
        };

        getPackage();
    }, [packages]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormInfo(prevState => ({
            ...prevState,
            [name]: name === 'travelers' || name === 'number'
                ? (value === '' ? '' : Number(value))
                : value
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const invoice = await book(formInfo);
        console.log(invoice);
        
        navigate("/invoice")
        setFormInfo(initialFormState);
    }

    return (
        <div className='grid grid-cols-2 p-6 md:grid-cols-3 md:p-8 gap-4'>
            {
                Array.isArray(packages) && packages.length > 0 ? (
                    packages?.map((pack) => (
                        <div key={pack._id} className="card bg-base-100 w-60 md:w-96 shadow-xl mx-auto border">
                            <figure>
                                <img
                                    src={pack.image}
                                    alt={pack.title} />
                            </figure>
                            <div className="card-body">
                                <h2 className="card-title">{pack.title}</h2>
                                <p><span className='font-semibold'>Price: </span>{pack.price}</p>
                                <p>{pack.description}</p>
                                <p>{formatDate(pack.dates.startDate)} - {formatDate(pack.dates.endDate)}</p>
                                <div className="card-actions justify-end">
                                    <button
                                        className="btn btn-primary"
                                        onClick={() => {
                                            setFormInfo(prev => ({ ...initialFormState, id: pack._id }));
                                            document.getElementById(`modal_${pack._id}`).showModal();
                                        }}
                                    >Book Now</button>
                                </div>
                            </div>
                            <dialog id={`modal_${pack._id}`} className="modal" onClick={handleModalClose}>
                                <div className="modal-box">
                                    <h3 className="font-bold text-lg">Book {pack.title}</h3>
                                    <div className="modal-action">
                                        <form
                                            method="dialog"
                                            className='flex flex-col space-y-4 mx-auto w-full'
                                            onSubmit={handleSubmit}
                                        >
                                            <input type="text" hidden />
                                            <input
                                                className='p-3 border-none rounded-lg'
                                                type="text"
                                                name="name"
                                                placeholder='Enter Name'
                                                value={formInfo?.name}
                                                onChange={handleInputChange}
                                                required
                                            />
                                            <input
                                                className='p-3 border-none rounded-lg'
                                                type="email"
                                                name="email"
                                                placeholder='Enter Email'
                                                value={formInfo?.email}
                                                onChange={handleInputChange}
                                                required
                                            />
                                            <input
                                                className='p-3 border-none rounded-lg'
                                                type="tel"
                                                name="number"
                                                placeholder='Enter Ph. Number'
                                                value={formInfo?.number}
                                                onChange={handleInputChange}
                                                maxLength={10}
                                                required
                                            />
                                            <input
                                                className='p-3 border-none rounded-lg'
                                                type="number"
                                                name="travelers"
                                                placeholder='Enter Number of Travelers'
                                                value={formInfo?.travelers}
                                                onChange={handleInputChange}
                                                min="1"
                                                required
                                            />
                                            <button type="submit" className="btn">{loading ? <span className='loading loading-spinner'></span> : "Submit"}</button>
                                        </form>
                                    </div>
                                </div>
                            </dialog>
                        </div>
                    ))
                ) : (
                    <h1 className='mx-auto text-xl '>No available packages</h1>
                )
            }
        </div>
    )
}

export default TourPackage