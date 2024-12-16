import React from 'react'
import { useLocation } from 'react-router-dom';
import { IoMdDownload } from "react-icons/io";
import formatDate from '../../utils/formatDate';
import { jsPDF } from "jspdf";

const Invoice = () => {
  const location = useLocation();
  const { invoice } = location.state || {};
  const totalPrice = invoice.bookedPackage.price * invoice.travelers

  const handleDownload = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Invoice", 105, 20, { align: "center" });
    doc.setFontSize(12);
    doc.text(`Name: ${invoice.name}`, 20, 40);
    doc.text(`Email: ${invoice.email}`, 20, 50);
    doc.text(`Phone: ${invoice.number}`, 20, 60);
    doc.text(`Package: ${invoice.bookedPackage.title}`, 20, 70);
    doc.text(`Price per Traveler: $${invoice.bookedPackage.price}`, 20, 80);
    doc.text(`Travelers: ${invoice.travelers}`, 20, 90);
    doc.text(
      `Dates: ${formatDate(invoice.bookedPackage.dates.startDate)} - ${formatDate(invoice.bookedPackage.dates.endDate)}`,
      20,
      100
    );
    doc.text(`Total Price: $${totalPrice}`, 20, 110);

    doc.setFontSize(10);
    doc.text("Thank you for booking with us!", 105, 130, { align: "center" });

    doc.save("invoice.pdf");
  };

  return (
    <div className='flex flex-col items-end overflow-hidden p-10'>
      <button className='btn text-xl' onClick={handleDownload}>
        <IoMdDownload /> Download Pdf
      </button>
      <div className='m-auto mt-[10%] text-center'>
        <h1 className='mb-4 text-3xl font-bold'>Invoice</h1>
        <p><strong>Name:</strong> {invoice.name}</p>
        <p><strong>Email:</strong> {invoice.email}</p>
        <p><strong>Email:</strong> {invoice.number}</p>
        <p><strong>Package:</strong> {invoice.bookedPackage.title}</p>
        <p><strong>Price:</strong> ${invoice.bookedPackage.price}</p>
        <p><strong>Travelers:</strong> {invoice.travelers}</p>
        <p><strong>Dates:</strong> {formatDate(invoice.bookedPackage.dates.startDate)} - {formatDate(invoice.bookedPackage.dates.endDate)}</p>
        <p><strong>Total Price:</strong> ${totalPrice}</p>
      </div>
    </div>
  )
}

export default Invoice