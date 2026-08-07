import "./Loading.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Loading() {

  const navigate = useNavigate();

  useEffect(() => {

    const timer = setTimeout(() => {

      navigate("/order-success");

    }, 3000);

    return () => clearTimeout(timer);

  }, [navigate]);

  return (

    <div className="loading-page">

      <div className="loader">

        <div className="loader_cube loader_cube--color"></div>

        <div className="loader_cube loader_cube--glowing"></div>

      </div>

      <h2>Processing Your Order...</h2>

      <p>Please wait a moment.</p>

    </div>

  );

}

export default Loading;