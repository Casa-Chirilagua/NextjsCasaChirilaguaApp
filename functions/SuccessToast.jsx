import { toast } from 'react-toastify';

async function SuccessToast(objectPromise, message) {
    const [result] = await Promise.all([objectPromise]);
    if (result.payload.status === 'success') {
        //result.payload);
        toast.success(message);
    }
}

export default SuccessToast