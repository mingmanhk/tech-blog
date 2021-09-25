const DeletePostFormHandler = async (event) => {
  const post_id = document.querySelector("#post-id").value.trim();
  if (post_id) {
    const response = await fetch(`/api/post/${post_id}`, {
      method: "DELETE",
    });
    console.log(response);
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