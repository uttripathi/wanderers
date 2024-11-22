const galleryItems = document.querySelectorAll('.gallery-item img');

galleryItems.forEach((img) => {
  img.addEventListener('mouseenter', () => {
    img.style.zIndex = 10; // Ensure the image is on top
  });

  img.addEventListener('mouseleave', () => {
    img.style.zIndex = ''; // Reset the z-index when hover ends
  });
});
