import axios from 'axios'
import { useNavigate } from 'react-router';

const apiBase = import.meta.env.VITE_API_BASE;
const apiPath = import.meta.env.VITE_API_PATH;

function Logout() {
    const navigate = useNavigate();

    const signOut = async () => {
        try {
            const res = await axios.post(`${apiBase}v2/logout`);


            document.cookie = "";

            axios.defaults.headers.common['Authorization'] = "";

            navigate('/');

        } catch (error) {
            console.log(error.message);
            navigate('/admin');
        }
    }


}

export default Logout;