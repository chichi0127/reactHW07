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
    } = useForm({ mode: "onBlur" });

    const onSubmit = (data) => {
        console.log("表單資料:", data);
        // 處理表單提交
        reset(); // 重置表單
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
                            <input type="text" name='name' id='name' className='form-control' placeholder="請輸入姓名" />
                            <label htmlFor="mail" className='form-label text-light fs-5 mt-3'>電子信箱</label>
                            <input type="email" name='email' id='mail' className='form-control' placeholder='請輸入信箱' />
                            <label htmlFor="tel" className='form-label text-light fs-5 mt-3'>電話號碼</label>
                            <input type="tel" name='tel' id='tel' className='form-control' placeholder='請輸入電話號碼' />
                            <label htmlFor="address" className='form-label text-light fs-5 mt-3'>收件地址</label>
                            <input type="text" name='address' id='address' className='form-control' placeholder='請輸入地址' />
                            <label htmlFor="message" className='form-label text-light fs-5 mt-3'>留言</label>
                            <textarea id='message' className='form-control' cols="30"
                                rows="10" placeholder='有什麼想告訴賣家嗎?' />
                        </div>
                    </div>
                    {/* 0329進度，明天寫表單內容 */}
                </form>;
                <div className="d-flex justify-content-center py-5">
                    <button className="btn fw-bold btn-primary" type="button" >送出訂單</button>
                </div>


            </div >
        </>
    )
}

export default Checkout;