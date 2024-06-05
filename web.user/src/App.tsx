import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import LoginScreen from "./screens/LoginScreen.tsx";
import {ProtectedLayout} from "./layouts/ProtectedLayout.tsx";
import HomeScreen from "./screens/HomeScreen.tsx";
import RegisterScreen from "./screens/RegisterScreen.tsx";
import PersonalInfoScreen from "./screens/PersonalInfoScreen.tsx";

function App() {

    return (
        <div
            style={{
                maxWidth: '400px',
                width: '100%',
                margin: '2rem auto',
                backgroundColor: '#fff',
                height: '800px',
            }}
        >
            <BrowserRouter>
                <Routes>
                    <Route path="/login" Component={LoginScreen} />
                    <Route path="/register" Component={RegisterScreen} />
                    <Route path="/info" Component={PersonalInfoScreen} />
                    <Route path="/" Component={ProtectedLayout} >
                        <Route path="/" Component={HomeScreen} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App
