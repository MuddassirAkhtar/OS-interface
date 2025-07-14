
function updateDateandTime() {
    const now = new Date();

    const formatted_date = now.toLocaleDateString();  // e.g., 6/27/2025
    const formatted_time = now.toLocaleTimeString();  // e.g., 7:48:09 PM

    document.querySelector(".date").innerHTML = formatted_date
    document.querySelector(".time").innerHTML = formatted_time
  }

  updateDateandTime();
  setInterval(updateDateandTime, 1000);

//   create folder 

// prevents right click contex menue 
   let bg = document.querySelector(".bg")
  bg.addEventListener('contextmenu',function(e){
    e.preventDefault();

  });
   
  // coustum contextmenue
bg.addEventListener('contextmenu',function(e){
   let x = e.clientX
   let y = e.clientY
   const menu = document.querySelector(".c-menu")
     menu.style.left = x + "px";
    menu.style.top = y +"px";
    menu.style.display = 'block';
    bg.addEventListener("click",function(){
  menu.style.display= 'none';
 });
});

//   folder array 
let folders = [];

// FOLDER CREATION 
const folder = document.querySelector(".folder")
let f_icon = document.querySelector(".f-icon")
folder.addEventListener('click',function(e){
let x = e.clientX ; 
let y = e.clientY;
let folderData = {
  id : Date.now(),
  name : "new folder",
  x : x + 100,
  y:  y
};
folders.push(folderData);
renderfolder(folderData);
});  

// folder display  

function renderfolder(folder) {
  // Create folder wrapper
  const folderBox = document.createElement("div");
  folderBox.className = "folder-box icon";
  folderBox.style.left = folder.x + "px";
  folderBox.style.top = folder.y + "px";
  // folderBox.style.backgroundColor = "red";

  // Folder name
  const folderName = document.createElement("span");
  folderName.className = "folder-name";
  folderName.textContent = folder.name;

  // Folder icon
  const folderIcon = document.createElement("i");
  folderIcon.className = "fa-solid fa-folder fa-2xl f-icon show folder-icon  ";
  folderIcon.title = folder.name;
   
  

  // Append icon and name
  folderBox.appendChild(folderIcon);
  folderBox.appendChild(folderName);
  document.querySelector(".bg").appendChild(folderBox);
 
  
  // Folder double-click to open
 folderIcon.addEventListener('dblclick',function(){
  openFolder(folder);
 });
 

  // Rename on double-click
  folderName.addEventListener('dblclick', function () {
    const input = document.createElement("input");
    input.value = folderName.textContent;
    input.style.width = input.value.length + 'ch';
    input.style.textAlign = "center";

    folderBox.replaceChild(input, folderName);
    input.focus();

    input.addEventListener("blur", function () {
      folder.name = input.value;
      folderName.textContent = input.value;
      folderBox.replaceChild(folderName, input);
    });

    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") input.blur();
    });
  });

  // folder drag and drop feature 
  makeDraggable(folderBox,folderIcon);

}


