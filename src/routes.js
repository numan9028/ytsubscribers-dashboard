import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Login from './pages/Login';
import DashboardApp from './pages/DashboardApp';
// Blog Components
import Blogs from './pages/Blogs/Blogs';
import CreateBlogForm from './pages/Blogs/components/CreateBlogForm';
import EditBlogForm from './pages/Blogs/components/EditBlogForm';
// Orders Components
import Orders from './pages/Orders/Orders';
import OrderDetails from './pages/Orders/components/OrderDetails';
import FindOrder from './pages/Orders/components/FindOrder/FindOrder';
// Stripe Setting
import StripeSetting from './pages/StripeSetting/StripeSetting';
import AddStripeSetting from './pages/StripeSetting/components/AddStripeSetting';
import EditStripeSetting from './pages/StripeSetting/components/EditStripeSetting';
// User
import AllUsers from './pages/User/AllUsers';
import CreateUser from './pages/User/components/CreateUser';
import EditUser from './pages/User/components/EditUser';
import UserProfile from './pages/User/components/UserProfile';
import EditUserProfile from './pages/User/components/EditUserProfile';
// User Role
import UserRoles from './pages/UserRole/UserRoles';
import AddUserRoles from './pages/UserRole/components/AddUserRole';
import EditUserRole from './pages/UserRole/components/EditUserRole';
// FAQs
import FAQ from './pages/FAQ/FAQ';
import CreateFaqForm from './pages/FAQ/components/CreateFaqForm';
import EditFaqForm from './pages/FAQ/components/EditFaqForm';
// Pages
import HomePage from './pages/AddPages/Home/HomePage';
import FaqsPage from './pages/AddPages/Faqs/Faqs';
import AboutPage from './pages/AddPages/About/About';
import ContactPage from './pages/AddPages/Contact/Contact';
import PrivacyPolicy from './pages/AddPages/PrivacyPolicy/PrivacyPolicy';
import RefundPolicy from './pages/AddPages/RefundPolicy/RefundPolicy';
import EditMainPage from './pages/AddPages/editPage';
// Home Page Sections
import EditTopSection from './pages/AddPages/Home/components/TopSection/EditTopSection';
import EditPredominantlySection from './pages/AddPages/Home/components/PredominantlyUsedServices/EditPredominantlySection';
import EditPowerfulServiceSection from './pages/AddPages/Home/components/PowerfulServices/EditPowerfulServices';
import EditTargetedViews from './pages/AddPages/Home/components/TargetedViews/EditTargetedViews';
import EditHowToBuySection from './pages/AddPages/Home/components/HowToBuy/EditHowToBuySection';
import EditWhyUsSection from './pages/AddPages/Home/components/WhyUs/EditWhyUsSection';
import EditProudlyDeliveredServices from './pages/AddPages/Home/components/ProudlyDelivered/EditProudlyDeliveredServices';
// About Page Sections
import EditAboutTopSection from './pages/AddPages/About/components/TopSection/EditAboutTopSection';
import EditMissionSection from './pages/AddPages/About/components/OurMission/EditMissionSection';
import EditAboutValuesSection from './pages/AddPages/About/components/AboutValues/EditAboutValuesSection';
// Add Privacy Policy
import CreatePrivacy from './pages/AddPages/PrivacyPolicy/components/CreatePrivacy';
import UpdatePrivacy from './pages/AddPages/PrivacyPolicy/components/UpdatePrivacy';
// Refund Policy
import UpdateRefundPolicy from './pages/AddPages/RefundPolicy/UpdateRefundPolicy';
// Reviews
import Reviews from './pages/Reviews/Reviews';
import AddReview from './pages/Reviews/components/AddReview';
import EditReview from './pages/Reviews/components/EditReview';
// Contact Page Section
import EditContactTopSection from './pages/AddPages/Contact/components/TopSection/EditContactTopSection';
// Packages
import Packages from './pages/Packages/Packages';
import AddPackage from './pages/Packages/components/AddPackage';
import EditPackage from './pages/Packages/components/EditPackage';
// Package Categories
import PackageCategories from './pages/PackagesCategories/PackagesCategories';
import AddCategory from './pages/PackagesCategories/components/AddCategory';
import EditCategory from './pages/PackagesCategories/components/EditCategory';
// duration
import Duration from './pages/Packages/Duration';
import AddDuration from './pages/Packages/AddDuration';


