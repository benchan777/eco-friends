// inputs
const locationInput = document.querySelector('#location-input')
const timeInput = document.querySelector('#time-input')
const issueInput = document.querySelector('#issue-input')
const issueSubmit = document.querySelector('#issue-submit')

const labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let labelIndex = 0;

const labels_form = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let labelIndexForm = 0;

// Initialize and add the map
function initMap() {
    // Sets default location
    const default_location = {lat: 37.783, lng: -122.412};
    // Centers map on default location
    const map = new google.maps.Map(
        document.querySelector('#map'), {zoom: 14, center: default_location})
    // Positions marker over default location
    const marker = new google.maps.Marker({position: default_location, map: map})
    // Calls addMarker function when map is clicked
    google.maps.event.addListener(map, 'click', (event) => {
        addMarker(event.latLng, map)
      })
  }

// Adds a marker to the map and records form data to Reported Issues box
function addMarker(location, map) {
    // Add the marker at the clicked location, and add the next-available label
    // from the array of alphabetical characters.
    new google.maps.Marker({
      position: location,
      label: labels[labelIndex++ % labels.length],
      map: map,
    })

    const location_input = locationInput.value
    const time_input = timeInput.value
    const issue_input = issueInput.value
    const map_label = labels_form[labelIndexForm++ % labels_form.length]

    const form_display = document.createElement('P')
    form_display.innerHTML = `Marker: ${map_label}<br> Location: ${location_input}<br> Time: ${time_input}<br> Issue: ${issue_input}`
    document.querySelector('#reported-issues').appendChild(form_display)
}