// Get the menu button and navigation bar
const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");

// Get all navigation links
const links = [...document.querySelectorAll("#nav a")];

// Function to close the mobile menu
function closeMenu() {
    if (!menuBtn || !nav) return;

    nav.classList.remove("open");
    menuBtn.setAttribute("aria-expanded", "false");
    menuBtn.setAttribute("aria-label", "Open menu");
    menuBtn.textContent = "☰";
}

// Open and close the mobile navigation menu
if (menuBtn && nav) {
    menuBtn.addEventListener("click", () => {
        const open = nav.classList.toggle("open");

        menuBtn.setAttribute("aria-expanded", String(open));
        menuBtn.setAttribute(
            "aria-label",
            open ? "Close menu" : "Open menu"
        );

        menuBtn.textContent = open ? "✕" : "☰";
    });

    // Close the menu after clicking a navigation link
    links.forEach(link => {
        link.addEventListener("click", closeMenu);
    });

    // Close the mobile menu when the screen becomes wider
    window.addEventListener("resize", () => {
        if (window.innerWidth > 850) {
            closeMenu();
        }
    });
}

// Highlight the navigation link for the current section
const sections = [...document.querySelectorAll("main section[id]")];

if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;

            links.forEach(link => {
                const active =
                    link.getAttribute("href") === "#" + entry.target.id;

                link.classList.toggle("active", active);

                if (active) {
                    link.setAttribute("aria-current", "location");
                } else {
                    link.removeAttribute("aria-current");
                }
            });
        });
    }, {
        rootMargin: "-25% 0px -60% 0px"
    });

    sections.forEach(section => {
        observer.observe(section);
    });
}