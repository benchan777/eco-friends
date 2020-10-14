// Initialize and add the map
function initMap() {
    // Location of Make School
    var make_school = {lat: 37.783, lng: -122.412};
    // Map centered on Make School
    var map = new google.maps.Map(
        document.getElementById('map'), {zoom: 14, center: make_school});
    // Marker positioned on Make School
    var marker = new google.maps.Marker({position: make_school, map: map});
  }