import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function getEnv() {
  return import.meta.env;
}

export default getEnv;

export const notify = (type:string, message:string) => {
    const options = {
      position: toast.POSITION.BOTTOM_LEFT,
      autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
    };
    if (type === "success") {
      toast.success(message, {
        ...options,
        style: {
          background: 'rgba(33, 33, 30, 0.4)',
          color: '#fff',
          borderRadius: '8px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          padding: '16px',
          fontSize: '16px',
        
        },
        
      });
    } else if (type === "error") {
      toast.error(message,{
        ...options,
        style: {
          background: 'rgba(100, 10, 10, 0.9)',
          color: '#FFF',        
          borderRadius: '8px',  
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          padding: '16px',
          fontSize: '14px',
        },
      });;
    }
  };