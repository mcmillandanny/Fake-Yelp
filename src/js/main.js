console.log("Fake Yelp");

(function(){

    let showMap = false;

    const API_KEY = 'xICUj5FsqM8P6cfNhFQEYwtYzrv75F4WEqj-Hns-fUTZgyLOzQBVyr01f9g3p-5P3J9S7LkrGhLEWjqi7t_ZHoZedrj9zV1E34GIIu1nLLF814cws_futxGtRGPiWnYx';
                
    let googleMap = document.querySelector('.mapClosed');
    const termEl = document.getElementById('term');
    const locationEl = document.getElementById('location');
    const searchBtn = document.getElementById('search');
    const resultsEl = document.getElementById('results');
    let inputField = document.querySelector('label-food');
    let findFoodInput = document.querySelector('input.find-food-input');


    findFoodInput.addEventListener('keyup', function() {
        if (findFoodInput.value) {
            findFoodInput.classList.add('filled')
        } else {
            findFoodInput.classList.remove('filled')
        }
    })


    searchBtn.addEventListener("click", function(e) {
        e.preventDefault();

        const queryTerm = termEl.value;
        const location = locationEl.value;
        const prices = getCheckedValues(document.querySelectorAll('[name=price]:checked'));

        searchYelp(location, queryTerm, prices);
    })

    function getCheckedValues(checkedItems){
        console.log('checked', checkedItems);
        //option 1: the old-school JS way
        let allChecked = '';
        for (var i = checkedItems.length - 1; i >= 0; i--) {
            var checkedItem = checkedItems[i];
            allChecked = allChecked + ', ' + checkedItem;
        }
        return allChecked;
    }

    function displayBusinesses(businessArray){
        
        resultsEl.innerHTML = '';
        
        console.log(businessArray);
        // resultsEl.removeChild(liEl);
        for (var i = 0; i <= businessArray.length - 1; i++) {
            console.log(businessArray[i]);
            let lat = businessArray[i].coordinates.latitude;
            let long = businessArray[i].coordinates.longitude;

            console.log(lat, long);

            const currentBusiness = businessArray[i];
            const currentBusinessLocation = businessArray[i].location;
            let liEl = document.createElement('li');
            let aEl = document.createElement('a');
            let imgEl = document.createElement('img');
            let h1AddresEl = document.createElement('h1');
            let p$El = document.createElement('p');
            let pRatingEl = document.createElement('p');

            aEl.innerHTML = currentBusiness.name;
            aEl.href = currentBusiness.url;
            imgEl.src = currentBusiness.image_url;
            h1AddresEl.innerHTML = currentBusinessLocation.address1 + "<br/>" + currentBusinessLocation.city + ", " + currentBusinessLocation.state + " " + currentBusinessLocation.zip_code; 
            p$El.innerHTML = currentBusiness.price;
            pRatingEl.innerHTML = "Rating " + currentBusiness.rating;

            liEl.appendChild(aEl);
            liEl.appendChild(imgEl);
            liEl.appendChild(h1AddresEl);
            liEl.appendChild(p$El);
            liEl.appendChild(pRatingEl);

            resultsEl.appendChild(liEl);
        }
    }

    function searchYelp(location, queryTerm, prices) {
        axios.get("https://circuslabs.net/proxies/yelp-fusion-proxy/", {
            params: {
                '_ep': '/businesses/search',
                'term': queryTerm,
                'location': location
            },
            headers: {
                'Authorization': 'Bearer ' + API_KEY
            }
            
        })
        .then(function(response){
            console.log('here is the get response data for key:', response.data);
            displayBusinesses(response.data.businesses);
            getLatLong(response)
            
        });
    }

    

    let getLatLong = function(response){
		var locationsArray = []
		response.data.businesses.forEach(business => {
			const coordinate = {
				name: business.name,
				lat: business.coordinates.latitude, 
				lng: business.coordinates.longitude,
				phone: business.phone,
			}    
			locationsArray.push(coordinate)
        })
        
        showMap = true;
        if (showMap === true) {
            googleMap.style.display = "block";
        }
		console.table(locationsArray)
        googleMaps.showMarkers(locationsArray)
        
        
	}
	
	return {
		getLatLong: getLatLong
	}

})()

let foodType = document.querySelectorAll('.label-food');



let currentTextIndex = 0;
console.log(foodType)

setInterval(() => {

    let hideShowingText = function() {
        TweenMax.to( foodType[currentTextIndex], 0.3, { 
            display: "none", 
            opacity: 0,
            x: 30,
        })
    }

    let showNewText = function() {
        TweenMax.fromTo( foodType[currentTextIndex], 0.3, {
            display: "none", 
            opacity: 0,
            x: -20
        }, { 
            display: "block", 
            opacity: 1,
            x: 0,
         })
    }   

    let next = function() {
        hideShowingText()
        currentTextIndex++
        if (currentTextIndex === foodType.length) {
			currentTextIndex = 0;
		}
		showNewText()
    }
    next()
}, 2000)