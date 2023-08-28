import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { useLayoutEffect } from 'react';
import { BrowserRouter, Routes, Route ,useLocation} from 'react-router-dom';
import Home from './component/Route/Home';
import Temple from './component/Route/Temple';
import Calendarhome from './component/Route/Calenderhome';
import Calendarview from './component/page/Home/Brick/Calendarview';
import Payment from './component/Route/Payment';
import Brick1 from "./component/page/Home/Brick/Brick1"
import Cart from './component/page/Payment/Cart';
import Signup from "../src/component/page/Loginsignup/Signup";
import Login from '../src/component/page/Loginsignup/Login';
import Gurukulam from './component/Route/Gurukulam';
import Success from './component/page/Payment/Success';
import Mission from './component/Route/Mission';
import Contact from './component/Route/Contact';
import Board from './component/Route/Board';
import Regularpuja from './component/Route/Regularpuja';
import PujaList from './component/Route/PujaList';
import Category1 from '././component/page/Home/category/Category1';
import Donation1 from './component/page/Home/Donation/Donation1';
import Event1 from './component/page/Home/Event/Event1';




// admin page
import Admin from "./component/admin/pages/Admin";
import Dashboard from "./component/admin/pages/Dashboard";
import Newusers from "./component/admin/pages/New users/New users";
import Main from "../src/component/admin/components/layout/Main";
import "../src/component/admin/assets/styles/main.css";
import "../src/component/admin/assets/styles/responsive.css";
import Aboutuspage from "./component/admin/pages/Static page/Aboutuspage";
import Calendarpage from "./component/admin/pages/Static page/Calendarpage";
import Gurukulampage from "./component/admin/pages/Static page/Gurukulampage";
import Mediapage from "./component/admin/pages/Static page/Mediapage";
import Servicelistview from './component/admin/pages/Static page/service/Servicelistview';
import PrivateRoute from "./component/admin/pages/PrivateRoute";
import Management from "./component/admin/pages/Usermanagement/Management";
import ActiveUsers from "./component/admin/pages/Tables/ActiveUsers";
import Payments from "./component/admin/pages/Tables/Payments";
import DonationMain from "./component/admin/pages/DonationMain";
import Poojas from './component/admin/pages/Purchases/Pooja/Poojas';
import Banner from "./component/admin/pages/Static page/Banner";
import Edit from "./component/admin/pages/Usermanagement/Edit";
import Addcms from "./component/admin/pages/Static page/Addcms";
import Adduser from "./component/admin/pages/Usermanagement/AddUser";
import PoojasAdd from "./component/admin/pages/Purchases/PoojasAdd";
import Admincalendar from "./component/admin/pages/Calendar.js/Admincalendar";
import Addcalender from "./component/admin/pages/Calendar.js/Addcalender";
import Fulfillment from "./component/admin/pages/Purchases/Fulfillment";
import Addservice from './component/admin/pages/Static page/service/Addservice';
import MembershipList from './component/Userdashboard/Navbar/MembershipList';
import Categoryview from './component/admin/pages/Purchases/Categorypage/Categoryview';
import AddCategory from './component/admin/pages/Purchases/Categorypage/AddCategory';
import EditCategory from './component/admin/pages/Purchases/Categorypage/EditCategory';
import AddDonations from './component/admin/pages/Purchases/Donationpage/AddDonations';
import Donationview from './component/admin/pages/Purchases/Donationpage/Donationview';
import EditDonaion from './component/admin/pages/Purchases/Donationpage/EditDonation';
import Editservice from './component/admin/pages/Static page/service/Editservice';
import Managementview from './component/admin/pages/Usermanagement/Managementview';
import Upcomingeventlist from './component/admin/pages/Upcomingevents/Upcomingeventlist';
import Addevent from './component/admin/pages/Upcomingevents/Addevent';
import Editevent from './component/admin/pages/Upcomingevents/Editevent';
import Editpoojas from './component/admin/pages/Purchases/Pooja/Editpoojas';

// user page

