import { useEffect, useState } from 'react'
import 'bootstrap'
import { useNavigate } from 'react-router'
import '../../assets/all.scss'
import axios from 'axios'
import { useForm } from "react-hook-form";
import { useDispatch } from 'react-redux';
import { createAsyncMessage } from '../../slice/messageSlice'


const apiBase = import.meta.env.VITE_API_BASE;
const apiPath = import.meta.env.VITE_API_PATH;


function Login() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({ mode: "onChange" });

    const onSubmit = async (formdata) => {
        console.log("表單資料:", formdata);

        const data = {
            username: formdata.email,
            password: formdata.password
        }

        try {
            const res = await axios.post(`${apiBase}v2/admin/signin`, data);
            const { token, expired } = res.data;

            document.cookie = `BPToken=${token}; expires=${new Date(expired)}; path=/`;

            axios.defaults.headers.common['Authorization'] = token;
            dispatch(createAsyncMessage(res.data));
            navigate('/admin/product');

        } catch (error) {
            console.log(error.message);
            dispatch(createAsyncMessage(error.response
                .data));
            navigate('/Login');
            reset();
        }
    };

    useEffect(() => {

        const BPCookie = document.cookie.replace(
            /(?:(?:^|.*;\s*)BPToken\s*=\s*([^;]*).*$)|^.*$/,
            "$1",
        );

        if (!BPCookie) {
            navigate('/Login');
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
                navigate('/Login');
            }
        };

        checkLogin();

    }, [navigate])

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="background d-flex align-items-center justify-content-center">
                    <div className="login_style">
                        <h1 className='pt-5 text-center text-light fs-1 fw-bold'>登入</h1>
                        <div className='maininput mt-3 mb-3'>
                            <label htmlFor="mail" className='form-label text-light fs-5'>請輸入帳號</label>
                            <input type="email" id='mail' className='form-control' placeholder='請輸入信箱' {...register("email", {
                                required: "帳號為必填項目", pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message: "請輸入有效的信箱格式",
                                },
                            })} />
                            {errors.email && (
                                <p className="text-danger mt-2 mb-0">{errors.email.message}</p>
                            )}
                            <label htmlFor="password" className='pt-3 form-label text-light fs-5'>請輸入密碼</label>
                            <input type="password" id='password' className='form-control' placeholder='請輸入密碼' {...register("password", {
                                required: "請輸入密碼",
                                minLength: {
                                    value: 8,
                                    message: "密碼長度至少需8碼",
                                },
                            })} />
                            {errors.password && (
                                <p className="text-danger mt-2 mb-0">{errors.password.message}</p>
                            )}
                        </div>
                        <div className='d-flex justify-content-center'>
                            <button className='btn btn-primary text-center fw-bold px-4 fs-6 mt-4' type="submit">送出</button>
                        </div>
                    </div>
                </div>
            </form>
        </>
    )

}

export default Login;
