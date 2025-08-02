// post.js
window.onload = function() {
  const currentUser = localStorage.getItem("currentUser");
  if (!currentUser) {
    alert("You have to sign in to add a new book and review.");
    window.location.href = "login.html";
    return;
  }

  const bookForm = document.getElementById("bookForm");
  const reviewForm = document.getElementById("reviewForm");

  bookForm.addEventListener("submit", function(e) {
    e.preventDefault();
    const title = document.getElementById("bookTitle").value.trim();
    const author = document.getElementById("bookAuthor").value.trim();
    const genre = document.getElementById("bookGenre").value.trim();

    if (!title || !author || !genre) {
      alert("Please, add book's name, auth and genre.");
      return;
    }

    let books = JSON.parse(localStorage.getItem("books")) || [];
    books.unshift({ title, author, genre });
    localStorage.setItem("books", JSON.stringify(books));

    alert("Book added successfully.!");
    bookForm.reset();
  });

  reviewForm.addEventListener("submit", function(e) {
    e.preventDefault();
    const title = document.getElementById("reviewTitle").value.trim();
    const content = document.getElementById("reviewContent").value.trim();

    if (!title || !content) {
      alert("Please enter a title and review.");
      return;
    }

    let reviews = JSON.parse(localStorage.getItem("bookReviews")) || [];
    reviews.unshift({ title, content });
    localStorage.setItem("bookReviews", JSON.stringify(reviews));

    alert("Review added succesfully!");
    reviewForm.reset();
  });
};