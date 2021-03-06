const URL = "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q="
// const API = "&key=AIzaSyCSkMKPgnggWErxAVDi3JzpBzFqSXMAb8A"
const API = "&key=AIzaSyA7pVjal6z-g2ntXmu54b6kqupXSYTqKGk"
// const API = "&key=AIzaSyAyGxCI67UJ5w1q5jx7u8HTpHurRoCH7ok"
let nextpage = ""
let searchinput = "music"
document.addEventListener('DOMContentLoaded', () => {
  const renderVideos = (videos) => {
    // document.querySelector('#fullPage').innerHTML = ''
    for (const video of videos) {
      renderVideo(video)
    }
  }

  const renderVideo = (video) => {
    const videoId = video.id.videoId
    if (videoId !== undefined) {
      const videosBox = document.querySelector('#fullPage')
      const videoDiv = document.createElement('section')
      videoDiv.setAttribute('class', 'section')
      videoDiv.setAttribute('data-video-id', `${videoId}`)
      videoDiv.innerHTML = `
          <iframe width="100%" height="100%" src="https://www.youtube.com/embed/${videoId}?autoplay=0""
          frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media;
          gyroscope; picture-in-picture" allowfullscreen></iframe>
        `
      videosBox.append(videoDiv)
    }
  }

  const renderData = (searchinput, token = '&pageToken=' + nextpage) => {
    if (token == "&pageToken=") {
      token = ""
    }
    if (searchinput == undefined) {
      searchinput = "music"
    }
    fetch(URL + searchinput + token + API)
      .then(resp => resp.json())
      .then(videos => {
        renderVideos(videos.items)
        nextpage = videos.nextPageToken
      })
  }

  const searchHandler = () => {
    const searchBar = document.querySelector('#search-bar')
    searchBar.addEventListener('submit', e => {
      e.preventDefault()
      const form = e.target
      searchinput = form.input.value
      renderData(searchinput)
      form.reset()
      document.querySelector('#fullPage').innerHTML = ''
    })
  }

  const watching = (elements) => {
    for (element of elements.children) {
      var rect = element.getBoundingClientRect()
      var elemTop = rect.top;
      var elemBottom = rect.bottom;
      var isVisible = (elemTop >= 0) && (elemBottom <= window.innerHeight)
      if (isVisible) {
        return element
      }
    }
  }

  const body = document.querySelector('#fullPage')

  body.addEventListener('scroll', () => {
    const currentVideo = watching(body)
    if (currentVideo != undefined) {
      const frame = currentVideo.children[0]
      const pausedVideo = frame.src.slice(0, -1)
      const playVideo = pausedVideo + "1"
      frame.src = playVideo
      const lastVideo = currentVideo.previousSibling
      const lastFrame = lastVideo.children[0]
      const playingVideo = lastFrame.src.slice(0, -1)
      const stopedVideo = playingVideo + "0"
      lastFrame.src = stopedVideo
      const nextVideo = currentVideo.nextSibling
      if (nextVideo === null) {
        renderData(searchinput)
      } else {
        const nextFrame = nextVideo.children[0]
        const nextplayingVideo = nextFrame.src.slice(0, -1)
        const nextstopedVideo = nextplayingVideo + "0"
        nextFrame.src = nextstopedVideo
      }
    }

    const sidepanel = document.querySelector('.sidepanel')
    const closebutton = document.querySelector('#closebutton')
    const favorsidepanel = document.querySelector('.favorsidepanel')
    const favorclosebutton = document.querySelector('#favorclosebutton')
    sidepanel.style.width = '0';
    closebutton.style.display = "none";
    closebutton.style.right = "0";
    favorsidepanel.style.width = '0';
    favorclosebutton.style.display = "none";
    favorclosebutton.style.right = "0";


  })

  const clickHandler = () => {
    document.addEventListener('click', e => {
      const clickTarget = e.target
      const icon = clickTarget.parentElement
      const sidepanel = document.querySelector('.sidepanel')
      const closebutton = document.querySelector('#closebutton')
      const favorsidepanel = document.querySelector('.favorsidepanel')
      const favorclosebutton = document.querySelector('#favorclosebutton')
      const videoDiv = document.querySelector('.videos')

      if (icon.id == 'account' || icon.parentElement.id == 'account') {
        sidepanel.style.width = '300px';
        closebutton.style.right = '320px';
        closebutton.style.display = 'block';
      } else if (icon.id == 'heart' || icon.parentElement.id == 'heart') {
        const currentVideo = watching(body)
        const videoId = currentVideo.dataset.videoId

        const options ={
          method: "POST",
          headers:{
            "content-type": "application/json",
            "accept": "application/json"
          },
          body: JSON.stringify({user_id: userId, favor_videos: videoId})
        }
        fetch(favorUrl, options)
        .then(resp => resp.json())
        .then(video=>{
          const videoframe = document.createElement('span')
          videoframe.innerHTML = `
          <img data-thumbnail-id="${videoId}" id="thumbnail" src="https://i.ytimg.com/vi/${videoId}/hqdefault.jpg"><img id='remove' data-delete-id="${video.id}"src="src/close.png"></img></img>
          `
          videoDiv.append(videoframe)
        })

      } else if (icon.id == 'favorite' || icon.parentElement.id == 'favorite') {
        favorsidepanel.style.width = '300px';
        favorclosebutton.style.right = '320px';
        favorclosebutton.style.display = 'block';
      } else if (clickTarget.id == 'closebutton' || clickTarget.id == 'favorclosebutton' || clickTarget.id == 'logout') {
        sidepanel.style.width = '0';
        closebutton.style.display = "none";
        closebutton.style.right = "0";
        favorsidepanel.style.width = '0';
        favorclosebutton.style.display = "none";
        favorclosebutton.style.right = "0";
      }
    })

    document.addEventListener('click', e => {
      const loginform = document.querySelector('.loginform')
      const signupform = document.querySelector('.signupform')
      const button = e.target
      if (button.id == "loginbutton") {
        loginform.style.display = "flex";
      } else if (button.id == "signup") {
        signupform.style.display = "flex";
        loginform.style.display = "none";
      } else if (button.id == "closeform") {
        loginform.style.display = "none";
        signupform.style.display = "none";
      }
    })
  }

  /* ----------- */
  renderData()
  searchHandler()
  clickHandler()
})
