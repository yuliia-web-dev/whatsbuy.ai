"use strict"


// //========BURGER MENU=====================================

// document.addEventListener("DOMContentLoaded", () => {
// 	const iconMenu = document.querySelector(".icon-menu");
// 	const menuBody = document.querySelector(".menu__body");

// 	// Toggling the menu open/close when the icon is clicked
// 	iconMenu.addEventListener("click", () => {
// 		if (window.innerWidth <= 1150) {
// 			iconMenu.classList.toggle("active");
// 			document.body.classList.toggle("menu-open");

// 			if (document.body.classList.contains("menu-open")) {
// 				// Get the actual height of the menu
// 				const maxMenuHeight = Math.min(window.innerHeight * 0.8, menuBody.scrollHeight);
// 				menuBody.style.maxHeight = `${maxMenuHeight}px`;
// 			} else {
// 				// Set the menu height to 0 when it's closed
// 				menuBody.style.maxHeight = "0px";
// 			}
// 		}
// 	});

// 	// Close the menu when a link is clicked
// 	document.addEventListener("click", (e) => {
// 		const targetElement = e.target;
// 		if (targetElement.closest(".menu") && targetElement.tagName === "A") {
// 			if (window.innerWidth <= 1150) {
// 				document.body.classList.remove("menu-open");
// 				iconMenu.classList.remove("active");
// 				menuBody.style.maxHeight = "0px";
// 			}
// 		}

// 		// Close the menu if clicked outside of it
// 		if (!targetElement.closest(".icon-menu") && !targetElement.closest(".menu") && window.innerWidth <= 1150) {
// 			document.body.classList.remove("menu-open");
// 			iconMenu.classList.remove("active");
// 			menuBody.style.maxHeight = "0px";
// 		}
// 	});

// 	// Close the menu when resizing the window
// 	window.addEventListener("resize", () => {
// 		if (window.innerWidth > 1150) {
// 			document.body.classList.remove("menu-open");
// 			iconMenu.classList.remove("active");
// 			menuBody.style.maxHeight = "none";
// 		}
// 	});
// });


//==================HERO ANIMATION=====================

const words = ["Simple", "Fast", "Organized"];
let index = 0;
const changingWord = document.querySelector(".changing-word");

if (changingWord) {
	function animateText(newWord) {
		const letters = newWord.split("").map((char, i) =>
			`<span class="letter" style="animation-delay: ${i * 0.1}s">${char}</span>`
		).join("");

		changingWord.innerHTML = letters;
	}

	function changeWord() {
		index = (index + 1) % words.length;
		changingWord.classList.add("fade-out");

		setTimeout(() => {
			changingWord.textContent = words[index];
			animateText(words[index]);
			changingWord.classList.remove("fade-out");
		}, 500);
	}

	animateText(words[index]);
	setInterval(changeWord, 3000);
}


