'use strict';

console.log("Fake Yelp");

(function () {

    var showMap = false;

    var API_KEY = 'xICUj5FsqM8P6cfNhFQEYwtYzrv75F4WEqj-Hns-fUTZgyLOzQBVyr01f9g3p-5P3J9S7LkrGhLEWjqi7t_ZHoZedrj9zV1E34GIIu1nLLF814cws_futxGtRGPiWnYx';

    var googleMap = document.querySelector('.mapClosed');
    var termEl = document.getElementById('term');
    var locationEl = document.getElementById('location');
    var searchBtn = document.getElementById('search');
    var resultsEl = document.getElementById('results');
    var inputField = document.querySelector('label-food');
    var findFoodInput = document.querySelector('input.find-food-input');
    var findAreaInput = document.querySelector(".find-area-input");

    findFoodInput.addEventListener('keyup', function () {
        if (findFoodInput.value && findAreaInput.value) {
            findFoodInput.classList.add('filled');
        } else {
            findFoodInput.classList.remove('filled');
        }
    });

    findAreaInput.addEventListener('keyup', function () {
        if (findAreaInput.value) {
            findAreaInput.classList.add('filled');
        } else {
            findAreaInput.classList.remove('filled');
        }
    });

    searchBtn.addEventListener("click", function (e) {
        e.preventDefault();

        var queryTerm = termEl.value;
        var location = locationEl.value;
        var prices = getCheckedValues(document.querySelectorAll('[name=price]:checked'));

        searchYelp(location, queryTerm, prices);
    });

    function getCheckedValues(checkedItems) {
        console.log('checked', checkedItems);
        //option 1: the old-school JS way
        var allChecked = '';
        for (var i = checkedItems.length - 1; i >= 0; i--) {
            var checkedItem = checkedItems[i];
            allChecked = allChecked + ', ' + checkedItem;
        }
        return allChecked;
    }

    function displayBusinesses(businessArray) {

        resultsEl.innerHTML = '';

        console.log(businessArray);
        // resultsEl.removeChild(liEl);
        for (var i = 0; i <= businessArray.length - 1; i++) {
            console.log(businessArray[i]);
            var lat = businessArray[i].coordinates.latitude;
            var long = businessArray[i].coordinates.longitude;

            console.log(lat, long);

            var currentBusiness = businessArray[i];
            var currentBusinessLocation = businessArray[i].location;
            var liEl = document.createElement('li');
            var aEl = document.createElement('a');
            var imgEl = document.createElement('img');
            var h1AddresEl = document.createElement('h1');
            var p$El = document.createElement('p');
            var pRatingEl = document.createElement('p');

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

        }).then(function (response) {
            console.log('here is the get response data for key:', response.data);
            displayBusinesses(response.data.businesses);
            getLatLong(response);
        });
    }

    var getLatLong = function getLatLong(response) {
        var locationsArray = [];
        response.data.businesses.forEach(function (business) {
            var coordinate = {
                name: business.name,
                lat: business.coordinates.latitude,
                lng: business.coordinates.longitude,
                phone: business.phone
            };
            locationsArray.push(coordinate);
        });

        showMap = true;
        if (showMap === true) {
            googleMap.style.display = "block";
        }
        console.table(locationsArray);
        googleMaps.showMarkers(locationsArray);
    };

    return {
        getLatLong: getLatLong
    };
})();

var foodType = document.querySelectorAll('.label-food');
var areaInput = document.querySelectorAll(".label-area");

var currentTextIndexArea = 0;
var currentTextIndexFood = 0;
console.log(foodType);

setInterval(function () {

    var hideShowingText = function hideShowingText() {
        TweenMax.to(areaInput[currentTextIndexArea], 0.5, {
            display: "none",
            opacity: 0,
            x: 30
        });
    };

    var showNewText = function showNewText() {
        TweenMax.fromTo(areaInput[currentTextIndexArea], 0.5, {
            display: "none",
            opacity: 0,
            x: -20
        }, {
            display: "block",
            opacity: 1,
            x: 0
        });
    };

    var next = function next() {
        hideShowingText();
        currentTextIndexArea++;
        if (currentTextIndexArea === areaInput.length) {
            currentTextIndexArea = 0;
        }
        showNewText();
    };
    next();
}, 4000);

setInterval(function () {

    var hideShowingText = function hideShowingText() {
        TweenMax.to(foodType[currentTextIndexFood], 0.3, {
            display: "none",
            opacity: 0,
            x: 30
        });
    };

    var showNewText = function showNewText() {
        TweenMax.fromTo(foodType[currentTextIndexFood], 0.3, {
            display: "none",
            opacity: 0,
            x: -20
        }, {
            display: "block",
            opacity: 1,
            x: 0
        });
    };

    var next = function next() {
        hideShowingText();
        currentTextIndexFood++;
        if (currentTextIndexFood === foodType.length) {
            currentTextIndexFood = 0;
        }
        showNewText();
    };
    next();
}, 2000);
//# sourceMappingURL=main.js.map
