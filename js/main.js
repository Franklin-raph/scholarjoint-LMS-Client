const signUpModal = document.querySelector("#signupmodal");
const loaderContainer = document.querySelector(".loaderContainer");
const errorMessage = document.querySelector(".error");
const navLinks = document.querySelector(".hero ul");
const courseModal = document.querySelector("#courseModal");
console.log(courseModal);

document.addEventListener("DOMContentLoaded", getTracks(), getAllCourses());

async function getAllCourses() {
  const response = await fetch("https://onlinelearn.pythonanywhere.com/all-courses/", {
    method: "GET",
  });
  const data = await response.json();
  console.log(data);
  data.forEach((course) => {
    const courses = document.createElement("div");
    courses.classList.add("course");
    // <img src=${course.course_img} alt="" />
    courses.innerHTML += `
    <img src="../images/api2.jpg"} alt="" />
          <div class="courseInfo">
            <p>${course.title}</p>
            <div class="courseFormat">
              <ul>
                <li>
                  <i class="ri-checkbox-circle-line"></i>
                  <span>Online</span>
                </li>
                <li>
                  <i class="ri-checkbox-circle-line"></i>
                  <span>${course.duration}</span>
                </li>
                <li>
                  <i class="ri-checkbox-circle-line"></i>
                  <span>${course.lesson_duration}</span>
                </li>
              </ul>
              <p class="level">${course.level}</p>
            </div>
            <div class="courseFooter">
              <div>
                <button class="viewCourse" onclick="getCourseDetails(${course.id})">view course</button>
              </div>
            </div>
          </div>
  `;
    document.querySelector(".courseCards").appendChild(courses);
  });
}

async function getCourseDetails(id) {
  document.querySelector(".loaderContainer").style.display = "flex";
  const response = await fetch(`https://onlinelearn.pythonanywhere.com/course_detail/${id}/`);
  const data = await response.json();
  if (response) {
    document.querySelector(".loaderContainer").style.display = "none";
  }
  if (response.ok) {
    courseModal.style.display = "flex";
    courseModal.innerHTML = `
    <div class="courseInfomation">
            <i class="ri-close-circle-line closeModal" onclick="closeModal()"></i>
            <h3>${data.title}</h3>
            <p>${data.description}</p>
            <div class="courseFormat">
                <ul>
                    <li>
                        <i class="ri-checkbox-circle-line"></i>
                        <span>${data.duration}</span>
                    </li>
                    <li>
                        <i class="ri-checkbox-circle-line"></i>
                        <span>${data.lesson_duration}</span>
                    </li>
                    <li>
                        <i class="ri-checkbox-circle-line"></i>
                        <span>${data.mode}</span>
                    </li>
                </ul>
                <p class="level">${data.level}</p>
            </div>
        </div>
    `;
  }
}

function closeModal() {
  courseModal.style.display = "none";
}

async function getTracks() {
  const response = await fetch("https://onlinelearn.pythonanywhere.com/List-all-tracks/", {
    method: "GET",
  });
  const data = await response.json();
  localStorage.setItem("tracks", JSON.stringify(data));
  console.log(data);
}

function toggleNav() {
  navLinks.classList.toggle("showNav");
}

document.querySelector(".signupBtn").addEventListener("click", () => {
  signUpModal.classList.add("showModal");
  document.querySelector(".singUpForm").style.display = "flex";
});

document.querySelectorAll(".closeModal").forEach((closemodalIcon) => {
  closemodalIcon.addEventListener("click", () => {
    signUpModal.classList.remove("showModal");
  });
});

document.querySelector(".closeErrorModal").addEventListener("click", () => {
  errorMessage.style.display = "none";
});

$(".courseSlider").slick({
  // normal options...
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2000,
  dots: true,

  // the magic
  responsive: [
    {
      breakpoint: 1800,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 900,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        dots: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: true,
      },
    },
  ],
});

$(".counter").counterUp({
  delay: 10,
  time: 5000,
});

// Populating the select field with the array of data in local storage
const tracks = JSON.parse(localStorage.getItem("tracks")) || [];
console.log(tracks);
function populateSelect() {
  let element = document.querySelector("select");
  tracks.forEach(function (track) {
    element.innerHTML += '<option value="' + track.id + '">' + track.title + "</option>";
  });
}

function show(id) {
  console.log(id);
  if (!id) {
    // msg.innerHTML = "None selected";
  } else {
    for (var i = 0; i < tracks.length; i++) {
      if (Number(id) === tracks[i].id) {
        break;
      }
    }
  }
}

populateSelect();

const form = document.querySelector(".singUpForm");
console.log(form);
form.addEventListener("submit", function (e) {
  e.preventDefault();
  const userData = {
    first_name: e.target["firstName"].value,
    last_name: e.target["lastName"].value,
    email: e.target["email"].value,
    password: e.target["password1"].value,
    track: e.target["track"].value,
  };

  if (!userData.email || !userData.password || !userData.last_name || !userData.first_name || !userData.track) {
    errorMessage.style.display = "flex";
    return;
  } else {
    loaderContainer.style.display = "flex";
    signUp(userData);
  }
});

async function signUp(userData) {
  // console.log(userData);
  const response = await fetch("https://onlinelearn.pythonanywhere.com/accounts/registration/", {
    method: "POST",
    body: JSON.stringify(userData),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  if (response.ok) {
    document.querySelector(".verifyEmailModal").style.display = "flex";
    loaderContainer.style.display = "none";
    form.reset();
    form.style.display = "none";
  } else {
    loaderContainer.style.display = "none";
    errorMessage.style.display = "flex";
    errorMessage.innerHTML = `<p>${data.email}</p>
    <i class="ri-close-circle-line"></i>
    `;
  }
  console.log(response);
  console.log(data);
}

errorMessage.addEventListener("click", (e) => {
  if (e.target.classList.contains("ri-close-circle-line")) {
    e.target.parentElement.style.display = "none";
  }
});

signUpModal.addEventListener("click", (e) => {
  if (e.target.classList.contains("closeEmailVerificationModal")) {
    signUpModal.classList.remove("showModal");
    document.querySelector(".verifyEmailModal").style.display = "none";
    form.style.display = "flex";
  }
});

// const login = document.querySelector('.singInForm')
// login.addEventListener('submit', (e)=>{
//   e.preventDefault()
//   const userLoginData = {
//     'email':e.target['email'].value,
//     'password':e.target['password'].value
//   }

//   if(!userLoginData.email || !userLoginData.password){
//     errorMessage.style.display = "flex"
//     return;
//   }else{
//     loaderContainer.style.display = 'flex'
//     location.href = "http://127.0.0.1:5173/dashboard"
//   }
// })

// function logIn(e){
//   e.preventDefault()
//   console.log("first")
//   location.replace = "http://127.0.0.1:5173/dashboard"
// }
