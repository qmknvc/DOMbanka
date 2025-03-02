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

