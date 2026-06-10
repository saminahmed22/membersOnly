const popover = document.getElementById("CreatePostPopover");

const closeCreatePostBtn = document.querySelector(".popoverCloseBtn");

closeCreatePostBtn.addEventListener("click", (event) => {
  popover.hidePopover();
});
