import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { createAsyncMessage } from '../../slice/messageSlice'


const apiBase = import.meta.env.VITE_API_BASE;
const apiPath = import.meta.env.VITE_API_PATH;

function SingleProduct() {
    const { id } = useParams();//要跟在router.jsx檔的path定義的名字一樣
    const [product, setProduct] = useState(null);
    const dataCart = {
        "product_id": id,
        "qty": 1
    };
    const navigator = useNavigate();
    const dispatch = useDispatch();

    const handleBack = () => {
        return navigator(-1);
    };

    const addCart = async () => {
        try {
            const res = await axios.post(`${apiBase}v2/api/${apiPath}/cart`, { data: dataCart });
            console.log(res);
            navigator("/product");
            dispatch(createAsyncMessage(res.data));
        } catch (error) {
            console.log(error);
            dispatch(createAsyncMessage(error.response.data))
        }
    }


    useEffect(() => {
        const getProduct = async () => {
            try {
                const res = await axios.get(`${apiBase}v2/api/${apiPath}/product/${id}`);
                setProduct(res.data.product);
            } catch (error) {
                console.log(error);
            }
        }
        getProduct();
        console.log("當前產品 ID:", id);
    }, [id]);
    return (
        <>

            <h2>產品詳細頁</h2>
            {
                product && <div className="card" >
                    <img src={product.imageUrl} className="card-img-top" alt={product.title} />
                    <div className='d-flex justify-content-between align-items-center '>
                        {product.imagesUrl.map((img, index) =>

                            <div className='col-2' key={`display-img-${index}`} >
                                <img src={img} alt={`產品編號${index + 1}`} className=' img-fluid' />
                            </div>

                        )}
                    </div>
                    <div className="card-body">
                        <h5 className="card-title">{product.title}</h5>
                        <p className="card-text">{product.description}</p>
                        <p className="card-text">{product.content}</p>
                    </div>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item"><p className="card-text">人物小卡：<span className='fw-semibold'>{product.card_person}</span></p></li>
                        <li className="list-group-item">
                            <p className="card-text">原價：<span className='text-decoration-line-through'>{product.origin_price}</span></p></li>
                        <li className="list-group-item"><p className="card-text fs-5">售價：<span className='text-danger fw-semibold'>{product.price}</span></p></li>
                        <li className="list-group-item"><p className="card-text">剩餘數量：<span className='text-warning'>{product.unit}</span></p></li>
                    </ul>
                    <div class="card-body">
                        <button onClick={addCart} className="btn btn-primary mx-2">加入購物車</button>
                        <Link to="/" className="btn btn-primary mx-2">回首頁</Link>
                        <button onClick={handleBack} className="btn btn-primary mx-2">回上一頁</button>
                    </div>
                </div>
            }


        </>
    )
}

export default SingleProduct;