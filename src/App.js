import ChatComponent from "./ChatComponent/ChatComponent";
import LoginComponent from "./LoginComponent/LoginComponent";
import RegisterComponent from "./RegistrationComponent/RegisterComponent";

import {BrowserRouter, Routes, Route, useNavigate} from 'react-router-dom'
import {useState, useEffect} from "react";

function ProtectedRoute({element, username}) {
    const navigate = useNavigate();

    useEffect(() => {
        if (!username) {
            navigate('/');
        }

    }, [username, navigate]);

    return username ? element : null;
}

function App() {
    const [username, setUsername] = useState("");
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/chat" element={<ProtectedRoute username={username}
                                                             element={<ChatComponent username={username}/>}/>}/>
                <Route path={"/"} element={<LoginComponent setUsername={setUsername}/>}/>
                <Route path="/register" element={<RegisterComponent/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;