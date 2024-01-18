const post_container = document.getElementById('post_container');
const post_title = document.getElementById('post_title');
const post_body = document.getElementById('post_body');
const post_id = document.getElementById('post_id');
const post_comments = document.getElementById('post_comments');
const post_error = document.getElementById('post_error');

function searchPost(){
    fetch(`https://jsonplaceholder.typicode.com/posts/${post_id.value}`)
        .then(response => response.json())
        .then(post => {
            if(!post || !post.id){
                throw new Error('Post not found!')
            }

            post_title.innerText = post.title;
            post_body.innerText = post.body;
            post_error.setAttribute('hidden', '1')
            post_container.removeAttribute('hidden')
        })
        .catch(handleError);
}

function loadComments(){
    fetch(`https://jsonplaceholder.typicode.com/posts/${post_id.value}/comments`)
        .then(response => response.json())
        .then(comments => {
            if(!comments || !comments.length){
                throw new Error('Comments or post not found!')
            }

            post_comments.innerHTML = '';

            for (const comment of comments){
                post_comments.innerHTML += renderComment(comment);
            }

            post_error.setAttribute('hidden', '1')
        })
        .catch(handleError);
}

function renderComment(comment){
    return `<div class="comment">
            <h4 class="title">
                ${comment.name} - ${comment.email}
            </h4>
            <p class="body">${comment.body}</p>
        </div>`
}

function handleError(e) {
    console.error(e)
    post_error.removeAttribute('hidden');
    post_error.innerText = e.message;
}