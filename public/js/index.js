const createPostModal = document.getElementById("createPostPopoverModal");
const createPostButton = document.querySelector(".createBtn");
const closeCreatePostBtn = document.querySelector(".modalCloseBtn");

createPostButton.addEventListener("click", (event) => {
  createPostModal.showModal();
});

closeCreatePostBtn.addEventListener("click", (event) => {
  createPostModal.close();
  window.location.href = `/`;
});

// Delete post
const contentBody = document.querySelector(".contentBody");

const deletePostBtns = document.querySelectorAll(".deletePostBtn");

if (contentBody) {
  contentBody.addEventListener("click", (event) => {
    const button = event.target.closest("button");
    if (button && button.classList.contains("deletePostBtn")) {
      window.location.href = `/delete-post/${button.dataset.postid}`;
    }
  });
}

//Secret modal

const secretModal = document.querySelector(".secretModal");
const secretModalBtn = document.querySelector(".secretButton");
const secretModaCloselBtn = document.querySelector(".secretCloseBtn");
const secretSubmitButton = document.querySelector(".secretSubmitButton");

if (secretModal && secretModalBtn) {
  secretModalBtn.addEventListener("click", (event) => {
    secretModal.showModal();
  });

  secretModaCloselBtn.addEventListener("click", (event) => {
    secretModal.close();

    window.location.href = `/`;
  });

  secretSubmitButton.addEventListener("mouseover", (event) => {
    secretSubmitButton.textContent = "I agee to sell my soul";
  });

  secretSubmitButton.addEventListener("mouseout", (event) => {
    secretSubmitButton.textContent = "Join the council";
  });
}
