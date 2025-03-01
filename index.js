/* Create acc dio : - Alem*/
if (window.location.pathname == "/createA.html"){ // ovaj dio koda radi samo ako je taj hmtl ocitan
const emailCreate       = document.querySelector("#emailCreate")
const passCreate        = document.querySelector("#passCreate")
const createAccButton   = document.querySelector("#createAccButton")
const createAccForm     = document.querySelector("#createAccForm")

const createdAccounts = []

function user(email, password){
    this.email = email
    this.password = password
}

createAccButton.addEventListener("click", (event) => {
    event.preventDefault()
    const newUser = new user(emailCreate.value, passCreate.value)
    createdAccounts.push(newUser)

    const registeredUsers = JSON.stringify(createdAccounts)
    localStorage.setItem("users", registeredUsers)
})
}
/* Create acc dio zavrsen*/
/*Login dio - Alem*/
if (window.location.pathname == "/loginA.html"){
const emailLogin    = document.querySelector("#emailLogin")
const passLogin     = document.querySelector("#passLogin")
const logInButton   = document.querySelector("#logInButton")
const loginForm     = document.querySelector("#loginForm")

logInButton.addEventListener("click", (event) => {
    event.preventDefault()
    if(emailLogin.value != 'test'){
        alert("Invalid email")
        emailLogin.value = ''
        return
    }
    else if(passLogin.value != 'test'){
        alert("Invalid password")
        passLogin.value = ''
        return
    }
    //window.location.href = "frontPage.html";
    const newRegisteredUser = JSON.parse(localStorage.getItem("users"))
    console.log(newRegisteredUser[0])
})
}
/* Login dio zavrsen - Alem*/