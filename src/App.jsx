import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Shop from "./pages/Shop";
import Product from "./pages/Product";
import Collections from "./pages/Collections";
import Login from "./pages/buyer/Login";
import Signup from "./pages/buyer/Signup";
import LoginPortals from "./pages/LoginPortals";
import LoginAdmin from "./pages/admin/LoginAdmin";
import SignupPortals from "./pages/SignupPortals";
import Dashboard from "./pages/admin/Dashboard";
import BuyerAccounts from "./pages/admin/BuyerAccounts";
import SellerAccounts from "./pages/admin/SellerAccounts";
import PendingApprovals from "./pages/admin/PendingApprovals";
import ProductsAdmin from "./pages/admin/ProductsAdmin";
import LoginSeller from "./pages/retailer/LoginSeller";
import RetailerDashboard from "./pages/retailer/RetailerDashboard";
import SignupSeller from "./pages/retailer/SignupSeller";
import RetailerOrders from "./pages/retailer/RetailerOrders";
import RetailerStore from "./pages/retailer/RetailerStore";
import SignupAdmin from "./pages/admin/SignupAdmin";
import CategoriesAdmin from "./pages/admin/CategoriesAdmin";
import SubCategoriesAdmin from "./pages/admin/SubCategoriesAdmin";
import BuyerDashboard from "./pages/buyer/BuyerDashboard";
import AccountDetails from "./pages/buyer/AccountDetails";
import BuyerOrders from "./pages/buyer/BuyerOrders";
import Wishlist from "./pages/buyer/Wishlist";
import Hero from "./pages/admin/Hero";
import Checkout from "./pages/Checkout";
import CheckoutSuccess from "./pages/CheckoutSuccess";
import { CircularProgress } from "@mui/material";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false); // Stop loading after 3 seconds (for demo purposes)
    }, 3000); // Adjust the time as per your need

    return () => clearTimeout(timer); // Cleanup the timer on unmount
  }, []);
  if (isLoading)
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <CircularProgress />
      </div>
    );
  else
    return (
      <>
        <Header />
        <Routes>
          {/* Buyer Routes */}
          <Route exact path="/" element={<Home />} />
          <Route exact path="/shop/:category/:subCategory" element={<Shop />} />
          <Route exact path="/categories" element={<Collections />} />
          <Route exact path="/wishlist" element={<Wishlist />} />
          <Route exact path="/checkout" element={<Checkout />} />
          <Route exact path="/checkoutSuccess" element={<CheckoutSuccess />} />
          <Route exact path="/product/:id" element={<Product />} />
          <Route exact path="/buyer/dashboard" element={<BuyerDashboard />} />
          <Route
            exact
            path="/buyer/accountDetails"
            element={<AccountDetails />}
          />
          <Route exact path="/buyer/orders" element={<BuyerOrders />} />
          <Route exact path="/buyer/wishlist" element={<Wishlist />} />

          {/* Admin Routes */}
          <Route exact path="/admin/dashboard" element={<Dashboard />} />
          <Route exact path="/admin/hero" element={<Hero />} />
          <Route
            exact
            path="/admin/buyerAccounts"
            element={<BuyerAccounts />}
          />
          <Route exact path="/admin/categories" element={<CategoriesAdmin />} />
          <Route
            exact
            path="/admin/subCategories/:category"
            element={<SubCategoriesAdmin />}
          />
          <Route
            exact
            path="/admin/products/:category/:subCategory/:store"
            element={<ProductsAdmin />}
          />
          <Route
            exact
            path="/admin/sellerAccounts"
            element={<SellerAccounts />}
          />
          <Route
            exact
            path="/admin/pendingApprovals"
            element={<PendingApprovals />}
          />

          {/* Seller Routes */}
          <Route
            exact
            path="/retailer/dashboard"
            element={<RetailerDashboard />}
          />
          <Route exact path="/retailer/orders" element={<RetailerOrders />} />
          <Route exact path="/retailer/store" element={<RetailerStore />} />

          <Route exact path="/loginPortals" element={<LoginPortals />} />
          <Route exact path="/loginBuyer" element={<Login />} />
          <Route exact path="/loginAdmin" element={<LoginAdmin />} />
          <Route exact path="/loginSeller" element={<LoginSeller />} />

          <Route exact path="/signupPortals" element={<SignupPortals />} />
          <Route exact path="/signupBuyer" element={<Signup />} />
          <Route exact path="/signupSeller" element={<SignupSeller />} />
          <Route exact path="/signupAdmin" element={<SignupAdmin />} />
        </Routes>
        <Footer />
      </>
    );
}

export default App;
