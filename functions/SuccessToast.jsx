import { toast } from 'react-toastify';

async function SuccessToast(objectPromise, message) {
    const [result] = await Promise.all([objectPromise]);

    if (result?.payload?.status === 'success') {
        toast.success(message, { theme: "colored"});
    }

    return result?.payload? result.payload : null;
}

export default SuccessToast