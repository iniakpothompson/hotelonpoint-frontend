import './bookingform.css';

import Access from './bankicons/access.png';
import Firstbank from './bankicons/firstbank.png';
import GTB from './bankicons/gtb.png';
import { Link } from 'react-router-dom';
import Payment from '../payment/payment';
import React from 'react';
import Zenith from './bankicons/zenith.png';

class BookingForm extends React.Component{
    constructor(props){
        super();
        this.state={
            title:'',
          firstname:'',
          lastname:'', 
          otherrequest:'',
          email:'',
          phone:'',
          wantairportshuttle:false,
          getdeals:false

        }
    }

    handlechange=(event)=>{
      event.preventDefault();
      const {name,value,type,checked}= event.target
      type==="checkbox" ? 
      this.setState({[name]:checked}):
      this.setState({[name]:value})
      console.log(this.state)
    }

    render(){
      const amount = '1300'
            return(
              <div className="container">
              <div className="row">
              <div className="col-sm-9">  
                 <div>
                <div className="row mb-1">
                    <div className="col-sm-12">
                        <div className="card shadow p-3 mb-1 bg-white rounded">
                          <div className="card-head">
                          <h4 className="ml-3">Traveller information</h4>
                          </div>  
                          <div className="card-body">     
                          <div className="row no-gutters">
                          <div className="col-md-4 chck">           
                          <div className="form-check radio">
                          <input className="form-radio-button" checked={this.state.title ==="Mr"} name="title" onChange={this.handlechange} type="radio" value="Mr" id="defaultCheck1"/>
                          <label className="form-check-label" for="defaultCheck1">
                          Mr                                                     
                          </label>                                          
                          </div>                                             
                          <div className="form-check radio">
                          <input className="form-radio-button" checked={this.state.title ==="Mrs"} name="title" onChange={this.handlechange} type="radio" value="Mrs" id="defaultCheck1"/>
                          <label className="form-check-label" for="defaultCheck1">
                          Mrs                                                    
                          </label>                                          
                          </div>    
                          <div className="form-check radio">
                          <input className="form-radio-button" checked={this.state.title ==="Miss"} name="title" onChange={this.handlechange} type="radio" value="Miss" id="defaultCheck1"/>
                          <label className="form-check-label" for="defaultCheck1">
                          Miss                                                     
                          </label>                                          
                          </div>       
                          </div>                                       
                          <div className="col-md-6">
                          </div>
                          </div>
                          <div className="row ">
                          <div className="col-md-6">
                          <div className="form-group">
                          <label>Firstname</label>
                          <input type="text" className="form-control" name="firstname" onChange={this.handlechange} aria-describedby="emailHelp" placeholder="Enter firstname"/>
                          <small id="emailHelp" className="form-text text-muted">Please first letter is capital</small>
                          </div>
                          </div>
                          <div className="col-md-6">
                          <div className="form-group">
                          <label >Lastname</label>
                          <input type="text" className="form-control" name="lastname" onChange={this.handlechange} placeholder="Enter lastname"/>
                          <small id="emailHelp" className="form-text text-muted">Please first letter is capital</small>
                          </div>  
                          </div>                            
                          </div>

                          <div className="row no-gutters">
                                      <div className="col-md-6">
                                       <div className="form-group">
                                        <label >Email address</label>
                                        <input type="email" className="form-control" onChange={this.handlechange} name="email" aria-describedby="emailHelp" placeholder="user@example.com"/>
                                        <small id="emailHelp" className="form-text text-muted">We will send your booking confirmation (including the hotel's contact information) to this email.
Please ensure your email is entered correctly.
                                        </small>
                                        </div>
                                      </div>
                                      <div className="col-md-6"></div>
                                  </div>
                                  <div className="row no-gutters">
                                    <div className="col-md-6">
                                            <div className="form-group">
                                                    <label >Mobile number</label>
                                                    <input type="" className="form-control" name="phone" onChange={this.handlechange} aria-describedby="emailHelp" placeholder="Enter mobile number"/>
                                                    <small id="emailHelp" className="form-text text-muted">We’ll only contact you in an emergency</small>
                                                  </div>
                                    </div>
                                    <div className="col-md-6"></div>
                                </div>

                          {/* <div className="row no-gutters">
                          <div className="col-md-6"></div>
                          </div> */}
                          </div>             
                          </div>
                        </div>
                    </div>
                    <div className="row mb-1">
                          <div className="col-sm-12">
                              <div className="card shadow p-3 mb-2 bg-white rounded">
                               
                                  <div className="card-body">
                                  <h5 className="text-dark">
                                Special Request
                                <small className="text-muted"> (optional)</small> 
                                </h5>
                                  <div className="row no-gutters">
                          <p>Your requests will be passed on to the hotel but cannot be guaranteed.</p>
                          <div className="col-md-12">
                          <div className="form-group">
                          <label for="exampleFormControlTextarea1">Extra request</label>
                          <textarea className="form-control txa" id="exampleFormControlTextarea1" name="extra-request" onChange={this.handlechange} ></textarea>
                          </div>
                          </div>
                          {/* <div className="col-md-6"></div> */}
                          </div>
                          <div className="row mb-1">
                          <div className="col-md-6">
                          <div className="form-check">
                          <input className="form-check-input" name="wantairportshuttle" onChange={this.handlechange} checked={this.state.wantairportshuttle} type="checkbox" value="" id="defaultCheck1"/>
                          <label className="form-check-label" for="defaultCheck1">
                          <b>Want to book Airport-Shuttle</b>.
                          <br/>Get from the airport to your accomodation without hassles.
                           We will contact you after your booking is guranteed to provide you available
                          taxi options.                            
                          </label>
                          </div>
                          </div>
                          <div className="col-md-6">              
                          </div>
                          </div>
                                <div className="row mb-1">
                                  <div className="col-md-12">
                                          <div className="form-check">
                                                  <input className="form-check-input" onChange={this.handlechange} name="getdeals" checcked={this.state.getdeals} type="checkbox" value="" id="defaultCheck1"/>
                                                  <label className="form-check-label" for="defaultCheck1">
                                                    Check this box if you would not like to receive Hotel-on-points.com <b>special deals</b> email newsletter that contains great hotel promotions
                                                   
                                                  </label>
                                              </div>
                                      </div>
                              </div> 
                                  </div>
                              </div>
                          </div>
                      </div>

                      <div className="row mb-1">
                              <div className="col-sm-12">
                                  <div className="card shadow p-3 mb-2 bg-white rounded">
                                      <div className="card-body">
                                       <p>The charges below are included in your overall room price:</p>
                                       <p>New Year's Eve gala dinner fee</p>
                                       <p>Christmas Eve gala dinner fee</p>
                                       <br/>
                                        <h4>Reservation Terms & Conditions of Booking</h4>
                                        <hr/>
                                       <p>By clicking "Book", you agree you have read and accept our <Link>Terms and Conditions</Link>  and <Link>Privacy Policy</Link> </p>
                                      </div>
                                  </div>
                              </div>
                          </div>
      
                      <div className="row mb-1">
                        <div className="col-md-12 ">
                            <div className=" shadow mb-2 mdpd bg-white rounded">
                                <div className="text-center">
                                    <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                                        <li className="nav-item">
                                          <a className="nav-link active" id="pills-paynow-tab" data-toggle="pill" href="#pills-paynow" role="tab" aria-controls="pills-paynow" aria-selected="true">Pay Now</a>
                                        </li>
                                        <li className="nav-item">
                                          <a className="nav-link" id="pills-paylater-tab" data-toggle="pill" href="#pills-paylater" role="tab" aria-controls="pills-paylater" aria-selected="false">Pay Later</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" id="pills-payonarrival-tab" data-toggle="pill" href="#pills-payonarrival" role="tab" aria-controls="pills-payonarrival" aria-selected="false">Pay On Arrival</a>
                                          </li>
                                      </ul> 
                                </div>
                                <div className="tab-content " id="pills-tabContent">
                              <div className="tab-pane fade show active" id="pills-paynow" role="tabpanel" aria-labelledby="pills-paynow-tab">
                                <h2 className="text-center">Amount: ${amount}</h2>
                               
                            
                            <div className="row">
                            <div className="col-12">
                            <Payment amount={amount} container="contain" butin="btn-block btn-primary btn"/>
                            </div>
                          </div>
                                
                              </div>
                              <div className="tab-pane fade" id="pills-paylater" role="tabpanel" aria-labelledby="pills-paylater-tab">
                             
                                
                              <div className="card border-0 text-center">
                                <h5> You prefer bank transfer this are our bank details:</h5>
                              <div className="card-body">
                              <img src={ Access } className="mr-1" width="100" height="100" alt="..." />
                              <img src={ Zenith } className="mr-1" width="100" height="100" alt="..." />
                              <img src={ GTB } className="mr-1" width="100" height="100" alt="..." />
                              <img src={ Firstbank } className="mr-1" width="100" height="100" alt="..." />
                              </div>
                              </div>
                              <div className="row">
                            <div className="col-12 ">
                              <button className="btn btn-block btn-primary ">Book</button>
                            </div>
                          </div>

                              </div>
                              {/* last tab */}
                              <div className="tab-pane fade" id="pills-payonarrival" role="tabpanel" aria-labelledby="pills-payonarrival-tab">  </div>
                              </div>
                            </div>
                        </div>
                    </div>
      
                      
                          {/* <div className="row">
                            <div className="col-md-12">
                              <button className="btn btn-block btn-primary">Book</button>
                            </div>
                          </div> */}
              </div>
              </div>
              <div className="col-md-3">
              <div className="card shadow">
              <div className="card-body">
              <h5 className="card-title">Summary of your booking</h5>
              <p className="card-text">Your Name</p>
            <p className="card-text">{this.state.firstname} {this.state.lastname}</p>

              
              </div>
              </div>
              </div>
              </div>

            </div>              
    

  )  
 }
}
export default BookingForm