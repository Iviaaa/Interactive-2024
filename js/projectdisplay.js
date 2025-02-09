// script.js
const scrollContainer = document.querySelector('.scroll-container');
const thumbnailsContainer = document.querySelector('.thumbnails');
// TODO: replace with json
const imgArr = ['images/portfolio/crash3.png', 'images/portfolio/crash1.png', 'images/portfolio/crash2.png', 'images/portfolio/diagram1.png', 'images/portfolio/diagram2.png', 'images/portfolio/corebook.png', 'images/portfolio/IKHYF.png', 'images/portfolio/bookgif.gif', 'images/portfolio/TDdesign.gif', 'images/portfolio/robots.png', 'images/portfolio/paulrandgif.gif','images/portfolio/radioactive3.png','images/portfolio/radioactive4.png','images/portfolio/radioactive5.png', 'images/portfolio/O6CBN91-4.png','images/portfolio/O6CBN91-12.png','images/portfolio/O6CBN91-13.png','images/portfolio/O6CBN91-22.png','images/portfolio/O6CBN91.png','images/portfolio/TypeDesign.png','images/portfolio/spacenomad.jpg']

const imgDes = ['Blue Screen of Death, 2024 (website)', 'Blue Screen of Death, 2024 (website)', 'Blue Screen of Death, 2024 (website)', 'diagram, 2024 (website)', 'diagram, 2024 (website)', '49min-40sec a discussion over AI, 2024 (website)', 'I know how you feel, 2023 (SER app, video)', 'An AI that consumes itself, 2023 (book)', 'Web Design, 2024 (Gif)', 'Dialogue, 2024 (installation)', 'Paul Rand Lecture Series, 2023 (Poster Series)','Radioactive, 2023 (Poster)','Radioactive, 2023 (Poster)','Radioactive, 2023 (Poster)', 'Word Design, 2023 (Book)','Word Design, 2023 (Book)','Word Design, 2023 (Book)','Word Design, 2023 (Book)','Word Design, 2023 (Book)','不舒服的书, 2024 (Type Design)', 'Nomad, 2023 (Type Design)']

const imgLink = ['https://iviaaa.github.io/PBDS-2024/', 'https://iviaaa.github.io/PBDS-2024/', 'https://iviaaa.github.io/PBDS-2024/', 'https://iviaaa.github.io/coress25/', 'https://iviaaa.github.io/coress25/', 'https://iviaaa.github.io/49min-40sec/', 'https://youtu.be/qbs-YQhKb-4', '', '','','','','','','','','','','', '', '']

let imgInd = 0;
// Function to create a thumbnail
function createThumbnail() {
    const thumbnail = document.createElement('div');
    const img = document.createElement("img");
    img.src = imgArr[imgInd % imgArr.length];
    img.style = "max-height:100%; max-width:100%;object-fit: contain;";
    img.alt = imgInd;
    thumbnail.appendChild(img);
    thumbnail.classList.add('thumbnail');
    thumbnail.addEventListener('mouseover', () => showDetail(img.alt));
    imgInd++;
    return thumbnail;
}

function showDetail(ind) {
    const detailImg = document.getElementById('detailimg');
    const detailDes = document.getElementById('description');
    detailImg.src = imgArr[Number(ind) % imgArr.length];
    detailImg.style = "max-height:50vh; max-width:100%;";
    if (imgLink[Number(ind) % imgArr.length] != '') {
        detailDes.innerHTML = '<a href="' + imgLink[Number(ind) % imgArr.length] + '" target="_blank">' + imgDes[Number(ind) % imgArr.length] + '</a>';
    }
    else {
        detailDes.innerHTML = imgDes[Number(ind) % imgArr.length];
    }
    detailDes.style = "padding: 20px;";
}

// Function to add a batch of thumbnails
function addThumbnails(count) {
    for (let i = 0; i < count; i++) {
        thumbnailsContainer.appendChild(createThumbnail());
    }
}

// Initial load
addThumbnails(20); // Load 20 thumbnails initially

// Infinite scroll logic
let isAdding = false;
scrollContainer.addEventListener('scroll', () => {
    const { scrollTop, scrollLeft, scrollHeight, scrollWidth, clientHeight, clientWidth } = scrollContainer;

    //   // Check if near the bottom
    //   if (scrollTop + clientHeight >= scrollHeight - 100 && !isAdding) {
    //     isAdding = true;
    //     addThumbnails(10); // Add 10 more thumbnails
    //     isAdding = false;
    //   }

    // Check if near the right edge
    if (scrollLeft + clientWidth >= scrollWidth - 100 && !isAdding) {
        isAdding = true;
        addThumbnails(10); // Add 10 more thumbnails
        isAdding = false;
    }

});

showDetail(0);