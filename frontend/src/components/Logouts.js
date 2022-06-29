import React, { useEffect } from "react";
import { setCookie } from "../utils/cookieHelper";
import { useNavigate } from "react-router-dom";

export const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setCookie("accessToken", null, 0);
    navigate("/");
  }, []);

  return <div>Logging out</div>;
};
