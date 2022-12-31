import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Chats = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("profile"));

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, []);

  return <div>Chats</div>;
};

export default Chats;
