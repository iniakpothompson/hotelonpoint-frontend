import React from 'react'
import ContactComponent from './contactcomponent'

function Contact(){

    return(


    
<div className="container">

<ContactComponent
Header="Head Office"

PhysicalAddress="Physical Address"
RoadNo="Plot 5A Road 2"
Location="ofF Ebony road"
City="Port Harcourt"

PostalAddress="Postal Address"
ZipCode="Zip code : 500272"

<<<<<<< HEAD:contact/contact.js
Href="hostoffice"
=======
Href="#hostoffice"
>>>>>>> aa05dbb4a89bc5bf32c6d4f90861f61748549b00:src/components/contact/contact.js
Id="hostoffice"

/>

<ContactComponent
Header="Branch Office"

PhysicalAddress="Physical Address"
RoadNo="Cedar House"
Location="First floor 41 Airport Road"
City="Warri, Delta State"

PostalAddress="Postal Address"
ZipCode="Zip code : 500272"
<<<<<<< HEAD:contact/contact.js
Href="branchoffice"
Id="branceoffice"
=======
Href="#branchoffice"
Id="branchoffice"
>>>>>>> aa05dbb4a89bc5bf32c6d4f90861f61748549b00:src/components/contact/contact.js
/>
</div>
    )
}

export default Contact