
  
    window.onload = function () {
      const currentUser = localStorage.getItem("currentUser");
      if (!currentUser) {
        alert("Please log in first to access this page.");
        window.location.href = "login.html";
        return;
      }

      document.getElementById("authLink").style.display = "none";

      // add book and reviews
      loadBooks();
      loadReviews();
    };

    function loadBooks() {
      const books = JSON.parse(localStorage.getItem("books")) || [];
      const container = document.getElementById("booksContainer");
      container.innerHTML = "";

      books.forEach((book, index) => {
        const div = document.createElement("div");
        div.className = "edit-section";
        div.innerHTML = `
          <input type="text" value="${book.title}" id="book-title-${index}" />
          <input type="text" value="${book.author}" id="book-author-${index}" />
          <input type="text" value="${book.genre}" id="book-genre-${index}" />
          <button onclick="saveBook(${index})">Update</button>
          <button onclick="deleteBook(${index})" style="background-color:#b33;">Delete</button>
        `;
        container.appendChild(div);
      });
    }

    function loadReviews() {
      const reviews = JSON.parse(localStorage.getItem("bookReviews")) || [];
      const container = document.getElementById("reviewsContainer");
      container.innerHTML = "";

      reviews.forEach((review, index) => {
        const div = document.createElement("div");
        div.className = "edit-section";
        div.innerHTML = `
          <input type="text" value="${review.title}" id="review-title-${index}" />
          <textarea id="review-content-${index}">${review.content}</textarea>
          <button onclick="saveReview(${index})">Update</button>
          <button onclick="deleteReview(${index})" style="background-color:#b33;">Delete</button>
        `;
        container.appendChild(div);
      });
    }

    function saveBook(index) {
      const title = document.getElementById(`book-title-${index}`).value.trim();
      const author = document.getElementById(`book-author-${index}`).value.trim();
      const genre = document.getElementById(`book-genre-${index}`).value.trim();

      if (!title || !author || !genre) {
        alert("The book title, author, and genre cannot be empty!");
        return;
      }

      const books = JSON.parse(localStorage.getItem("books")) || [];
      books[index] = { title, author, genre };
      localStorage.setItem("books", JSON.stringify(books));
      alert("The book has been updated!");
    }

    function deleteBook(index) {
      if (!confirm("Are you sure you want to delete the book?")) return;

      const books = JSON.parse(localStorage.getItem("books")) || [];
      books.splice(index, 1);
      localStorage.setItem("books", JSON.stringify(books));
      loadBooks();
    }

    function saveReview(index) {
      const title = document.getElementById(`review-title-${index}`).value.trim();
      const content = document.getElementById(`review-content-${index}`).value.trim();

      if (!title || !content) {
        alert("The title and content of the review cannot be empty!");
        return;
      }

      const reviews = JSON.parse(localStorage.getItem("bookReviews")) || [];
      reviews[index] = { title, content };
      localStorage.setItem("bookReviews", JSON.stringify(reviews));
      alert("The review has been updated!");
    }

    function deleteReview(index) {
      if (!confirm("Are you sure you want to delete the review?")) return;

      const reviews = JSON.parse(localStorage.getItem("bookReviews")) || [];
      reviews.splice(index, 1);
      localStorage.setItem("bookReviews", JSON.stringify(reviews));
      loadReviews();
    }
  