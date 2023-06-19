const images = document.getElementById("image");
images.addEventListener("change", (event) => {
    const form = document.querySelector('#formFile');
    form.innerHTML = "";
    const imgCount = images.files.length;
    for (let i = 0; i < imgCount; i++) {
        const urls = URL.createObjectURL(event.target.files[i]);
        form.innerHTML += `<img src="${urls}">`;
    }
});