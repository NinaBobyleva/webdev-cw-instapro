import { likePosts, dislikePosts, getPosts } from "../api";
import { posts, renderApp , setPosts} from "../index.js";

export const initLikeButtonElement = () => {
    for (const likeButtonElement of document.querySelectorAll('.like-button')) {
        likeButtonElement.addEventListener('click', () => {
          const index = likeButtonElement.dataset.index;
          if (posts[index].isLiked === false) {
            console.log(posts[index].isLiked);
            return likePosts(likeButtonElement.dataset.postId)
              .then((responseData) => {
                console.log(responseData);
                getPosts().then((data) => {
                  console.log(data);
                  setPosts(data);
                  renderApp();
                })
              });
          } else {
            return dislikePosts(likeButtonElement.dataset.postId)
              .then((responseData) => {
                console.log(responseData);
                getPosts().then((data) => {
                  setPosts(data);
                  renderApp();
                })
              });
          }
        });
      }
}

