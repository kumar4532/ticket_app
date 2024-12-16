import React from 'react'
import { useLocation } from 'react-router-dom';
import formatDate from '../../utils/formatDate';

const Invoice = () => {
  const location = useLocation();
  const { invoice } = location.state || {}; 

  console.log(invoice);
  
  return (
    <div className='h-full overflow-hidden'>
      <div className='m-auto mt-[10%] text-center'>
        <h1 className='mb-4 text-3xl font-bold'>Invoice</h1>
        <p><strong>Name:</strong> {invoice.name}</p>
        <p><strong>Email:</strong> {invoice.email}</p>
        <p><strong>Email:</strong> {invoice.number}</p>
        <p><strong>Package:</strong> {invoice.bookedPackage.title}</p>
        <p><strong>Price:</strong> ${invoice.bookedPackage.price}</p>
        <p><strong>Travelers:</strong> {invoice.travelers}</p>
        <p><strong>Dates:</strong> {formatDate(invoice.bookedPackage.dates.startDate)} - {formatDate(invoice.bookedPackage.dates.endDate)}</p>
      </div>
    </div>
  )
}

export default Invoice