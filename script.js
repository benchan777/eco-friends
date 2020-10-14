// inputs
const locationInput = document.querySelector('#location-input')
const timeInput = document.querySelector('#time-input')
const issueInput = document.querySelector('#issue-input')
const issueSubmit = document.querySelector('#issue-submit')

const labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let labelIndex = 0;

// Initialize and add the map
function initMap() {
    // Location of Make School
    const make_school = {lat: 37.783, lng: -122.412};
    // Map centered on Make School
    const map = new google.maps.Map(
        document.querySelector('#map'), {zoom: 14, center: make_school})
    // Marker positioned on Make School
    const marker = new google.maps.Marker({position: make_school, map: map})
    // Calls addMarker function when map is clicked
    google.maps.event.addListener(map, 'click', (event) => {
        addMarker(event.latLng, map)
      })

    google.maps.event.addListener(map, 'click', (event) => {
        formSubmit()
    })
  }

function formSubmit() {
    const location_input = locationInput.value
    const time_input = timeInput.value
    const issue_input = issueInput.value

    const form_display = document.createElement('P')
    form_display.innerHTML = `Location: ${location_input}<br> Time: ${time_input}<br> Issue: ${issue_input}`
    document.querySelector('#reported-issues').appendChild(form_display)
}

// Adds a marker to the map.
function addMarker(location, map) {
    // Add the marker at the clicked location, and add the next-available label
    // from the array of alphabetical characters.
    new google.maps.Marker({
      position: location,
      label: labels[labelIndex++ % labels.length],
      map: map,
    })
  }