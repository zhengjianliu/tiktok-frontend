const URL = "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&q="
const API = "&key=AIzaSyBLLg76TCqpdFTUARyTwYrgRhnxnesChRs"
document.addEventListener('DOMContentLoaded', () => {

  const renderVideos = (videos) => {
    document.querySelector('#fullPage').innerHTML = ''
    for (const video of videos) {
      renderVideo(video)
    }
  }

  const renderVideo = (video) => {
      const videoId = video.id.videoId
      const videosBox = document.querySelector('#fullPage')
      const videoDiv = document.createElement('section')
      videoDiv.setAttribute('class','section')
      videoDiv.innerHTML = `
      <iframe width="100%" height="100%" src="https://www.youtube.com/embed/${videoId}?autoplay=0""
        frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media;
        gyroscope; picture-in-picture" allowfullscreen></iframe>
      `
      videosBox.append(videoDiv)
  }

  const renderData = (INPUT="music") => {
    fetch(URL + INPUT + API)
      .then(resp => resp.json())
      .then(videos => {
        renderVideos(videos.items)
      })
  }

  const searchHandler = () =>{
    const searchBar = document.querySelector('#search-bar')
    searchBar.addEventListener('submit', e=>{
      e.preventDefault()
      const form = e.target
      let searchInput = form.input.value
      renderData(searchInput)
    })

  }

  const validation = (elements) =>{
    for (element of elements.children ){
      var rect = element.getBoundingClientRect()
      var elemTop = rect.top;
      var elemBottom = rect.bottom;
      var isVisible = (elemTop >=0) && (elemBottom <= window.innerHeight)
      if (isVisible){
        return element
      }
    }
  }

  const body = document.querySelector('#fullPage')

  body.addEventListener('scroll', ()=>{
    const currentVideo = validation(body)
    if (currentVideo!= undefined){
      const frame = currentVideo.children[0]
      const pausedVideo = frame.src.slice(0,-1)
      const playVideo = pausedVideo + "1"
      frame.src = playVideo
      console.log(frame.src)
    }
  })

  /* ----------- */
  renderData()
  searchHandler()

})
