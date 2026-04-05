import axios from 'axios'
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { createAsyncMessage } from '../slice/messageSlice'

const apiBase = import.meta.env.VITE_API_BASE;
const apiPath = import.meta.env.VITE_API_PATH;

function Logout() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const signOut = async () => {
        try {
            const res = await axios.post(`${apiBase}v2/logout`);
            document.cookie = "BPToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            axios.defaults.headers.common['Authorization'] = "";
            dispatch(createAsyncMessage(res.data));
            navigate('/');

        } catch (error) {
            console.log(error.message);
            dispatch(createAsyncMessage(error.response.data));
            navigate('/admin');
        }
    }
    return (
        <>
            <button className='nav-link border-0 bg-transparent fs-5 fw-bold btn-primary' onClick={signOut}>登出</button>
        </>
    )

}

export default Logout;