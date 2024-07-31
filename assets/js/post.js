async function handlePosts() {
  const { posts } = await fetch("https://dummyjson.com/post/").then((res) =>
    res.json()
  );
  return posts;
}

async function handlePostsComments(postId) {
  const { comments } = await fetch(
    `https://dummyjson.com/post/${postId}/comments`
  ).then((res) => res.json());
  return comments;
}

async function render() {
  const posts = await handlePosts();

  for (let post of posts) {
    const comments = await handlePostsComments(post.id);
    postsContainer.innerHTML += `<div class='postBox'><div class="post">
      <h1>${post.title}</h1>
      <p>${post.body}</p>
    </div>
    ${comments
      .map(
        (x) =>
          `<div class="postComments"><p><span><b>${x.user.fullName}:</b></span>  ${x.body} - Like (${x.likes})</p></div>` 
      )
      .join("")}</div>`;
  }
}

render();
