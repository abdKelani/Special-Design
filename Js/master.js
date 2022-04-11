//Check If There Is a Locla Storage Color Option 
let mainColors = localStorage.getItem("color_option");
if (mainColors !== null ){
    document.documentElement.style.setProperty('--main-color', mainColors);
    //Remove Active Class From All Colors List Item 
    document.querySelectorAll(".olors_list li").forEach(Element => {
        Element.classList.remove("active");
        //Add Active Class On Element With Data Color === Local Storage Item 
        if (Element.dataset.color === mainColors) {
            //Add Active Class
            Element.classList.add("active");
        }
    })
}


//Random  Background Option
let backgroundOption = true; 
//Variable To Control The Background Interval
let backgroundInterval;
//Check If There is Local Storage Random Background Item  
let backgroundLocalItem = localStorage.getItem("background_option");
//Check If Random Background Local Storage Isn't Empty
if (backgroundLocalItem !== null){
    if (backgroundLocalItem === 'true'){
        backgroundOption = true;  
    } else { 
        backgroundOption = false;  
    } 
    //Remove Active Class From All Spans
    document.querySelectorAll(".random_background span").forEach(element => {
        element.classList.remove("active");
    });

    if (backgroundLocalItem === 'true') {
        document.querySelector(".random_background .yes").classList.add("active");
    } else {
        document.querySelector(".random_background .no").classList.add("active");
    }
}

//Toogle Spin Class On Icon
document.querySelector(".toggle-setting .icon1").onclick = function () {
    //Toggle Class Fa-spin For Rotation on itself
    this.classList.toggle("fa-spin");
    //Toggle Class to Open Setting box 
    document.querySelector(".setting_box").classList.toggle("open")
};

//Switch Colors
 const colorLi = document.querySelectorAll(".colors_list li");
 //Loop On All List Items
 colorLi.forEach(li => {
    //Click On Every List Items
    li.addEventListener ("click", (e) => {
        //Set Color On Root 
        document.documentElement.style.setProperty('--main-color', e.target.dataset.color);
        //Set Color To Local Storage
        localStorage.setItem("color_option", e.target.dataset.color);
        handleActive(e);
    })
 })

//Switch Random background Option
const randomBackEl = document.querySelectorAll(".random_background span");
//Loop On All Spans
randomBackEl.forEach(span => {
   //Click On Every Span
   span.addEventListener ("click", (e) => {
       handleActive(e);
       if (e.target.dataset.background === 'yes') {
            backgroundOption = true;  
            randomizeImgs();
            localStorage.setItem("background_option", true);
       } else {
            backgroundOption = false; 
            clearInterval(backgroundInterval);
            localStorage.setItem("background_option", false);
       }
   })
})

// Select Landing Page
let landingPage = document.getElementById("landing-page");
// Get Array of Images 
let imagesArray = [ "01.jpeg", "02.jpeg", "03.jpeg", "04.jpeg", "05.jpeg" ];
//Function To Randomize Images 
function randomizeImgs() {
    if (backgroundOption == true) {
        backgroundInterval = setInterval(() => {
            // Get Random Number
            let randomNumber = Math.floor(Math.random() * imagesArray.length);
            // Chang Background Image Url
            landingPage.style.backgroundImage = 'url("images/' + imagesArray[randomNumber] + ' ")';
        }, 10000);
    }
}

// Select Skills Selector
let ourSkills  = document.querySelector(".skills");
window.onscroll = function () {
    //Skills Offset Top
    let skillsOfsetTop = ourSkills.offsetTop;
    // Skills Outer Height
    let skillsOuterHeight =  ourSkills.offsetHeight;
    // Window Height 
    let windowHeight = this.innerHeight;
    //Window ScrollTop
    let windowScrollTop = this.pageYOffset;
    if (windowScrollTop >= (skillsOfsetTop + skillsOuterHeight - windowHeight) ) {
        let allSkills = document.querySelectorAll(".skill_box .skill_progress span");       
        allSkills.forEach(skill => {
            skill.style.width =  skill.dataset.progress;
        });
    }
};

