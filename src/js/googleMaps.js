var googleMaps = (function() {

    var map;
    var markers = [];
    function initMap() {
        var buisnessLocation = {lat: business.coordinates.latitude, lng: business.coordinates.longitude};
        map = new google.maps.Map(document.getElementById('map'), {
            center: buisnessLocation,
            zoom: 16
        });

        // var infoWindow = new google.maps.InfoWindow({
        //     content: 'Welcome'
        // });

        var marker = new google.maps.Marker({
            position: buisnessLocation,
            map: map
        });
        markers.push(marker)
    
        marker.addListener('click', function() {
            infoWindow.open(map, marker);
        })
    }

    // let deleteMarkers = function () {
    //         for (var i = 0; i < markers.length; i++) {
    //             markers[i].setMap(null);
    //         }
    //         markers = [];
    //     };

    let showMarkers = function(locationsArray) {
        // deleteMarkers()
        // bounds = new google.maps.LatLngBounds();
        

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


                                
            // bounds.extend(position);
        });

        // map.fitBounds(bounds);
        console.log(markers)
    }

    
    return {
        initMap: initMap,
        showMarkers: showMarkers
    }
})();