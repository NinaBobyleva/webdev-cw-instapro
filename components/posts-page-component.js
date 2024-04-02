import { USER_POSTS_PAGE } from "../routes.js";
import { renderHeaderComponent } from "./header-component.js";
import { posts, goToPage } from "../index.js";
import { formatDistanceToNow } from "date-fns";
import { ru } from "date-fns/locale";


export function renderPostsPageComponent({ appEl }) {
  // TODO: реализовать рендер постов из api

  // getPosts({ token }).then((responseData) => {
  //   // console.log(responseData);
  //   const appPosts = responseData
  // let date = new Date();

  const getPostsApp = posts.map((post) => {
    // ruLocale = require('date-fns/locale/ru');
    return {
      id: post.id,
      imageUrl: post.imageUrl,
      createdAt: formatDistanceToNow(new Date(post.createdAt), {locale: ru}),
      description: post.description,
      user: {
        id: post.user.id,
        name: post.user.name,
        imageUrl: post.user.imageUrl,
      },
      likes: [
        {
        id: post.id,
        name: post.name,
      },
      ],
      isLiked: false,
    }
  });



  // console.log("Актуальный список постов:", posts);

  /**
   * TODO: чтобы отформатировать дату создания поста в виде "19 минут назад"
   * можно использовать https://date-fns.org/v2.29.3/docs/formatDistanceToNow
   */
  const appHtml = getPostsApp.map((post) => {
    return `<div class="page-container">
                <div class="header-container"></div>
                <ul class="posts">
                  <li class="post">
                    <div class="post-header" data-user-id=${post.user.id}>
                        <img src=${post.user.imageUrl} class="post-header__user-image">
                        <p class="post-header__user-name">${post.user.name}</p>
                    </div>
                    <div class="post-image-container">
                      <img class="post-image" src=${post.imageUrl}>
                    </div>
                    <div class="post-likes">
                      <button data-post-id=${posts.id} class="like-button">
                        <img src="./assets/images/like-active.svg">
                      </button>
                      <p class="post-likes-text">
                        Нравится: <strong>${post.name}</strong>
                      </p>
                    </div>
                    <p class="post-text">
                      <span class="user-name">${post.user.name}</span>
                      ${post.description}
                    </p>
                    <p class="post-date">
                      ${post.createdAt}
                    </p>
                  </li>
                  
                </ul>
              </div>`}).join('');

  appEl.innerHTML = appHtml;
  // console.log(appHtml);

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
