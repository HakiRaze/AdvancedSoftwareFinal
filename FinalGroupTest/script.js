const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const urlParams = new URLSearchParams(window.location.search);
const movieName = urlParams.get('movie');
const moviePrice = parseFloat(urlParams.get('price'));

let ticketPrice = moviePrice || 10; //default price

// Save selected movie data
function setMovieData(movieName, moviePrice) {
    localStorage.setItem('selectedMovieName', movieName);
    localStorage.setItem('selectedMoviePrice', moviePrice);
}

// Update total and count
function updateSelectedCount() {
    const selectedSeats = document.querySelectorAll('.row .seat.selected');
    const selectedSeatsCount = selectedSeats.length;

    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount * ticketPrice;
}

updateSelectedCount();

// Seat click event
container.addEventListener('click', (e) => {
    if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
        e.target.classList.toggle('selected');
        updateSelectedCount();
    }
});

function populateUI() {
    const selectedMovieName = localStorage.getItem('selectedMovieName');
    const selectedMoviePrice = parseFloat(localStorage.getItem('selectedMoviePrice'));

    if (selectedMovieName && selectedMoviePrice) {
        document.querySelector('select#movie option[value="' + selectedMoviePrice + '"]').selected = true;
        ticketPrice = selectedMoviePrice;
    }
}

populateUI();

const openTicketFormButton = document.getElementById('openTicketForm');
  const ticketOverlay = document.getElementById('ticketOverlay');

openTicketFormButton.addEventListener('click', () => {
  ticketOverlay.style.display = 'block';
});

function updateTicketInfo() {
  const selectedDate = document.getElementById('date').value;
  const selectedTime = document.getElementById('date').options[document.getElementById('date').selectedIndex].text;
  const selectedSeatsCount = parseInt(count.innerText);
  const totalPrice = selectedSeatsCount * ticketPrice;

  const movieTitle = document.querySelector('.movie-title');
  const priceCell = document.querySelector('.info table tr:nth-child(2) td:first-child');
  const dateCell = document.querySelector('.info table tr:nth-child(2) td:nth-child(2)');
  const timeCell = document.querySelector('.info table tr:nth-child(2) td:nth-child(3)');

  movieTitle.innerText = "Movie: " + movieName;
  priceCell.innerText = "$" + totalPrice;
  dateCell.innerText = selectedDate;
  timeCell.innerText = selectedTime;
}

// Event listener for "Create Ticket" button
openTicketFormButton.addEventListener('click', () => {
  updateTicketInfo(); 
  ticketOverlay.style.display = 'block';
});
