let email = "";
let scannedKey = "";

const scriptURL = "https://script.google.com/macros/s/AKfycbxLuEaWy0XH3Mso54ZQCxIk2THv9FG6fLemb1KYwRvrEMhNSDguWIJpMLKeH4TzEaz80A/exec";

function handleCredentialResponse(response){

const data = parseJwt(response.credential);

email = data.email;

document.getElementById("userEmail").innerHTML =
"Logged in as: " + email;

startScanner();

}

window.onload = function(){

google.accounts.id.initialize({

client_id:"YOUR_GOOGLE_CLIENT_ID",
callback: handleCredentialResponse

});

google.accounts.id.renderButton(

document.getElementById("loginDiv"),

{ theme:"outline", size:"large" }

);

};

function parseJwt (token) {

var base64Url = token.split('.')[1];
var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
}).join(''));

return JSON.parse(jsonPayload);

}

function startScanner(){

const scanner = new Html5Qrcode("reader");

scanner.start(

{ facingMode: "environment" },

{ fps:10, qrbox:250 },

(qr) => {

scannedKey = qr;

alert("Key scanned: " + scannedKey);

scanner.stop();

}

);

}

function sendData(action,status){

fetch(scriptURL,{

method:"POST",

body: JSON.stringify({

email: email,
key: scannedKey,
action: action,
status: status

})

});

}

function borrowKey(){

if(scannedKey === ""){

alert("Scan a key first");

return;

}

sendData("Borrow","Borrowed");

alert("Key Borrowed");

}

function returnKey(){

if(scannedKey === ""){

alert("Scan a key first");

return;

}

sendData("Return","Available");

alert("Key Returned");

}