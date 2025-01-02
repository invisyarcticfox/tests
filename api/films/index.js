const apiKey = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzZjdkYzI4NjRlMWMzNjAyMGYzZGM2MTg5NjA5ZmU0ZSIsIm5iZiI6MTY5OTQwMDIxMy45ODEsInN1YiI6IjY1NGFjYTE1NjdiNjEzMDBlNWRjMWY4OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.2yuLSSfrYIfSRZZRCIsUC3v9Rw5o19UuyRtBz_UUhIE'; // Replace with your TMDB API key

// URL of the external JSON
const jsonUrl = 'https://api.invisyarcticfox.uk/films'; // Replace with the actual URL

// Function to fetch the external JSON
async function fetchRecentlyLiked() {
  try {
    const response = await fetch(jsonUrl);
    const data = await response.json();
    return data.recentlyliked;
  } catch (error) {
    console.error("Error fetching recently liked films:", error);
    return [];
  }
}

// Function to fetch the external JSON
async function fetchRecentlyWatched() {
  try {
    const response = await fetch(jsonUrl);
    const data = await response.json();
    return data.recentlywatched;
  } catch (error) {
    console.error("Error fetching recently watched films:", error);
    return [];
  }
}

// Function to fetch poster URL from TMDB
async function fetchPosterUrl(title, year) {
  const url = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(title)}&year=${year}`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json;charset=utf-8'
      }
    });

    const data = await response.json();

    if (data.results && data.results.length > 0) {
      const posterPath = data.results[0].poster_path;
      return posterPath ? `https://image.tmdb.org/t/p/w500${posterPath}` : null;
    }

    return null; // No poster found
  } catch (error) {
    console.error("Error fetching data from TMDB:", error);
    return null;
  }
}

// Function to display the posters in HTML
async function displayLikedPosters() {
  const container = document.querySelector('.recentlyliked');

  // Fetch recently liked films
  const likedfilms = await fetchRecentlyLiked();

  // Iterate over recently liked films
  likedfilms.forEach(async (film) => {
    const posterUrl = await fetchPosterUrl(film.title, film.releaseYear);

    // Create a div to display the film's poster and details
    const filmDiv = document.createElement('div');
    filmDiv.style.margin = '20px';
    filmDiv.style.display = 'inline-block';
    filmDiv.style.textAlign = 'center';

    // Add poster image if available
    if (posterUrl) {
      const img = document.createElement('img');
      img.src = posterUrl;
      img.alt = film.title;
      img.style.width = '200px';
      img.style.height = 'auto';
      filmDiv.appendChild(img);
    }

    // Add film title and year
    const title = document.createElement('p');
    title.textContent = `${film.title} (${film.releaseYear})`;
    filmDiv.appendChild(title);

    // Append to the container
    container.appendChild(filmDiv);
  });
}

// Function to display the posters in HTML
async function displayWatchedPosters() {
  const container = document.querySelector('.recentlywatched');

  // Fetch recently watched films
  const watchedfilms = await fetchRecentlyWatched();

  // Iterate over recently watched films
  watchedfilms.forEach(async (film) => {
    const posterUrl = await fetchPosterUrl(film.title, film.releaseYear);

    // Create a div to display the film's poster and details
    const filmDiv = document.createElement('div');
    filmDiv.style.margin = '20px';
    filmDiv.style.display = 'inline-block';
    filmDiv.style.textAlign = 'center';

    // Add poster image if available
    if (posterUrl) {
      const img = document.createElement('img');
      img.src = posterUrl;
      img.alt = film.title;
      img.style.width = '200px';
      img.style.height = 'auto';
      filmDiv.appendChild(img);
    }

    // Add film title and year
    const title = document.createElement('p');
    title.textContent = `${film.title} (${film.releaseYear})`;
    filmDiv.appendChild(title);

    // Append to the container
    container.appendChild(filmDiv);
  });
}

// Run the displayPosters function
displayLikedPosters();
displayWatchedPosters();