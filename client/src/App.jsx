import { ThemeProvider } from './context/ThemeContext';
import ThemeToggle from './components/ThemeToggle';
import './App.css'
import { Route, Routes } from 'react-router-dom';
import AuthLayout from './components/auth/Layout.jsx';
import SignIn from './pages/auth/SignIn.jsx';
import SignUp from './pages/auth/SignUp.jsx';
import AdminLayout from './components/admin/Layout.jsx';
import AdminDashboard from './pages/admin/Dashboard.jsx';
import AdminFeatures from './pages/admin/Features.jsx';
import AdminOrders from './pages/admin/Orders.jsx';
import AdminProducts from './pages/admin/Products.jsx';
import ShoppingLayout from './components/shopping/Layout.jsx';
import NotFound from './pages/NotFound/index.jsx';
import ShoppingHome from './pages/shopping/Home.jsx';
import ShoppingAccount from './pages/shopping/Account.jsx';
import ShoppingListing from './pages/shopping/Listing.jsx'; 
import ShoppingCheckOut from './pages/shopping/CheckOut.jsx';
import CheckAuth from './components/common/CheckAuth.jsx';
import UnAuth from './pages/un-auth';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { checkAuth } from './store/authSlice';
import { Skeleton } from '@/components/ui/skeleton';
import PaymentReturnPage from './pages/shopping/PaymentReturn';
import PaymentSuccessPage from './pages/shopping/PaymentSuccess';
import SearchProducts from './pages/shopping/Search';

function App() {
  const { user, isAuthenticated, isLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  if (isLoading) {
    return <Skeleton className="w-full bg-black h-[600px]" />;
  }

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-white dark:bg-gray-900  dark:text-white transition-colors duration-300">
       
      <header className="flex justify-end dark:bg-gray-900  bg-white">
          <ThemeToggle />
        </header>
        <Routes>
          <Route
            path="/"
            element={
              <CheckAuth isAuthenticated={isAuthenticated} user={user}></CheckAuth>
            }
          />
          <Route
            path="/auth"
            element={
              <CheckAuth isAuthenticated={isAuthenticated} user={user}>
                <AuthLayout />
              </CheckAuth>
            }
          >
            <Route path="signin" element={<SignIn />} />
            <Route path="signup" element={<SignUp />} />
          </Route>
          <Route
            path="/admin"
            element={
              <CheckAuth isAuthenticated={isAuthenticated} user={user}>
                <AdminLayout />
              </CheckAuth>
            }
          >
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="features" element={<AdminFeatures />} />
            <Route path="orders" element={<AdminOrders />} />
            <Route path="products" element={<AdminProducts />} />
          </Route>
          <Route
            path="/shop"
            element={
              <CheckAuth isAuthenticated={isAuthenticated} user={user}>
                <ShoppingLayout />
              </CheckAuth>
            }
          >
            <Route path="home" element={<ShoppingHome />} />
            <Route path="account" element={<ShoppingAccount />} />
            <Route path="listings" element={<ShoppingListing />} />
            <Route path="checkout" element={<ShoppingCheckOut />} />
            <Route path="payment-return" element={<PaymentReturnPage />} />
            <Route path="payment-success" element={<PaymentSuccessPage />} />
            <Route path="search" element={<SearchProducts/>} />
          </Route>
          <Route path="*" element={<NotFound />} />
          <Route path="/unauth-page" element={<UnAuth />} />
        </Routes>
      </div>
       {/* Toggle theme button */}
       
    </ThemeProvider>
  );
}

export default App;