// open folder function 
  function openFolder(folder){

    // main div 
    const folderDisplay = document.createElement("div")
    folderDisplay.className = "folder-display"
    // folderDisplay.id = folder.id;

    // title 
  const title = document.createElement("span");
  title.className = "folder-title";
  title.textContent = folder.name;

    // nav 
    const folderNav = document.createElement("div")
    folderNav.id = "folder-nav"

    // btn holder 
  const controls = document.createElement("div");
  controls.className = "folder-controls";


    // close btn 
     const closeBtn = document.createElement("button")
     closeBtn.className ="close-btn , folder-btn"
     closeBtn.textContent="✕";
      
    //  minimize btn 
    const minBtn = document.createElement("button")
    minBtn.className = "min-btn , folder-btn "
    minBtn.textContent = "–";

    // max botton 
    const maxBtn = document.createElement("button")
    maxBtn.className= "max-btn , folder-btn"
    maxBtn.textContent = "🗖";


    // folder content 
    const folderContent = document.createElement("div")
    folderContent.className = "folder-content "

    controls.append(minBtn,maxBtn,closeBtn);
    folderNav.append(title,controls);
    folderDisplay.append(folderNav,folderContent)



      folderDisplay.style.display = "block"

      closeBtn.addEventListener('click',function(){
        folderDisplay.remove();
      });

      // maximize btn 
      maxBtn.addEventListener('click',function(){
        folderDisplay.style.height = "94vh";
        folderDisplay.style.width = "100vw";
        folderDisplay.style.top = "50%";
        folderDisplay.style.left = "50%";
        folderDisplay.style.transform = "translate(-50%,-50%)"
      });

      //  minimizw btn 
      minBtn.addEventListener("click",function(){
        folderDisplay.style.height = "60vh";
        folderDisplay.style.width = "60vw";
        folderDisplay.style.top = "50%";
        folderDisplay.style.left = "50%";
        folderDisplay.style.transform = "translate(-50%,-50%)"

      });
      document.querySelector(".bg").appendChild(folderDisplay);
 

  
  }

  //  function for draging any iteam 

 function makeDraggable(element, handle) {
  let offsetX = 0;
  let offsetY = 0;
  let isDragging = false;

  handle.style.cursor = "move";

  handle.addEventListener("mousedown", function (e) {
    isDragging = true;

    const rect = element.getBoundingClientRect();

    // Calculate offset based on where the mouse was clicked
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;

    // Prevent text selection while dragging
    document.body.style.userSelect = "none";
  });

  document.addEventListener("mousemove", function (e) {
    if (!isDragging) return;

    let x = e.clientX - offsetX;
    let y = e.clientY - offsetY;

    // Restrict movement within the viewport
    x = Math.max(0, Math.min(x, window.innerWidth - element.offsetWidth));
    y = Math.max(0, Math.min(y, window.innerHeight - element.offsetHeight));

    element.style.left = `${x}px`;
    element.style.top = `${y}px`;
  });

  document.addEventListener("mouseup", function () {
    isDragging = false;
    document.body.style.userSelect = "auto";
  });
}
  

// window icon  
 let windowIcon = document.querySelector(".window-icon");
let flag = 0;
let windowLog = null; // keep reference so we don't create multiple

windowIcon.addEventListener('click', function () {
  if (flag === 0) {
    windowLog = document.createElement("div");
    windowLog.className = "window-log";
    windowLog.style.display = "block";
    bg.append(windowLog);
    flag = 1;
  } else {
    if (windowLog) {
      windowLog.remove(); // or windowLog.style.display = "none";
    }
    flag = 0;
  }
  bg.addEventListener("click",function(){
    windowLog.remove();
  });

  

  // window app 
  const windowsApp = document.createElement("div")
  windowsApp.className = "windows-app ";
  //  windows footer 
  const windowsFooter = document.createElement("div");
  windowsFooter.className = "windows-footer";

  // logo shery 
  const shery = document.createElement("div");
  shery.className = "shery"

  //  power  
   const power = document.createElement("i")
   power.className = "fa-solid fa-power-off fa-lg"


   windowsFooter.append(shery,power );
     
  windowLog.append(windowsApp,windowsFooter)

  for(let i = 0 ; i<appData.length;i++){

// app container 
const appContainer = document.createElement("div");
appContainer.className = "app-cont"
    // app icon
    const appIcon = document.createElement("div")
    appIcon.className = "windows-app-icon"
    appIcon.style.backgroundImage = `url(${appData[i].img})`;

    // text content 
    const appName = document.createElement("span");
    appName.className = "app-name"
    appName.textContent = appData[i].name;

    // clickable apps 
    appContainer.addEventListener("click",function(){
        

      // console.log(appData[i].name)
      if(appData[i].name == "Flipkart"){
        openFlipkart();
      }
      if(appData[i].name == "wikipedia"){
        openWikipedia();
      }
      if(appData[i].name == "Deepseek"){
        openDeepseek();
      }
      if(appData[i].name == "Games"){
        openGames();
      }
      if(appData[i].name == "sheryains"){
        openSheryains();
      }
      if(appData[i].name == "Notepad"){
        openNotepad();
      }
      if(appData[i].name == "Calculator"){
        openCalculator();
      }
      if(appData[i].name == "Settings"){
        openSettings();
      }
      if(appData[i].name == "Camera"){
        openCamera();
      }
    });

    appContainer.append(appIcon,appName)

    windowsApp.append(appContainer);
  }

  

});

 let appData = [
  {
    id: 1,
    name: "Flipkart",
    img: "./assests/flipkart.avif"
  },
  {
    id: 2,
    name: "wikipedia",
    img: "./assests/wiki.png"
  },
  {
    id: 3,
    name: "Deepseek",
    img: "./assests/deepseek.png"
  },
  {
    id: 4,
    name: "Games",
    img: "./assests/games.jpg"
  },
  {
    id: 5,
    name: "sheryains",
    img: "./assests/logo.jpg"
  },
  {
    id: 6,
    name: "Notepad",
    img: "./assests/note.png"
  },
  {
    id: 7,
    name: "Calculator",
    img: "./assests/calculator.png"
  },
  {
    id: 8,
    name: "Settings",
    img: "./assests/settings.png"
  },
  {
    id: 9,
    name: "Camera",
    img: "./assests/photo.png"
  }
];

 console.log(appData);
