
/* Emir dio - create acc */

if (window.location.pathname == "/createAccount.html"){

    const form = document.getElementById("form");
    const password = document.getElementById("password");
    const newPassword = document.getElementById("new-password");
    const emailInput = document.querySelector("input[type='email']");
    const phoneInput = document.querySelector("input[type='tel']");
    const accountTypes = document.querySelectorAll("input[name='type-acc']");
    const submitButton = document.querySelector("button[type='submit']");

    const createdAccounts = []

    let selectedAccountType = ''  // Pravi error ako ga ne definisem
    class User {
        static ID = 0;
        accountType = selectedAccountType;
        constructor(name, surname, email, phone, password){
        this.name = name
        this.surname = surname
        this.email = email
        this.phone = phone
        this.password = password
        this.uniqueID = String(++User.ID).padStart(4, '0')
        }
    }

    submitButton.addEventListener("click", (event) => {
      event.preventDefault(); // Sprječava osvježavanje stranice
    
      // Prikupljanje podataka
      const name =document.querySelector("input[placeholder='Insert Name']").value.trim() ||"";
      const surname =document.querySelector("input[placeholder='Insert Surname']").value.trim() || "";
      const email = emailInput.value.trim() || "";
      const phone = phoneInput.value.trim() || "";
      const pass = password.value.trim() || "";
      const confirmPass = newPassword.value.trim() || "";
    
      accountTypes.forEach((radio) => {
        if (radio.checked) {
          selectedAccountType = radio.value; // Koristi value umjesto textContent
        }
      });
    
      // Validacija
      if (!name ||!surname ||!email ||!phone ||!pass ||!confirmPass ||!selectedAccountType) {
        alert("Sva polja moraju biti popunjena!");
        return;
      }
    
      if (!validateEmail(email)) {
        alert("Unesite validnu e-mail adresu!");
        return;
      }

      const alreadyExistingEmail = createdAccounts.find(user => user.email == email) // Trazi vec postojeci email
      if (alreadyExistingEmail) {
        alert("Email vec se koristi!");
        return;
      }
    
      if (!validatePhone(phone)) {
        alert("Unesite validan broj telefona! (Primjer: +38761123456)");
        return;
      }
    
      if (pass.length < 6) {
        alert("Lozinka mora imati najmanje 6 karaktera!");
        return;
      }
    
      if (pass !== confirmPass) {
        alert("Lozinke se ne podudaraju!");
        return;
      }

        const newUser = new User(name, surname, email, phone, pass)
        createdAccounts.push(newUser)
        localStorage.setItem("users", JSON.stringify(createdAccounts))

        form.reset()

    });
    
    // Funkcija za validaciju e-maila
    function validateEmail(email) {
      const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      return re.test(email);
    }
    
    // Funkcija za validaciju broja telefona
    function validatePhone(phone) {
      const re = /^\+?[0-9]{9,15}$/; // Dozvoljava brojeve telefona sa ili bez "+"
      return re.test(phone);
    }

}

/* Create acc dio zavrsen*/
/*Login dio - Alem*/

if (window.location.pathname == "/loginAccount.html"){
const emailLogin    = document.querySelector("#emailLogin")
const passLogin     = document.querySelector("#passLogin")
const logInButton   = document.querySelector("#logInButton")

const createdAccounts = JSON.parse(localStorage.getItem("users"))

console.log(createdAccounts[0]) // U konzoli da provjerim postojece accounts
console.log(createdAccounts[1])
console.log(createdAccounts[2])
console.log(createdAccounts[3])
console.log(createdAccounts[4])
console.log(createdAccounts[5])
console.log("Accounts: ", createdAccounts.length)

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

    let loggedInUser = searchedUser
    localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser))
    successfulLogin.style.opacity = "100"
    window.location.href = "frontPage.html";
})
}

/* Login dio zavrsen - Alem*/
/* Bjedin dio - Main page*/

