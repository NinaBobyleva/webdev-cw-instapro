import { renderHeaderComponent } from "./header-component.js";

export function renderAddPostPageComponent({ appEl, onAddPostClick }) {
  const render = () => {
    // TODO: Реализовать страницу добавления поста
    const appHtml = `
    <div class="page-container">
      <div class="header-container"></div>
      <div class="page-container">
          <div class="header-container"></div>
          <div class="form">
              <h3 class="form-title">
                Добавить пост
                </h3>
              <div class="form-inputs">
              <p>Опишите фотографию:</p>
                  <textarea type="text" id="login-input" class="textarea"/></textarea>
                  <div class="form-error"></div>
                  <button class="button" id="login-button">Добавить</button>
              </div>
              <div class="form-footer">
              </div>
          </div>
      </div>    
`;

    appEl.innerHTML = appHtml;

    document.getElementById("add-button").addEventListener("click", () => {
      onAddPostClick({
        description: "Описание картинки",
        imageUrl: "https://image.png",
      });
    });
  };

  // renderHeaderComponent({
  //   element: document.querySelector(".header-container"),
  // });

  render();
}
