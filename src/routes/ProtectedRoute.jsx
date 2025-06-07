import { Navigate, Outlet } from "react-router-dom"
import { useUser } from '../context/UserContext'

function ProtectedRoute() {

    const { currentUser } = useUser();

    return currentUser ? <Outlet /> : <Navigate to={'/'} />
}

export default ProtectedRoute