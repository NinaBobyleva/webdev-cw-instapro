import { renderHeaderComponent } from "./header-component.js";
import { renderUploadImageComponent } from "./upload-image-component.js";
import { sanitizeHtml } from "../sanitize.js";

export let textEl = "";
export let imageUrl = "";

export function renderAddPostPageComponent({ appEl, onAddPostClick }) {

  const render = () => {
    // TODO: Реализовать страницу добавления поста
    const appHtml = `
      <div class="page-container">
          <div class="header-container"></div>
          <div class="form">
              <h3 class="form-title">
                Добавить пост
                </h3>
              <div class="form-inputs">
                <div class="upload-image-container"></div>
                <p>Опишите фотографию:</p>
                <textarea type="text" id="text-input" class="textarea"></textarea>
                <div class="form-error"></div>
                <button class="button" id="add-button">Добавить</button>
              </div>
          </div>
      </div>`;

      appEl.innerHTML = appHtml;

      const uploadImageContainer = appEl.querySelector(".upload-image-container");
      textEl = document.getElementById('text-input');

      renderHeaderComponent({
        element: document.querySelector(".header-container"),
      });

      

      if (uploadImageContainer) {
        renderUploadImageComponent({
          element: appEl.querySelector(".upload-image-container"),
          onImageUrlChange(newImageUrl) {
            imageUrl = newImageUrl;
          },
        });

        

        document.getElementById("add-button").addEventListener("click", () => {

          if (textEl.value === "") {
            alert("Введите описание");
            return;
          }
          if (!imageUrl) {
            alert("Не выбрана фотография");
            return;
          }

          onAddPostClick({
            description: sanitizeHtml(textEl.value),
            imageUrl: imageUrl,
          })
        });
    }     
  };

  render();
}
