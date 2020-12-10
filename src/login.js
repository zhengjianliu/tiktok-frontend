let userId = ''
const userUrl = "http://localhost:3000/api/v1/users/"
const favorUrl = "http://localhost:3000/api/v1/favors/"
document.addEventListener('DOMContentLoaded', () => {
  const loginform = document.querySelector('#login-form')
  const signupform = document.querySelector('#signup-form')
  const stickybuttons = document.querySelector('.sticky-button')
  const videoDiv = document.querySelector('.videos')

  const loginHandler = () => {
    loginform.addEventListener('submit', e => {
      e.preventDefault()
      const form = e.target
      let username = form.username.value
      let password = form.password.value
      form.lastChild.remove()
      validation(username, password)
      form.reset()
      const errors = document.createElement('p')
      errors.innerHTML = `Invalid Username or Password`
      errors.style.color = 'red';
      form.append(errors)
    })

    signupform.addEventListener('submit',e=>{
      e.preventDefault()
      const form = e.target
      const username = form.username.value
      const fullname = form.fullname.value
      const password = form.password.value
      const newuser = {userName: username, fullName: fullname, password: password}

      const options = {
        method: "POST",
        headers:{
          "content-type": "application/json",
          "accept": "application/json"
        },
        body: JSON.stringify(newuser)
      }
      fetch(userUrl, options)
      .then(resp => resp.json())

      form.reset()
      signupform.style.display = 'none'
      const stickybutton = stickybuttons.children
      const account = stickybutton[0].style.display = 'block';
      const heart = stickybutton[1].style.display = 'block';
      const favor = stickybutton[2].style.display = 'block';
      const login = stickybutton[3].style.display = 'none';
      const name = document.querySelector('#username')
      name.textContent = newuser.fullName

    })

  }

  const validation = (username, password) => {
    fetch(userUrl)
      .then(resp => resp.json())
      .then(users => {
        for (const user of users) {
          if (username == user.userName && password == user.password) {
            userId = user.id
            loginform.style.display = "none"
            if (userId != '') {
              const stickybutton = stickybuttons.children
              const account = stickybutton[0].style.display = 'block';
              const heart = stickybutton[1].style.display = 'block';
              const favor = stickybutton[2].style.display = 'block';
              const login = stickybutton[3].style.display = 'none';
              const name = document.querySelector('#username')
              name.textContent = user.fullName
              renderFavors(user)
            }
          }
        }
      })
  }

  const renderFavors = (user) =>{
    fetch(favorUrl)
    .then(resp => resp.json())
    .then(videos =>{
      renderFavorVideo(videos,user)
    })
  }

  const renderFavorVideo = (videos,user) =>{
    for (video of videos){
      if(video.user_id == user.id){
        const videoframe = document.createElement('span')
        videoframe.innerHTML = `
        <img data-thumbnail-id="${video.favor_videos}" id="thumbnail" src="https://i.ytimg.com/vi/${video.favor_videos}/hqdefault.jpg"><img id='remove' data-delete-id="${video.id}"src="src/close.png"></img></img>
        `
        videoDiv.append(videoframe)
      }
    }
  }




  const signinHandler = () => {
    document.addEventListener('click', e => {
      const button = e.target
      if (button.id == "loginbutton") {
        loginform.style.display = "block"
        loginform.lastChild.innerHTML = ''
        loginform.classList.add('active');
      } else if (button.id == 'logout') {
        userId = ''
        const stickybutton = stickybuttons.children
        const account = stickybutton[0].style.display = 'none';
        const heart = stickybutton[1].style.display = 'none';
        const favor = stickybutton[2].style.display = 'none';
        const login = stickybutton[3].style.display = 'block';
        videoDiv.innerHTML = ''
      }
    })
  }

  const clickHandler = () =>{
    videoDiv.addEventListener('click', e=>{
      const videoId = e.target.dataset.thumbnailId
      document.querySelector('#fullPage').innerHTML = ''
      renderVideo(videoId)
      const deleteButton = e.target
      if(deleteButton.id == 'remove'){

        const deleteTarget = deleteButton.dataset.deleteId
        const options = {
          method: "DELETE"
        }
        fetch(favorUrl + deleteTarget,options)
        .then(resp => resp.json())
        .then(_favor=>{
          deleteButton.parentElement.remove()
        })
      }
    })
  }

  const renderVideo = (videoId) => {
    if (videoId !== undefined) {
      const videosBox = document.querySelector('#fullPage')
      const videoDiv = document.createElement('section')
      videoDiv.setAttribute('class', 'section')
      videoDiv.setAttribute('data-video-id', `${videoId}`)
      videoDiv.innerHTML = `
          <iframe width="100%" height="100%" src="https://www.youtube.com/embed/${videoId}?autoplay=1""
          frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media;
          gyroscope; picture-in-picture" allowfullscreen></iframe>·
        `
      videosBox.append(videoDiv)

    }
  }

  /*----------*/
  loginHandler()
  signinHandler()
  clickHandler()



})
