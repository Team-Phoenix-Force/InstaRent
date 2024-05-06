import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/home";
import PaymentPage from "./pages/paymentPage.jsx";
import Products from "./pages/Products.jsx";
import SellForm from "./pages/sellForm.jsx";
import View from "./pages/viewitem.jsx";
import UserProfile from "./pages/userProfile.jsx";
import { NotFound } from "./components/notfound.jsx";
import { Wishlist } from "./pages/wishlist.jsx";
import { Login } from "./pages/login.jsx";
import { Register } from "./pages/register.jsx";
import FilteredProducts from "./pages/filteredProduct.jsx";
import { Chat } from "./pages/chat.jsx";
import ChatList from "./pages/chatlist.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<Home />} />
        <Route path="paymentPage" element={<PaymentPage />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/product/:id" element={<View />} />
        <Route path="/sellform" element={<SellForm />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/not-found" element={<NotFound />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/search/:searchedText" element={<FilteredProducts />} />
        <Route path="/profile/:userid" element={<UserProfile />} />
        <Route path="/chat/:userid/:sellerid" element={<Chat />} />
        <Route path="/chatlist" element={<ChatList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
