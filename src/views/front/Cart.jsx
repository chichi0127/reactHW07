import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router";
import { useDispatch } from 'react-redux';
import { createAsyncMessage } from '../../slice/messageSlice'


const apiBase = import.meta.env.VITE_API_BASE;
const apiPath = import.meta.env.VITE_API_PATH;


function Cart() {
    const BPtoken = document.cookie
        .replace(/(?:(?:^|.*;\s*)BPToken\s*=\s*([^;]*).*$)|^.*$/, "$1");


    const [cartList, setCartList] = useState();
    const dispatch = useDispatch();


    const getCart = async () => {
        try {
            const res = await axios.get(`${apiBase}v2/api/${apiPath}/cart`, {
                headers: {
                    Authorization: BPtoken
                }
            });
            console.log("數據", res.data.data.carts);
            setCartList(res.data.data.carts);
        } catch (error) {
            console.error(error);
        }
    };

    const addOne = async (id) => {
        const dataCart = {
            "product_id": id,
            "qty": 1
        };

        try {
            const res = await axios.post(`${apiBase}v2/api/${apiPath}/cart`, { data: dataCart });
            console.log(res);
            await getCart();
            dispatch(createAsyncMessage(res.data));
        } catch (error) {
            console.log(error);
            dispatch(createAsyncMessage(error.response.data))
        }
    }

    const deleteOne = async (id) => {
        const dataCart = {
            "product_id": id,
            "qty": -1
        };

        try {
            const res = await axios.post(`${apiBase}v2/api/${apiPath}/cart`, { data: dataCart });
            console.log(res);
            await getCart();
            dispatch(createAsyncMessage(res.data));
        } catch (error) {
            console.log(error);
            dispatch(createAsyncMessage(error.response
                .data))
        }
    }

    const deleteItem = async (id) => {
        try {
            const res = await axios.delete(`${apiBase}v2/api/${apiPath}/cart/${id}`);
            console.log(res);
            await getCart();
            dispatch(createAsyncMessage(res.data));
        } catch (error) {
            console.log(error);
            dispatch(createAsyncMessage(error.response
                .data))
        }
    }

    const deleteAll = async () => {
        try {
            const res = await axios.delete(`${apiBase}v2/api/${apiPath}/carts`);
            console.log(res);
            await getCart();
            dispatch(createAsyncMessage(res.data));
        } catch (error) {
            console.log(error);
            dispatch(createAsyncMessage(error.response
                .data))
        }
    }



    useEffect(() => {
        getCart();
    }, []);

    return (
        <>
            <div className="bg-color min-vh-100 m-0 p-0">
                <h2 className="text-center fw-semibold pt-3 text-light pb-3">購物車頁</h2>

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
                                                <div className="card-title d-flex justify-content-end align-items-center">
                                                    <h5 className="fw-semibold d-inline mb-0 mx-3">購買數量:</h5>
                                                    <button className="btn fw-bold shadow" type="button" onClick={() => deleteOne(cart.id)}>-</button>
                                                    <h5 className="card-title text-success fw-semibold mb-0 mx-3">{carts.qty}</h5>
                                                    <button className="btn fw-bold shadow" type="button" onClick={() => addOne(cart.id)}>+</button>
                                                    <button className="btn fw-bold btn-danger mx-3" type="button" onClick={() => deleteItem(carts.id)}>刪除</button>
                                                </div>

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
                <div className="d-flex justify-content-center py-5">
                    <button className="btn fw-bold btn-danger" type="button" onClick={deleteAll}>清除購物車</button>
                    <Link className="btn fw-bold mx-2 btn-primary" to='/checkout'>結帳</Link>
                </div>


            </div >
        </>
    )
}

export default Cart;