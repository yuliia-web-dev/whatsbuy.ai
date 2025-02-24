"use strict"
document.addEventListener("DOMContentLoaded", () => {
	const iconMenu = document.querySelector(".icon-menu");
	const menuBody = document.querySelector(".menu__body");

	iconMenu.addEventListener("click", () => {
		if (window.innerWidth <= 1150) {
			iconMenu.classList.toggle("active");
			document.body.classList.toggle("menu-open");

			if (document.body.classList.contains("menu-open")) {
				// Отримуємо реальну висоту меню
				const maxMenuHeight = Math.min(window.innerHeight * 0.8, menuBody.scrollHeight);
				menuBody.style.maxHeight = `${maxMenuHeight}px`;
			} else {
				menuBody.style.maxHeight = "0px";
			}
		}
	});

	// Закриваємо меню при кліку на посилання
	document.addEventListener("click", (e) => {
		const targetElement = e.target;
		if (targetElement.closest(".menu") && targetElement.tagName === "A") {
			if (window.innerWidth <= 1150) {
				document.body.classList.remove("menu-open");
				iconMenu.classList.remove("active");
				menuBody.style.maxHeight = "0px";
			}
		}

		// Закриваємо меню, якщо клік поза ним
		if (!targetElement.closest(".icon-menu") && !targetElement.closest(".menu") && window.innerWidth <= 1150) {
			document.body.classList.remove("menu-open");
			iconMenu.classList.remove("active");
			menuBody.style.maxHeight = "0px";
		}
	});

	// Закриваємо меню при зміні розміру екрану
	window.addEventListener("resize", () => {
		if (window.innerWidth > 1150) {
			document.body.classList.remove("menu-open");
			iconMenu.classList.remove("active");
			menuBody.style.maxHeight = "none";
		}
	});
});




//========================================

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


//===========================

window.onscroll = function () { scrollFunction() };

function scrollFunction() {
	if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
		document.getElementById("scrollToTopBtn").classList.add("visible");
	} else {
		document.getElementById("scrollToTopBtn").classList.remove("visible");
	}
}

document.getElementById("scrollToTopBtn").onclick = function () { topFunction() };

function topFunction() {
	window.scrollTo({ top: 0, behavior: 'smooth' });
}


//=================================================

document.addEventListener('DOMContentLoaded', () => {
	const counters = document.querySelectorAll('.item-counter');

	// Функція для анімації чисел
	const animateCounter = (element) => {
		const target = +element.getAttribute('data-count');
		let count = 0;
		const increment = target / 100;

		const interval = setInterval(() => {
			count += increment;
			if (count >= target) {
				clearInterval(interval);
				count = target;
			}

			// Додавання "M" для чисел більше 1 мільйона
			if (target >= 1000000) {
				element.textContent = Math.floor(count / 1000000) + "M+";
			} else {
				element.textContent = Math.floor(count) + (element.textContent.includes('%') ? '%' : '+');
			}
		}, 10);
	};

	// Перевірка видимості елемента за допомогою IntersectionObserver
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

	counters.forEach(counter => {
		observer.observe(counter);
	});
});


//===============swiper==================
document.addEventListener('DOMContentLoaded', function () {
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
});


//==============FAQ===================

document.querySelectorAll('.faq__item').forEach(item => {
	const header = item.querySelector('.item-faq__header');
	const answer = item.querySelector('.item-faq__answer');

	header.addEventListener('click', () => {
		const isOpen = item.classList.toggle('open');

		if (isOpen) {
			answer.style.height = answer.scrollHeight + 'px';

			// Додаємо обробник, щоб потім поставити height: auto для адаптації
			answer.addEventListener('transitionend', function onOpen() {
				answer.style.height = 'auto';
				answer.removeEventListener('transitionend', onOpen);
			});
		} else {
			// Перед закриттям фіксуємо поточну висоту, щоб уникнути різкого стрибка
			answer.style.height = answer.scrollHeight + 'px';

			setTimeout(() => {
				answer.style.height = '0px';
			}, 10);
		}
	});

	// Додаємо MutationObserver для відстеження змін у відповіді
	const observer = new MutationObserver(() => {
		if (item.classList.contains('open')) {
			answer.style.height = answer.scrollHeight + 'px';
		}
	});

	observer.observe(answer, { childList: true, subtree: true });
});


//======================POPUP=================

document.addEventListener("DOMContentLoaded", function () {
	const popup = document.getElementById("popup");
	const button = document.querySelector(".faq__button");
	const close = document.querySelector(".popup__close");
	const form = document.querySelector(".popup__form");

	button.addEventListener("click", function (e) {
		e.preventDefault();
		popup.classList.add("active");
	});

	close.addEventListener("click", function () {
		popup.classList.remove("active");
	});

	popup.addEventListener("click", function (e) {
		if (e.target === popup) {
			popup.classList.remove("active");
		}
	});

	// Відправка форми
	form.addEventListener("submit", function (e) {
		e.preventDefault();

		// Тут можна додати реальну логіку відправки форми

		alert("Message Sent!");

		// Очищення форми після відправки
		form.reset();

		// Закриття попапа після відправки
		popup.classList.remove("active");
	});
});
