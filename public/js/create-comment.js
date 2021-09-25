const CreateCommentFormHandler = async (event) => {
  event.preventDefault();
  console.log("Create comment");
  const comment = document.querySelector("#comment").value.trim();
  const post_id = document.querySelector("#post-id").value.trim();

  if (comment && post_id) {
    const response = await fetch("/api/comment", {
      method: "POST",
      body: JSON.stringify({ comment, post_id }),
      headers: { "Content-Type": "application/json" },
    });
    console.log(response);
    if (response.ok) {
      document.location.reload();
    } else {
      alert(response.statusText);
    }
  }
};

document
  .querySelector(".btn-create-comment")
  .addEventListener("click", CreateCommentFormHandler);
