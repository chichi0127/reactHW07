import { Outlet, Link } from "react-router";


function BackendLayout() {
    return (
        <>
            <header>

                <ul className="nav justify-content-end">
                    <li className="nav-item">
                        <Link className="nav-link fs-5 fw-semibold" to='/'><i class="bi bi-house-door-fill"></i></Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link fs-5 fw-semibold" to='/admin/product'>產品列表</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link fs-5 fw-semibold" to='/admin/order'>訂單列表</Link>
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

export default BackendLayout;