import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import "./list.css";
import "./listsearchbar.css";

import Axios from "axios";
import { DateRangePicker } from "react-dates";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Input2 } from '../inputs/input1';
import { Link } from 'react-router-dom';
import Swiper from "react-id-swiper";
import _ from "lodash"
import {paginate} from './pagination'
import React from "react";
import { addDays } from "date-fns";
import { faStar,faCheck, faBicycle, faBriefcase, faCamera, faChild, faCrosshairs, faDesktop, faDumbbell, faFan, faFilm, faGasPump, faGlassCheers, faHotTub, faMoneyBillAlt, faMonument, faShuttleVan, faSpa, faSwimmer, faTaxi, faTshirt, faWater, faWifi, faWineGlass } from '@fortawesome/free-solid-svg-icons';
import { faServicestack, faSpeakerDeck } from "@fortawesome/free-brands-svg-icons";
import { faMapMarker } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';
import spin from '../../logo/spinner.gif';

class HotelList extends React.Component {
  constructor() {
    super();
    this.state = {
      currentpage:1,
      pageSize: 10,
      sideFilter:[],
      budget:'',
      amenities:'',
      distance:'',
      bed:'',
      pamentpolicy:'',
      starrating:'',
      breakfast:"",
      cancellation:false,
      confirmnation:false,
      value:[],
      loading:true,
      pagehotel: [],
      result: [],
      description: "",
      checkin: "",
      rooms: 1,
      adults: 1,
      startDate: null,
      endDate: null,
      children: 0,
      dateRangePickerI: {
        selection: {
          startDate: new Date(),
          endDate: null,
          key: "selection"
        },
        compare: {
          startDate: new Date(),
          endDate: addDays(new Date(), 3),
          key: "compare"
        }
      }
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
   
    }
  
    componentDidMount() {
      Axios.get('https://calm-anchorage-14244.herokuapp.com/hotel')
      .then(result => this.setState({result : result.data.data, loading:false}))
    }

    onAdultChange=()=>{
      this.setState({adults:this.state.adults+1})
    }
    offAdultChange=()=>{
      if(this.state.adults > 1){
        this.setState({adults:this.state.adults-1})
      }
    }
    onRoomChange=()=>{
      this.setState({rooms:this.state.rooms+1})
    }
    offRoomChange=()=>{
      if(this.state.rooms > 1){
        this.setState({rooms:this.state.rooms-1})
      }
    }

    onChildrenChange=()=>{
      this.setState({children:this.state.children+1})
    }
    offChildrenChange=()=>{
      if(this.state.children >= 0){
        this.setState({children:this.state.children-1})
      }
    }
  
    handleChange(event) {
      event.preventDefault();
      const { name, value } = event.target;
      this.setState({ [name]: value });
      // console.log(this.state);
    }
     
    handleSideFilterButtonsChange=(eve)=>{
      const {budget,bed,breakfast,Cancellation,confirmation,result,starrating,amenities} = this.state;
      const {name,value,type,checked} = eve.target
      type === "checkbox"? this.setState({[name]:checked}) :this.setState({[name]:value})
      console.log(this.state)
      const sidefilter =result.filter(robot => Number(eve.target.value)  >= Number(robot.averagePrice))
      this.setState({sideFilter:sidefilter})
      console.log(sidefilter,' not on state')
      console.log(budget,'budget')
      if (result){
        console.log( result[0].averagePrice,'target price')
      }
       
      console.log(this.state.sideFilter,'side filterd ')
      }
      
      filterthehotels=( filtering, fills)=>{
        console.log(filtering)
        const {budget,starrating,breakfast,pamentpolicy,cancellation,distance,amenities} = this.state;
        console.log(budget, 'this is the budget')
        const Filtering = filtering.filter(robot =>Number(budget)  >= Number(robot.averagePrice) || robot.propertyInfo.starRating.includes(starrating)||robot.hotelPolicy.isBreakfastAvailable.includes(breakfast)||robot.hotelPolicy.hotelAmenities.includes(amenities))
        const Filteringed = fills.filter(robot =>Number(budget)  >= Number(robot.averagePrice) || robot.hotelPolicy.isBreakfastAvailable.includes(breakfast)||robot.propertyInfo.starRating.includes(starrating)||robot.hotelPolicy.hotelAmenities.includes(amenities))
        console.log(Filtering,'on clicked')
        this.setState({sideFilter: Filtering, sideFilter:Filteringed})
      }
  
    handleSubmit(event) {
      event.preventDefault();
      const {result, description, rooms} = this.state;
      console.log('3213', Number(rooms))
      console.log('12345', result)
      const filteredHotel = result.filter(robot => robot.propertyInfo.hotelName.toLowerCase().includes(description.toLowerCase()) || robot.propertyInfo.city.toLowerCase().includes(description.toLowerCase()) || robot.propertyInfo.state.toLowerCase().includes(description.toLowerCase()) || robot.propertyInfo.country.toLowerCase().includes(description.toLowerCase())
      )
      // console.log('123456', filteredHotel)
      this.setState({ pagehotel: filteredHotel})
    }

    handlePageChange = page => {
      this.setState({ currentpage: page });
    };

    Ratingstarts=(stars)=>{

      if(stars.includes("1")){
        return(<>  <FontAwesomeIcon className='starrating'  icon={faStar} /> </>)
      }else    
      if(stars.includes("2")){
        return(<> 
        <FontAwesomeIcon className='starrating'  icon={faStar} /> 
        <FontAwesomeIcon className='starrating'  icon={faStar} /> 
        
         </>)
      }else 
      if(stars.includes("3")){
        return(<> 
        <FontAwesomeIcon className='starrating'  icon={faStar} /> 
        <FontAwesomeIcon className='starrating'  icon={faStar} /> 
        <FontAwesomeIcon className='starrating'  icon={faStar} /> 
        </>)
      }else 
      if(stars.includes("4")){
        return(<>
        <FontAwesomeIcon className='starrating'  icon={faStar} /> 
        <FontAwesomeIcon className='starrating'  icon={faStar} /> 
        <FontAwesomeIcon className='starrating'  icon={faStar} /> 
        <FontAwesomeIcon className='starrating'  icon={faStar} />  
        </>)
      }else 
      if(stars.includes("5")){
        return(<>
        <FontAwesomeIcon className='starrating'  icon={faStar} /> 
        <FontAwesomeIcon className='starrating'  icon={faStar} /> 
        <FontAwesomeIcon className='starrating'  icon={faStar} /> 
        <FontAwesomeIcon className='starrating'  icon={faStar} /> 
        <FontAwesomeIcon className='starrating'  icon={faStar} /> 
        </>)
      }else{
        return(<> </>)
      }
    }

    boxRatingstarts=(stars)=>{

      if(stars.includes("1")){
        return(<> <span className="veiw">1.5/5</span></>)
      }else    
      if(stars.includes("2")){
        return(<> <span className="veiw">2.5/5</span></>)
      }else 
      if(stars.includes("3")){
        return(<> <span className="veiw">3.7/5</span></>)
      }else 
      if(stars.includes("4")){
        return(<><span className="veiw">4.5/5</span></>)
      }else 
      if(stars.includes("5")){
        return(<><span className="veiw">5/5</span> </>)
      }else{
        return(<></>)
      }
    }

   

  render() {
    console.log(this.state.sideFilter, 'on state');
    const {result, description, rooms, pageSize,currentpage} = this.state;
    const samepage = this.state.pagehotel
    const searchedHotel = this.props.location.state.searchResult
    const filterdhotels=this.state.sideFilter
  //   const indexOfLastPost =  currentpage * postPerPage
  // const indexOfFirstPost =  indexOfLastPost - postPerPage
  // const currentpost = samepage.slice(indexOfFirstPost, indexOf)
// var stick={position: "fixed",  top: 0, width: "100%"}
var head = document.getElementById("collapse");
//   if (window.onscroll(header )) {
//     stick
//   } 



  const params = {
    slidesPerView: 2,
    spaceBetween: 30,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev"
    },
    // pagination: {
    //   el: ".swiper-pagination",
    //   clickable: true
    // }
  };


  let pageCount = Math.ceil(searchedHotel.length / pageSize);
  console.log("pagecount", pageCount);
  if (pageCount === 1) {
    pageCount = null;
  }
  const hotels = paginate(searchedHotel, currentpage, pageSize);
  const pages = _.range(1, pageCount + 1);
    // console.log('123456789', searchedHotel)
    // console.log('same page',this.state.pagehotel)
    //algo to convert to usable arr
    // const roomss = []
    // searchedHotel.map(hotel => {
    //   return hotel.rooms.forEach(room => {
    //     roomss.push(JSON.parse(room))
    //   })
    // })
    //console.log('result to be filtered',result)
    // const filteredHotel = result.filter(robot => robot.rooms.length == Number(rooms) || robot.propertyInfo.hotelName.toLowerCase().includes(description.toLowerCase()) || robot.propertyInfo.city.toLowerCase().includes(description.toLowerCase()) || robot.propertyInfo.state.toLowerCase().includes(description.toLowerCase()) || robot.propertyInfo.country.toLowerCase().includes(description.toLowerCase())
    // )
    // console.log('new', roomss)
    return (
    this.state.loading ? (<div className="loadingicon"><img src={spin} alt="laoder"/></div>) :
    <>
      {/* this is the searchbar */}
      <div>
        <div className={this.props.className}>
          <div className=" container ddigi">
            <div className="search">
              <h5 className="caption">{this.props.title}</h5>
              <form className="formbox">
                <div className="row no-gutters">
                  <div className="col-md-3 sc">
                  
                    <label className="lab">
                      <span className="titleinput hoteltitle">Places and Hotels </span>
                      <span className="inpSpan">
                        <input
                          type="text"
                          value={this.state.description}
                          onChange={this.handleChange}
                          name="description"
                          className="inp mt-2"
                          placeholder="Enter place and hotel name"
                        />
                      </span>
                    </label>              
                  </div>

                  <div className="col-md-3 sc" >
                    <div>
                      <small className="mt-1 mtitleinput" >Check-in  -  Check-out</small>
                      <div>
                    <DateRangePicker
                      startDate={this.state.startDate} // momentPropTypes.momentObj or null,
                      startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
                      endDate={this.state.endDate} // momentPropTypes.momentObj or null,
                      endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
                      onDatesChange={({ startDate, endDate }) =>
                        this.setState({ startDate, endDate })
                      } // PropTypes.func.isRequired,
                      focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                      onFocusChange={focusedInput =>
                        this.setState({ focusedInput })
                      } // PropTypes.func.isRequired,
                      startDatePlaceholderText={moment().format('MMM Do')}
                      endDatePlaceholderText={moment(new Date().setDate(new Date().getDate() + 1)).format('MMM Do')}
                      customArrowIcon='/'
                      noBorder={true}
                      startDateAriaLabel='Check-in'
                      style={{width:'30px'}}
                    />
                    </div>
                    </div>
                  </div>

<div className="col-md-3 sc">
<label className="bb titleinput">Room and Guest</label>
<div className="control bb mt-2 text-secondary"  data-toggle="collapse" href="#multiCollapseExample1" role="button" aria-expanded="false" aria-controls="multiCollapseExample1">
  <span>Room {this.state.rooms}</span>{" "}
  <span> Adults {this.state.adults}</span>{" "}
  {this.state.children > 0 && (
   <span> Children {this.state.children}</span>
  )}
</div>
<div class="row position-absolute" style={{zIndex:3}}>
  <div class="col">
    <div class="collapse multi-collapse" id="multiCollapseExample1">
      <div class="card card-body">
        <p>Rooms  
    <button type="button" onClick={this.offRoomChange} class="btn btn-sm btn-dark" style={{marginLeft:"38px"}}>-</button>
  <span className="ml-1">{this.state.rooms}</span>
    <button type="button" onClick={this.onRoomChange} class="btn btn-sm btn-dark" style={{marginLeft:"5px"}}>+</button>
  </p>

  <p>Adults 
    <button type="button" onClick={this.offAdultChange} class="btn btn-sm btn-dark" style={{marginLeft:"40px"}}>-</button>
  <span className="ml-1">{this.state.adults}</span>
    <button type="button" onClick={this.onAdultChange} class="btn btn-sm btn-dark " style={{marginLeft:"5px"}}>+</button>
  </p>

  <p>Children 
    <button type="button" onClick={this.offChildrenChange} class="btn btn-sm btn-dark ml-4">-</button>
  <span className="ml-2">{this.state.children}</span>
    <button type="button" onClick={this.onChildrenChange} class="btn btn-sm btn-dark ml-1">+</button>
  </p>
      </div>
    </div>
  </div>
  </div>
 </div>
                  <div className="col-md-3 ">
                    <button
                      type="submit"
                      onClick={this.handleSubmit}
                      className="sbtn border"
                    >
                      
                      {/* <FontAwesomeIcon className="searchicon" icon={faSearch} /> */}
                    <p className="searchicon">Search</p>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
<div className="d-lg-none d-xl-none" align="center"  >
<button className="btn btn-md btn-primary  shadow position-fixed" style={{zIndex:3}} data-toggle="modal" data-target="#exampleModalLong">Filter</button>
</div>
      <div className="row">
            <div className="col-md-3 d-none d-lg-block position-sticky">
            <div className="card text-dark mt-3 custom-control custom-radio  mb-3 border filter" style={{height: "1080px"}}>
            <div className="card-body">
            
            <p><b>Price Range</b></p>
              <Input2
              Id='customRadio1'
              For="customRadio1"
              name="budget"
              type="radio"
              value="5000"
              onChange={this.handleSideFilterButtonsChange}
              range="0-5000"
              />
            
            <Input2
            Id='customRadio2'
            For="customRadio2"
              name="budget"
              type="radio"
              value="10000"
              onChange={this.handleSideFilterButtonsChange}
              range="5000 - 10000"
              />
            
            <Input2
            Id='customRadio3'
            For="customRadio3"
              name="budget"
              type="radio"
              value="5000"
              onChange={this.handleSideFilterButtonsChange}
              range="10000-20000"
              />
            
            <Input2
            Id='customRadio4'
            For="customRadio4"
              name="budget"
              type="radio"
              value="20000"
              onChange={this.handleSideFilterButtonsChange}
              range="20000-40000"
              />
            
            <Input2
            Id='customRadio5'
            For="customRadio5"
              name="budget"
              type="radio"
              value="80000"
              onChange={this.handleSideFilterButtonsChange}
              range="40000-80000"
              />
            
            <Input2
            Id='customRadio6'
            For="customRadio6"
              name="budget"
              type="radio"
              value="200000"
              onChange={this.handleSideFilterButtonsChange}
              range="80000-200000"
              />
            <hr/>
            <p><b>Star Rating</b></p>
              <Input2
              Id='customRadio7'
              For="customRadio7"
              name="starrating"
              type="radio"
              value="1"
              onChange={this.handleSideFilterButtonsChange}
              range={(<FontAwesomeIcon className='starrating'  icon={faStar} />)}
              />
            
            <Input2
            Id='customRadio8'
            For="customRadio8"
              name="starrating"
              type="radio"
              value="2"
              onChange={this.handleSideFilterButtonsChange}
              range={(<>
                      <FontAwesomeIcon className='starrating'  icon={faStar} />
                      <FontAwesomeIcon className='starrating'  icon={faStar} />
                  </>)}
              />
            
            <Input2
            Id='customRadio9'
            For="customRadio9"
              name="starrating"
              type="radio"
              value="3"
              onChange={this.handleSideFilterButtonsChange}
              range={(<>
                <FontAwesomeIcon className='starrating'  icon={faStar} />
                <FontAwesomeIcon className='starrating'  icon={faStar} />
                <FontAwesomeIcon className='starrating'  icon={faStar} />
            </>)}
              />
              <Input2
              Id='customRadio10'
              For="customRadio10"
              name="starrating"
              type="radio"
              value="4"
              onChange={this.handleSideFilterButtonsChange}
              range={(<>
                <FontAwesomeIcon className='starrating'  icon={faStar} />
                <FontAwesomeIcon className='starrating'  icon={faStar} />
                <FontAwesomeIcon className='starrating'  icon={faStar} />
                <FontAwesomeIcon className='starrating'  icon={faStar} />
            </>)}
              />
              <Input2
              Id='customRadio11'
              For="customRadio11"
              name="starrating"
              type="radio"
              value="5"
              onChange={this.handleSideFilterButtonsChange}
              range={(<>
                <FontAwesomeIcon className='starrating'  icon={faStar} />
                <FontAwesomeIcon className='starrating'  icon={faStar} />
                <FontAwesomeIcon className='starrating'  icon={faStar} />
                <FontAwesomeIcon className='starrating'  icon={faStar} />
                <FontAwesomeIcon className='starrating'  icon={faStar} />
            </>)}
              />
            <hr/>  
            <button className="btn btn-outline-secondary btn-block"  data-toggle="modal" data-target="#exampleModalCenter">Amenities</button>
            {/* modal start */}

            
            {/* modal end */}
            <hr/>
            <b>Breakfast</b>
            <Input2
            Id='customRadio12'
            For="customRadio12"
              type="radio"
              name="breakfast"
              value='Yes, Free'
              onChange={this.handleSideFilterButtonsChange}
              range="Free Breakfast"
              />
                 <Input2
                 Id='customRadio13'
                 For="customRadio13"
              type="radio"
              name="breakfast"
              value='Yes, Paid'
              onChange={this.handleSideFilterButtonsChange}
              range="Paid Breakfast"
              />
                 <Input2
                 Id='customRadio14'
                 For="customRadio14"
              type="radio"
              name="breakfast"
              value='No'
              onChange={this.handleSideFilterButtonsChange}
              range="No Breakfast"
              />
            <hr/> 
            <b>Payment & Cancellation</b>
            <Input2
            Id='customRadio15'
            For="customRadio15"
              type="radio"
              name="pamentpolicy"
              value="pay now"
              onChange={this.handleSideFilterButtonsChange}
              range="Pay Online"
              />
              <Input2
              Id='customRadio16'
              For="customRadio16"
              type="radio"
              name="pamentpolicy"
              value="pay on arrival"
              onChange={this.handleSideFilterButtonsChange}
              range="Pay at Hotel"
              />
              <Input2
              Id='customRadio17'
              For="customRadio17"
              type="checkbox"
              name="cancellation"
              value={this.state.cancellation}
              onChange={this.handleSideFilterButtonsChange}
              range="Instant Confirmation"
              />
            <hr/> 

            <b>Distance to City Center</b>
            <Input2
            Id='customRadio18'
            For="customRadio18"
              type="radio"
              name="distance"
              value="1km"
              onChange={this.handleSideFilterButtonsChange}
              range="Less than 1km"
              />
              <Input2
              Id='customRadio19'
              For="customRadio19"
              type="radio"
              name="distance"
              value="2km"
              onChange={this.handleSideFilterButtonsChange}
              range="Less than 2km"
              />
              <Input2
              Id='customRadio20'
              For="customRadio20"
              type="radio"
              name="distance"
              value="2km"
              onChange={this.handleSideFilterButtonsChange}
              range="Less than 3km"
              />
            <hr/>
            <b>Bed Type</b>
            <Input2
            Id='customRadio21'
            For="customRadio21"
              type="radio"
              name="bed"
              value="Queen Bed"
              onChange={this.handleSideFilterButtonsChange}
              range="Queen Bed"
              />
               <Input2
               Id='customRadio23'
               For="customRadio23"
              type="radio"
              name="bed"
              value="Single Beds"
              onChange={this.handleSideFilterButtonsChange}
              range="Single Beds"
              />
                  <Input2
                  Id='customRadio24'
                  For="customRadio24"
              type="radio"
              name="bed"
              value="Multiple Beds"
              onChange={this.handleSideFilterButtonsChange}
              range="Multiple Beds"
              />
            <hr/>

            </div>
            <button onClick={() =>this.filterthehotels(searchedHotel, samepage)} className="btn btn-primary btn-block"> 
            Filter
            </button>
            </div> 
            
  <div class="card p-2" style={{height:'200px'}}>
  
    <h5 className="">Why Book With Us</h5>
    
      <p className="faq"> <FontAwesomeIcon className='wicon' icon={faCheck} /> Secured Payment</p>
      <p className="faq"><FontAwesomeIcon className='wicon' icon={faCheck} /> Dedicated Customer Support</p>
      <p className="faq"><FontAwesomeIcon className='wicon' icon={faCheck} /> Best Fares</p>
      <p className="faq"><FontAwesomeIcon className='wicon' icon={faCheck} /> No Cancellation Fees</p>
      
    
 
</div>

            </div>
            <div className="col-md-9">
                  {/* this is the nav filter*/}
      

{/* this is the listing */}
                    {/* {samepage.length <= 0 && (<h1>{this.state.description} is Not Found</h1>)} */}
        <div className="mt-3">
        <div className="mb-2 border" style={{height:'50px', paddingLeft:'10px', paddingTop:'5px', paddingBottom:'5px'}}>
        <h5>Results Found : {searchedHotel.length}</h5>
        </div>
        {filterdhotels.length >= 1 ? 
          filterdhotels.map((hotel, i) => (
            <Link to={`/singlehotel/${hotel._id}`} key={i} className="jumbot">
            <div className="jumbotron2 mb-3" onClick={this.handleClick}>
              <div>
                <div className="row no-gutters">
                  <div className="col-4">
                    <div className="card border-0">
                      <div className="card-body mcard">
                      <img src={hotel.imagerUrl[0].url} style={{height:'100%', width:'100%'}} alt="..." />
                      </div>
                    </div>
                  </div>
                  <div className="col-5">
                    <div className="card border-0">
                      <div className="card-body mcard">
                        <h5>{hotel.propertyInfo.hotelName}<span className="rates">{this.Ratingstarts(hotel.propertyInfo.starRating)}</span></h5>
                        <p>{hotel.propertyInfo.hotelDescription}</p>
                        <div style={{diplay:'iniline-block'}}>
                        <span className="row ">
              {hotel.hotelPolicy.hotelAmenities.slice(0,6).map((Amenities,a) => {
                  
                  console.log(Amenities,'ameni list');
                  let wifi=Amenities.match(/wifi/gi);
                  let pool=Amenities.match(/Swiming pool/gi);
                  let spa=Amenities.search('spa')
                  let park=Amenities.match(/Water Park/gi)
                  let bycicle=Amenities.match(/Bicycle Rental/gi)
                  let car=Amenities.match(/Car Rental/gi);
                  let Cinema=Amenities.match(/cinema/gi);
                  let Audio=Amenities.match(/Audio System/gi)
                  let newpaper=Amenities.match(/Newspaper in lobby/gi);
                  let duty=Amenities.match(/Duty Manager/gi);
                  let lounge=Amenities.match(/Executive Lounge/gi)
                  let salon=Amenities.match(/Beauty Salon/gi)
                  let elevator=Amenities.match(/Elevator/gi)
                  let currency=Amenities.match(/Currency Exchange/gi)
                  let Ac=Amenities.match(/Air Condition/gi)
                  let Roomservice=Amenities.match(/Room Service/gi)
                  let cctv=Amenities.match(/CCTV in Public Places/gi)
                  let electric=Amenities.match(/Electric Vechicle Charging Station/gi)
                  let playground=Amenities.match(/Children Playground/gi)
                  let ironing=Amenities.match(/Ironing Service/gi)
                  let desk=Amenities.match(/Fronk Desk Service/gi)
                  let hot=Amenities.match(/Jacuzzi/gi)
                  let Airportshuttle=Amenities.match(/Airpot Shuttle/gi)
                  let fitness=Amenities.match(/Fitnes Center/gi)
                  let bar=Amenities.match(/Bar/gi)
                  let terace=Amenities.match(/Terrace/gi)
                  console.log(wifi,'prop')
                 
                  if(wifi){
                    
                    return(
                      <div className="col-2">
                       <p className="mr-2" key={a}>
                      <FontAwesomeIcon
                      className='wicon'
                      icon={faWifi}
                    /> </p>
                    </div>
                    )
                    
                  }
                  else if(pool){

                    return(
                      <div className="col-2">
                        <p className="mr-2" key={a}>
                      <FontAwesomeIcon
                      className='wicon'
                      icon={faSwimmer}
                    /> </p>
                    </div>
                    )
                  }
                  else if(spa > -1){
                    return(
                      <div className="col-2">
                       <p className="mr-2" key={a}>
                      <FontAwesomeIcon
                      className='wicon'
                      icon={faSpa}
                    /> </p>
                    </div>
                    ) 
                  }
                  else if(park){
                    return(
                      <div className="col-2">
                      <p className="mr-2" key={a}>
                      <FontAwesomeIcon
                      className='wicon'
                      icon={faWater}
                    /> </p>
                    </div>
                    ) 

                  }else if(bycicle){
                    return(
                      <div className="col-2">
                      <p className="mr-2" key={a}>
                      <FontAwesomeIcon
                      className='wicon'
                      icon={faBicycle}
                    /> </p>
                    </div>
                    ) 

                  }else if(car){
                    return(
                      <div className="col-2">
                      <p className="mr-2" key={a}>
                      <FontAwesomeIcon
                      className='wicon'
                      icon={faTaxi}
                    /> </p>
                    </div>
                    ) 

                  }else if(Cinema){
                    return(
                      <div className="col-2">
                      <p className="mr-2" key={a}>
                      <FontAwesomeIcon
                      className='wicon'
                      icon={faFilm}
                    /> </p>
                    </div>
                    ) 

                  }else if(Audio){
                    return(
                      <div className="col-2">
                      <p className="mr-2" key={a}>
                      <FontAwesomeIcon
                      className='wicon'
                      icon={faSpeakerDeck}
                    /> </p>
                    </div>
                    ) 

                  }else if(newpaper){
                    return(
                      <div className="col-2">
                      <p className="mr-2" key={a}>
                      <FontAwesomeIcon
                      className='wicon'
                      icon={faBicycle}
                    /> </p>
                    </div>
                    ) 

                  }else if(duty){
                    return(
                      <div className="col-2">
                      <p className="mr-2" key={a}>
                      <FontAwesomeIcon
                      className='wicon'
                      icon={faBriefcase}
                    /> </p>
                    </div>
                    ) 

                  }else if(lounge){
                    return(
                      <div className="col-2">
                      <p className="mr-2" key={a}>
                      <FontAwesomeIcon
                      className='wicon'
                      icon={faWineGlass}
                    /> </p>
                    </div>
                    ) 

                  }else if(salon){
                    return(
                      <div className="col-2">
                      <p className="mr-2" key={a}>
                      <FontAwesomeIcon
                      className='wicon'
                      icon={faCrosshairs}
                    /> </p>
                    </div>
                    ) 

                  }else if(elevator){
                    return(
                      <div className="col-2">
                      <p className="mr-2" key={a}>
                     </p>
                    </div>
                    ) 

                  }else if(currency){
                    return(
                      <div className="col-2">
                      <p className="mr-2" key={a}>
                      <FontAwesomeIcon
                      className='wicon'
                      icon={faMoneyBillAlt}
                    />  </p>
                    </div>
                    ) 

                  }else if(Ac){
                    return(
                      <div className="col-2">
                      <p className="mr-2" key={a}>
                      <FontAwesomeIcon
                      className='wicon'
                      icon={faFan}
                    /> </p>
                    </div>
                    ) 

                  }else if(Roomservice){
                    return(
                      <div className="col-2">
                      <p className="mr-2" key={a}>
                      <FontAwesomeIcon
                      className='wicon'
                      icon={faServicestack}
                    /> </p>
                    </div>
                    ) 

                  }else if(cctv){
                    return(
                      <div className="col-2">
                      <p className="mr-2" key={a}>
                      <FontAwesomeIcon
                      className='wicon'
                      icon={faCamera}
                    /> </p>
                    </div>
                    ) 

                  }else if(electric){
                    return(
                      <div className="col-2">
                      <p className="mr-2" key={a}>
                      <FontAwesomeIcon
                      className='wicon'
                      icon={faGasPump}
                    /> </p>
                    </div>
                    ) 

                  }else if(playground){
                    return(
                      <div className="col-2">
                      <p className="mr-2" key={a}>
                      <FontAwesomeIcon
                      className='wicon'
                      icon={faChild}
                    /> </p>
                    </div>
                    ) 

                  }else if(ironing){
                    return(
                      <div className="col-2">
                      <p className="mr-2" key={a}>
                      <FontAwesomeIcon
                      className='wicon'
                      icon={faTshirt}
                    /> </p>
                    </div>
                    ) 

                  }else if(desk){
                    return(
                      <div className="col-2">
                      <p className="mr-2" key={a}>
                      <FontAwesomeIcon
                      className='wicon'
                      icon={faDesktop}
                    /> </p>
                    </div>
                    ) 

                  }else if(hot){
                    return(
                      <div className="col-2">
                      <p className="mr-2" key={a}>
                      <FontAwesomeIcon
                      className='wicon'
                      icon={faHotTub}
                    /> </p>
                    </div>
                    ) 

                  }else if(Airportshuttle){
                    return(
                      <div className="col-2">
                      <p className="mr-2" key={a}>
                      <FontAwesomeIcon
                      className='wicon'
                      icon={faShuttleVan}
                    /> </p>
                    </div>
                    ) 

                  }else if(fitness){
                    return(
                      <div className="col-2">
                      <p className="mr-2" key={a}>
                      <FontAwesomeIcon
                      className='wicon'
                      icon={faDumbbell}
                    /> </p>
                    </div>
                    ) 

                  }else if(bar){
                    return(
                      <div className="col-2">
                      <p className="mr-2" key={a}>
                      <FontAwesomeIcon
                      className='wicon'
                      icon={faGlassCheers}
                    /> </p>
                    </div>
                    ) 

                  }else if(terace){
                    return(
                      <div className="col-2">
                      <p className="mr-2" key={a}>
                      <FontAwesomeIcon
                      className='wicon'
                      icon={faMonument}
                    /></p>
                    </div>
                    ) 

                  }
                
               //this.amen(Amenities,a) 
              //console.log(Amenities,'testing amenities') 
                })}
                </span>
                <span className="ml-2 card-text d-none d-lg-block">
                          View all Amenities 
                        </span>
                        </div>
                        <p className="card-text biglocate">
                          <FontAwesomeIcon  className="logo" icon={faMapMarker} />
                           {hotel.propertyInfo.city} 
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-3">
                    <div className="card border-0">
                      <div className="card-body mcard">
                        <h6 className="mb-2 text-muted veiws">Superb</h6>
  
                        {this.boxRatingstarts(hotel.propertyInfo.starRating)}
                        <span>Reviews</span>
  
                        <p className="card-subtitle price pricefont">NGN {hotel.averagePrice}</p>
  
                        <p className="text-muted pernight pricefont">Per Night</p>
                        <span
                          href="#"
                          className="card-link btn btn-sm btn-primary cheker"
                        >
                          Check this out
                        </span>
                        <p className="card-text smalllocate">
                          <FontAwesomeIcon  className="logo" icon={faMapMarker} />
                           {hotel.propertyInfo.city} 
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            </Link>
            ))
        :
          samepage.length >= 1 ?  
          samepage.map((hotel, i) => (
            <Link to={`/singlehotel/${hotel._id}`} key={i} className="jumbot">
            <div className="jumbotron2 mb-3" onClick={this.handleClick}>
              <div>
                <div className="row no-gutters">
                  <div className="col-4">
                    <div className="card border-0">
                      <div className="card-body mcard">
                      <img src={hotel.imagerUrl[0].url} style={{height:'100%', width:'100%'}} alt="..." />
                      </div>
                    </div>
                  </div>
                  <div className="col-5">
                    <div className="card border-0">
                      <div className="card-body mcard">
                        <h5>{hotel.propertyInfo.hotelName}<span className="rates">{this.Ratingstarts(hotel.propertyInfo.starRating)}</span></h5>
                        <p>{hotel.propertyInfo.hotelDescription}</p>
                        <div style={{diplay:'iniline-block'}}>
                        <span className="row ">
              {hotel.hotelPolicy.hotelAmenities.slice(0,6).map((Amenities,a) => {
                  
                  console.log(Amenities,'ameni list');
                  let wifi=Amenities.match(/wifi/gi);
                  let pool=Amenities.match(/Swiming pool/gi);
                  let spa=Amenities.search('spa')
                  let park=Amenities.match(/Water Park/gi)
                  let bycicle=Amenities.match(/Bicycle Rental/gi)
                  let car=Amenities.match(/Car Rental/gi);
                  let Cinema=Amenities.match(/cinema/gi);
                  let Audio=Amenities.match(/Audio System/gi)
                  let newpaper=Amenities.match(/Newspaper in lobby/gi);
                  let duty=Amenities.match(/Duty Manager/gi);
                  let lounge=Amenities.match(/Executive Lounge/gi)
                  let salon=Amenities.match(/Beauty Salon/gi)
                  let elevator=Amenities.match(/Elevator/gi)
                  let currency=Amenities.match(/Currency Exchange/gi)
                  let Ac=Amenities.match(/Air Condition/gi)
                  let Roomservice=Amenities.match(/Room Service/gi)
                  let cctv=Amenities.match(/CCTV in Public Places/gi)
                  let electric=Amenities.match(/Electric Vechicle Charging Station/gi)
                  let playground=Amenities.match(/Children Playground/gi)
                  let ironing=Amenities.match(/Ironing Service/gi)
                  let desk=Amenities.match(/Fronk Desk Service/gi)
                  let hot=Amenities.match(/Jacuzzi/gi)
                  let Airportshuttle=Amenities.match(/Airpot Shuttle/gi)
                  let fitness=Amenities.match(/Fitnes Center/gi)
                  let bar=Amenities.match(/Bar/gi)
                  let terace=Amenities.match(/Terrace/gi)
                  console.log(wifi,'prop')
                 
                  if(wifi){
                    
                    return(
                      <div className="col-2">
                       <p className="mr-2" key={a}>
                      <FontAwesomeIcon
                      className='wicon'
                      icon={faWifi}
                    /> </p>
                    </div>
                    )
                    
                  }
                  else if(pool){

                    return(
                      <div className="col-2">
                        <p className="mr-2" key={a}>
                      <FontAwesomeIcon
                      className='wicon'
                      icon={faSwimmer}
                    /> </p>
                    </div>
                    )
                  }
                  else if(spa > -1){
                    return(
                      <div className="col-2">
                       <p className="mr-2" key={a}>
                      <FontAwesomeIcon
                      className='wicon'
                      icon={faSpa}
                    /> </p>
                    </div>
                    ) 
                  }
                  else if(park){
                    return(
                      <div className="col-2">
                      <p className="mr-2" key={a}>
                      <FontAwesomeIcon
                      className='wicon'
                      icon={faWater}
                    /> </p>
                    </div>
                    ) 

                  }else if(bycicle){
                    return(
                      <div className="col-2">
                      <p className="mr-2" key={a}>
                      <FontAwesomeIcon
                      className='wicon'
                      icon={faBicycle}
                    /> </p>
                    </div>
                    ) 

                  }else if(car){
                    return(
                      <div className="col-2">
                      <p className="mr-2" key={a}>
                      <FontAwesomeIcon
                      className='wicon'
                      icon={faTaxi}
                    /> </p>
                    </div>
                    ) 

                  }else if(Cinema){
                    return(
                      <div className="col-2">
                      <p className="mr-2" key={a}>
                      <FontAwesomeIcon
                      className='wicon'
                      icon={faFilm}
                    /> </p>
                    </div>
                    ) 

                  }else if(Audio){
                    return(
                      <div className="col-2">
                      <p className="mr-2" key={a}>
                      <FontAwesomeIcon
                      className='wicon'
                      icon={faSpeakerDeck}
                    /> </p>
                    </div>
                    ) 

                  }else if(newpaper){
                    return(
                      <div className="col-2">
                      <p className="mr-2" key={a}>
                      <FontAwesomeIcon
                      className='wicon'
                      icon={faBicycle}
                    /> </p>
                    </div>
                    ) 

                  }else if(duty){
                    return(
                      <div className="col-2">
                      <p className="mr-2" key={a}>
                      <FontAwesomeIcon
                      className='wicon'
                      icon={faBriefcase}
                    /> </p>
                    </div>
                    ) 

                  }else if(lounge){
                    return(
                      <div className="col-2">
                      <p className="mr-2" key={a}>
                      <FontAwesomeIcon
                      className='wicon'
                      icon={faWineGlass}
                    /> </p>
                    </div>
                    ) 

                  }else if(salon){
                    return(
                      <div className="col-2">
                      <p className="mr-2" key={a}>
                      <FontAwesomeIcon
                      className='wicon'
                      icon={faCrosshairs}
                    /> </p>
                    </div>
                    ) 

                  }else if(elevator){
                    return(
                      <div className="col-2">
                      <p className="mr-2" key={a}>
                     </p>
                    </div>
                    ) 

                  }else if(currency){
                    return(
                      <div className="col-2">
                      <p className="mr-2" key={a}>
                      <FontAwesomeIcon
                      className='wicon'
                      icon={faMoneyBillAlt}
                    />  </p>
                    </div>
                    ) 

                  }else if(Ac){
                    return(
                      <div className="col-2">
                      <p className="mr-2" key={a}>
                      <FontAwesomeIcon
                      className='wicon'
                      icon={faFan}
                    /> </p>
                    </div>
                    ) 

                  }else if(Roomservice){
                    return(
                      <div className="col-2">
                      <p className="mr-2" key={a}>
                      <FontAwesomeIcon
                      className='wicon'
                      icon={faServicestack}
                    /> </p>
                    </div>
                    ) 

                  }else if(cctv){
                    return(
                      <div className="col-2">
                      <p className="mr-2" key={a}>
                      <FontAwesomeIcon
                      className='wicon'
                      icon={faCamera}
                    /> </p>
                    </div>
                    ) 

                  }else if(electric){
                    return(
                      <div className="col-2">
                      <p className="mr-2" key={a}>
                      <FontAwesomeIcon
                      className='wicon'
                      icon={faGasPump}
                    /> </p>
                    </div>
                    ) 

                  }else if(playground){
                    return(
                      <div className="col-2">
                      <p className="mr-2" key={a}>
                      <FontAwesomeIcon
                      className='wicon'
                      icon={faChild}
                    /> </p>
                    </div>
                    ) 

                  }else if(ironing){
                    return(
                      <div className="col-2">
                      <p className="mr-2" key={a}>
                      <FontAwesomeIcon
                      className='wicon'
                      icon={faTshirt}
                    /> </p>
                    </div>
                    ) 

                  }else if(desk){
                    return(
                      <div className="col-2">
                      <p className="mr-2" key={a}>
                      <FontAwesomeIcon
                      className='wicon'
                      icon={faDesktop}
                    /> </p>
                    </div>
                    ) 

                  }else if(hot){
                    return(
                      <div className="col-2">
                      <p className="mr-2" key={a}>
                      <FontAwesomeIcon
                      className='wicon'
                      icon={faHotTub}
                    /> </p>
                    </div>
                    ) 

                  }else if(Airportshuttle){
                    return(
                      <div className="col-2">
                      <p className="mr-2" key={a}>
                      <FontAwesomeIcon
                      className='wicon'
                      icon={faShuttleVan}
                    /> </p>
                    </div>
                    ) 

                  }else if(fitness){
                    return(
                      <div className="col-2">
                      <p className="mr-2" key={a}>
                      <FontAwesomeIcon
                      className='wicon'
                      icon={faDumbbell}
                    /> </p>
                    </div>
                    ) 

                  }else if(bar){
                    return(
                      <div className="col-2">
                      <p className="mr-2" key={a}>
                      <FontAwesomeIcon
                      className='wicon'
                      icon={faGlassCheers}
                    /> </p>
                    </div>
                    ) 

                  }else if(terace){
                    return(
                      <div className="col-2">
                      <p className="mr-2" key={a}>
                      <FontAwesomeIcon
                      className='wicon'
                      icon={faMonument}
                    /></p>
                    </div>
                    ) 

                  }
                
               //this.amen(Amenities,a) 
              //console.log(Amenities,'testing amenities') 
                })}
                </span>
                <span className="ml-2 card-text d-none d-lg-block">
                          View all Amenities 
                        </span>
                        </div>
                        <p className="card-text biglocate">
                          <FontAwesomeIcon  className="logo" icon={faMapMarker} />
                           {hotel.propertyInfo.city} 
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-3">
                    <div className="card border-0">
                      <div className="card-body mcard">
                        <h6 className="mb-2 text-muted veiws">Superb</h6>
  
                        {this.boxRatingstarts(hotel.propertyInfo.starRating)}
                        <span>Reviews</span>
  
                        <p className="card-subtitle price pricefont">NGN {hotel.averagePrice}</p>
  
                        <p className="text-muted pernight pricefont">Per Night</p>
                        <span
                          href="#"
                          className="card-link btn btn-sm btn-primary cheker"
                        >
                          Check this out
                        </span>
                        <p className="card-text smalllocate">
                          <FontAwesomeIcon  className="logo" icon={faMapMarker} />
                           {hotel.propertyInfo.city} 
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            </Link>
            ))

          :
           hotels.map((hotel, i) => (
            <Link to={`/singlehotel/${hotel._id}`} key={i} className="jumbot">
            <div className="jumbotron2 mb-3" onClick={this.handleClick}>
              <div>
                <div className="row no-gutters">
                  <div className="col-4">
                    <div className="card border-0">
                      <div className="card-body mcard">
                      <img src={hotel.imagerUrl[0].url} style={{height:'100%', width:'100%'}} alt="..." />
                      </div>
                    </div>
                  </div>
                  <div className="col-5">
                    <div className="card border-0">
                      <div className="card-body mcard">
                        <h5>{hotel.propertyInfo.hotelName}<span className="rates">{this.Ratingstarts(hotel.propertyInfo.starRating)}</span></h5>
                        <p>{hotel.propertyInfo.hotelDescription}</p>
                        <div style={{diplay:'iniline-block'}}>
                        <span className="row ">
              {hotel.hotelPolicy.hotelAmenities.slice(0,6).map((Amenities,a) => {
                  
                  console.log(Amenities,'ameni list');
                  let wifi=Amenities.match(/wifi/gi);
                  let pool=Amenities.match(/Swiming pool/gi);
                  let spa=Amenities.search('spa')
                  let park=Amenities.match(/Water Park/gi)
                  let bycicle=Amenities.match(/Bicycle Rental/gi)
                  let car=Amenities.match(/Car Rental/gi);
                  let Cinema=Amenities.match(/cinema/gi);
                  let Audio=Amenities.match(/Audio System/gi)
                  let newpaper=Amenities.match(/Newspaper in lobby/gi);
                  let duty=Amenities.match(/Duty Manager/gi);
                  let lounge=Amenities.match(/Executive Lounge/gi)
                  let salon=Amenities.match(/Beauty Salon/gi)
                  let elevator=Amenities.match(/Elevator/gi)
                  let currency=Amenities.match(/Currency Exchange/gi)
                  let Ac=Amenities.match(/Air Condition/gi)
                  let Roomservice=Amenities.match(/Room Service/gi)
                  let cctv=Amenities.match(/CCTV in Public Places/gi)
                  let electric=Amenities.match(/Electric Vechicle Charging Station/gi)
                  let playground=Amenities.match(/Children Playground/gi)
                  let ironing=Amenities.match(/Ironing Service/gi)
                  let desk=Amenities.match(/Fronk Desk Service/gi)
                  let hot=Amenities.match(/Jacuzzi/gi)
                  let Airportshuttle=Amenities.match(/Airpot Shuttle/gi)
                  let fitness=Amenities.match(/Fitnes Center/gi)
                  let bar=Amenities.match(/Bar/gi)
                  let terace=Amenities.match(/Terrace/gi)
                  console.log(wifi,'prop')
                 
                  if(wifi){
                    
                    return(
                      <div className="col-2">
                       <p className="mr-2" key={a}>
                      <FontAwesomeIcon
                      className='wicon'
                      icon={faWifi}
                    /> </p>
                    </div>
                    )
                    
                  }
                  else if(pool){

                    return(
                      <div className="col-2">
                        <p className="mr-2" key={a}>
                      <FontAwesomeIcon
                      className='wicon'
                      icon={faSwimmer}
                    /> </p>
                    </div>
                    )
                  }
                  else if(spa > -1){
                    return(
                      <div className="col-2">
                       <p className="mr-2" key={a}>
                      <FontAwesomeIcon
                      className='wicon'
                      icon={faSpa}
                    /> </p>
                    </div>
                    ) 
                  }
                  else if(park){
                    return(
                      <div className="col-2">
                      <p className="mr-2" key={a}>
                      <FontAwesomeIcon
                      className='wicon'
                      icon={faWater}
                    /> </p>
                    </div>
                    ) 

                  }else if(bycicle){
                    return(
                      <div className="col-2">
                      <p className="mr-2" key={a}>
                      <FontAwesomeIcon
                      className='wicon'
                      icon={faBicycle}
                    /> </p>
                    </div>
                    ) 

                  }else if(car){
                    return(
                      <div className="col-2">
                      <p className="mr-2" key={a}>
                      <FontAwesomeIcon
                      className='wicon'
                      icon={faTaxi}
                    /> </p>
                    </div>
                    ) 

                  }else if(Cinema){
                    return(
                      <div className="col-2">
                      <p className="mr-2" key={a}>
                      <FontAwesomeIcon
                      className='wicon'
                      icon={faFilm}
                    /> </p>
                    </div>
                    ) 

                  }else if(Audio){
                    return(
                      <div className="col-2">
                      <p className="mr-2" key={a}>
                      <FontAwesomeIcon
                      className='wicon'
                      icon={faSpeakerDeck}
                    /> </p>
                    </div>
                    ) 

                  }else if(newpaper){
                    return(
                      <div className="col-2">
                      <p className="mr-2" key={a}>
                      <FontAwesomeIcon
                      className='wicon'
                      icon={faBicycle}
                    /> </p>
                    </div>
                    ) 

                  }else if(duty){
                    return(
                      <div className="col-2">
                      <p className="mr-2" key={a}>
                      <FontAwesomeIcon
                      className='wicon'
                      icon={faBriefcase}
                    /> </p>
                    </div>
                    ) 

                  }else if(lounge){
                    return(
                      <div className="col-2">
                      <p className="mr-2" key={a}>
                      <FontAwesomeIcon
                      className='wicon'
                      icon={faWineGlass}
                    /> </p>
                    </div>
                    ) 

                  }else if(salon){
                    return(
                      <div className="col-2">
                      <p className="mr-2" key={a}>
                      <FontAwesomeIcon
                      className='wicon'
                      icon={faCrosshairs}
                    /> </p>
                    </div>
                    ) 

                  }else if(elevator){
                    return(
                      <div className="col-2">
                      <p className="mr-2" key={a}>
                     </p>
                    </div>
                    ) 

                  }else if(currency){
                    return(
                      <div className="col-2">
                      <p className="mr-2" key={a}>
                      <FontAwesomeIcon
                      className='wicon'
                      icon={faMoneyBillAlt}
                    />  </p>
                    </div>
                    ) 

                  }else if(Ac){
                    return(
                      <div className="col-2">
                      <p className="mr-2" key={a}>
                      <FontAwesomeIcon
                      className='wicon'
                      icon={faFan}
                    /> </p>
                    </div>
                    ) 

                  }else if(Roomservice){
                    return(
                      <div className="col-2">
                      <p className="mr-2" key={a}>
                      <FontAwesomeIcon
                      className='wicon'
                      icon={faServicestack}
                    /> </p>
                    </div>
                    ) 

                  }else if(cctv){
                    return(
                      <div className="col-2">
                      <p className="mr-2" key={a}>
                      <FontAwesomeIcon
                      className='wicon'
                      icon={faCamera}
                    /> </p>
                    </div>
                    ) 

                  }else if(electric){
                    return(
                      <div className="col-2">
                      <p className="mr-2" key={a}>
                      <FontAwesomeIcon
                      className='wicon'
                      icon={faGasPump}
                    /> </p>
                    </div>
                    ) 

                  }else if(playground){
                    return(
                      <div className="col-2">
                      <p className="mr-2" key={a}>
                      <FontAwesomeIcon
                      className='wicon'
                      icon={faChild}
                    /> </p>
                    </div>
                    ) 

                  }else if(ironing){
                    return(
                      <div className="col-2">
                      <p className="mr-2" key={a}>
                      <FontAwesomeIcon
                      className='wicon'
                      icon={faTshirt}
                    /> </p>
                    </div>
                    ) 

                  }else if(desk){
                    return(
                      <div className="col-2">
                      <p className="mr-2" key={a}>
                      <FontAwesomeIcon
                      className='wicon'
                      icon={faDesktop}
                    /> </p>
                    </div>
                    ) 

                  }else if(hot){
                    return(
                      <div className="col-2">
                      <p className="mr-2" key={a}>
                      <FontAwesomeIcon
                      className='wicon'
                      icon={faHotTub}
                    /> </p>
                    </div>
                    ) 

                  }else if(Airportshuttle){
                    return(
                      <div className="col-2">
                      <p className="mr-2" key={a}>
                      <FontAwesomeIcon
                      className='wicon'
                      icon={faShuttleVan}
                    /> </p>
                    </div>
                    ) 

                  }else if(fitness){
                    return(
                      <div className="col-2">
                      <p className="mr-2" key={a}>
                      <FontAwesomeIcon
                      className='wicon'
                      icon={faDumbbell}
                    /> </p>
                    </div>
                    ) 

                  }else if(bar){
                    return(
                      <div className="col-2">
                      <p className="mr-2" key={a}>
                      <FontAwesomeIcon
                      className='wicon'
                      icon={faGlassCheers}
                    /> </p>
                    </div>
                    ) 

                  }else if(terace){
                    return(
                      <div className="col-2">
                      <p className="mr-2" key={a}>
                      <FontAwesomeIcon
                      className='wicon'
                      icon={faMonument}
                    /></p>
                    </div>
                    ) 

                  }
                
               //this.amen(Amenities,a) 
              //console.log(Amenities,'testing amenities') 
                })}
                </span>
                <span className="ml-2 card-text d-none d-lg-block">
                          View all Amenities 
                        </span>
                        </div>
                        <p className="card-text biglocate">
                          <FontAwesomeIcon  className="logo" icon={faMapMarker} />
                           {hotel.propertyInfo.city} 
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-3">
                    <div className="card border-0">
                      <div className="card-body mcard">
                        <h6 className="mb-2 text-muted veiws">Superb</h6>
  
                        {this.boxRatingstarts(hotel.propertyInfo.starRating)}
                        <span>Reviews</span>
  
                        <p className="card-subtitle price pricefont">NGN {hotel.averagePrice}</p>
  
                        <p className="text-muted pernight pricefont">Per Night</p>
                        <span
                          href="#"
                          className="card-link btn btn-sm btn-primary cheker"
                        >
                          Check this out
                        </span>
                        <p className="card-text smalllocate">
                          <FontAwesomeIcon  className="logo" icon={faMapMarker} />
                           {hotel.propertyInfo.city} 
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            </Link>
            ))}
        </div>
  <nav aria-label="Page navigation example">
  <ul class="pagination pagination-sm">
  <Swiper  {...params}>
  {pages.map(page => (
    <li className={page === currentpage? "page-item active1  page-link" : "page-item page-link "} onClick={()=>this.handlePageChange(page)}>   
    {page}
     </li>
  ))}
  </Swiper>
  </ul>
  
</nav>
        </div>
        </div>
  {/* start small filter modal */}

  <div class="modal d-lg-none d-xl-none fade" id="exampleModalLong" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLongTitle">Filter</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
      <div className="card text-dark mt-3 custom-control custom-radio  mb-3 border filter">
            <div className="card-body">
            
            <p><b>Price Range</b></p>
              <Input2
              Id='customRadio31'
              For="customRadio31"
              name="budget"
              type="radio"
              value="5000"
              onChange={this.handleSideFilterButtonsChange}
              range="0-5000"
              />
            
            <Input2
            Id='customRadio32'
            For="customRadio32"
              name="budget"
              type="radio"
              value="10000"
              onChange={this.handleSideFilterButtonsChange}
              range="5000 - 10000"
              />
            
            <Input2
            Id='customRadio33'
            For="customRadio33"
              name="budget"
              type="radio"
              value="5000"
              onChange={this.handleSideFilterButtonsChange}
              range="10000-20000"
              />
            
            <Input2
            Id='customRadio34'
            For="customRadio34"
              name="budget"
              type="radio"
              value="20000"
              onChange={this.handleSideFilterButtonsChange}
              range="20000-40000"
              />
            
            <Input2
            Id='customRadio35'
            For="customRadio35"
              name="budget"
              type="radio"
              value="80000"
              onChange={this.handleSideFilterButtonsChange}
              range="40000-80000"
              />
            
            <Input2
            Id='customRadio36'
            For="customRadio36"
              name="budget"
              type="radio"
              value="200000"
              onChange={this.handleSideFilterButtonsChange}
              range="80000-200000"
              />
            <hr/>
            <p><b>Star Rating</b></p>
              <Input2
              Id='customRadio37'
              For="customRadio37"
              name="starrating"
              type="radio"
              value="1"
              onChange={this.handleSideFilterButtonsChange}
              range={(<FontAwesomeIcon className='starrating'  icon={faStar} />)}
              />
            
            <Input2
            Id='customRadio38'
            For="customRadio38"
              name="starrating"
              type="radio"
              value="2"
              onChange={this.handleSideFilterButtonsChange}
              range={(<>
                      <FontAwesomeIcon className='starrating'  icon={faStar} />
                      <FontAwesomeIcon className='starrating'  icon={faStar} />
                  </>)}
              />
            
            <Input2
            Id='customRadio39'
            For="customRadio39"
              name="starrating"
              type="radio"
              value="3"
              onChange={this.handleSideFilterButtonsChange}
              range={(<>
                <FontAwesomeIcon className='starrating'  icon={faStar} />
                <FontAwesomeIcon className='starrating'  icon={faStar} />
                <FontAwesomeIcon className='starrating'  icon={faStar} />
            </>)}
              />
              <Input2
              Id='customRadio310'
              For="customRadio310"
              name="starrating"
              type="radio"
              value="4"
              onChange={this.handleSideFilterButtonsChange}
              range={(<>
                <FontAwesomeIcon className='starrating'  icon={faStar} />
                <FontAwesomeIcon className='starrating'  icon={faStar} />
                <FontAwesomeIcon className='starrating'  icon={faStar} />
                <FontAwesomeIcon className='starrating'  icon={faStar} />
            </>)}
              />
              <Input2
              Id='customRadio311'
              For="customRadio311"
              name="starrating"
              type="radio"
              value="5"
              onChange={this.handleSideFilterButtonsChange}
              range={(<>
                <FontAwesomeIcon className='starrating'  icon={faStar} />
                <FontAwesomeIcon className='starrating'  icon={faStar} />
                <FontAwesomeIcon className='starrating'  icon={faStar} />
                <FontAwesomeIcon className='starrating'  icon={faStar} />
                <FontAwesomeIcon className='starrating'  icon={faStar} />
            </>)}
              />
            <hr/>  
            <button className="btn btn-outline-secondary btn-block" data-toggle="collapse" data-target="#multiCollapseExample2" aria-expanded="false" aria-controls="multiCollapseExample2">Amenities</button>
            {/* modal start */}
      <div class="collapse multi-collapse" id="multiCollapseExample2">
      <div class="card card-body">
      <div className="row">
         <div className="col">
      <Input2
              Id='customRadio3a'
              For="customRadio3a"
              name="amenities"
              type="radio"
              value="wifi"
              onChange={this.handleSideFilterButtonsChange}
              range={(<>Wifi <FontAwesomeIcon className='starrating'  icon={faWifi} /></>)}
              />

            <Input2
              Id='customRadio3d'
              For="customRadio3d"
              name="amenities"
              type="radio"
              value="1"
              onChange={this.handleSideFilterButtonsChange}
              range={(<FontAwesomeIcon className='starrating'  icon={faWater} />)}
              />
              <Input2
              Id='customRadio3g'
              For="customRadio3g"
              name="amenities"
              type="radio"
              value="1"
              onChange={this.handleSideFilterButtonsChange}
              range={(<FontAwesomeIcon className='starrating'  icon={faTshirt} />)}
              />
           
           <Input2
              Id='customRadio3b'
              For="customRadio3b"
              name="amenities"
              type="radio"
              value="1"
              onChange={this.handleSideFilterButtonsChange}
              range={(<FontAwesomeIcon className='starrating'  icon={faTaxi} />)}
              />

            <Input2
              Id='customRadio3e'
              For="customRadio3e"
              name="amenities"
              type="radio"
              value="1"
              onChange={this.handleSideFilterButtonsChange}
              range={(<FontAwesomeIcon className='starrating'  icon={faWineGlass} />)}
              />
           </div>
           <Input2
              Id='customRadio3h'
              For="customRadio3h"
              name="amenities"
              type="radio"
              value="1"
              onChange={this.handleSideFilterButtonsChange}
              range={(<FontAwesomeIcon className='starrating'  icon={faSwimmer} />)}
              />
           <div className="col">
           <Input2
              Id='customRadio3c'
              For="customRadio3c"
              name="amenities"
              type="radio"
              value="1"
              onChange={this.handleSideFilterButtonsChange}
              range={(<>Spa <FontAwesomeIcon className='starrating'  icon={faSpa} /></>)}
              />
              <Input2
              Id='customRadio3f'
              For="customRadio3f"
              name="amenities"
              type="radio"
              value="1"
              onChange={this.handleSideFilterButtonsChange}
              range={( <> Airportshuttle <FontAwesomeIcon className='starrating'  icon={faShuttleVan} /></>)}
              />

              <Input2
              Id='customRadio3i'
              For="customRadio3i"
              name="amenities"
              type="radio"
              value="1"
              onChange={this.handleSideFilterButtonsChange}
              range={(<FontAwesomeIcon className='starrating'  icon={faMonument} />)}
              />
</div>
</div>
      </div>
      </div>
 
            
            {/* modal end */}
            <hr/>
            <b>Breakfast</b>
            <Input2
            Id='customRadio312'
            For="customRadio312"
              type="radio"
              name="breakfast"
              value='Yes, Free'
              onChange={this.handleSideFilterButtonsChange}
              range="Free Breakfast"
              />
                 <Input2
                 Id='customRadio313'
                 For="customRadio313"
              type="radio"
              name="breakfast"
              value='Yes, Paid'
              onChange={this.handleSideFilterButtonsChange}
              range="Paid Breakfast"
              />
                 <Input2
                 Id='customRadio314'
                 For="customRadio314"
              type="radio"
              name="breakfast"
              value='No'
              onChange={this.handleSideFilterButtonsChange}
              range="No Breakfast"
              />
            <hr/> 
            <b>Payment & Cancellation</b>
            <Input2
            Id='customRadio315'
            For="customRadio315"
              type="radio"
              name="pamentpolicy"
              value="pay now"
              onChange={this.handleSideFilterButtonsChange}
              range="Pay Online"
              />
              <Input2
              Id='customRadio316'
              For="customRadio316"
              type="radio"
              name="pamentpolicy"
              value="pay on arrival"
              onChange={this.handleSideFilterButtonsChange}
              range="Pay at Hotel"
              />
              <Input2
              Id='customRadio317'
              For="customRadio317"
              type="checkbox"
              name="cancellation"
              value={this.state.cancellation}
              onChange={this.handleSideFilterButtonsChange}
              range="Instant Confirmation"
              />
            <hr/> 

            <b>Distance to City Center</b>
            <Input2
            Id='customRadio318'
            For="customRadio318"
              type="radio"
              name="distance"
              value="1km"
              onChange={this.handleSideFilterButtonsChange}
              range="Less than 1km"
              />
              <Input2
              Id='customRadio319'
              For="customRadio319"
              type="radio"
              name="distance"
              value="2km"
              onChange={this.handleSideFilterButtonsChange}
              range="Less than 2km"
              />
              <Input2
              Id='customRadio320'
              For="customRadio320"
              type="radio"
              name="distance"
              value="2km"
              onChange={this.handleSideFilterButtonsChange}
              range="Less than 3km"
              />
            <hr/>
            <b>Bed Type</b>
            <Input2
            Id='customRadio321'
            For="customRadio321"
              type="radio"
              name="bed"
              value="Queen Bed"
              onChange={this.handleSideFilterButtonsChange}
              range="Queen Bed"
              />
               <Input2
               Id='customRadio323'
               For="customRadio323"
              type="radio"
              name="bed"
              value="Single Beds"
              onChange={this.handleSideFilterButtonsChange}
              range="Single Beds"
              />
                  <Input2
                  Id='customRadio324'
                  For="customRadio324"
              type="radio"
              name="bed"
              value="Multiple Beds"
              onChange={this.handleSideFilterButtonsChange}
              range="Multiple Beds"
              />
            <hr/>

            </div>
            <button onClick={() =>this.filterthehotels(searchedHotel, samepage)} data-dismiss="modal" className="btn btn-primary btn-block"> 
            Filter
            </button>
            </div> 
            
      </div>
    </div>
  </div>
</div>


<div class="modal fade " href="#exampleModalLong" id="exampleModalCenter" tabindex="-1"  role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered modal-scrollable focus" role="document" style={{zIndex:3}}>
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLongTitle">Filter</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class='modal-body'>
        
       <div className="row">
         <div className="col">
         <Input2
              Id='customRadioa'
              For="customRadioa"
              name="amenities"
              type="radio"
              value="wifi"
              onChange={this.handleSideFilterButtonsChange}
              range={(<>Wifi <FontAwesomeIcon className='starrating'  icon={faWifi} /></>)}
              />

            <Input2
              Id='customRadiod'
              For="customRadiod"
              name="amenities"
              type="radio"
              value="1"
              onChange={this.handleSideFilterButtonsChange}
              range={(<FontAwesomeIcon className='starrating'  icon={faWater} />)}
              />
              <Input2
              Id='customRadiog'
              For="customRadiog"
              name="amenities"
              type="radio"
              value="1"
              onChange={this.handleSideFilterButtonsChange}
              range={(<FontAwesomeIcon className='starrating'  icon={faTshirt} />)}
              />
           
           <Input2
              Id='customRadiob'
              For="customRadiob"
              name="amenities"
              type="radio"
              value="1"
              onChange={this.handleSideFilterButtonsChange}
              range={(<FontAwesomeIcon className='starrating'  icon={faTaxi} />)}
              />

            <Input2
              Id='customRadioe'
              For="customRadioe"
              name="amenities"
              type="radio"
              value="1"
              onChange={this.handleSideFilterButtonsChange}
              range={(<FontAwesomeIcon className='starrating'  icon={faWineGlass} />)}
              />
           </div>
           <Input2
              Id='customRadioh'
              For="customRadioh"
              name="amenities"
              type="radio"
              value="1"
              onChange={this.handleSideFilterButtonsChange}
              range={(<FontAwesomeIcon className='starrating'  icon={faSwimmer} />)}
              />
           <div className="col">
           <Input2
              Id='customRadioc'
              For="customRadioc"
              name="amenities"
              type="radio"
              value="1"
              onChange={this.handleSideFilterButtonsChange}
              range={(<>Spa <FontAwesomeIcon className='starrating'  icon={faSpa} /></>)}
              />
              <Input2
              Id='customRadiof'
              For="customRadiof"
              name="amenities"
              type="radio"
              value="1"
              onChange={this.handleSideFilterButtonsChange}
              range={( <> Airportshuttle <FontAwesomeIcon className='starrating'  icon={faShuttleVan} /></>)}
              />

              <Input2
              Id='customRadioi'
              For="customRadioi"
              name="amenities"
              type="radio"
              value="1"
              onChange={this.handleSideFilterButtonsChange}
              range={(<FontAwesomeIcon className='starrating'  icon={faMonument} />)}
              />
           </div>
      </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary" data-dismiss="modal">Okay</button>
      </div>
    </div>
  </div>
</div>

  {/* end small filter modal */}

      </>
    );
  }
  
 

}
export default HotelList;
