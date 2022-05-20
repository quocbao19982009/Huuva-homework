import React from "react";
import { Container as ContainerUI, Box } from "@mui/material";
import Navbar from "./Navbar";

type ContainerProps = {
  children: React.ReactNode;
};

const Container = ({ children }: ContainerProps) => {
  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Navbar></Navbar>
      <ContainerUI component="main" sx={{ mt: "2rem", marginBottom: "2rem" }}>
        {children}
      </ContainerUI>
    </Box>
  );
};

export default Container;
