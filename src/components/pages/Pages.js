import { Routes, Route } from "react-router-dom";
import EditUserInfo from '../editUserInfo/EditUserInfo';
import Home from '../home/Home';

const Pages = () => {
    return (
        <>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/home' element={<Home />} />
                {/* <Route path='/edit-user' element={<EditUserInfo />} /> */}
                <Route path='/edit-user/:userId' element={<EditUserInfo />} />
            </Routes>

        </>
    )
}

export default Pages