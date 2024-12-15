import React, { useEffect, useState } from 'react'
import formatDate from '../utils/formatDate';

const TourPackage = () => {
    const [packages, setPackages] = useState();

    useEffect(() => {
        const getPackage = async() => {
            try {
                const res = await fetch("/api/packages");
                const data = await res.json();

                setPackages(data)                
            } catch (error) {
                console.log("Error while fetching the errors", error);
            }
        }

        getPackage();
    }, [])

    const handleSubmit = () => {
        console.log("This is shit"); 
    }

    console.log(packages);
    

  return (
    <div className='grid grid-cols-2 p-6 md:grid-cols-3 md:p-8 gap-4'>
        {
            packages?.map((pack) => (
                <div key={pack._id} className="card bg-base-100 w-60 md:w-96 shadow-xl mx-auto border">
                    <figure>
                        <img
                        src={pack.image}
                        alt={pack.title}     />
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title">{pack.title}</h2>
                        <p><span className='font-semibold'>Price: </span>{pack.price}</p>
                        <p>{pack.description}</p>
                        <p>{formatDate(pack.dates.startDate)} - {formatDate(pack.dates.endDate)}</p>
                        <div className="card-actions justify-end">
                        <button className="btn btn-primary" onClick={()=>document.getElementById('my_modal_1').showModal()}>Book Now</button>
                        </div>
                    </div>
                    <dialog id="my_modal_1" className="modal">
                        <div className="modal-box">
                            <h3 className="font-bold text-lg">Book {pack.title}</h3>
                            <div className="modal-action">
                            <form method="dialog" className='flex flex-col space-y-4 mx-auto w-full'>
                                <input className='p-3 border-none rounded-lg' type="text" placeholder='Enter Name' />
                                <input className='p-3 border-none rounded-lg' type="text" placeholder='Enter Email' />
                                <input className='p-3 border-none rounded-lg' type="text" placeholder='Enter Ph. Number' />
                                <input className='p-3 border-none rounded-lg' type="text" placeholder='Enter Number of Travelers' />
                                <button className="btn" onClick={handleSubmit}>Submit</button>
                            </form>
                            </div>
                        </div>
                    </dialog>
                </div>
            ))
        }
    </div>
  )
}

export default TourPackage