import { ToastContainer, toast } from 'react-toastify';
export const notify = (type) => {
    let text = "";
    if (type === "adding") {
        text = "User added successfully";
    }
    else if (type === "deleting") {
        text = "User deleted successfully"
    }
    toast.success(text, {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    })
}

const Toast = () => {
    return (
        <>
            <ToastContainer
                position="bottom-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </>
    )
}

export default Toast