const URL = "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q="
const API = "&key=AIzaSyB4n0vFt7pW22vxeJgDLDaLfQdqOGW2e4M"
document.addEventListener('DOMContentLoaded', () => {
  //
  // const renderVideos = (videos) => {
  //   document.querySelector('#fullPage').innerHTML = ''
  //   for (const video of videos) {
  //     renderVideo(video)
  //   }
  // }
  //
  // const renderVideo = (video) => {
  //     const videoId = video.id.videoId
  //     const videosBox = document.querySelector('#fullPage')
  //     const videoDiv = document.createElement('section')
  //     videoDiv.setAttribute('class','section')
  //     videoDiv.innerHTML=`
  //       <iframe width="100%" height="100%" src="https://www.youtube.com/embed/${videoId}?autoplay=0""
  //       frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media;
  //       gyroscope; picture-in-picture" allowfullscreen></iframe>
  //     `
  //     videosBox.append(videoDiv)
  // }
  //
  // const renderData = (INPUT="husky") => {
  //   fetch(URL + INPUT + API)
  //     .then(resp => resp.json())
  //     .then(videos => {
  //       renderVideos(videos.items)
  //     })
  // }
  //
  // const searchHandler = () =>{
  //   const searchBar = document.querySelector('#search-bar')
  //   searchBar.addEventListener('submit', e=>{
  //     e.preventDefault()
  //     const form = e.target
  //     let searchInput = form.input.value
  //     renderData(searchInput)
  //     form.reset()
  //   })
  //
  // }
  //
  // const watching = (elements) =>{
  //   for (element of elements.children ){
  //     var rect = element.getBoundingClientRect()
  //     var elemTop = rect.top;
  //     var elemBottom = rect.bottom;
  //     var isVisible = (elemTop >=0) && (elemBottom <= window.innerHeight)
  //     if (isVisible){
  //       return element
  //     }
  //   }
  // }
  //
  // const body = document.querySelector('#fullPage')
  // const currentVideo = watching(body)
  // body.addEventListener('scroll', ()=>{
  //   if (currentVideo!= undefined){
  //     const frame = currentVideo.children[0]
  //     const pausedVideo = frame.src.slice(0,-1)
  //     const playVideo = pausedVideo + "1"
  //     frame.src = playVideo
  //     const lastVideo = currentVideo.previousSibling
  //     const lastFrame = lastVideo.children[0]
  //     const playingVideo = lastFrame.src.slice(0,-1)
  //     const stopedVideo = playingVideo + "0"
  //     lastFrame.src = stopedVideo
  //     const nextVideo = currentVideo.nextSibling
  //     const nextFrame = nextVideo.children[0]
  //     const nextplayingVideo = nextFrame.src.slice(0,-1)
  //     const nextstopedVideo = nextplayingVideo + "0"
  //     nextFrame.src = nextstopedVideo
  //   }
  // })

  const clickHandler = () =>{
    document.addEventListener('click', e=>{
      const clickTarget = e.target
      const icon  = clickTarget.parentElement
      const sidepanel = document.querySelector('.sidepanel')
      const closebutton = document.querySelector('#closebutton')
      const favorsidepanel = document.querySelector('.favorsidepanel')
      const favorclosebutton = document.querySelector('#favorclosebutton')

      if(icon.id == 'account' || icon.parentElement.id == 'account'){
        sidepanel.style.width = '300px';
        closebutton.style.right = '320px';
        closebutton.style.display = 'block';
      }else if(icon.id == 'heart' || icon.parentElement.id == 'heart'){
          clickTarget.src = 'src/redheart.png'
      }else if(icon.id == 'favorite' || icon.parentElement.id == 'favorite'){
        favorsidepanel.style.width = '300px';
        favorclosebutton.style.right = '320px';
        favorclosebutton.style.display = 'block';
      }else if(clickTarget.id == 'closebutton' || clickTarget.id == 'favorclosebutton' || clickTarget){
        sidepanel.style.width = '0';
        closebutton.style.display = "none";
        closebutton.style.right = "0";
        favorsidepanel.style.width = '0';
        favorclosebutton.style.display = "none";
        favorclosebutton.style.right = "0";
      }
    })

    document.addEventListener('click', e=>{
      const loginform = document.querySelector('.loginform')
      const signupform = document.querySelector('.signupform')
      const button = e.target
      if(button.id == "loginbutton"){
        loginform.style.display ="flex";
      }else if (button.id == "signup"){
        console.log('signup')
        signupform.style.display ="flex";
        loginform.style.display ="none";
      }else if (button.id == "closeform"){
        loginform.style.display ="none";
        signupform.style.display ="none";
      }
    })

  }

  /* ----------- */
  // renderData()
  // searchHandler()
  clickHandler()
})
