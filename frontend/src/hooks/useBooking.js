import {useState} from 'react'
import toast from 'react-hot-toast';

function useBooking() {
  const [loading, setLoading] = useState(false);

  const book = async ({id, name, email, number, travelers}) => {

        setLoading(true);

        try {
            const res = await fetch(`/api/bookings/${id}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, number, travelers }),
            });

            const data = await res.json();
            console.log(data);
            
            if (data.error) {
                toast.error("Please enter valid credientilas");
            } else {
                toast.success("Package has been booked.")
                return data;
            }

        } catch (error) {
            console.log("Error is login from catch"); 
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return { loading, book };
};

export default useBooking;