import { toast } from 'react-toastify';

const ErrorToast = async (objectPromise) => {
    const [result] = await Promise.all([objectPromise]);

    if (result.payload.status === 'fail') {
        return toast.error(result.payload.message, {
            duration: 30000,
            theme: "colored",

        });
    }
}

export default ErrorToast