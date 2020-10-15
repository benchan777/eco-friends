// inputs
const locationInput = document.querySelector('#location-input')
const issueInput = document.querySelector('#issue-input')
const issueSubmit = document.querySelector('#issue-submit')

// Map pin markers
const labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
let labelIndex = 0

// Corresponding form input markers
const labels_form = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
let labelIndexForm = 0

let inputIndex = 0
let markers = []

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
    const marker = new google.maps.Marker({
      position: location,
      label: labels[labelIndex++ % labels.length],
      map: map,
    })
    markers.push(marker)

    const location_input = locationInput.value
    const issue_input = issueInput.value
    const map_label = labels_form[labelIndexForm++ % labels_form.length]

    // Get current time and convert from 24 hours to AM/PM
    const date = new Date()
    const hours = date.getHours()
    const minutes = date.getMinutes()
    const seconds = date.getSeconds()
    let hours_format = "AM"
    let hours_non_military = hours
    let time = `${hours_non_military}:${minutes}:${seconds} ${hours_format}`
    if(hours > 12) {
      hours_non_military = hours - 12
      hours_format = 'PM'
      time = `${hours_non_military}:${minutes}:${seconds} ${hours_format}`
    }
    if(hours == 12) {
      hours_format = 'PM'
      time = `${hours_non_military}:${minutes}:${seconds} ${hours_format}`
    }
    if(hours == 0) {
      hours_non_military = 12
      time = `${hours_non_military}:${minutes}:${seconds} ${hours_format}`
    }

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    const date_1 = date.getDate()
    const month = months[date.getMonth()]
    const year = date.getFullYear()
    let date_now = `${date_1} ${month} ${year}`
    console.log(date_now)

    // Creates new paragraph for form input and assigns id
    const form_display = document.createElement('p')
    form_display.id = `input${inputIndex}`
    // Creates new button and assigns id and class
    const delete_button = document.createElement('button')
    delete_button.id = `input${inputIndex}`
    delete_button.className = '.remove-button'

    // Displays form input data in html page
    form_display.innerHTML = `Marker: ${map_label}<br> Location: ${location_input}<br> Time: ${time}<br> Issue: ${issue_input}`
    document.querySelector('#reported-issues').appendChild(form_display)
    // Adds a name to the created button
    delete_button.innerHTML = `Remove`
    document.querySelector('#reported-issues').appendChild(delete_button)

    // Displays form input data in feeds page
    const feed_update_display = document.createElement('P')
    feed_update_display.innerHTML = `${time}: A new issue has been reported in ${location_input}!`
    document.querySelector('#feed-updates').appendChild(feed_update_display)

    // Increments form_display and delete_button id by 1
    inputIndex++
}

document.querySelector('body').addEventListener('click', function(event) {
	// event.target is the clicked item
	if (!event.target) { 
    return
  }
  // Check if the event.target is a remove button
	if (event.target.className == '.remove-button') {
    // Retrives id of the clicked button
    const buttonId = event.target.closest('button').id
    // Removes button and corresponding paragraph that contains input data
    document.querySelector(`#${buttonId}`).remove()
    document.querySelector(`#${buttonId}`).remove()
    // Removes map marker
    markers[parseInt(buttonId.replace('input', ''))].setMap(null)
    console.log(getMonth())
  }
})