// Code goes here!
import axios from 'axios';
const GOOGLE_API_KEY= 'AIzaSyAQNpld-8WH2xPUbnO6srbsLUDT955zwqs'
declare var google: any;
type GoogleGeocodingResponse ={results: {geometry: {location: {lat: number, lang: number}}}[];
status: 'OK'| 'ZERO_RESULTS';
}
const form = document.querySelector('form')! as HTMLFormElement
const addressInput= document.getElementById('address')! as HTMLInputElement;

function searchAddressHandler(event:Event){
event.preventDefault();
const enteredAddress= addressInput.value;

// Send 

axios.get<GoogleGeocodingResponse>(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(enteredAddress)}&key=${GOOGLE_API_KEY}`).then( res=>{

        if(res.data.status !=='OK'){
            throw new Error('Could not fetch location')
        }
        const coordinates = res.data.results[0].geometry.location;
       const map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
            center: coordinates,
            zoom: 16,
          });
        new google.maps.Marker({position:coordinates , maps: map})
    }
    ).catch(err=> alert(err));
}

form.addEventListener('submit', searchAddressHandler);
