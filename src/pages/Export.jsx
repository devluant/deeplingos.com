export default function Export() {
    const userDataName = "userData"
    let userData
    
    if (localStorage.getItem(userDataName)) {
        userData = localStorage.getItem(userDataName)
    }

    return (
        <div>
            { userData }
        </div>
    )
}