const CreatePostFormHandler = async (event) => {
  event.preventDefault();
  console.log("Create post");

  const title = document.querySelector("#post-title").value.trim();
  const description = document.querySelector("#post-description").value.trim();
  console.log(title);
  console.log(description);
  
  if (title && description) {
    const response = await fetch("/api/post", {
      method: "POST",
      body: JSON.stringify({ title, description }),
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
  .querySelector(".btn-create-post")
  .addEventListener("click", CreatePostFormHandler);
