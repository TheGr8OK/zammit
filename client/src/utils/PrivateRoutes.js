import { Outlet, Navigate } from 'react-router-dom'
import Cookies from 'universal-cookie'


const PrivateRoutes = () => {
    const cookies = new Cookies();

    let auth = cookies.get("accessToken")
    return(
        (typeof auth === "undefined") ? <Navigate to="/"/>  : <Outlet/>
    )
}

export default PrivateRoutes