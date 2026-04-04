import { useNavigate } from "react-router";
import { useEffect, useState } from "react";



function NotFound() {

    const navigate = useNavigate();
    const [time, setTime] = useState(5);
    useEffect(() => {

        let count = 5;

        const timer = setInterval(() => {

            count--;
            setTime(count);

            if (count === 0) {
                clearInterval(timer);
            }

        }, 1000);

        const jumper = setTimeout(() => {
            navigate('/');
        }, 5000);

        return () => {
            clearTimeout(jumper);
            clearInterval(timer);
        }

    }, [navigate]);

    return (
        <>
            <div className="d-flex justify-content-center align-items-center vh-100">
                <div>
                    <h2 className="fs-1 fw-bold text-center">沒有這個頁面</h2>
                    <p className="fs-2 fw-bold text-center">即將跳轉回首頁</p>
                    <p className="fs-2 fw-bold text-center">{time}</p>
                </div>
            </div>

        </>
    )
}

export default NotFound;