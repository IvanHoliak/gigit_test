async function initMap() {
    const input = document.getElementById("location");

    let uluru = { 
        location: {lat: -25.344, lng: 131.031},
        placeId: ""
    };

    if(input.value.length) {
        const geocoder = new google.maps.Geocoder();

        try {
            const current_place = await geocoder.geocode({"address": input.value});

            const new_uluru = {
                location: {
                    lat: current_place.results[0].geometry.location.lat(),
                    lng: current_place.results[0].geometry.location.lng(),
                },
                placeId: current_place.results[0].place_id
            };

            uluru = new_uluru;
        }catch(e){
            console.error("Wrong place");
        };
    
    };
    
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 15,
        center: uluru.location,
        mapTypeControl: false,
        streetViewControl: false,
    });
    
    const autocomplete = new google.maps.places.Autocomplete(input, {
        fields: ["place_id", "geometry", "formatted_address", "name"],
    });
    
    autocomplete.bindTo("bounds", map);

    const marker = new google.maps.Marker({ map: map });

    if(input.value.length) {
        marker.setPlace({
            location: uluru.location,
            placeId: uluru.placeId
        });
    };

    autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();

        if (!place.geometry || !place.geometry.location) {
            return;
        }
        if (place.geometry.viewport) {
            map.fitBounds(place.geometry.viewport);
        } else {
            map.setCenter(place.geometry.location);
            map.setZoom(17);
        }
        
        marker.setPlace({
            placeId: place.place_id,
            location: place.geometry.location,
        });

        marker.setVisible(true);
    });
};

window.initMap = initMap;
