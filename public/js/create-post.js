const CreatePostFormHandler = async (event) => {
  console.log("Create post");
  event.preventDefault();

  const title = document.querySelector("#post-title").value.trim();
  const description = document.querySelector("#post-description").value.trim();

  if (title && description) {
    const response = await fetch("/api/post", {
      method: "POST",
      body: JSON.stringify({ title, description }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/");
    } else {
      alert(response.statusText);
    }
  }
};

document
  .querySelector(".new-post-form")
  .addEventListener("submit", CreatePostFormHandler);