if (window.location.pathname == "/frontPage.html"){
const balanceElement = document.querySelector("#acc-balance")
const withdrawElement = document.querySelector("#withdraw-amount")
const withdrawForm = document.querySelector("#withdraw form")

const accNameElement = document.querySelector("#acc-name")
const transferForm = document.querySelector("#transfer form")
const senderInput = document.querySelector("#sender")
const recipientInput = document.querySelector("#recipient")
const transferAmountInput = document.querySelector("#transfer-amount")

const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"))

const accType = document.querySelector("#acc-type")
const accName = document.querySelector("#acc-name")

accType.textContent = loggedInUser.accountType
accName.textContent = loggedInUser.name

withdrawForm.addEventListener("submit", function(event){
    event.preventDefault()   //zabranjuje refresh
    let balanceText = balanceElement.textContent
    let balance = parseInt(balanceText.replace("$","")) 
    let withdrawAmount = parseInt(withdrawElement.value)

    if (isNaN(withdrawAmount) ) {
        alert("Unesite ispravan iznos!")
        return;
    }

    if (withdrawAmount > balance) {
        alert("Nema dovoljno sredstava!")
    } else {
        balance -= withdrawAmount;
        balanceElement.textContent = balance + "$"
        withdrawElement.value = ""
        
    }
})

transferForm.addEventListener("submit", function (event) {
    event.preventDefault() 

    let balanceText = balanceElement.textContent
    let balance = parseInt(balanceText.replace("$", ""))
    let senderName = senderInput.value.trim()
    let recipientName = recipientInput.value.trim()
    let transferAmount = parseInt(transferAmountInput.value)

  
    if (!senderName || !recipientName || isNaN(transferAmount) ) {
        alert("Molimo popunite sva polja ispravno!")
        return
    }

    
    if (senderName !== accNameElement.textContent) {
        alert("Sender account nije ispravan!")
        return
    }

    
    if (transferAmount > balance) {
        alert("Nema dovoljno sredstava!")
    } else {
        balance -= transferAmount
        balanceElement.textContent = balance + "$"
        
        senderInput.value = ""
        recipientInput.value = ""
        transferAmountInput.value = ""
    }
})
}

/* Bejdin dio zavrsen */
=======
const form = document.getElementById("form");
const password = document.getElementById("password");
const newPassword = document.getElementById("new-password");
const emailInput = document.querySelector("input[type='email']");
const phoneInput = document.querySelector("input[type='tel']");
const accountTypes = document.querySelectorAll("input[name='type-acc']");
const submitButton = document.querySelector("button[type='submit']");
const userDataDiv = document.getElementById("userData");

submitButton.addEventListener("click", (event) => {
  event.preventDefault(); // Sprječava osvježavanje stranice

  // Prikupljanje podataka
  const name =document.querySelector("input[placeholder='Insert Name']").value.trim() ||"";
  const surname =document.querySelector("input[placeholder='Insert Surname']").value.trim() || "";
  const email = emailInput.value.trim() || "";
  const phone = phoneInput.value.trim() || "";
  const pass = password.value.trim() || "";
  const confirmPass = newPassword.value.trim() || "";
  let selectedAccountType = "";

  accountTypes.forEach((radio) => {
    if (radio.checked) {
      selectedAccountType = radio.value; // Koristi value umjesto textContent
    }
  });

  // Validacija
  if (!name ||!surname ||!email ||!phone ||!pass ||!confirmPass ||!selectedAccountType) {
    alert("Sva polja moraju biti popunjena!");
    return;
  }

  if (!validateEmail(email)) {
    alert("Unesite validnu e-mail adresu!");
    return;
  }

  if (!validatePhone(phone)) {
    alert("Unesite validan broj telefona! (Primjer: +38761123456)");
    return;
  }

  if (pass.length < 8) {
    alert("Lozinka mora imati najmanje 8 karaktera!");
    return;
  }

  if (pass !== confirmPass) {
    alert("Lozinke se ne podudaraju!");
    return;
  }

  // Kreiranje objekta koji cuva informacije o useru
  const userData = {
    name,
    surname,
    email,
    phone,
    accountType: selectedAccountType,
  };

  // Spremanje u localStorage kao objekat
  localStorage.setItem("userData", JSON.stringify(userData));

  alert("Nalog uspješno kreiran!");
  form.reset();
});

// Funkcija za validaciju e-maila
function validateEmail(email) {
  const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return re.test(email);
}

// Funkcija za validaciju broja telefona
function validatePhone(phone) {
  const re = /^\+?[0-9]{9,15}$/; // Dozvoljava brojeve telefona sa ili bez "+"
  return re.test(phone);
}

>>>>>>> origin/Emir
