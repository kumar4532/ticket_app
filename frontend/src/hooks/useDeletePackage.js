import { useState } from 'react'
import toast from 'react-hot-toast';

function useDeletePackage() {
    const [delLoading, setDelLoading] = useState(false);

    const deleteId = async (id) => {
        setDelLoading(true);

        try {
            const res = await fetch(`/api/admin/packages/${id}`, {
                method: "DELETE",
            });

            const data = await res.json();
            console.log(data);

            if (data.error) {
                toast.error("Please enter valid credientilas");
            } else {
                toast.success("Package has been deleted")
            }

        } catch (error) {
            console.log("Error", error);
            toast.error(error.message);
        } finally {
            setDelLoading(false);
        }
    };

    return { delLoading, deleteId };
};

export default useDeletePackage;