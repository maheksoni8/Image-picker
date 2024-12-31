const imageInput = document.getElementById('imageInput');
const selectedImage = document.getElementById('selectedImage');
const imageCanvas = document.getElementById('imageCanvas');
const colorDisplay = document.getElementById('colorDisplay');
const colorCodeDisplay = document.getElementById('colorCodeDisplay');
const ctx = imageCanvas.getContext('2d');

imageInput.addEventListener('change', function(event) {
    const file = event.target.files[0];
    
    if (file) {
        const reader = new FileReader();
        
        reader.onload = function(e) {
            selectedImage.src = e.target.result;
            selectedImage.onload = function() {
                // Set canvas size to image size
                imageCanvas.width = selectedImage.width;
                imageCanvas.height = selectedImage.height;
                // Draw the image on the canvas
                ctx.drawImage(selectedImage, 0, 0);
            };
        };

        reader.readAsDataURL(file);
    }
});

// Add click event to the image
selectedImage.addEventListener('click', function(event) {
    const rect = selectedImage.getBoundingClientRect();
    const x = event.clientX - rect.left; // x position within the image
    const y = event.clientY - rect.top;  // y position within the image

    // Get pixel data from the canvas
    const pixel = ctx.getImageData(x, y, 1, 1).data;
    const r = pixel[0];
    const g = pixel[1];
    const b = pixel[2];
    const a = pixel[3];

    // Display the color
    colorDisplay.style.backgroundColor = `rgba(${r}, ${g}, ${b}, ${a})`;

    // Display the color code
    colorCodeDisplay.textContent = `rgba(${r}, ${g}, ${b}, ${a})`;
});