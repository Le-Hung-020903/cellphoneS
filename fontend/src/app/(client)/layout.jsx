"use client";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getProfile } from "../../redux/middlewares/userMiddlewares";
import Header from "../components/header";
import Footer from "../components/footer";
const ClientLayout = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default ClientLayout;
