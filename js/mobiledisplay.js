// script.js
const itemContainer = document.getElementById('itemcontainer');
const mobilescrollContainer = document.getElementById('mobilecontainer');
// TODO: replace with json
// const imgArr = ['images/portfolio/crash3.png', 'images/portfolio/crash1.png', 'images/portfolio/crash2.png', 'images/portfolio/diagram1.png', 'images/portfolio/diagram2.png', 'images/portfolio/corebook.png', 'images/portfolio/IKHYF.png', 'images/portfolio/bookgif.gif', 'images/portfolio/TDdesign.gif', 'images/portfolio/robots.png', 'images/portfolio/paulrandgif.gif','images/portfolio/radioactive3.png','images/portfolio/radioactive4.png','images/portfolio/radioactive5.png', 'images/portfolio/O6CBN91-4.png','images/portfolio/O6CBN91-12.png','images/portfolio/O6CBN91-13.png','images/portfolio/O6CBN91-22.png','images/portfolio/O6CBN91.png','images/portfolio/TypeDesign.png','images/portfolio/spacenomad.jpg']

// const imgDes = ['Blue Screen of Death, 2024 (website)', 'Blue Screen of Death, 2024 (website)', 'Blue Screen of Death, 2024 (website)', 'diagram, 2024 (website)', 'diagram, 2024 (website)', '49min-40sec a discussion over AI, 2024 (website)', 'I know how you feel, 2023 (SER app, video)', 'An AI that consumes itself, 2023 (book)', 'Web Design, 2024 (Gif)', 'Dialogue, 2024 (installation)', 'Paul Rand Lecture Series, 2023 (Poster Series)','Radioactive, 2023 (Poster)','Radioactive, 2023 (Poster)','Radioactive, 2023 (Poster)', 'Word Design, 2023 (Book)','Word Design, 2023 (Book)','Word Design, 2023 (Book)','Word Design, 2023 (Book)','Word Design, 2023 (Book)','不舒服的书, 2024 (Type Design)', 'Nomad, 2023 (Type Design)']

// const imgLink = ['https://iviaaa.github.io/PBDS-2024/', 'https://iviaaa.github.io/PBDS-2024/', 'https://iviaaa.github.io/PBDS-2024/', 'https://iviaaa.github.io/coress25/', 'https://iviaaa.github.io/coress25/', 'https://iviaaa.github.io/49min-40sec/', 'https://youtu.be/qbs-YQhKb-4', '', '','','','','','','','','','','', '', '']

let mobileimgInd = 0;

function createItem(ind) {
    const item = document.createElement('div');
    // item.className = 'two-column';
    const des = document.createElement('div');
    // des.className = 'right-column';
    const img = document.createElement("img");
    // img.className = 'left-column';
    const href = document.createElement("a");
    img.src = imgArr[mobileimgInd % imgArr.length];
    img.style = "max-height:70%; max-width:70%;";
    img.alt = mobileimgInd;
    des.style = "padding-bottom: 60px";

    if (imgLink[mobileimgInd % imgArr.length] != '') {
        href.href = imgLink[mobileimgInd % imgArr.length];
        href.style ="cursor: pointer;"
        des.innerHTML = '<a href="' + imgLink[mobileimgInd % imgArr.length] + '" target="_blank">' + imgDes[mobileimgInd % imgArr.length] + '</a>';
    }
    else {
        href.href = "javascript:void(0)";
        href.style ="cursor: default;"
        des.innerHTML = imgDes[mobileimgInd % imgArr.length];
        console.log(imgDes[mobileimgInd % imgArr.length]);
    }
    href.appendChild(img);
    // des.style = "padding: 20px;";
    item.appendChild(href);
    item.appendChild(des);
    mobileimgInd++;
    return item;
}

// Function to add a batch of thumbnails
function addItems(count) {
    for (let i = 0; i < count; i++) {
        itemContainer.appendChild(createItem());
    }
}

// Initial load
addItems(20); // Load 20 thumbnails initially

// Infinite scroll logic
let mobileisAdding = false;
mobilescrollContainer.addEventListener('scroll', () => {
    const { scrollTop, scrollLeft, scrollHeight, scrollWidth, clientHeight, clientWidth } = mobilescrollContainer;

    // Check if near the bottom
    if (scrollTop + clientHeight >= scrollHeight - 100 && !isAdding) {
        mobileisAdding = true;
        addItems(10); // Add 10 more thumbnails
        mobileisAdding = false;
    }

});