import { Outlet, Link } from "react-router";


function FrontendLayout() {
    return (
        <>
            <header className="header_bg d-flex py-4" >
                <img className=" rounded logo_home " src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Logo_of_Blackpink.svg/960px-Logo_of_Blackpink.svg.png" alt="" />
                <ul className="ms-auto nav justify-content-end fs-5 fw-bold">
                    <li className="nav-item">
                        <Link className="nav-link" to='/'>首頁</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to='/product'>專輯列表</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to='/cart'><i className="bi bi-cart-fill"></i></Link>
                    </li>
                    {/* <li className="nav-item">
                        <Link className="nav-link" to='/checkout'>結帳</Link>
                    </li> */}
                    <li className="nav-item">
                        <Link className="nav-link" to='/login'><i class="bi bi-person-circle"></i></Link>
                    </li>
                </ul>
            </header>
            <main>
                <Outlet />
            </main>
            <footer></footer>
        </>
    )
}

export default FrontendLayout;