function handleSubmit(e) {
  event.preventDefault()
  inputString = e.target[0].value
  identicon = new Identicon(inputString);
  updateGravatar(identicon)
  loadComments(inputString)
}

function loadComments(gravatar) {
  fetch(`http://localhost:3000/comments?gravatar=${gravatar}`)
    .then(resp => resp.json())
    .then(resp => {
      comments = resp.map(comment => comment.content)
      updateComments(comments)
    })
}

function newComment(comment, gravatar) {
  fetch(`http://localhost:3000/comments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      content: comment,
      gravatar: gravatar
    })
  }).then(res => res.json()).then(json => loadComments(json.gravatar))
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("identicon-form")

  form.addEventListener("submit", (event) => {
    event.preventDefault()
    handleSubmit(event)
  })

  const commentForm = document.getElementById("comment-form")
  const gravatar = document.getElementById("identicon-form")[0].value

  commentForm.addEventListener("submit", (event) => {
    event.preventDefault()
    const comment = document.querySelector('#comment-form > div > input[type="text"]').value
    const gravatar = document.getElementById("identicon-form")[0].value
    console.log(comment)
    newComment(comment, gravatar)
  })
})
