import React from "react";
import { Navigate } from "react-router-dom";
import { useUserAuth } from "../context/userAuthContext";

const ProtectedRoute = ({ children }) => {
  const { user } = useUserAuth();

  console.log("Check user in Private: ", user);

  if (!user) {
    // Foydalanuvchi tizimga kirmagan bo'lsa, Login sahifaga yo'naltirish
    return <Navigate to="/login" />;
  }

  // Foydalanuvchi tizimga kirdi, faqat bermagan sahifani ko'rsatish
  return children;
};

export default ProtectedRoute;