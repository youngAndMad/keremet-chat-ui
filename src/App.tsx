import './App.css'
import Login from "./pages/auth/Login/Login.tsx";
import {CookiesProvider, useCookies} from 'react-cookie'
import {useEffect} from "react";


function App() {
    const [cookies, setCookie] = useCookies(['user'])

    useEffect(() => {
        console.log(JSON.stringify(cookies))
    }, [cookies])

    return (
        <CookiesProvider>
            <Login/>
        </CookiesProvider>
    )
}


export default App
