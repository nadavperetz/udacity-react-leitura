export function fetchCategories() {

  return fetch(`http://localhost:3001/categories`, {headers: {'Authorization': 'whatever-you-want'}})
      .then((res) =>
          res.json()
      )
      .then((categs) => {
        return categs
      })
}

export function fetchPosts() {
  return fetch(`http://localhost:3001/posts`, {headers: {'Authorization': 'whatever-you-want'}})
      .then((res) =>
          res.json()
      )
      .then((posts) => {
        return posts
      })
}

export function fetchPostsByCategory(category_path) {
  return fetch(`http://localhost:3001/${category_path}/posts`, {headers: {'Authorization': 'whatever-you-want'}})
      .then((res) =>
          res.json()
      )
      .then((posts) => {
        return posts
      })
}

export function fetchPostById(postId) {
  return fetch(`http://localhost:3001/posts/${postId}`, {headers: {'Authorization': 'whatever-you-want'}})
      .then((res) =>
          res.json()
      )
      .then((posts) => {
        return posts
      })
}

export function postVotePost(post_id, vote) {
  return fetch(`http://localhost:3001/posts/${post_id}`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'whatever-you-want'},
    method: "POST",
    body: JSON.stringify( {option: vote} )
  })
      .then((res) =>
          res.json()
      )
      .then((post) => {
        return post
      })
      .catch(function (res) {
        console.log(res)
      })
}