//Creat Popup Wiht The Image
let ourGallery = document.querySelectorAll(".gallery img");
ourGallery.forEach(img => {
    img.addEventListener("click", (e) => {
        //Creat Overlay Element 
        let Overlay = document.createElement("div");
        //Add Class To Overlay
        Overlay.className = 'popup_overlay';      
        //Append Overlay To The Body 
        document.body.appendChild(Overlay);
        //Creat The Popup Box
        let popupBox = document.createElement("div");
        //Add Class To The Popup Box 
        popupBox.className  = 'popup_box'; 
        //Creat The Image
        let popupImage = document.createElement("img");
        //Set image Source
        popupImage.src = img.src;
        //Add Image to Popup Box
        popupBox.appendChild(popupImage);
        //Append The Popup Box To The Body
        document.body.appendChild(popupBox);

        if (img.alt !== null) {            
            //Creat Heading 
            let imgHeading = document.createElement("h3");
            //Creat text for heading
            let imgText = document.createTextNode(img.alt);
            //Append the text to the Heading
            imgHeading.appendChild(imgText);
            //Append the text to the popup box
            popupBox.appendChild(imgHeading); 
            //Creat the Close Span  
            let closeButton = document.createElement("span");
            //Creat the Close button text 
            let closeButtonText = document.createTextNode("X");
            //Append button to close button 
            closeButton.appendChild(closeButtonText); 
            //Add class to close button 
            closeButton.className = 'close-button';
            //Add close Button to thee popup box 
            popupBox.appendChild(closeButton);
            // if (img.indexOf() == "..//images/1.png") {
            //     console.log("This Value is Wrong!")
            // } // Delet If Condition?
        }   
    });
});

//close popup 
 document.addEventListener("click", function (e) {
     if (e.target.className == 'close-button') {
        //Remove the current popup 
        e.target.parentNode.remove();
        //Remove overly
        document.querySelector(".popup_overlay").remove(); 
     };
 });

 //Select All billets
 const allBullets = document.querySelectorAll(".nav-bullets .bullet");
 //Select All links
 const allLinks = document.querySelectorAll(".links a");
function scrollToSomewhere(elements) {
    elements.forEach(ele => { 
       ele.addEventListener("click", (e) => {
           e.preventDefault();
           document.querySelector(e.target.dataset.section).scrollIntoView({
               behavior: 'smooth'
           }); 
       });
    }); 
}
scrollToSomewhere(allBullets);
scrollToSomewhere(allLinks);

// Handle Active State
function handleActive(ev) {
    //Remove Active class from all children
    ev.target.parentElement.querySelectorAll(".active").forEach(element =>{
        element.classList.remove("active");
    });
    ev.target.classList.add("active");
}

let bulletsSpan = document.querySelectorAll(".bullets-option span");
let bulletsContainer = document.querySelector(".nav-bullets");
let bulletLocalItem = localStorage.getItem("bullets_option");

if (bulletLocalItem !== null) {
    bulletsSpan.forEach(span => {
        span.classList.remove("active");
    });    
    if (bulletLocalItem === 'block') {
        bulletsContainer.style.display = 'block';
        document.querySelector(".bullets-option .yes").classList.add("active");
    } else {
        bulletsContainer.style.display = 'none';
        document.querySelector(".bullets-option .no").classList.add("active");
    }
}

bulletsSpan.forEach(span => {   
    span.addEventListener("click", (e) => {
        if (span.dataset.display === 'yes') {         
            bulletsContainer.style.display = 'block';
            localStorage.setItem("bullets_option", 'block');      
        } else {
            bulletsContainer.style.display = 'none';
            localStorage.setItem("bullets_option", 'null');
        }
        handleActive(e);
    });
});

// Reset Button 
document.querySelector(".reset-option").onclick = function () {
    localStorage.clear()
    // localStorage.removeItem("color_option");
    // localStorage.removeItem("background_option");
    // localStorage.removeItem("bullets_option");
    //Reload Windlow
   window.location.reload();
}

// Toggle Menu
let toggleBtn = document.querySelector(".toggle-menu");
let tLinks = document.querySelector(".links");

toggleBtn.onclick = function (e) {
    e.stopPropagation(); 
    this.classList.toggle("menu-active");
    tLinks.classList.toggle("open");
};


// Click abywhere outside menu and toggle button
document.addEventListener("click", (e) => {
    if (e.target!== toggleBtn && e.target !== tLinks) {
        //check if the menu is open
        if(tLinks.classList.contains("open")) {
            toggleBtn.classList.toggle("menu-active");
            tLinks.classList.toggle("open");
        }
    }
});

//Stoping Propagation On Menu
tLinks.onclick = function (e) {
    e.stopPropagation();
};









