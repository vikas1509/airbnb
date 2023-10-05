window.addEventListener("DOMContentLoaded", (event) => {
  // Your code goes here
 
//   let map;
  function initMap() {
    let  map = new google.maps.Map(document.getElementById("map"), {
          center: { lat: -34.397, lng: 150.644 }, // Set your default center here
          zoom: 8
      });
  }
  const script = document.createElement("script");
script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBWQzOCpyReHQqtjYihbhj-CnCO-x3ahOQ&callback=initMap`;
script.async = true;
document.head.appendChild(script);
  function createListingCard(listing) {
   
    const listingCard = document.createElement("div");
    listingCard.classList.add("listing-card");

    listingCard.innerHTML = `
            <img src="${listing.images[0]}" alt="${listing.name}">
            <div class="listing-info">
                <h3>${listing.name}</h3>
                <span>${listing.type} · ${listing.beds} beds · ${listing.bathrooms} bathrooms</span>
                <p>${listing.price.rate} per night</p>
                <p>${listing.address}</p>
                <p>Amenities: ${listing.previewAmenities}</p>
            </div>
        `;

    return listingCard;
  }


  const searchButton = document.getElementById("search-button");

  searchButton.addEventListener("click", () => {
    document.getElementById("main-cont").style.display="grid";
    const searchLocation = document.getElementById("search-location").value;
    const checkin = document.getElementById("check-in").value;
    const checkout = document.getElementById("check-out").value;
    const guest = document.getElementById("guest").value;
    console.log(searchLocation,checkin,checkout,guest)
    const apiKey = "2215635a2dmsh0a862626c4f6b7fp1f5871jsn8142ecb9feba"; // Replace with your Rapid API key
    fetch(
      `https://airbnb13.p.rapidapi.com/search-location?location=${searchLocation}&checkin=${checkin}&checkout=${checkout}&adults=${guest}&children=0&infants=0&pets=0&page=1&currency=USD`,
      {
        method: "GET",
        headers: {
          "X-RapidAPI-Key": apiKey,
          // Add any other headers or authentication tokens as required
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const listingsContainer = document.getElementById("listings-container");

        // Clear previous listings
        listingsContainer.innerHTML = "";

        // Append new listings
        data.results.forEach((listing) => {
           
          const listingCard = createListingCard(listing);
          listingsContainer.appendChild(listingCard);
          new google.maps.Marker({
            position: { lat: parseFloat(listing.lat), lng: parseFloat(listing.lng) },
            map: map,
            title: listing.name,
          });
        });
      })
      .catch((error) => console.error("Error:", error));
  });
 
});