/* Create acc dio : - Alem*/
if (window.location.pathname == "/createA.html"){ // ovaj dio koda radi samo ako je taj hmtl ocitan
const emailCreate       = document.querySelector("#emailCreate")
const passCreate        = document.querySelector("#passCreate")
const createAccButton   = document.querySelector("#createAccButton")
const createAccForm     = document.querySelector("#createAccForm")

const createdAccounts = []

class User {
    static ID = 0;
    constructor(email, password){
    this.email = email
    this.password = password
    this.uniqueID = String(++User.ID).padStart(4, '0')
    }
}

createAccButton.addEventListener("click", (event) => {
    event.preventDefault()
    const newUser = new User(emailCreate.value, passCreate.value)
    createdAccounts.push(newUser)
    localStorage.setItem("users", JSON.stringify(createdAccounts))
})
}
/* Create acc dio zavrsen*/
/*Login dio - Alem*/
if (window.location.pathname == "/loginA.html"){
const emailLogin    = document.querySelector("#emailLogin")
const passLogin     = document.querySelector("#passLogin")
const logInButton   = document.querySelector("#logInButton")
const loginForm     = document.querySelector("#loginForm")

const createdAccounts = JSON.parse(localStorage.getItem("users"))
console.log(createdAccounts[0])
console.log(createdAccounts[1])
console.log(createdAccounts[2])
console.log(createdAccounts.length)

logInButton.addEventListener("click", (event) => {
    event.preventDefault()
    let emailErrorMessage = document.querySelector("#emailErrorMessage")
    let passErrorMessage  = document.querySelector("#passErrorMessage")
    let successfulLogin   = document.querySelector("#successfulLogin")
    emailLogin.addEventListener("input", () => {
        emailErrorMessage.style.opacity = "0"
    })
    passLogin.addEventListener("input", () => {
        passErrorMessage.style.opacity = "0"
    })
    
    const searchedUser = createdAccounts.find(user => user.email == emailLogin.value)
    if (!searchedUser){
        emailErrorMessage.style.opacity = "100"
        emailLogin.value = ''
        return
    }
    if (passLogin.value != searchedUser.password){
        passErrorMessage.style.opacity = "100"
        passLogin.value = ''
        return
    }
    successfulLogin.style.opacity = "100"
    //window.location.href = "BEJDIN FRONT PAGE PLACEHOLDER.html";
})

}
/* Login dio zavrsen - Alem*/