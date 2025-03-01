const balanceElement = document.querySelector("#acc-balance")
const withdrawElement = document.querySelector("#withdraw-amount")
const withdrawForm = document.querySelector("#withdraw form")

const accNameElement = document.querySelector("#acc-name")
const transferForm = document.querySelector("#transfer form")
const senderInput = document.querySelector("#sender")
const recipientInput = document.querySelector("#recipient")
const transferAmountInput = document.querySelector("#transfer-amount")

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