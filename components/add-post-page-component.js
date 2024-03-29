import { renderHeaderComponent } from "./header-component.js";
import { renderUploadImageComponent } from "./upload-image-component.js";

import { postPosts } from "../api";
import { goToPage } from "../index.js";
import { POSTS_PAGE } from "../routes.js";

export function renderAddPostPageComponent({ appEl, onAddPostClick }) {
  let imageUrl = "";
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
      const textEl = document.getElementById('text-input');
      console.log(textEl);

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
          onAddPostClick({
            description: "Описание картинки",
            imageUrl: "https://image.png",
          })
          postPosts({ 
            description: textEl.value,
            imageUrl: imageUrl, 
          }).then((responseData) => {
            console.log(responseData);
            goToPage(POSTS_PAGE);
          })
        });
    }     
  };

  render();
}
