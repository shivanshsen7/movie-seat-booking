// movie detail
const movie = document.getElementById("movie");
let movieIndex = movie.selectedIndex;
let ticketPrice = parseInt(movie.value);
// checkout summary
const count = document.getElementById("count");
const total = document.getElementById("total");
// theater and seat arrangements
const theater = document.querySelector(".theater");
const seats = document.querySelectorAll(".theater .seat:not(occupied)");
let seatSelectedCount;



const updateFromStorage = () => {
  const movieIndex = parseInt(localStorage.getItem("movieIndex"));
  const seatIndexes = JSON.parse(localStorage.getItem("seatIndexes"));

  if (movieIndex > -1) {
    movie.selectedIndex = parseInt(movieIndex);
    ticketPrice = parseInt(localStorage.getItem("ticketPrice"));
  }
  for (index of seatIndexes) {
    seats[index].classList.add("selected");
  }
  updateCheckOut();
}

const setStorage = () => {
  let selectedSeats = document.querySelectorAll(".theater .seat.selected");
  let selectedSeatIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));

  localStorage.setItem("movieIndex", movieIndex);
  localStorage.setItem("ticketPrice", ticketPrice);
  localStorage.setItem("seatIndexes", JSON.stringify(selectedSeatIndex));

}

const updateCheckOut = () => {
  seatSelectedCount = document.querySelectorAll(".theater .seat.selected").length;
  count.innerText = seatSelectedCount;
  total.innerText = ticketPrice * seatSelectedCount;
}

movie.addEventListener("change", (e) => {
  ticketPrice = parseInt(e.target.value);
  movieIndex = e.target.selectedIndex;
  updateCheckOut();
  setStorage();
})

theater.addEventListener("click", (e) => {
  const seat = e.target;
  if (!seat.classList.value.includes("occupied")) {
    seat.classList.toggle("selected")
    updateCheckOut();
    setStorage();
  }
})



window.addEventListener("load", () => { updateFromStorage() });
