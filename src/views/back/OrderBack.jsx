import axios from 'axios';
import { useState, useEffect } from 'react'
import { Link } from 'react-router';

const apiBase = import.meta.env.VITE_API_BASE;
const apiPath = import.meta.env.VITE_API_PATH;

function OrderBack() {
  const BPtoken = document.cookie
    .replace(/(?:(?:^|.*;\s*)BPToken\s*=\s*([^;]*).*$)|^.*$/, "$1");
  const [pagination, setPagination] = useState();
  const [orders, setOrders] = useState();

  const getOrder = async () => {
    try {
      const res = await axios.get(`${apiBase}v2/api/${apiPath}/admin/orders`, {
        headers: {
          Authorization: BPtoken
        }
      });
      console.log("取得資料:", res.data);
      setOrders(res.data.orders);
      setPagination(res.data.pagination);
    } catch (error) {
      console.error("取得資料時發生錯誤:", error.response
        .data);
    }

  };

  useEffect(() => {
    getOrder();
  }, []);

  return (
    <>
      <>
        <div className="bg-color min-vh-100 m-0 p-0">
          <h2 className="text-center fw-semibold pt-3 text-light pb-3">訂單管理</h2>

          {
            orders && orders.length > 0 ? (orders.map(orders => {
              const order = orders.products;
              const orderUser = orders.user;
              return (<>
                <div className="px-5 pb-3 " key={orders.id} >
                  <div className="container shadow bg-primary rounded-2 px-5 py-2 " data-bs-toggle="collapse" data-bs-target={`#${orders.id}`} aria-expanded="false" aria-controls={orders.id}>
                    <div className="row">
                      <div className="col-11 d-flex justify-content-between align-items-center">
                        <h5 className={`card-title fw-semibold ${orders.is_paid ? "text-success" : "text-dark"}`}>{orders.is_paid ? "已付款" : "未付款"}</h5>
                        <div className="card-title text-light d-flex justify-content-evenly align-items-center ">
                          <h5 className="card-title text-light fw-semibold">購買客戶:</h5>
                          <h5 className="card-title text-light fw-semibold px-2">{orderUser.name}</h5>
                        </div>
                      </div>

                    </div>
                  </div>
                  <div className="collapse  pt-3" id={orders.id}>
                    <div className="card card-body">
                      <div className="row justify-content-center">
                        <div className="col-3 align-items-start">
                          <h5 className="card-title fw-bold my-2">客戶留言</h5>
                          <p className="card-text">{orders.message}</p>
                        </div>
                        <div className="col-9 d-flex align-items-center">
                          <ul className="list-group list-group-flush">
                            <li className="list-group-item">
                              <p className="card-text">客戶姓名：<span className='fw-semibold'>{orderUser.name}</span></p></li>
                            <li className="list-group-item">
                              <p className="card-text">客戶地址：<span className='fw-semibold'>{orderUser.address}</span></p>
                            </li>
                            <li className="list-group-item">
                              <p className="card-text">客戶信箱：<span className='fw-semibold'>{orderUser.email}</span></p>
                            </li>
                            <li className="list-group-item">
                              <p className="card-text">客戶電話：<span className='fw-semibold'>{orderUser.tel}</span></p>
                            </li>
                          </ul>
                          {/* <div className="card-title d-flex justify-content-end align-items-center">
                            <h5 className="fw-semibold d-inline mb-0 mx-3">購買數量:</h5>
                            <button className="btn fw-bold shadow" type="button" onClick={() => deleteOne(cart.id)}>-</button>
                            <h5 className="card-title text-success fw-semibold mb-0 mx-3">{carts.qty}</h5>
                            <button className="btn fw-bold shadow" type="button" onClick={() => addOne(cart.id)}>+</button>
                            <button className="btn fw-bold btn-danger mx-3" type="button" onClick={() => deleteItem(carts.id)}>刪除</button>
                          </div> */}

                        </div>
                      </div>
                    </div>
                  </div>
                </div >
              </>)
            })) : (
              <div className="text-center text-light mt-5">
                <h3 className="fw-bold">訂單列表是空的</h3>
                <Link to="/product" className="fw-bold fs-3 text-decoration-none px-3 rounded-2 py-2 shadow my-3" >~去逛逛~</Link>
              </div>
            )


          }



        </div >
      </>
    </>
  )

}

export default OrderBack;