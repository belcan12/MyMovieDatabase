

export function renderTrailers(movie, num) {
    const iFrameRef = document.createElement('iframe');
    iFrameRef.classList.add(`trailers__video`, `trailers__video-${num}`);
    
    // Använd trailer-länken från datan, annars fallback
    const trailerUrl = movie.Trailer_link || "https://www.youtube.com/embed/defaultTrailer";
    iFrameRef.src = trailerUrl;
    
    // Hitta container-elementet för trailers
    const container = document.querySelector('.trailers__container');
    if (container) {
      container.appendChild(iFrameRef);
    } else {
      console.error("Elementet med klassen 'trailers__container' hittades inte.");
    }
  
    const trailerList = document.querySelectorAll('.trailers__video');
    const trailerArray = Array.from(trailerList);
    
    // Lägg till event listeners för pilknapparna
    document.querySelectorAll('.trailers__arrow').forEach(arrow => {
      arrow.addEventListener('click', (event) => {
        changeTrailer(event, trailerList, trailerArray);
      });
    });
  }
  
  function changeTrailer(event, trailerList, trailerArray) {
    if (event.target.dataset.direction === 'right') {
      trailerArray.push(trailerArray.shift());
    } else if (event.target.dataset.direction === 'left') {
      trailerArray.unshift(trailerArray.pop());
    }
  
    trailerList.forEach(item => {
      item.classList.remove(
        'trailers__video-1',
        'trailers__video-2',
        'trailers__video-3',
        'trailers__video-4',
        'trailers__video-5'
      );
    });
  
    trailerArray.slice(0, 5).forEach((item, i) => {
      item.classList.add(`trailers__video-${i + 1}`);
    });
  }
  