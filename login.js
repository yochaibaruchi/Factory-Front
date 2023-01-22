async function logIn() {
    let userName = document.getElementById('userName')
    let password = document.getElementById('password')
    let passwordDiv = document.getElementById('passwordDiv')
    let resp = await fetch(`https://localhost:44319/api/user?userName=${userName.value}&password=${password.value}`)
    let data = await resp.json();
    if (data) {
        location.href = "home.html"
        sessionStorage.setItem('userName', userName.value)

    } else {
        let span = document.createElement('span')
        span.innerText = "wrong user name or password!"
        span.classList = "paswwordDiv"
        passwordDiv.appendChild(span)
    }
}


