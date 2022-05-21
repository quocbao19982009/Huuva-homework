import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Container from "./components/layout/Container";
import OrderDetailPage from "./pages/OrderDetailPage";
import OrdersPage from "./pages/OrdersPage";

function App() {
  return (
    <Container>
      <Routes>
        <Route path="/" element={<OrdersPage />}></Route>
        <Route path="/order/:id" element={<OrderDetailPage />}></Route>
        <Route path="/sort/:sortOrder" element={<OrdersPage />}></Route>
      </Routes>
    </Container>
  );
}

export default App;
