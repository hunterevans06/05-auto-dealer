// grab the spot on the page where the review cards will go
const reviewGrid = document.getElementById("reviewGrid");

// build a string of filled and empty stars for a given rating
function buildStars(rating) {
    // round down so a rating like 4.5 shows four stars (keeping it simple for now)
    const filled = Math.floor(rating);
    const empty = 5 - filled;
    let stars = "";

    // add the solid stars first
    for (let i = 0; i < filled; i++) {
        stars += "\u2605";
    }

    // then add the empty stars wrapped in a span so CSS can style them different
    if (empty > 0) {
        stars += '<span class="empty">';
        for (let i = 0; i < empty; i++) {
            stars += "\u2606";
        }
        stars += "</span>";
    }
    return stars;
}

// make one review card element from a single review object
function buildReviewCard(review) {
    const card = document.createElement("article");
    card.className = "review-card";

    // customer name line
    const name = document.createElement("p");
    name.className = "review-name";
    name.textContent = review.name;

    // star rating line, aria-label so screen readers read the number instead of the symbol
    const stars = document.createElement("p");
    stars.className = "review-stars";
    stars.setAttribute("aria-label", review.rating + " out of 5 stars");
    stars.innerHTML = buildStars(review.rating);

    // the actual customer comment
    const comment = document.createElement("p");
    comment.className = "review-comment";
    comment.textContent = "\u201C" + review.comment + "\u201D";

    card.appendChild(name);
    card.appendChild(stars);
    card.appendChild(comment);
    return card;
}

// load the JSON file using fetch then drop the cards into the grid
fetch("data/reviews.json")
    .then(function (response) {
        // if the file did not load for some reason, throw so the catch can show a message
        if (!response.ok) {
            throw new Error("Could not load reviews.json");
        }
        return response.json();
    })
    .then(function (data) {
        // clear out the "loading" message before we add the real cards
        reviewGrid.innerHTML = "";

        // only show the first six reviews so the page does not get too long
        const toShow = data.reviews.slice(0, 6);
        for (let i = 0; i < toShow.length; i++) {
            reviewGrid.appendChild(buildReviewCard(toShow[i]));
        }
    })
    .catch(function (err) {
        // if the fetch fails just show a simple message, do not break the whole page
        reviewGrid.innerHTML = '<p class="review-loading">Reviews could not be loaded right now.</p>';
        console.log(err);
    });
