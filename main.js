let userName = (sessionStorage.getItem('userName'))


function logout() {
    sessionStorage.clear()
    location.replace("loginPage.html")
}

function getUserName() {
    let userPlace = document.getElementById('user')
    userPlace.innerText = (`welcome, ${userName}`)
}

const userActions = async () => {
    let resp = await fetch("https://localhost:44319/api/user?name=" + userName);
    let user = await resp.json();
    let lastAction = user.last_action.slice(0, 10);
    let today = new Date().toISOString().slice(0, 10);

    console.log(userName);
    console.log(user);
    console.log(user.actions);

    if (lastAction != today) {
        let obj = {
            user_id: user.user_id,
            full_name: user.full_name,
            user_name: user.user_name,
            password: user.password,
            actions: 9,
            last_action: today
        }
        let fetchParams = {
            method: "PUT",
            body: JSON.stringify(obj),
            headers: { "content-type": "application/json" }
        }

        await fetch("https://localhost:44319/api/user/" + user.user_id, fetchParams)
    } if (lastAction === today && user.actions > 0) {

        let obj = {
            user_id: user.user_id,
            full_name: user.full_name,
            user_name: user.user_name,
            password: user.password,
            actions: (user.actions - 1),
            last_action: user.last_action
        }
        let fetchParams = {
            method: "PUT",
            body: JSON.stringify(obj),
            headers: { "content-type": "application/json" }
        }
        await fetch("https://localhost:44319/api/user/" + user.user_id, fetchParams)

    } if (lastAction === today && user.actions === 0) {
        alert('you have no actions left, you will be loged out now.')
        logout();
    }



}







const CheckUserActions = async () => {
    let resp = await fetch("https://localhost:44319/api/user?name=" + userName);
    let user = await resp.json();
    let lastAction = user.last_action.slice(0, 10);
    let today = new Date().toISOString().slice(0, 10);

    console.log(userName);
    console.log(user);
    console.log(user.actions);

    if (lastAction != today) {
        let obj = {
            user_id: user.user_id,
            full_name: user.full_name,
            user_name: user.user_name,
            password: user.password,
            actions: 9,
            last_action: today
        }
        let fetchParams = {
            method: "PUT",
            body: JSON.stringify(obj),
            headers: { "content-type": "application/json" }
        }

        await fetch("https://localhost:44319/api/user/" + user.user_id, fetchParams)
    } if (lastAction === today && user.actions === 0) {
        alert('you have no actions left, you will be loged out now.')
        logout();
    }



}