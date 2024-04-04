import { USER_POSTS_PAGE } from "../routes.js";
import { renderHeaderComponent } from "./header-component.js";
import { likePosts, dislikePosts, getPosts, getUserPosts } from "../api";
import { posts, goToPage, renderApp , setPosts } from "../index.js";
import { formatDistanceToNow } from "date-fns";
import { ru } from "date-fns/locale";
import { initLikeButtonElement } from "./likes-component.js";


export function renderUserPostsPageComponent({ appEl }) {

  const appUserHtml = posts.map((post, index) => {
    return `
    <ul class="posts">
      <li class="post">
        <div class="post-image-container">
          <img class="post-image" src=${post.imageUrl}>
        </div>
        <div class="post-likes">
          <button data-index="${index}" data-post-id=${post.id} class="like-button">
            <img src="./assets/images/${post.isLiked ? 'like-active.svg' : 'like-not-active.svg'}">
          </button>
          <p class="post-likes-text">
            Нравится: <strong>${post.likes.length > 1 ? `${post.likes[0]['name']} и еще  ${post.likes.length - 1}` : `${post.likes.length > 0 ? post.likes[0]['name'] : "0"}` }</strong>
          </p>
        </div>
        <p class="post-text">
          <span class="user-name">${post.user.name}</span>
          ${post.description}
        </p>
        <p class="post-date">
          ${formatDistanceToNow(new Date(post.createdAt), { addSuffix: true, locale: ru })}
        </p>
      </li>
    </ul>`
  }).join('');

  const headerUser = `
  <div class="page-container">
  <div class="header-container" id="header-container" data-user-id=${posts[0].user.id}></div>
    <div class="post-header" >
      <img src=${posts[0].user.imageUrl} class="post-user-header__user-image">
      <p class="post-user-header__user-name">${posts[0].user.name}</p>
    </div>
    ${appUserHtml}
  </div>`;

  appEl.innerHTML = headerUser;

  for (const likeButtonElement of document.querySelectorAll('.like-button')) {
    likeButtonElement.addEventListener('click', () => {
      const el = document.getElementById("header-container");
      const index = likeButtonElement.dataset.index;
      const userId = el.dataset.userId;
      console.log(userId);
      if (posts[index].isLiked === false) {
        console.log(posts[index].isLiked);
        return likePosts(likeButtonElement.dataset.postId)
          .then((responseData) => {
            console.log(responseData);
            getUserPosts(userId).then((data) => {
              console.log(userId);
              setPosts(data);
              renderApp();
            })
          });
      } else {
        return dislikePosts(likeButtonElement.dataset.postId)
          .then((responseData) => {
            // console.log(responseData);
            getUserPosts(userId).then((data) => {
              setPosts(data);
              renderApp();
            })
          });
      }
    });
  }
  


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





