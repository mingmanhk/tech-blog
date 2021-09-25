const DeletePostFormHandler = async (event) => {
  event.preventDefault();
  console.log("Delete post");
    const post_id = document.querySelector("#post-id").value.trim();
    
  if (post_id) {
    const response = await fetch("/api/post", {
      method: "DELETE",
      body: JSON.stringify({ post_id }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert(response.statusText);
    }
  }
};

document
  .querySelector(".btn-post-delete")
  .addEventListener("click", DeletePostFormHandler);
