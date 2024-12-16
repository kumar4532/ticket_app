import React, { useEffect, useState } from 'react'
import formatDate from '../utils/formatDate';
import toast from 'react-hot-toast';

const Bookings = () => {
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        const getBookings = async () => {
            try {
                const res = await fetch("/api/bookings");
                if (!res.ok) {
                    throw new Error("Failed to fetch bookings");
                }
                const data = await res.json();
                setBookings(data);
            } catch (error) {
                console.error("Error while fetching bookings", error);
                toast.error(error.message);
            }
        };

        getBookings();
    }, []);

    console.log(bookings);
    

  return (
    <div className='p-10'>
        <h1 className='text-2xl text-center mb-4'>Bookings</h1>
        <div className='flex flex-wrap gap-6'>
            {
                Array.isArray(bookings) && bookings.length > 0 ? (
                    bookings.map((booking) => (
                            <div className='border rounded-xl p-4 w-96 shadow-lg'>

                                <p><strong>Name:</strong> {booking.name}</p>
                                <p><strong>Email:</strong> {booking.email}</p>
                                <p><strong>Ph.Number:</strong> {booking.number}</p>
                                <p><strong>Package Name:</strong> {booking.bookedPackage.title}</p>
                                <p><strong>Package Price:</strong> {booking.bookedPackage.price}</p>
                                <p><strong>No. of Travelers:</strong> {booking.travelers}</p>
                                <p><strong>Dates:</strong> {formatDate(booking.bookedPackage.dates.startDate)} - {formatDate(booking.bookedPackage.dates.endDate)}</p>
                            </div>
                    ))
                ) : (
                    <h1>There are no bookings yet</h1>
                )
            }
        </div>
    </div>
  )
}

export default Bookings