// amazon 
function openFlipkart(){
  openWindow("https://www.flipkart.in", "_blank");
}

function openWikipedia(){
  window.openWindow("https://www.wikipedia.com")
}
function openGames(){
  openWindow("https://apps.microsoft.com/games?hl=en-US&gl=US");
}
function openSheryains(){
  openWindow("https://www.sheryians.com")
}
function openNotepad(){
  openWindow("notepad");
}
function openDeepseek(){
  openWindow("https://www.deepseek.com")
}
function openCamera(){
  openWindow("camera");
}

// app window 
function openWindow(appNameOrUrl) {
  const appWindow = document.createElement("div");
  appWindow.className = "window";

  const windowNav = document.createElement("div");
  windowNav.className = "window-nav";

  const navCont = document.createElement("div");
  navCont.className = "nav-cont";

  const closeBtn = document.createElement("button");
  closeBtn.className = "close-btn folder-btn";
  closeBtn.textContent = "✕";

  closeBtn.addEventListener("click", function () {
    appWindow.remove();
  });

  const windowDisplay = document.createElement("div");
  windowDisplay.className = "window-display";

  // Check if it's a notepad or URL
  if (appNameOrUrl === "notepad") {
    // Create a textarea for notepad
    const textarea = document.createElement("textarea");
    textarea.className = "notepad-textarea";
    textarea.placeholder = "Start typing your notes here...";
    windowDisplay.appendChild(textarea);
  } 
  if(appNameOrUrl == "camera"){

    // blackbackground for camera 

    windowDisplay.style.backgroundColor = "black"
    windowDisplay.style.display = "flex";
    windowDisplay.style.alignItems = "center";
    windowDisplay.style.justifyContent = "center";
    appWindow.style.backgroundColor = "black"
    appWindow.style.width = "70rem"

    const video = document.createElement("video");
    video.className = "camera-video";
    video.autoplay = true;
    windowDisplay.append(video)

    // capture button 
    const btnHolder = document.createElement("div")
    btnHolder.className = "btn-holder";
    const captureBtn = document.createElement("i");
    captureBtn.className = "fa-solid fa-camera-retro fa-2xl capture-btn"
    btnHolder.append(captureBtn);
    windowDisplay.append(btnHolder);

    // create img element to show photo 
    const photo = document.createElement("img");
    photo.className = "photo";
    windowDisplay.append(photo);
     


    // ask for camera permission
    navigator.mediaDevices.getUserMedia({video:true})
    .then(stream =>{
      video.srcObject = stream;

      // stop camera when window is closed 

      closeBtn.addEventListener("click",function(){
        stream.getTracks().forEach(track =>track.stop());
      });

      // photo capture logic

      captureBtn.addEventListener("click", () => {
  const canvas = document.createElement("canvas");
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;

  const ctx = canvas.getContext("2d");
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

  const imageUrl = canvas.toDataURL("image/png");
  photo.src = imageUrl;
});
    })
    .catch(err => {
        const errorMsg = document.createElement("p");
        errorMsg.textContent = "Camera access denied or not available.";
        windowDisplay.appendChild(errorMsg);
        console.error("Camera error:", err);
      }); 
  }
    else {
    // Otherwise, treat it as a URL and use iframe
    const frame = document.createElement("iframe");
    frame.src = appNameOrUrl;
    frame.className = "app-frame";
    windowDisplay.appendChild(frame);
  }

  navCont.appendChild(closeBtn);
  windowNav.appendChild(navCont);
  appWindow.append(windowNav, windowDisplay);
  bg.appendChild(appWindow);
}


