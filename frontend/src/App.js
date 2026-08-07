import { useState,useEffect } from "react";

import AppRoutes from "./routes/AppRoutes";

import SplashScreen from "./components/SplashScreen/SplashScreen";

function App(){

    const [loading,setLoading]=useState(true);

    useEffect(()=>{

        const timer=setTimeout(()=>{

            setLoading(false);

        },1500);

        return ()=>clearTimeout(timer);

    },[]);

    return loading
        ? <SplashScreen/>
        : <AppRoutes/>;

}

export default App;