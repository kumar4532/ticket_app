import React, { useState, useEffect } from 'react'
import formatDate from '../../utils/formatDate';
import handleModalClose from '../../utils/modalClose';

const Admin = () => {
  const datePair = {
    startDate: '',
    endDate: ''
  }

  const initialFormState = {
    title: '',
    description: '',
    price: '',
    dates: datePair,
    image: ''
  };

  const [formInfo, setFormInfo] = useState(initialFormState)
  const [packages, setPackages] = useState();

  useEffect(() => {
    const getPackage = async () => {
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === 'startDate' || name === 'endDate') {
      setFormInfo((prevState) => ({
        ...prevState,
        dates: {
          ...prevState.dates,
          [name]: value,
        },
      }));
    } else {
      setFormInfo((prevState) => ({
        ...prevState,
        [name]: name === 'price' ? (value === '' ? '' : Number(value)) : value,
      }));
    }
  };


  const handleSubmit = async (e) => {
    console.log("This is shit");
  }

  console.log(formInfo);


  return (
    <div className='flex flex-col'>
      <div className='ml-auto'>
        <button
          className="btn btn-outline btn-accent"
          onClick={() => {
            document.getElementById(`modal_1`).showModal();
          }}
        >Add Package</button>
      </div>
      <div className='grid grid-cols-2 p-6 md:grid-cols-3 md:p-8 gap-4'>
        {
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
                <div className="card-actions justify-end mt-2">
                  <button
                    className="btn btn-outline btn-info"
                    onClick={() => {
                      document.getElementById(`modal_1`).showModal();
                    }}
                  >Update</button>
                  <button className="btn btn-outline btn-error">Delete</button>
                </div>
              </div>

              <dialog id={`modal_1`} className="modal" onClick={handleModalClose}>
                <div className="modal-box">

                  <div className="modal-action">
                    <form
                      method="dialog"
                      className='flex flex-col space-y-4 mx-auto w-full'
                      onSubmit={handleSubmit}
                    >
                      <input
                        className='p-3 border-none rounded-lg'
                        name='title'
                        type="text"
                        placeholder='Enter Title'
                        value={formInfo?.title}
                        onChange={handleInputChange}
                        required
                      />
                      <input
                        className='p-3 border-none rounded-lg'
                        name='description'
                        placeholder='Enter Description'
                        value={formInfo?.description}
                        onChange={handleInputChange}
                        required
                      />
                      <input
                        className='p-3 border-none rounded-lg'
                        name='price'
                        placeholder='Enter Price'
                        value={formInfo?.price}
                        onChange={handleInputChange}
                        required
                      />
                      <input
                        className='p-3 border-none rounded-lg'
                        name='startDate'
                        placeholder='Enter Start Date (eg. 2024-12-20)'
                        value={formInfo?.dates.startDate}
                        onChange={handleInputChange}
                      />
                      <input
                        className='p-3 border-none rounded-lg'
                        name='endDate'
                        placeholder='Enter End Date (eg. 2024-12-20)'
                        value={formInfo?.dates.endDate}
                        onChange={handleInputChange}
                      />
                      <input
                        className='p-3 border-none rounded-lg'
                        name='image'
                        placeholder='Enter Image URL'
                        value={formInfo?.image}
                        onChange={handleInputChange}
                        required
                      />
                      <button type="submit" className="btn">Submit</button>
                    </form>
                  </div>

                </div>
              </dialog>

            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Admin