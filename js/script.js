"use strict"


//========BURGER MENU=====================================

document.addEventListener("DOMContentLoaded", () => {
	const iconMenu = document.querySelector(".icon-menu");
	const menuBody = document.querySelector(".menu__body");

	// Toggling the menu open/close when the icon is clicked
	iconMenu.addEventListener("click", () => {
		if (window.innerWidth <= 1150) {
			iconMenu.classList.toggle("active");
			document.body.classList.toggle("menu-open");

			if (document.body.classList.contains("menu-open")) {
				// Get the actual height of the menu
				const maxMenuHeight = Math.min(window.innerHeight * 0.8, menuBody.scrollHeight);
				menuBody.style.maxHeight = `${maxMenuHeight}px`;
			} else {
				// Set the menu height to 0 when it's closed
				menuBody.style.maxHeight = "0px";
			}
		}
	});

	// Close the menu when a link is clicked
	document.addEventListener("click", (e) => {
		const targetElement = e.target;
		if (targetElement.closest(".menu") && targetElement.tagName === "A") {
			if (window.innerWidth <= 1150) {
				document.body.classList.remove("menu-open");
				iconMenu.classList.remove("active");
				menuBody.style.maxHeight = "0px";
			}
		}

		// Close the menu if clicked outside of it
		if (!targetElement.closest(".icon-menu") && !targetElement.closest(".menu") && window.innerWidth <= 1150) {
			document.body.classList.remove("menu-open");
			iconMenu.classList.remove("active");
			menuBody.style.maxHeight = "0px";
		}
	});

	// Close the menu when resizing the window
	window.addEventListener("resize", () => {
		if (window.innerWidth > 1150) {
			document.body.classList.remove("menu-open");
			iconMenu.classList.remove("active");
			menuBody.style.maxHeight = "none";
		}
	});
});



//====================MOVE HEADER BUTTON TO BURGER MENU========================

document.addEventListener("DOMContentLoaded", function () {
	function moveElements() {
		const screenWidth = window.innerWidth;
		const elementsToMove = document.querySelectorAll("[data-da]");

		elementsToMove.forEach(function (element) {
			const data = element.getAttribute("data-da").split(",");
			if (data.length === 3) {
				const destinationSelector = data[0].trim();
				const order = parseInt(data[1].trim());
				const requiredScreenWidth = parseInt(data[2].trim());

				const destination = document.querySelector(destinationSelector);
				if (!destination) return;

				// Збереження початкового контейнера
				if (!element.dataset.originalParent) {
					const parent = element.parentNode;
					const index = Array.from(parent.children).indexOf(element);
					element.dataset.originalParent = parent.tagName.toLowerCase() + (parent.id ? `#${parent.id}` : '') + (parent.className ? `.${parent.className.replace(/\s+/g, '.')}` : '');
					element.dataset.originalIndex = index;
				}

				if (screenWidth <= requiredScreenWidth && !element.classList.contains("moved")) {
					// Переміщення в нове місце
					if (order === 1) {
						destination.insertBefore(element, destination.firstChild);
					} else {
						const previousElement = destination.children[order - 2];
						if (previousElement) {
							destination.insertBefore(element, previousElement.nextSibling);
						} else {
							destination.appendChild(element);
						}
					}
					element.classList.add("moved");
				} else if (screenWidth > requiredScreenWidth && element.classList.contains("moved")) {
					// Повернення на початкове місце
					const originalParentSelector = element.dataset.originalParent;
					const originalIndex = parseInt(element.dataset.originalIndex, 10);
					const originalParent = document.querySelector(originalParentSelector);

					if (originalParent) {
						const children = Array.from(originalParent.children);
						if (originalIndex < children.length) {
							originalParent.insertBefore(element, children[originalIndex]);
						} else {
							originalParent.appendChild(element);
						}
						element.classList.remove("moved");
					}
				}
			}
		});
	}

	moveElements();

	window.addEventListener("resize", function () {
		moveElements();
	});
});


//==============SCROLL TO TOP=============

window.onscroll = function () {
	const scrollBtn = document.getElementById("scrollToTopBtn");
	if (!scrollBtn) return;

	scrollBtn.classList.toggle("visible", window.scrollY > 100);
};

document.addEventListener("DOMContentLoaded", function () {
	const scrollBtn = document.getElementById("scrollToTopBtn");
	if (!scrollBtn) return;

	scrollBtn.onclick = function () {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	};
});


//=======================COUNTER====================

document.addEventListener('DOMContentLoaded', () => {
	const counters = document.querySelectorAll('.item-counter');

	if (!counters.length) return; // Exit if no counters are found

	// Function to animate numbers
	const animateCounter = (element) => {
		if (!element) return; // Ensure the element exists

		const target = +element.getAttribute('data-count');
		if (isNaN(target) || target <= 0) return; // Validate target number

		let count = 0;
		const increment = target / 100;

		const interval = setInterval(() => {
			count += increment;
			if (count >= target) {
				clearInterval(interval);
				count = target;
			}

			// Add "M" for numbers greater than 1 million
			if (target >= 1000000) {
				element.textContent = Math.floor(count / 1000000) + "M+";
			} else {
				element.textContent = Math.floor(count) + (element.textContent.includes('%') ? '%' : '+');
			}
		}, 10);
	};

	// Check element visibility using IntersectionObserver
	const observer = new IntersectionObserver((entries) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				const numberElement = entry.target.querySelector('.item-counter__number');
				if (numberElement && !numberElement.classList.contains('counted')) {
					animateCounter(numberElement);
					numberElement.classList.add('counted');
				}
				entry.target.classList.add('visible');
			}
		});
	}, {
		threshold: 0.5
	});

	// Observe each counter element
	counters.forEach(counter => observer.observe(counter));
});


