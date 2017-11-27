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
            'Authorization': 'whatever-you-want'
        },
        method: "POST",
        body: JSON.stringify({option: vote})
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

export function fetchCreateNewComment(comment) {
    return fetch(`http://localhost:3001/comments/`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'whatever-you-want'
        },
        method: "POST",
        body: JSON.stringify(comment)
    })
        .then((res) =>
            res.json()
        )
        .then((comment) => {
            return comment
        })
        .catch(function (res) {
            console.log(res)
        })
}

export function fetchCommentsByPostId(postId) {
    return fetch(`http://localhost:3001/posts/${postId}/comments`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'whatever-you-want'
        }
    })
        .then((res) => {
                return res.json()
            }
        )
        .then((posts) => {
            return posts
        })
}

export function putEditPost(post) {
    return fetch(`http://localhost:3001/posts/${post.id}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'whatever-you-want'
        },
        method: "PUT",
        body: JSON.stringify(post)
    })
        .then((res) => {
                return res.json()
            }
        )
        .then((post) => {
            return post
        })
        .catch(function (res) {
            console.log(res)
        })
}

export function fetchEditComment(comment) {
    return fetch(`http://localhost:3001/comments/${comment.id}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'whatever-you-want'
        },
        method: "PUT",
        body: JSON.stringify(comment)
    })
        .then((res) => {
                console.log(res);
                return res.json()
            }
        )
        .then((post) => {
            return post
        })
        .catch(function (res) {
            console.log(res)
        })
}

export function fetchDeleteComment(comment) {
    return fetch(`http://localhost:3001/comments/${comment.id}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'whatever-you-want'
        },
        method: "DELETE",
    })
        .then((res) => {
                console.log(res);
                return res.json()
            }
        )
        .then((post) => {
            return post
        })
        .catch(function (res) {
            console.log(res)
        })
}

export function createPost(post) {
    return fetch(`http://localhost:3001/posts/`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'whatever-you-want'
        },
        method: "POST",
        body: JSON.stringify(post)
    })
        .then((res) => {
                return res.json()
            }
        )
        .then((post) => {
            return post
        })
        .catch(function (res) {
            console.log(res)
        })
}

export function postVoteComment(postId, voteType) {
    return fetch(`http://localhost:3001/comments/${postId}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'whatever-you-want'
        },
        method: "POST",
        body: JSON.stringify({"option": voteType})
    })
        .then((res) =>
            res.json()
        )
        .then((comment) => {
            return comment
        })
        .catch(function (res) {
            console.log(res)
        })
}