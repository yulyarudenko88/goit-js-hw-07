import { galleryItems } from "./gallery-items.js";
// Change code below this line

const galleryContainer = document.querySelector(".gallery");
const galleryCardMarkup = createGalleryCardMarkup(galleryItems);

galleryContainer.insertAdjacentHTML("beforeend", galleryCardMarkup);

galleryContainer.addEventListener("click", onGalleryCardClick);

function createGalleryCardMarkup(galleryItems) {
  return galleryItems
    .map(({ preview, original, description }) => {
      return `<div class="gallery__item">
      <a class="gallery__link" href="large-image.jpg">
        <img
          class="gallery__image"
          src="${preview}"
          data-source="${original}"
          alt="${description}"
        />
      </a>
    </div>`;
    })
    .join("");
}

function onGalleryCardClick(event) {
  event.preventDefault();

  if (!event.target.classList.contains("gallery__image")) {
    return;
  }

  const modal = basicLightbox.create(
    `<div class="modal">
      <img src="${event.target.dataset.source}" width="800" height="600">
    </div>`,
    {
      onShow: () => {
        document.addEventListener("keydown", function handler(event) {
          if (event.code === "Escape") {
            modal.close();
            document.removeEventListener("keydown", handler);
          }
        });
      },
    }
  );

  modal.show();
}
console.log(galleryItems);