//===============SWIPER==================
document.addEventListener('DOMContentLoaded', function () {
	const swiperContainer = document.querySelector('.reviews__swiper');
	if (swiperContainer) {
		const newSlider = new Swiper('.reviews__swiper', {
			slidesPerView: 1,
			spaceBetween: 20,
			loop: true,
			pagination: {
				el: '.swiper-pagination',
				clickable: true,
			},
			autoplay: {
				delay: 5000,
				disableOnInteraction: false,
			}
		});
	}
});

//==============FAQ===================

const faqItems = document.querySelectorAll('.faq__item');

if (faqItems.length > 0) {
	faqItems.forEach(item => {
		const header = item.querySelector('.item-faq__header');
		const answer = item.querySelector('.item-faq__answer');

		if (!header || !answer) return; // Перевіряємо, чи елементи існують

		header.addEventListener('click', () => {
			const isOpen = item.classList.toggle('open');

			if (isOpen) {
				answer.style.height = answer.scrollHeight + 'px';

				answer.addEventListener('transitionend', function onOpen() {
					answer.style.height = 'auto';
					answer.removeEventListener('transitionend', onOpen);
				});
			} else {
				answer.style.height = answer.scrollHeight + 'px';

				setTimeout(() => {
					answer.style.height = '0px';
				}, 10);
			}
		});

		const observer = new MutationObserver(() => {
			if (item.classList.contains('open')) {
				answer.style.height = answer.scrollHeight + 'px';
			}
		});

		observer.observe(answer, { childList: true, subtree: true });
	});
}


//======================POPUP=================

document.addEventListener("DOMContentLoaded", function () {
	const popup = document.getElementById("popup");
	const button = document.querySelector(".faq__button");
	const close = document.querySelector(".popup__close");
	const form = document.querySelector(".popup__form");
	const body = document.body;

	// Check if all required elements exist
	if (!popup || !button || !close || !form) return;

	button.addEventListener("click", function (e) {
		e.preventDefault();
		popup.classList.add("active");
		body.style.overflow = "hidden"; // Disable scrolling when popup is open
	});

	close.addEventListener("click", function () {
		popup.classList.remove("active");
		body.style.overflow = ""; // Enable scrolling when popup is closed
	});

	popup.addEventListener("click", function (e) {
		if (e.target === popup) {
			popup.classList.remove("active");
			body.style.overflow = ""; // Enable scrolling when clicking outside the popup
		}
	});

	// Form submission handling
	form.addEventListener("submit", function (e) {
		e.preventDefault();

		// Add actual form submission logic here

		alert("Message Sent!");

		// Clear the form after submission
		form.reset();

		// Close the popup after submission
		popup.classList.remove("active");
		body.style.overflow = "";
	});
});


//=======================VIDEO=========================
function togglePlayPause(video, playButton) {
	if (!video || !playButton) return; // Ensure both video and button exist

	if (video.paused) {
		// Play the video
		video.play().catch(error => {
			console.error('Play video failed:', error);
		});
		// Hide the play button when the video plays
		playButton.style.opacity = '0';
		playButton.style.pointerEvents = 'none';
	} else {
		// Pause the video
		video.pause();
		// Show the play button when the video pauses
		playButton.style.opacity = '1';
		playButton.style.pointerEvents = 'auto';
	}
}

// Handle click on the play button
document.addEventListener('click', function (event) {
	if (!isTouchDevice() && event.target.classList.contains('video__button')) {
		event.preventDefault(); // Prevent default click action
		let video = event.target.closest('.video').querySelector('video');
		let playButton = event.target;
		togglePlayPause(video, playButton);
	} else if (event.target.tagName === 'VIDEO') {
		// Handle clicking on the video itself
		let video = event.target;
		let playButton = video.closest('.video').querySelector('.video__button');
		togglePlayPause(video, playButton);
	} else {
		// Pause the video if click is outside of the video and play button
		let video = document.querySelector('.video video');
		let playButton = document.querySelector('.video__button');
		if (video && playButton && !video.contains(event.target) && !playButton.contains(event.target)) {
			video.pause();
			playButton.style.opacity = '1';
			playButton.style.pointerEvents = 'auto';
		}
	}
});

// Handle touchend event for touch devices
document.addEventListener('touchend', function (event) {
	if (event.target.tagName === 'VIDEO') {
		event.stopPropagation(); // Stop event propagation
		let video = event.target;
		let playButton = video.closest('.video').querySelector('.video__button');
		togglePlayPause(video, playButton);
	} else if (event.target.classList.contains('video__button')) {
		event.preventDefault(); // Prevent default touch behavior
		let video = event.target.closest('.video').querySelector('video');
		let playButton = event.target;
		togglePlayPause(video, playButton);
	} else {
		// Pause the video if touch is outside of the video and play button
		let video = document.querySelector('.video video');
		let playButton = document.querySelector('.video__button');
		if (video && playButton && !video.contains(event.target) && !playButton.contains(event.target)) {
			video.pause();
			playButton.style.opacity = '1';
			playButton.style.pointerEvents = 'auto';
		}
	}
});

// Detect if the device supports touch events
function isTouchDevice() {
	return 'ontouchstart' in window || navigator.maxTouchPoints;
}


//================================================================