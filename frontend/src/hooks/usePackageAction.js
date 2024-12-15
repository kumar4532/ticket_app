import { useState } from 'react'
import toast from 'react-hot-toast';

function usePackageAction() {
    const [loading, setLoading] = useState(false);

    const packageAction = async ({ title, description, price, dates, image }, id) => {

        const url = id ? `/api/admin/packages` : `/api/admin/packages/${id}`;
        const action = id ? 'PUT' : 'POST';

        setLoading(true);

        try {
            const res = await fetch(url, {
                method: action,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title, description, price, dates, image }),
            });

            const data = await res.json();
            console.log(data);

            if (data.error) {
                toast.error("Please enter valid credientilas");
            } else {
                toast.success(`Package has been ${id ? "updated" : "created"}`)
            }

        } catch (error) {
            console.log("Error", error);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return { loading, packageAction };
};

export default usePackageAction;