import Userdashboard from "./component/Userdashboard/Userdashboard";
import Edituser from "./component/Userdashboard/Edituser";
import Templecalender from "./component/Userdashboard/Templecalender";
import Requestpuja from "./component/Userdashboard/Requestpuja";
import Booking from "./component/Userdashboard/Booking";
import Donationreport from "./component/Userdashboard/Donationreport";
import { AuthProviders } from "./component/auth page/AuthProviders";
import PrivateRoutes from "./component/auth page/PrivateRoutes";
import Password from "./component/page/forgotpassword/Password";
import Setpassword from "./component/page/forgotpassword/Setpassword";
import Resetpassword from "./component/page/forgotpassword/Resetpassword";
import Fulfillmentview from "./component/admin/pages/Purchases/Fulfillmentview";
import ChangePassword from "./component/admin/pages/ChangePassword";
import PoojasListTable from "./component/admin/pages/Tables/PoojasListTable";
import VisitorsTable from "./component/admin/pages/Tables/VisitorsTable";
import Editrelative from "./component/Userdashboard/Edituser/Editrelative";
import Addrelative from './component/Userdashboard/Edituser/Addrelative';
import Privaterouteuser from "./component/auth page/Privaterouteuser";




function App() {
  const Wrapper = ({ children }) => {
    const location = useLocation();
    useLayoutEffect(() => {
      document.documentElement.scrollTo(0, 0);
    }, [location.pathname]);
    return children
  }
  return (


    <AuthProviders>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Wrapper>
          <div className="App" style={{ backgroundColor: "#f5f5f5" }} >

            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/temple' element={<Temple />} />
              <Route path='/brick/:service_category/:subcategory' element={<Brick1 />} />
              <Route path='/calendar' element={<Calendarhome />} />
              <Route path='/calendarview' element={<Calendarview />} />
              <Route path='/payment' element={<Payment />} />
              <Route path='/cart' element={<Cart />} />
              <Route path='/sign-up' element={<Signup />} />
              <Route path='/sign-in' element={<Login />} />
              <Route path='/gurukulam' element={<Gurukulam />} />
              <Route path='/success' element={<Success />} />
              <Route path='/mission' element={<Mission />} />
              <Route path='/contact' element={<Contact />} />
              <Route path='/board' element={<Board />} />
              <Route path='/regularpuja' element={<Regularpuja />} />
              <Route path='/pujalist' element={<PujaList />} />
              <Route path='/category' element={<Category1 />} />
              <Route path='/donation' element={<Donation1 />} />
              <Route path='/event' element={<Event1 />} />



              {/* // admin */}
              <Route path="/admin" element={<Admin />} />
              <Route path="/admin/dashboard" element={<PrivateRoutes><Main><Dashboard /></Main></PrivateRoutes>} />
              <Route path="/admin/Newusers" element={<Main><Newusers /></Main>} />
              <Route path="/admin/banner" element={<Main><Banner /></Main>} />
              <Route path="/admin/aboutuspage" element={<PrivateRoutes><Main><Aboutuspage /></Main></PrivateRoutes>} />
              <Route path="/admin/gurukulampage" element={<PrivateRoutes><Main><Gurukulampage /></Main></PrivateRoutes>} />
              <Route path="/admin/mediapage" element={<PrivateRoutes><Main><Mediapage /></Main></PrivateRoutes>} />
              <Route path="/admin/calendarpage" element={<PrivateRoutes><Main><Calendarpage /></Main></PrivateRoutes>} />
              <Route path="/admin/servicepage" element={<PrivateRoutes><Main><Servicelistview /></Main></PrivateRoutes>} />
              <Route path='/admin/addservice' element={<PrivateRoutes><Main><Addservice /></Main></PrivateRoutes>} />

              <Route path="/admin/management" element={<PrivateRoutes><Main><Management /></Main></PrivateRoutes>} />
              <Route path="/admin/Activeusers" element={<PrivateRoutes><Main><ActiveUsers /></Main></PrivateRoutes>} />
              <Route path="/admin/Payments" element={<PrivateRoutes><Main><Payments /></Main></PrivateRoutes>} />
              <Route path="/admin/donations" element={<PrivateRoutes><Main><DonationMain /></Main></PrivateRoutes>} />
              <Route path="/admin/pujas" element={<PrivateRoutes><Main><Poojas /></Main></PrivateRoutes>} />
              <Route path="/admin/addcms" element={<PrivateRoutes><Main><Addcms /></Main></PrivateRoutes>} />
              <Route path="/admin/edit/:_id" element={<PrivateRoutes><Main><Edit /></Main></PrivateRoutes>} />
              <Route path="/admin/adduser" element={<PrivateRoutes><Main><Adduser /></Main></PrivateRoutes>} />
              <Route path="/admin/addPujas" element={<PrivateRoutes><Main><PoojasAdd /></Main></PrivateRoutes>} />
              <Route path="/admin/calendar" element={<PrivateRoutes><Main><Admincalendar /></Main></PrivateRoutes>} />
              <Route path="/admin/addcalendaradmin" element={<PrivateRoutes><Main><Addcalender /></Main></PrivateRoutes>} />
              <Route path="/admin/fulfillment" element={<PrivateRoutes><Main><Fulfillment /></Main></PrivateRoutes>} />
              <Route path="/admin/fulfillmentview/:_id" element={<PrivateRoutes><Main><Fulfillmentview /></Main></PrivateRoutes>} />
              <Route path="/admin/dashboard" element={<PrivateRoutes><Main><Dashboard /></Main></PrivateRoutes>} />
              <Route path="/admin/changepassword" element={<PrivateRoute><Main><ChangePassword /></Main></PrivateRoute>} />
              <Route path="/admin/visitors" element={<PrivateRoute><Main><VisitorsTable /></Main></PrivateRoute>} />
              <Route path="/admin/pujaslist" element={<PrivateRoute><Main><PoojasListTable /></Main></PrivateRoute>} />
              <Route path="/admin/category" element={<PrivateRoutes><Main><Categoryview /></Main></PrivateRoutes>} />
              <Route path="/admin/addcategory" element={<PrivateRoutes><Main><AddCategory /></Main></PrivateRoutes>} />
              <Route path="/admin/editcategory/:_id" element={<PrivateRoutes><Main><EditCategory /></Main></PrivateRoutes>} />
              <Route path="/admin/editservice/:_id" element={<PrivateRoutes><Main><Editservice /></Main></PrivateRoutes>} />
              <Route path="/admin/donation" element={<PrivateRoutes><Main><Donationview /></Main></PrivateRoutes>} />
              <Route path="/admin/adddontion" element={<PrivateRoutes><Main><AddDonations /></Main></PrivateRoutes>} />
              <Route path="/admin/editdonation/:_id" element={<PrivateRoutes><Main><EditDonaion /></Main></PrivateRoutes>} />
              <Route path="/admin/managementview/:_id" element={<PrivateRoutes><Main><Managementview /></Main></PrivateRoutes>} />
              <Route path="/admin/upcomingevent" element={<PrivateRoutes><Main><Upcomingeventlist /></Main></PrivateRoutes>} />
              <Route path="/admin/addupcomingevent" element={<PrivateRoutes><Main><Addevent /></Main></PrivateRoutes>} />
              <Route path="/admin/eventedit/:_id" element={<PrivateRoutes><Main><Editevent /></Main></PrivateRoutes>} />
              <Route path="/admin/editpoojas/:_id" element={<PrivateRoutes><Main><Editpoojas /></Main></PrivateRoutes>} />
              {/* User page */}
              <Route path="/sign-in" element={<Login />} />
              <Route path="/sign-up" element={<Signup />} />
              <Route path="/forgotpassword" element={<Password />} />
              <Route path="/setpassword" element={<Setpassword />} />
              <Route path="/resetpassword" element={<Resetpassword />} />

              <Route path="/user/dashboard" element={<Privaterouteuser><Userdashboard /></Privaterouteuser>} />
              <Route path="/user/dashboard/edituser/" element={<Privaterouteuser><Edituser /></Privaterouteuser>} />
              <Route path="/user/dashboard/templecalendar" element={<Privaterouteuser><Templecalender /></Privaterouteuser>} />
              <Route path="/user/dashboard/requestpuja" element={<Privaterouteuser><Requestpuja /></Privaterouteuser>} />
              <Route path="/user/dashboard/bookingservices" element={<Privaterouteuser><Booking /></Privaterouteuser>} />
              <Route path="/user/dashboard/donationreport" element={<Privaterouteuser><Donationreport /></Privaterouteuser>} />
              <Route path="/editrelative/:Relative_id" element={<Privaterouteuser><Editrelative /></Privaterouteuser>} />
              <Route path="/user/dashboard/MembershipList" element={<Privaterouteuser><MembershipList /></Privaterouteuser>} />
              <Route path="/user/dashboard/addrelative" element={<Privaterouteuser><Addrelative /></Privaterouteuser>} />



            </Routes>

          </div>
          </Wrapper>
      </BrowserRouter>

    </AuthProviders >
  );
}

export default App;
