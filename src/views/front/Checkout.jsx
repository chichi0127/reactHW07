import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router";
import { useForm } from "react-hook-form";


const apiBase = import.meta.env.VITE_API_BASE;
const apiPath = import.meta.env.VITE_API_PATH;


function Checkout() {
    const BPtoken = document.cookie
        .replace(/(?:(?:^|.*;\s*)BPToken\s*=\s*([^;]*).*$)|^.*$/, "$1");

    const [cartList, setCartList] = useState();
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({ mode: "onChange" });

    const onSubmit = async (formdata) => {
        console.log("表單資料:", formdata);

        const data = {
            user: {
                "name": formdata.name,
                "email": formdata.email,
                "tel": formdata.tel,
                "address": formdata.address
            },
            message: formdata.message
        }

        try {
            const res = await axios.post(`${apiBase}v2/api/${apiPath}/order`, {
                data: data
            });
            console.log("數據", res);

        } catch (error) {
            console.error(error);
        }
        reset();
        getCart();
    };

    const getCart = async () => {
        try {
            const res = await axios.get(`${apiBase}v2/api/${apiPath}/cart`, {
                headers: {
                    Authorization: BPtoken
                }
            });
            console.log("數據", res.data.data.carts);
            setCartList(res.data.data.carts)
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getCart();
    }, []);

    return (
        <>
            <div className="bg-color min-vh-100 m-0 p-0">
                <h2 className="text-center fw-semibold pt-3 text-light pb-3">結帳頁</h2>

                {
                    cartList && cartList.length > 0 ? (cartList.map(carts => {
                        const cart = carts.product
                        return (<>
                            <div className="px-5 pb-3 " key={cart.id} >
                                <div className="container shadow bg-primary rounded-2 px-5 py-2 " data-bs-toggle="collapse" data-bs-target={`#${cart.id}`} aria-expanded="false" aria-controls={cart.id}>
                                    <div className="row">
                                        <div className="col-11 d-flex justify-content-between align-items-center">
                                            <h5 className="card-title text-light fw-semibold">{cart.title}</h5>
                                            <div className="card-title text-light d-flex justify-content-evenly align-items-center ">
                                                <h5 className="card-title text-light fw-semibold">類別:</h5>
                                                <h5 className="card-title text-light fw-semibold px-2">{cart.category}</h5>
                                            </div>
                                            <div className="card-title text-light d-flex justify-content-evenly align-items-center ">
                                                <h5 className="card-title text-light fw-semibold">總金額:</h5>
                                                <h5 className="card-title text-light fw-semibold px-2">{cart.price * carts.qty}</h5>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                                <div className="collapse  pt-3" id={cart.id}>
                                    <div className="card card-body">
                                        <div className="row align-items-center justify-content-center">
                                            <img src={cart.imageUrl} style={{ objectFit: "cover", minWidth: "200px" }} className=" col-3" alt={cart.title}></img>
                                            <div className="col-9">
                                                <h5 className="card-title fw-bold my-2">{cart.title}</h5>
                                                <p className="card-text">{cart.description}</p>
                                                <p className="card-text">{cart.content}</p>
                                                <ul className="list-group list-group-flush">
                                                    <li className="list-group-item"><p className="card-text">人物小卡：<span className='fw-semibold'>{cart.card_person}</span></p></li>
                                                    <li className="list-group-item">
                                                        <p className="card-text">原價：<span className='text-decoration-line-through'>{cart.origin_price}</span></p></li>
                                                    <li className="list-group-item"><p className="card-text fs-5">售價：<span className='text-danger fw-semibold'>{cart.price}</span></p></li>
                                                    <li className="list-group-item"><p className="card-text">剩餘數量：<span className='text-warning'>{cart.unit}</span></p></li>

                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div >
                        </>)
                    })) : (
                        <div className="text-center text-light mt-5">
                            <h3 className="fw-bold">購物車是空的</h3>
                            <Link to="/product" className="fw-bold fs-3 text-decoration-none px-3 rounded-2 py-2 shadow my-3" >~去逛逛~</Link>
                        </div>
                    )


                }
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="w-50 mx-auto">
                        <div className='maininput mt-3 mb-3'>
                            <label htmlFor="name" className='form-label text-light fs-5'>客戶姓名</label>
                            <input type="text" name='name' id='name' className='form-control' placeholder="請輸入姓名" {...register("name", { required: "姓名為必填項目", minLength: { value: 2, message: "姓名最少2個字" }, })} />
                            {errors.name && (
                                <p className="text-danger mt-2 mb-0">{errors.name.message}</p>)
                            }
                            <label htmlFor="mail" className='form-label text-light fs-5 mt-3'>電子信箱</label>
                            <input type="email" name='email' id='mail' className='form-control' placeholder='請輸入信箱' {...register("email", {
                                required: "信箱為必填項目", pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message: "請輸入有效的 Email 格式",
                                },
                            })} />
                            {errors.email && (
                                <p className="text-danger mt-2 mb-0">{errors.email.message}</p>
                            )}
                            <label htmlFor="tel" className='form-label text-light fs-5 mt-3'>手機號碼</label>
                            <input type="tel" name='tel' id='tel' className='form-control' placeholder='請輸入手機號碼' {...register("tel", {
                                required: "號碼為必填項目", pattern: {
                                    value: /^[0-9]{10}$/,
                                    message: '手機號碼格式錯誤',
                                },
                            })} />
                            {errors.tel && (
                                <p className="text-danger mt-2 mb-0">{errors.tel.message}</p>
                            )}
                            <label htmlFor="address" className='form-label text-light fs-5 mt-3'>收件地址</label>
                            <input type="text" name='address' id='address' className='form-control' placeholder='請輸入地址' {...register("address", { required: "地址為必填項目", })} />
                            {errors.address && (
                                <p className="text-danger mt-2 mb-0">{errors.address.message}</p>
                            )}
                            <label htmlFor="message" className='form-label text-light fs-5 mt-3'>留言</label>
                            <textarea id='message' className='form-control' cols="30"
                                rows="10" placeholder='有什麼想告訴賣家嗎?' {...register("message")} />
                        </div>
                    </div>
                    <div className="d-flex justify-content-center py-5">
                        <button className="btn fw-bold btn-primary" type="submit" >送出訂單</button>
                    </div>
                </form>



            </div >
        </>
    )
}

export default Checkout;