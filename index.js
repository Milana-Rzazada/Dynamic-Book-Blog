

window.onload = function() {
  loadBooks();
  loadReviews();
  setupAuthLinks();
};

function loadBooks() {
  const books = JSON.parse(localStorage.getItem("books")) || [];
  const bookList = document.getElementById("bookList");
  bookList.innerHTML = "";

  if (books.length === 0) {
    bookList.innerHTML = "<tr><td colspan='3'>No books have been added.</td></tr>";
    return;
  }

  books.forEach(book => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td data-label="Name">${escapeHTML(book.title)}</td>
      <td data-label="Auth">${escapeHTML(book.author)}</td>
      <td data-label="Genre">${escapeHTML(book.genre)}</td>
    `;
    bookList.appendChild(tr);
  });
}

function loadReviews() {
  const reviews = JSON.parse(localStorage.getItem("bookReviews")) || [];
  const reviewsContainer = document.getElementById("reviewsContainer");
  reviewsContainer.innerHTML = "";

  if (reviews.length === 0) {
    reviewsContainer.innerHTML = "<p>No review has been added.</p>";
    return;
  }

  reviews.forEach(review => {
    const div = document.createElement("div");
    div.className = "post";
    div.innerHTML = `
      <h3>${escapeHTML(review.title)}</h3>
      <p>${escapeHTML(review.content)}</p>
    `;
    reviewsContainer.appendChild(div);
  });
}

// Siple HTML tags delete
function escapeHTML(str) {
  return str.replace(/[&<>"']/g, function(m) {
    return ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    })[m];
  });
}

// Login/register controll
document.addEventListener("DOMContentLoaded", () => {
  const currentUser = localStorage.getItem("currentUser");
  const loginLink = document.getElementById("loginLink");
  const logoutBtn = document.getElementById("logoutBtn");

  if (currentUser) {
    if (loginLink) loginLink.style.display = "none";
    if (logoutBtn) logoutBtn.style.display = "inline-block";
  }

  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("currentUser");
      window.location.href = "login.html"; 
    });
  }
});

const slides = document.querySelectorAll('.slide');
const prev = document.querySelector('.prev');
const next = document.querySelector('.next');

let currentSlide = 0;

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.remove('active');
    if (i === index) slide.classList.add('active');
  });
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}

function prevSlide() {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  showSlide(currentSlide);
}

next.addEventListener('click', nextSlide);
prev.addEventListener('click', prevSlide);


setInterval(nextSlide, 5000);
