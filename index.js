/*Login dio - Alem*/ // ovaj dio koda radi samo ako je taj hmtl ocitan
if (window.location.pathname == "/loginA.html"){
const emailLogin    = document.querySelector("#emailLogin")
const passLogin     = document.querySelector("#passLogin")
const logInButton   = document.querySelector("#logInButton")
const loginForm     = document.querySelector("#loginForm")

logInButton.addEventListener("click", () => {
    if(emailLogin.value != testChecking){
        alert("Invalid email")
        loginForm.reset()
        return
    }
    if(passLogin.value != testChecking){
        alert("Invalid password")
        loginForm.reset()
        return
    }
    
})
}
/* Login dio zavrsen - Alem*/
/* Create acc dio : */
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

createAccButton.addEventListener("click", () => {
    const newUser = new user(emailCreate.value, passCreate.value)
    createdAccounts.push(newUser)
    console.log(createdAccounts)
    console.log(createdAccounts[0])
})
}
/* Create acc dio zavrsen*/