// refresh the page
  const refresh = document.querySelector(".refresh");
  refresh.addEventListener("click", function(){
    location.reload();
  });

  // sort by 
 const sort = document.querySelector(".sort");

sort.addEventListener("click", function () {
  const icons = document.querySelectorAll(".icon");
  const spacing = 100;   // space between icons vertically
  const colSpacing = 100; // space between columns horizontally
  const startX = 20;
  const startY = 20;
  const maxPerColumn = 5; // how many icons per column

  icons.forEach((icon, index) => {
    const column = Math.floor(index / maxPerColumn); // which column
    const row = index % maxPerColumn;                // which row in that column

    icon.style.left = `${startX + column * colSpacing}px`;
    icon.style.top = `${startY + row * spacing}px`;
  });
});

// Wallpaper array (fixed folder name)
const wallpaper = [
  "./assests/bg-1.jpg",
  "./assests/bg2.jpg",
  "./assests/bg3.jpg",
  "./assests/bg4.png"
];

let currentIndex = 0;

// Get elements
const nextBg = document.querySelector(".next-bg");
const bgContainer = document.querySelector(".bg");

// Load saved background on page load
const savedBg = localStorage.getItem("selectedBackground");
if (savedBg) {
  bgContainer.style.backgroundImage = `url("${savedBg}")`;
}

// Next Background click
nextBg.addEventListener("click", function () {
  currentIndex = (currentIndex + 1) % wallpaper.length;
  const selectedBg = wallpaper[currentIndex]; // ✅ now it's defined
  bgContainer.style.backgroundImage = `url("${selectedBg}")`;

  // Save to localStorage
  localStorage.setItem("selectedBackground", selectedBg);
});

//  glass div 
const panel = document.querySelector(".panel")

let wrapperDiv;
let wrapperIcon;

panel.addEventListener("click", function () {
  console.log("clicked")
  if (flag === 0) {
    if (!wrapperDiv) {
      // Create div only once
      wrapperDiv = document.createElement("div");
      wrapperDiv.className = "wrapper-div";
      bg.append(wrapperDiv);

      const iconWrapper = document.createElement("div");
      iconWrapper.className = "icon-wrapper";
      wrapperDiv.append(iconWrapper);

      for (let i = 0; i <= 5; i++) {
        wrapperIcon = document.createElement("div");
        wrapperIcon.className = "wrapper-icon";

        const image = document.createElement("i");
        image.className = `${icons[i].img} image`;

        const iconName = document.createElement("span");
        iconName.className = "icon-name";
        iconName.innerText = icons[i].name;

        image.addEventListener("click", function () {
          if (flag == 0) {
            image.style.color = "white";
            flag = 1;
          } else {
            image.style.color = "blue";
            flag = 0;
          }
        });

        wrapperIcon.append(image, iconName);
        iconWrapper.append(wrapperIcon);
      }
    }

    // Show the wrapper div
    wrapperDiv.style.display = "flex";
    flag = 1; // ✅ update flag
  } else {
    // Hide the wrapper div
    if (wrapperDiv) {
      wrapperDiv.style.display = "none";
    }
    flag = 0; // ✅ update flag
  }
});


//  icons for wrapper 

const icons = [
  {
    id: 1,
    name: "WiFi",
    img: "fa-solid fa-wifi fa-xl"
  },
  {
    id: 2,
    name: "Airplane",
    img: "fa-solid fa-plane fa-xl"
  },
  {
    id: 3,
    name: "Bluetooth",
    img: "fa-brands fa-bluetooth-b fa-xl"
  },
  {
    id: 4,
    name: "Battery Saver",
    img: "fa-solid fa-battery-full fa-xl"
  },
  {
    id: 5,
    name: "Light Mode",
    img: "fa-solid fa-sun fa-xl"
  },
  {
    id: 6,
    name: "Sound",
    img: "fa-solid fa-volume-up fa-xl"
  }
];

