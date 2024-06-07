const menuBtn = document.querySelector(".menu-icon");
const rightArrowIcon = document.querySelector(".right-arrow");
const leftArrowIcon = document.querySelector(".left-arrow");
const menuList = document.querySelector(".show-menu");
const tabBtn = document.querySelectorAll(".tablinks");
const tabContents = document.querySelectorAll(".tab-content");
const cardContainers = document.querySelectorAll(".swiper");
const showCardBtn = document.querySelectorAll(".show-card");
const closeCardBtn = document.querySelectorAll(".close-btn");
const okayCardBtn = document.querySelector(".okay-button");
let contentId;

/**
 * 
 * TODO: create an eventlistener for overlay, when clicking the overlay it hides the contents again.

 * TODO: Fix the issue about mobile responsive when the card contents is visbile and hide it    again, then the overlay is not visible when the navlist is showing.
 */
// for each card to show and to close
function updateVisibility(cardContainer) {
    const slides = cardContainer.querySelectorAll('.swiper-slide');
    const leftArrow = cardContainer.querySelector('.custom-prev-button');
    const rightArrow = cardContainer.querySelector('.custom-next-button');
    const okayButton = cardContainer.querySelector('.okay-button');

    let currentIndex = 0; 

    function showSlide(cardIndex) {
        slides.forEach((slide, index) => {
            slide.style.opacity = index === cardIndex ? '1' : '0'; 
        });
    }

    leftArrow.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            showSlide(currentIndex);
            updateButtonVisibility();
        }
    });

    rightArrow.addEventListener('click', () => {
        if (currentIndex < slides.length - 1) {
            currentIndex++;
            showSlide(currentIndex);
            updateButtonVisibility();
        }
    });

    function updateButtonVisibility() {
        leftArrow.style.display = currentIndex > 0 ? 'block' : 'none';
        rightArrow.style.display = currentIndex < slides.length - 1 ? 'block' : 'none0';
        okayButton.style.display = currentIndex === slides.length - 1 ? 'block' : 'none';
    }

    showSlide(currentIndex);
    updateButtonVisibility();
}

// Initialize card visibility and navigation for each card container
cardContainers.forEach((cardContainer) => {
    updateVisibility(cardContainer);
});

function cardVisibility (targetCardId){
    console.log(targetCardId)

    const localCard = document.getElementById(targetCardId)
    localCard.classList.add("show");

    if(localCard.classList.contains("show")){
        document.querySelector(".overlay").classList.add("active-overlay")
        document.querySelector("body").style.overflow = "hidden";
    }
}

showCardBtn.forEach((showCardBtn) => {
    showCardBtn.addEventListener("click", (event) => {
        const targetCardId = event.target.getAttribute('data-swiper');
        cardVisibility(targetCardId);
    })
})

function closeCard(targetCardId) {
    const localCard = document.getElementById(targetCardId);
    localCard.classList.remove("show");

    if(!localCard.classList.contains("show")){
        document.querySelector(".overlay").classList.remove("active-overlay")
        document.querySelector("body").style.overflow = "visible";
    }
}

// for extra-section tabContents
tabContents.forEach(tabContents => {
    tabContents.style.display = "none";
});

tabBtn.forEach(tabBtn => {
    tabBtn.addEventListener("click", () => {
        toggleContents(tabBtn,tabContents)
    });
});

function toggleContents (tabBtn, tabContents) {
    contentId = tabBtn.getAttribute("data-content-links");
    const content = document.getElementById(contentId);

        if(content){
            activeUnderLine(contentId)

            tabContents.forEach(tabContents => {
                tabContents.style.display = "none";
            });

            content.style.display = "flex";
        }
};
document.querySelector(".default-open").style.display = "flex";

function activeUnderLine(contentId){
    const buttonActiveUnderline = document.querySelector(".tab-underline");

    if(buttonActiveUnderline){
        if(contentId === "content2"){
            buttonActiveUnderline.classList.remove("active-content1");
            buttonActiveUnderline.classList.remove("active-content3");
            buttonActiveUnderline.classList.remove("active-content4");
            buttonActiveUnderline.classList.remove("active-content5");
            buttonActiveUnderline.classList.add("active-content2");
        }
        else if(contentId === "content3"){
            buttonActiveUnderline.classList.remove("active-content1");
            buttonActiveUnderline.classList.remove("active-content2");
            buttonActiveUnderline.classList.remove("active-content4");
            buttonActiveUnderline.classList.remove("active-content5");
            buttonActiveUnderline.classList.add("active-content3");
        }
        else if(contentId === "content4"){
            buttonActiveUnderline.classList.remove("active-content1");
            buttonActiveUnderline.classList.remove("active-content2");
            buttonActiveUnderline.classList.remove("active-content3");
            buttonActiveUnderline.classList.remove("active-content5");
            buttonActiveUnderline.classList.add("active-content4");
        }
        else if(contentId === "content5"){
            buttonActiveUnderline.classList.remove("active-content1");
            buttonActiveUnderline.classList.remove("active-content2");
            buttonActiveUnderline.classList.remove("active-content3");
            buttonActiveUnderline.classList.remove("active-content4");
            buttonActiveUnderline.classList.add("active-content5");
        }
        else{
            buttonActiveUnderline.classList.remove("active-content2");
            buttonActiveUnderline.classList.remove("active-content3");
            buttonActiveUnderline.classList.remove("active-content4");
            buttonActiveUnderline.classList.remove("active-content5");
            buttonActiveUnderline.classList.add("active-content1");
        }
    }
}

// For mobile responsive
menuBtn.addEventListener("click", () => {
    const navList = document.querySelector(".main-nav");
    const overlay =  document.querySelector(".overlay")

    navList.classList.toggle("show-navlist");

    if(navList.classList.contains("show-navlist")){
        document.querySelector("body").style.overflow = "hidden";
        overlay.classList.add("active-overlay");
    }
    else{
        document.querySelector("body").style.overflow = "visible";
        overlay.classList.remove("active-overlay");

        if(menuList.classList.contains("active-menu")){
            menuList.classList.remove("active-menu");
        }
    }
})

rightArrowIcon.addEventListener("click", () =>{
    menuList.classList.add("active-menu");
});

leftArrowIcon.addEventListener("click", () => {
    menuList.classList.remove("active-menu");
});

// for swiper card
var swiper = new Swiper(".mySwiper", {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: false,
    allowTouchMove: false,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".custom-next-button",
      prevEl: ".custom-prev-button",
    },
  });