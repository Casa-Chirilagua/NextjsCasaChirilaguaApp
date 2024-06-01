import { toast } from 'react-toastify';
import { useRef, useEffect } from 'react';

function LoadingToast(isObjectLoading, message) {
  const loadingToastId = useRef(null);

  useEffect(() => {
    if (isObjectLoading) {
      loadingToastId.current = toast.loading(message,{theme: "colored"});
    } else {
      if (loadingToastId.current) {
        toast.dismiss(loadingToastId.current);
      }
    }
  }, [isObjectLoading, message]);
}

export default LoadingToast;
