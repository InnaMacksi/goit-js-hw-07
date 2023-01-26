/*
Завдання 1 - галерея зображень
Створи галерею з можливістю кліку по її елементах і перегляду повнорозмірного зображення
 у модальному вікні. Подивися демо відео роботи галереї.
 Виконуй це завдання у файлах 01-gallery.html і 01-gallery.js. Розбий його на декілька підзавдань:

Створення і рендер розмітки на підставі масиву даних galleryItems і наданого шаблону елемента галереї.
Реалізація делегування на div.gallery і отримання url великого зображення.
Підключення скрипту і стилів бібліотеки модального вікна basicLightbox. 
Використовуй CDN сервіс jsdelivr і додай у проект посилання на мініфіковані (.min) файли бібліотеки.
Відкриття модального вікна по кліку на елементі галереї. Для цього ознайомся з документацією і прикладами.
Заміна значення атрибута src елемента <img> в модальному вікні перед відкриттям. 
Використовуй готову розмітку модального вікна із зображенням з прикладів бібліотеки basicLightbox.
Розмітка елемента галереї
Посилання на оригінальне зображення повинно зберігатися в data-атрибуті source на елементі <img>, 
і вказуватися в href посилання. Не додавай інші HTML теги або CSS класи, крім тих, 
що містяться в цьому шаблоні.

<div class="gallery__item">
  <a class="gallery__link" href="large-image.jpg">
    <img
      class="gallery__image"
      src="small-image.jpg"
      data-source="large-image.jpg"
      alt="Image description"
    />
  </a>
</div>

Зверни увагу на те, що зображення обгорнуте посиланням, отже по кліку за замовчуванням користувач 
буде перенаправлений на іншу сторінку. Заборони цю поведінку за замовчуванням.

Закриття з клавіатури
УВАГА
Наступний функціонал не обов'язковий для здавання завдання, але буде хорошою додатковою практикою.

Додай закриття модального вікна після натискання клавіші Escape. Зроби так, щоб прослуховування 
клавіатури було тільки доти, доки відкрите модальне вікно. 
Бібліотека basicLightbox містить метод для програмного закриття модального вікна.
*/

import { galleryItems } from "./gallery-items.js";
// Change code below this line

console.log(galleryItems);

const divGallery = document.querySelector(".gallery");

function createGalleryMarkup(galleryItems) {
  return galleryItems
    .map(
      ({preview, original, description}) =>
        `<div class="gallery__item">
  <a class="gallery__link" href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      data-sourse="${original}"
      alt="${description}"
    />
  </a>
      </div>`
    )
    .join("");
}
const addGallery = createGalleryMarkup(galleryItems);
divGallery.insertAdjacentHTML("beforeend", addGallery);

divGallery.addEventListener("click", handlerImageClick);
function handlerImageClick(event) {
  event.preventDefault();

  if (event.target.nodeName !== "IMG") {
      return;
  }
      const originalImage = basicLightbox.create(`
		<img width="800" height="600" src="${event.target.dataset.sourse}">
	`);
  originalImage.show();
  
  divGallery.addEventListener("keydown", handlerImageClose);
  function handlerImageClose(e) {
    if (e.code === "Escape") {
    originalImage.close();
  }
  }
}

