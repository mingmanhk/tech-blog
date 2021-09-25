//turn on edit mode
const EditPostFormHandler = async (event) => {
  event.preventDefault();
  document.querySelector(".btn-post-update").style.display = "inline";
  document.querySelector(".update-post-link").style.display = "inline";
  document.querySelector(".btn-post-cancel").style.display = "inline";
  document.querySelector(".btn-post-delete").style.display = "none";
  document.querySelector(".delete-post-link").style.display = "none";
  document.querySelector(".btn-post-edit").style.display = "none";
  document.querySelector("#post-title").readOnly = false;
  document.querySelector("#post-description").readOnly = false;
};

//update post
const UpdatePostFormHandler = async (event) => {
//   event.preventDefault();
  console.log("Update post");
  const title = document.querySelector("#post-title").value.trim();
  const description = document.querySelector("#post-description").value.trim();
  const post_id = document.querySelector("#post-id").value.trim();
  console.log(post_id);
  console.log(title);
  console.log(description);

  const response = await fetch(`/api/post/${post_id}`, {
    method: "PUT",
    body: JSON.stringify({title, description }),
    headers: {
      "Content-Type": "application/json",
    },
  });
    
    //wait for a sec
    setTimeout(function () {}, 1000);
    
  console.log(response);
  if (response.ok) {
    // document.location.reload();
  } else {
    alert(response.statusText);
  }
};

//turn off edit mode
const CancelPostFormHandler = async (event) => {
  event.preventDefault();
  document.querySelector(".btn-post-update").style.display = "none";
  document.querySelector(".update-post-link").style.display = "none";
  document.querySelector(".btn-post-cancel").style.display = "none";
  document.querySelector(".btn-post-delete").style.display = "inline";
  document.querySelector(".delete-post-link").style.display = "inline";
  document.querySelector(".btn-post-edit").style.display = "inline";
  document.querySelector("#post-title").readOnly = true;
  document.querySelector("#post-description").readOnly = true;
};

document
  .querySelector(".btn-post-edit")
  .addEventListener("click", EditPostFormHandler);
document
  .querySelector(".btn-post-update")
  .addEventListener("click", UpdatePostFormHandler);
document
  .querySelector(".btn-post-cancel")
  .addEventListener("click", CancelPostFormHandler);
