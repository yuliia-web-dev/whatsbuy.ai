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



// let arrow = document.getElementById("line");

// console.log(arrow.getTotalLength());


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






