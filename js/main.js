const signUpModal = document.querySelector('#signupmodal')
const loaderContainer = document.querySelector('.loaderContainer')
const errorMessage = document.querySelector('.error')

document.querySelector('.signInText span').addEventListener('click', ()=>{
  document.querySelector('.singUpForm').style.display = "none"
  document.querySelector('.singInForm').style.display = "flex"
})

document.querySelector('.signUpText span').addEventListener('click', ()=>{
  document.querySelector('.singUpForm').style.display = "flex"
  document.querySelector('.singInForm').style.display = "none"
})

function toggleNav(){
    document.querySelector('.hero ul').classList.toggle('showNav')
}

document.querySelector('.signupBtn').addEventListener('click', () => {
  signUpModal.classList.add('showModal')

})

document.querySelector('.closeModal').addEventListener('click', () => {
  signUpModal.classList.remove('showModal')
})

document.querySelector('.closeErrorModal').addEventListener('click', ()=>{
  errorMessage.style.display = 'none'
})

$(".courseSlider").slick({

    // normal options...
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    dots: true,
  
    // the magic
    responsive: [{
        breakpoint: 1800,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        }
  
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        }
  
      }, {
  
        breakpoint: 900,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          dots: true
        }
  
      }, {
  
        breakpoint: 600,
        settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: true
          }
      }]
  });

  $('.counter').counterUp({
    delay:10,
    time: 5000
  });

  const form = document.querySelector('form')
  form.addEventListener('submit', (e)=> {
    e.preventDefault()
    const userData = {
      'first_name':e.target['firstName'].value,
      'last_name':e.target['lastName'].value,
      'email':e.target['email'].value,
      'password':e.target['password'].value
    }

    if(!userData.email || !userData.password || !userData.last_name || !userData.first_name){
      errorMessage.style.display = "flex"
      return;
    }else{
      loaderContainer.style.display = 'flex'
      signUp(userData)
    }
  })

async function signUp(userData){
  const response = await fetch('https://onlinelearn.pythonanywhere.com/accounts/registration/',{
    method: "POST",
    body: JSON.stringify(userData),
    headers: {
      'Content-Type':'application/json'
    }
  })
  const data = await response.json()
  if(response.ok){
    document.querySelector('.verifyEmailModal').style.display = 'flex'
    loaderContainer.style.display = 'none'
    form.reset()
    form.style.display = 'none'
  }else{
    loaderContainer.style.display = 'none'
    errorMessage.style.display = "flex"
    errorMessage.innerHTML = `<p>${data.email}</p>
    <i class="ri-close-circle-line"></i>
    `
  }
  console.log(response)
  console.log(data)
}

errorMessage.addEventListener('click', (e)=>{
  if(e.target.classList.contains('ri-close-circle-line')){
    e.target.parentElement.style.display = 'none'
  }
})

signUpModal.addEventListener('click', (e)=>{
  if(e.target.classList.contains('closeEmailVerificationModal')){
    signUpModal.classList.remove('showModal')
    document.querySelector('.verifyEmailModal').style.display = "none"
    form.style.display = "flex"
  }
})