// import { USER_POSTS_PAGE } from "../routes.js";
import { renderHeaderComponent } from "./header-component.js";
import { posts, goToPage } from "../index.js";
import { formatDistanceToNow } from "date-fns";
import { ru } from "date-fns/locale";


export function renderUserPostsPageComponent({ appEl }) {

  const getUserPostsApp = posts.map((post, like) => {
    return {
      createdAt: formatDistanceToNow(new Date(post.createdAt), { addSuffix: true, locale: ru }),
      description: post.description,
      id: post.id,
      imageUrl: post.imageUrl,
      isLiked: false,
      likes: [],
      user: {
        id: post.user.id,
        imageUrl: post.user.imageUrl,
        login: post.user.login,
        name: post.user.name,
      },
    }
  });

  const appUserHtml = getUserPostsApp.map((post, like) => {
    return `<li class="post">
            <div class="post-image-container">
              <img class="post-image" src=${post.imageUrl}>
            </div>
            <div class="post-likes">
              <button data-post-id=${like.id} class="like-button">
                <img src="./assets/images/like-not-active.svg">
              </button>
              <p class="post-likes-text">
                Нравится: <strong>${like.name}</strong>
              </p>
            </div>
            <p class="post-text">
              <span class="user-name">${post.user.name}</span>
              ${post.description}
            </p>
            <p class="post-date">
              ${post.createdAt}
            </p>
            </li>`
          }).join('');

  

  const headerUser = posts.map((post) => {
    return `<div class="page-container">
              <div class="header-container"></div>
              <div class="post-header" data-user-id=${post.user.id}>
                  <img src=${post.user.imageUrl} class="post-header__user-image">
                  <p class="post-header__user-name">${post.user.name}</p>
              </div>
              <ul class="posts">
                ${appUserHtml}
              </ul>
            </div>`
            });

  appEl.innerHTML = headerUser;

  renderHeaderComponent({
    element: document.querySelector(".header-container"),
  });

  for (let userEl of document.querySelectorAll(".post-header")) {
    userEl.addEventListener("click", () => {
      goToPage(USER_POSTS_PAGE, {
        userId: userEl.dataset.userId,
      });
    });
  }
}
