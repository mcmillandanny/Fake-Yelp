console.log("Fake Yelp");

(function(){

				
    const API_KEY = 'xICUj5FsqM8P6cfNhFQEYwtYzrv75F4WEqj-Hns-fUTZgyLOzQBVyr01f9g3p-5P3J9S7LkrGhLEWjqi7t_ZHoZedrj9zV1E34GIIu1nLLF814cws_futxGtRGPiWnYx';
                

    const termEl = document.getElementById('term');
    const locationEl = document.getElementById('location');
    const searchBtn = document.getElementById('search');
    const resultsEl = document.getElementById('results');


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
        //option 2: the ES6 way
        // [...checkedItems].map(function(checkItem){  - this turns it into an array as far as js is concerned
            //return checkedItem.value });
            //const allChecked= checkedValues.join(','); 
            //conole.log('allChecked', allChecked);
        return allChecked;
    }

    function displayBusinesses(businessArray){
        
        resultsEl.innerHTML = '';
        
        console.log(businessArray);
        // resultsEl.removeChild(liEl);
        for (var i = 0; i <= businessArray.length - 1; i++) {
            console.log(businessArray[i]);

            const currentBusiness = businessArray[i];
            const currentBusinessLocation = businessArray[i].location;
            let liEl = document.createElement('li');
            let aEl = document.createElement('a');
            let imgEl = document.createElement('img');
            let pAddressEl = document.createElement('p');
            let p$El = document.createElement('p');
            let pRatingEl = document.createElement('p');

            aEl.innerHTML = currentBusiness.name;
            aEl.href = currentBusiness.url;
            imgEl.src = currentBusiness.image_url;
            pAddressEl.innerHTML = currentBusinessLocation.address1 + "<br/>" + currentBusinessLocation.city + ", " + currentBusinessLocation.state + " " + currentBusinessLocation.zip_code; 
            p$El.innerHTML = currentBusiness.price;
            pRatingEl.innerHTML = "Rating " + currentBusiness.rating;

            liEl.appendChild(aEl);
            liEl.appendChild(imgEl);
            liEl.appendChild(pAddressEl);
            liEl.appendChild(p$El);
            liEl.appendChild(pRatingEl);

            resultsEl.appendChild(liEl);
        }
    }

    //params and headers are part of axios. It is builing the + "" + "" that we did last week
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
        //the response is the JSON data we are getting back
        .then(function(response){
            console.log('here is the get response data for key:', response.data, response);
            displayBusinesses(response.data.businesses);
        });
    }

})()