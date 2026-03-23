import { useEffect, useState } from 'react'
import 'bootstrap'
import { useNavigate } from 'react-router'
import '../../assets/all.scss'
import axios from 'axios'


const apiBase = import.meta.env.VITE_API_BASE;
const apiPath = import.meta.env.VITE_API_PATH;


function HomeBack() {

    const navigate = useNavigate();
    const [user, setUser] = useState({
        username: '',
        password: ''
    })


    const handleUser = (e) => {
        const { name, value } = e.target;
        setUser((pre) => ({
            ...pre,
            [name]: value,
        }));

    }

    const signIn = async () => {
        try {
            const res = await axios.post(`${apiBase}v2/admin/signin`, user);
            const { token, expired } = res.data;

            document.cookie = `BPToken=${token}; expires=${new Date(expired)}; path=/`;

            axios.defaults.headers.common['Authorization'] = token;

            navigate('/admin/product');

        } catch (error) {
            console.log(error.message);
            navigate('/admin');
        }
    }

    useEffect(() => {

        const BPCookie = document.cookie.replace(
            /(?:(?:^|.*;\s*)BPToken\s*=\s*([^;]*).*$)|^.*$/,
            "$1",
        );

        if (!BPCookie) {
            navigate('/admin');
            return;
        }

        axios.defaults.headers.common['Authorization'] = BPCookie;

        const checkLogin = async () => {
            try {
                const res = await axios.post(`${apiBase}v2/api/user/check`, {
                    headers: {
                        Authorization: BPCookie
                    }
                });
                console.log("驗證成功:", res.data);

                navigate('/admin/product');
            } catch (error) {
                console.log(BPCookie)
                console.error("驗證失敗", error.data);
                navigate('/admin');
            }
        };

        checkLogin();

    }, [navigate])

    return (
        <>
            <div className="background d-flex align-items-center justify-content-center">
                <div className="login_style">
                    <h1 className='pt-5 text-center text-light fs-1 fw-bold'>登入</h1>
                    <div className='maininput mt-3 mb-3'>
                        <label htmlFor="mail" className='form-label text-light fs-5'>請輸入帳號</label>
                        <input type="email" name='username' value={user.username} id='mail' className='form-control' onChange={handleUser} placeholder='請輸入信箱' />
                        <label htmlFor="password" className='pt-3 form-label text-light fs-5'>請輸入密碼</label>
                        <input type="password" name='password' value={user.password} id='password' className='form-control' onChange={handleUser} placeholder='請輸入密碼' />
                    </div>
                    <div className='d-flex justify-content-center'>
                        <button className='btn btn-primary text-center fw-bold px-4 fs-6 mt-4' onClick={signIn}>送出</button>
                    </div>
                </div>
            </div>
        </>
    )

}

export default HomeBack;