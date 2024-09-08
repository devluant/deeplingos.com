import { Link } from "react-router-dom"

export default function Export() {
    const userDataName = "userData"
    let userData
    
    if (localStorage.getItem(userDataName)) {
        userData = localStorage.getItem(userDataName)
    }

    return (
        <div>
            <Link to="/">Back to Home</Link>
            <div className="mt-4 p-4">{ userData }</div>            
        </div>
    )
}