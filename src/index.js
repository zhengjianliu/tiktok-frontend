const URL = "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&q="
const API = "&key=AIzaSyDhk-6B4fZIARhe1qZdr3MiSs-QIPQN2Fg"
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
      const videoDiv = document.createElement('div')
      videoDiv.setAttribute('class','section')
      videoDiv.setAttribute('id','video')
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

  /* ----------- */
  renderData()
  searchHandler()
})
