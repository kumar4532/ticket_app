import React, { useState, useEffect } from 'react'
import Logout from '../../components/Logout';
import formatDate from '../../utils/formatDate';
import handleModalClose from '../../utils/modalClose';
import usePackageAction from '../../hooks/usePackageAction';
import useDeletePackage from '../../hooks/useDeletePackage';
import toast from 'react-hot-toast';
import Bookings from '../../components/Bookings';

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

  const { loading, packageAction } = usePackageAction();
  const { delLoading, deleteId } = useDeletePackage();
  const [formInfo, setFormInfo] = useState(initialFormState);
  const [packages, setPackages] = useState([]);
  const [id, setId] = useState('');

  useEffect(() => {
    const getPackage = async () => {
      try {
        const res = await fetch("/api/packages");
        const data = await res.json();
        setPackages(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error while fetching the packages", error);
        toast.error(error.message)
      }
    };

    getPackage();
  }, [packages]);


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
    e.preventDefault();
    await packageAction(formInfo, id)
    setFormInfo(initialFormState)
    setId();
  }

  const handleDelete = async (delId) => {
    await deleteId(delId)
  }

  return (
    <div className='flex flex-col'>

      <div className='flex flex-row space-x-2 ml-auto'>
        <button
          className="btn btn-outline btn-accent"
          onClick={() => { document.getElementById(`modal_1`).showModal() }}
        >Add Package</button>
        <button className='btn btn-outline text-2xl'><Logout /></button>
      </div>

      <div className='grid grid-cols-2 p-6 md:grid-cols-3 md:p-8 gap-4'>
        {
          Array.isArray(packages) && packages.length > 0 ? (
            packages.map((pack) => (
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
                        setId(pack._id);
                        setFormInfo({
                          title: pack.title,
                          description: pack.description,
                          price: pack.price,
                          dates: {
                            startDate: pack.dates.startDate,
                            endDate: pack.dates.endDate,
                          },
                          image: pack.image,
                        }); // Populate the form with the package data
                        document.getElementById(`modal_1`).showModal();
                      }}
                    >
                      Update
                    </button>
                    <button
                      className="btn btn-outline btn-error"
                      onClick={() => handleDelete(pack._id)}
                    >
                      {delLoading ? <span className='loading loading-spinner'></span> : "Delete"}
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <h1>There are no available packages</h1>
          )
        }
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
                />
                <input
                  className='p-3 border-none rounded-lg'
                  name='description'
                  placeholder='Enter Description'
                  value={formInfo?.description}
                  onChange={handleInputChange}
                />
                <input
                  className='p-3 border-none rounded-lg'
                  name='price'
                  placeholder='Enter Price'
                  value={formInfo?.price}
                  onChange={handleInputChange}
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
                />
                <button type="submit" className="btn">{loading ? <span className='loading loading-spinner'></span> : "Submit"}</button>
              </form>
            </div>
          </div>
        </dialog>
      </div>
      <Bookings />
    </div>
  )
}

export default Admin