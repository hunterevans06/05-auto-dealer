// grab the hamburger button and the nav list from the page
const navToggle = document.getElementById("navToggle");
const navList = document.getElementById("navList");

// when the user clicks the hamburger, open or close the menu
navToggle.addEventListener("click", function () {
    // check if the menu is open right now
    const isOpen = navList.classList.contains("show");

    // flip the classes on the button and the list so the CSS can update
    navList.classList.toggle("show");
    navToggle.classList.toggle("open");

    // update aria-expanded so screen readers know the menu state
    navToggle.setAttribute("aria-expanded", String(!isOpen));
});

// if the user clicks a nav link, close the menu again (only matters on small/medium)
const navLinks = navList.querySelectorAll("a");
for (let i = 0; i < navLinks.length; i++) {
    navLinks[i].addEventListener("click", function () {
        // only close the menu if it is currently showing
        if (navList.classList.contains("show")) {
            navList.classList.remove("show");
            navToggle.classList.remove("open");
            navToggle.setAttribute("aria-expanded", "false");
        }
    });
}
