import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { ADMIN_ROLE, USER_ROLE, SELLER_ROLE, SUPER_ADMIN_ROLE } from './constant';
import Footer from './components/common/Footer.js';

import CircularProgress from '@mui/material/CircularProgress';

import CircularProgress from '@mui/material/CircularProgress';
import Skeleton from '@mui/material/Skeleton';
import  Navbar  from './components/common/Navbar'
import TopProducts from './components/TopProducts/TopProducts';
import EditProduct from './components/Products/EditProduct';

import ProtectedRoute from './components/ProtectedRoute';
import Transactions from './pages/transactions/transactions.js';
import UpdateUserForm from './pages/UserManagement/UserUpdate.js';
import CustomerPage from './pages/customers/customerPage.js';
import UserTable from './pages/UserManagement/UserTable.js';
import Review from './pages/Products/Review.js';
import Sidebar from './pages/Sidebar/Sidebar.js';


// const Navbar = React.lazy(() => import("./components/common/Navbar"));
const Unauthorized = React.lazy(() => import("./pages/Unauthorized.js"));
const Home = React.lazy(() => import("./pages/Home"));
const AdminComponent = React.lazy(() => import("./components/AdminComponent"));
const UserComponent = React.lazy(() => import("./components/UserComponent"));
const SellerComponent = React.lazy(() => import("./components/SellerComponent"));
const LoginComponent = React.lazy(() => import("./auth/Login.js"));
const Products = React.lazy(() => import("./components/Products/Page.js"));
const Product = React.lazy(() => import("./components/Product/Page.js"));
const Users = React.lazy(() => import("./components/UserComponent/index.js"));
const RealProducts = React.lazy(() => import("./pages/Products/index.js"));
const DemoProducts = React.lazy(() => import("./pages/Products/index.js"));
const SellerAccessRequestForm = React.lazy(() => import("./components/SellerDashboard/SellerAccessRequestForm.js"));
const App = () => {
  return (
    <>
      <React.Suspense fallback={<Skeleton variant="rectangular" width={210} height={118} />}>
        <Navbar />
        <Routes>
        <Route path="/sidebar" element={<Sidebar />} />
          <Route path="/" element={<Home />} />
          <Route path="/Login" element={<LoginComponent />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="/products" element={<Products />} />
          <Route path="/realproducts" element={<RealProducts />} />
          <Route path="/demoProducts" element={<DemoProducts />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path='/table' element={<UserTable />} />
          <Route path='/update/:id' element={<UpdateUserForm />} />
          <Route path='/review' element={<Review />} />
          <Route path='/transactions' element={<Transactions />} />
          <Route path= '/customers' element={<CustomerPage />} />
          <Route
            path="/users"
            element={<ProtectedRoute element={Users} roles={[ADMIN_ROLE,SUPER_ADMIN_ROLE]} unauthorizedPath="/unauthorized" loginPath="/login" />} />
          <Route
            path="/admin"
            element={<ProtectedRoute element={AdminComponent} roles={[ADMIN_ROLE, SUPER_ADMIN_ROLE]} unauthorizedPath="/unauthorized" loginPath="/login" />}
          />
          <Route
            path="/user"
            element={<ProtectedRoute element={UserComponent} roles={[USER_ROLE,SUPER_ADMIN_ROLE]} unauthorizedPath="/unauthorized" loginPath="/login" />}
          />
          <Route
            path="/seller-request"
            element={<ProtectedRoute element={SellerAccessRequestForm} roles={[USER_ROLE, SUPER_ADMIN_ROLE]} unauthorizedPath="/unauthorized" loginPath="/login" />}
          />
          <Route
            path="/seller"
            element={<ProtectedRoute element={SellerComponent} roles={[SELLER_ROLE, SUPER_ADMIN_ROLE]} unauthorizedPath="/unauthorized" loginPath="/login" />}
          />
        </Routes>
        <Footer />
      </React.Suspense>
    </>
  );
};


export default App;