// Why Us
import WhyUs from './pages/WhyUs/WhyUs';
import AddWhyUs from './pages/WhyUs/components/AddWhyUs';
import EditWhyUs from './pages/WhyUs/components/EditWhyUs';
// Addons
import Addons from './pages/Addons/Addons';
import CreateAddon from './pages/Addons/components/CreateAddon';
import EditAddon from './pages/Addons/components/EditAddon';
// Coupons
import Coupons from './pages/Coupons/Coupons';
import AddCoupon from './pages/Coupons/components/AddCoupon';
import EditCoupon from './pages/Coupons/components/EditCoupon';
// ----------------------------------------------------------------------
import NotFound from './pages/Page404';
import EditDuration from './pages/Packages/components/EditDuration';
import Sitemap from './pages/Sitemap/Sitemap';
import CategoryReviews from './pages/Reviews/CategoryReviews';
// Login Protected Route
// import PrivateRoute from './Routes/PrivateRoute';
// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { path: 'app', element: <DashboardApp /> },
        // Users
        {
          path: 'users', element: <AllUsers />,
          // children: [
          // ]
        },
        { path: 'users/create-user', element: <CreateUser /> },
        { path: 'users/edit-user/:id', element: <EditUser /> },
        { path: 'users/user-profile', element: <UserProfile /> },
        { path: 'users/user-profile/edit', element: <EditUserProfile /> },
        // User Role
        {
          path: 'user-role', element: <UserRoles />,
        },
        { path: 'user-role/add-user-role', element: <AddUserRoles /> },
        { path: 'user-role/edit-user-role/:id', element: <EditUserRole /> },
        // Blogs
        { path: 'blogs', element: <Blogs /> },
        { path: 'blogs/add-blog', element: <CreateBlogForm /> },
        { path: 'blogs/edit-blog/:slug', element: <EditBlogForm /> },
        // Reviews
        { path: 'reviews', element: <Reviews /> },
        { path: 'pending-reviews', element: <CategoryReviews/> },
        { path: 'reviews/add-review', element: <AddReview /> },
        { path: 'reviews/edit-review/:id', element: <EditReview /> },
        // Orders
        {
          path: 'orders', element: <Orders />,
          // children: [
          // ]
        },
        { path: 'orders/order-details/:id', element: <OrderDetails /> },
        { path: 'orders/find-order', element: <FindOrder /> },
        // Stripe Setting
        {
          path: 'stripe-setting', element: <StripeSetting />,
          // children: [
          // ]
        },
        // { path: 'stripe-setting/add-stripe-setting', element: <AddStripeSetting /> },
        { path: 'stripe-setting/edit-stripe-setting/:id', element: <EditStripeSetting /> },
        // Faqs
        { path: 'pages/faqs', element: <FAQ /> },
        { path: 'pages/faqs/add-faq', element: <CreateFaqForm /> },
        { path: 'pages/faqs/edit-faq/:id', element: <EditFaqForm /> },
        // Pages
        { path: 'pages/home', element: <HomePage /> },
        { path: 'pages/about', element: <AboutPage /> },
        { path: 'pages/contact', element: <ContactPage /> },
        { path: 'pages/faq', element: <FaqsPage /> },
        { path: 'pages/terms', element: <PrivacyPolicy /> },
        { path: 'pages/refund-policy', element: <RefundPolicy /> },
        { path: 'pages/edit-page/:pageId', element: <EditMainPage /> },
        // Home Page Sections
        { path: 'pages/home/edit-top-section/:id', element: <EditTopSection /> },
        {
          path: 'pages/home/edit-predominantly-section/:id',
          element: <EditPredominantlySection />
        },
        {
          path: 'pages/home/edit-powerful-section/:id',
          element: <EditPowerfulServiceSection />
        },
        {
          path: 'pages/home/edit-targeted-views-section/:id',
          element: <EditTargetedViews />
        },
        {
          path: 'pages/home/edit-howToBuy-section/:id',
          element: <EditHowToBuySection />
        },
        {
          path: 'pages/home/edit-proudly-delivered-section/:id',
          element: <EditProudlyDeliveredServices />
        },
        {
          path: 'pages/home/edit-why-us-section/:id',
          element: <EditWhyUsSection />
        },

        // About Page Sections
        {
          path: 'pages/about/edit-top-section/:id',
          element: <EditAboutTopSection />
        },
        {
          path: 'pages/about/edit-mission-section/:id',
          element: <EditMissionSection />
        },
        {
          path: 'pages/about/edit-values-section/:id',
          element: <EditAboutValuesSection />
        },
        // Contact Page Section
        {
          path: 'pages/contact/edit-top-section/:id',
          element: <EditContactTopSection />
        },
        // Add Privacy Policy
        {
          path: 'pages/terms/add-term',
          element: <CreatePrivacy />
        },
        {
          path: 'pages/terms/edit-term/:id',
          element: <UpdatePrivacy />
        },
        // Refund Policy
        {
          path: 'pages/refund-policy/edit-refund-policy/:id',
          element: <UpdateRefundPolicy />
        },

        // Pacakge
        {
          path: 'packages',
          element: <Packages />
        },
        {
          path: 'packages/add-package',
          element: <AddPackage />
        },
        {
          path: 'packages/edit-package/:id',
          element: <EditPackage />
        },
        // duration
        {
          path: 'durations',
          element: <Duration />
        },
        {
          path: 'durations/add-duration',
          element: <AddDuration />
        },
        {
          path: 'durations/edit-duration/:id',
          element: <EditDuration />
        },
         // package duration
         {
          path: 'durations',
          element: <Duration />
        },
        {
          path: 'durations/add-duration',
          element: <AddDuration />
        },
        
        // Package Category
        {
          path: 'package-category',
          element: <PackageCategories />
        },
        {
          path: 'package-category/add-category',
          element: <AddCategory />
        },
        {
          path: 'package-category/edit-category/:id',
          element: <EditCategory />
        },
        {
          path: 'why-us',
          element: <WhyUs />
        },
        {
          path: 'why-us/add-why-us',
          element: <AddWhyUs />
        },
        {
          path: 'why-us/edit-why-us/:edit',
          element: <EditWhyUs />
        },
        // Addons
        {
          path: 'addons',
          element: <Addons />
        },
        {
          path: 'addons/create-addon',
          element: <CreateAddon />
        },
        {
          path: 'addons/edit-addon/:id',
          element: <EditAddon />
        },
        // Coupons
        {
          path: 'coupons',
          element: <Coupons />
        },
        {
          path: 'coupons/add-coupon',
          element: <AddCoupon />
        },
        {
          path: 'edit-sitemap/',
          element: <Sitemap/>
        },
        {
          path: 'coupons/edit-coupon/:id',
          element: <EditCoupon />
        }
      ]
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: '/', element: <Navigate to="/dashboard/app" /> },
        { path: 'login', element: <Login /> },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" /> }
      ]
    },
    { path: '*', element: <Navigate to="/404" replace /> }
  ]);
}
