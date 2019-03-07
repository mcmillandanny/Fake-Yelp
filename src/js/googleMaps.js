var googleMaps = (function() {

    var map;
    var markers = [];
    function initMap() {

        console.log("googleMaps.initMap()")
        map = new google.maps.Map(document.getElementById('map'), {
            center: {
                lat: 33.7,
                lng: -84.3
            },
            zoom: 10
        });
    }
    let showMarkers = function(locationsArray) {

        locationsArray.forEach(function (location) {
            var position = new google.maps.LatLng(location.lat, location.lng);
            var marker = new google.maps.Marker({
                position: position,
                map: map,
                animation: google.maps.Animation.DROP,
            })
                
            var infoWindow = new google.maps.InfoWindow({
                content: location.name + "<br>" + location.phone

            });
            marker.addListener('click', function() {
                infoWindow.open(map, marker);
            })
            markers.push(marker)


                                
        });

    }

    
    return {
        initMap: initMap,
        showMarkers: showMarkers
    }
})();