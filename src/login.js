document.addEventListener('DOMContentLoaded', () => {
  const userUrl = "http://localhost:3000/api/v1/users/"
  const loginform = document.querySelector('#login-form')
  const signupform = document.querySelector('#signup-form')
  const stickybuttons = document.querySelector('.sticky-button')
  let userId = ''

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
            }
          }
        }
      })
  }

  const clickHandler = () => {
    document.addEventListener('click', e => {
      const button = e.target
      if (button.id == "loginbutton") {
        loginform.style.display = "block"
        loginform.lastChild.innerHTML = ''
      } else if (button.id == 'logout') {
        userId = ''
        const stickybutton = stickybuttons.children
        const account = stickybutton[0].style.display = 'none';
        const heart = stickybutton[1].style.display = 'none';
        const favor = stickybutton[2].style.display = 'none';
        const login = stickybutton[3].style.display = 'block';
      }
    })
  }


  /*----------*/
  loginHandler()
  clickHandler()


})
