document.addEventListener("DOMContentLoaded", function() {
  // Get reference to the films list
  const filmList = document.getElementById("films");

  // Function to populate the film list with data fetched from the server
  function populateFilmList() {
    // Fetch movie data from the server
    fetch("http://localhost:3000/films")
      .then(response => response.json())
      .then(data => {
        // Iterate over each movie and create list items for them
        data.forEach(movie => {
          // Create list item element
          const listItem = document.createElement("li");
          // Set text content to movie title
          listItem.textContent = movie.title;
          // Add appropriate classes to the list item
          listItem.classList.add("film", "item");

          // Check if the movie is sold out and update the list item accordingly
          if (movie.tickets_sold === movie.capacity) {
            listItem.classList.add("sold-out");
          }

          // Add event listener to display movie details when clicked
          listItem.addEventListener("click", function() {
            displayMovieDetails(movie);
          });

          // Append the list item to the film list
          filmList.appendChild(listItem);
        });
      })
      .catch(error => console.error(error));
  }

  // Function to display movie details when a movie is clicked
  function displayMovieDetails(movie) {
    // Get references to elements to update with movie details
    const poster = document.getElementById("poster");
    const description = document.getElementById("film-info");
    const title = document.getElementById("title");
    const runtime = document.getElementById("runtime");
    const showtime = document.getElementById("showtime");

    // Update the displayed movie details
    poster.src = movie.poster;
    description.textContent = movie.description;
    title.textContent = movie.title;
    runtime.textContent = movie.runtime + " minutes";
    showtime.textContent = movie.showtime;
  }

  // Event listener to handle buying tickets
  filmList.addEventListener("click", function(event) {
    if (event.target && event.target.matches("li.film.item")) {
      const movieId = event.target.dataset.id;
      // Call the buyTicket function passing the movieId
      buyTicket(movieId);
    }
  });

  // Remove the placeholder li element if exists
  const placeholderLi = document.getElementById("placeholder");
  if (placeholderLi) {
    placeholderLi.remove();
  }

  // Populate the film list on page load
  populateFilmList();
});
