//eslint disable sort import

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./App.css";

import { Route, Router, Switch } from "react-router-dom";
import { getUser, logoutUser } from './redux/actions/userActions';

import BlogForm from "./components/blogForm/blogform";
import Blogapi from "./components/Multiblog/blogapi";
import BookingForm from "./components/bookingform/bookingform";
import CheckAuth from './pages/checkAuth';
import CheckNotAuth from './pages/CheckNotAuth';
import Contact from './components/contact/contact';
import FORGOTPASS from "./pages/login/forgotpass";
import Footer from "./components/Footer/footer";
import FormWrapper from "./components/HotelUploadForm/FormWrapper";
import HotelHome from "./pages/Hotelpages/Accomodation";
import Hsignup from "./pages/Hsignup/Hsignup";
import Login from "./pages/login";
import LoginToBookings from "./pages/login/logintobookings";
import LoginToReviews from "./pages/login/logintoreview";
import MultiListing from "./pages/Hotelpages/multilisting";
import Navbar from "./components/Navbar/navbar";
import PassVer from "./pages/login/passverification";
import Payment from "./components/payment/payment";
import React from "react";
import RealForm from './components/realform';
import Review from './components/userDashoard/reviews/reviews';
import { SET_AUTHENTICATED } from './redux/type';
import Signup from "./pages/signup/signup";
import SingleHotel from "./components/singlehotel/singlehotel";
import Singleblog from "./pages/Blogpages/singleblog";
import Terms from './components/enqury/terms'
import Aboutus from './components/enqury/about'
import Proposal from './components/enqury/proposal'
import ConfirmBooking from './components/confirmnation/confirmnation'
import UserRoute from "./userroute";
import axios from "axios";
import history from './history';
import jwtDecode from "jwt-decode";
import store from "./redux/store";

function route() {
  const token = localStorage.JWT_TOKEN;
    if (token) {
      const decodedToken = jwtDecode(token);
      if (decodedToken.exp * 1000 < new Date()) {
        store.dispatch(logoutUser);
        history.push("/");
      } else {
        store.dispatch({ type: SET_AUTHENTICATED });
        axios.defaults.headers.common["Authorization"] = token;
        store.dispatch(getUser());
      }
    }
  return (
      <Router history={history}>
        <Navbar />
        <div>
          <Switch>
              <Route exact path="/blogapi" component={Blogapi} />
              <Route
                exact
                path="/pages/Blogpages/singleblog:blog"
                component={Singleblog}
              />
              <Route exact path="/" component={HotelHome} />
              <Route exact path="/realform" component={RealForm} />
              <CheckNotAuth exact path="/login" component={Login} />
              <CheckNotAuth exact path="/logintobookings" component={LoginToBookings} />
              <CheckNotAuth exact path="/logintoreview" component={LoginToReviews} />
              <CheckNotAuth exact path="/forgotpass" component={FORGOTPASS} />
              <CheckNotAuth exact path="/passverification/:id" component={PassVer} />
              <Route exact path="/multilisting" component={MultiListing} />
              <Route exact path="/singlehotel/:hotelId" component={SingleHotel} />
              <Route exact path="/signup" component={Signup} />
              <Route exact path="/contact" component={Contact} />
              <Route exact path="/dashboard" component={UserRoute} />
              <Route exact path="/settings" component={UserRoute} />
              <Route exact path="/reviews" component={UserRoute} />
              <Route exact path="/bookings" component={UserRoute} />
              <Route exact path="/payment" component={Payment} />
              <Route exact path="/about" component={Aboutus} />
              <Route exact path="/terms" component={Terms} />
              <Route exact path="/reviews/:hotelId" component={Review} />
              <Route exact path="/confirmnation/:bookingid/:roomid/:hotelid" component={ConfirmBooking} />
              <Route exact path="/proposal" component={Proposal} />
              <Route exact path="/bookingform/:roomid/:hotelid" component={BookingForm} />
              <Route exact path="/listproperty" component={FormWrapper} />
              <CheckAuth exact path='/Uploadhotel' component={Hsignup} />
               <CheckAuth exact path="/blogform" component={BlogForm} /> 
          </Switch>
        </div>
        <Footer />
      </Router>
  );
}

export default route;
