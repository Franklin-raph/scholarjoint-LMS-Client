function toggleNav(){
    document.querySelector('.hero ul').classList.toggle('showNav')
}

document.querySelector('.signupBtn').addEventListener('click', () => {
  // document.querySelector('#signupmodal').style.visibility = "visible"
  document.querySelector('#signupmodal').classList.add('showModal')

})

document.querySelector('.closeModal').addEventListener('click', () => {
  // document.querySelector('#signupmodal').style.visibility = "hidden"
  document.querySelector('#signupmodal').classList.remove('showModal')
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