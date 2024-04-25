var cntbtn = document.getElementById('cnt-btn');
var bckbtn = document.getElementById('bck-btn');

var regis1 = document.getElementById('regis1');
var regis2 = document.getElementById('regis2');
var cardback = document.getElementById('cback');

var reglog = document.getElementById('reg-log');

var nombreF = document.getElementById('nombre');
var numeroF = document.getElementById('numero');
var contrasenaF = document.getElementById('contrasena');
var fechaF = document.getElementById('fecha');
var generoF = document.getElementById('genero');
var relacionF = document.getElementById('relacion');
var estadoF = document.getElementById('estado');

var submitRegis = document.getElementById('submitRegis');

var numeroFL = document.getElementById('numero-Login');
var contrasenaFL = document.getElementById('contrasena-login');

var submitLogin = document.getElementById('login-btn');

submitLogin.addEventListener('click', checkData);
submitRegis.addEventListener('click', saveData);

function checkData(){
    const defValue = 'unknown';

    const payLoad = JSON.stringify({
        Numero: numeroFL.value.trim() || defValue,
        Contrasena: contrasenaFL.value.trim() || defValue
    });

    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/login');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(payLoad);
    
    xhr.onload = function() {
        if (xhr.status === 201) {
            
            console.log('Se ha logueado');
            window.location.href = '/game.html';
        } else {
            
            console.log('Ocurrió un error al logearse');
        }
    
    };
    
}

function saveData() {
    const defValue = 'unknown';

    const payLoad = JSON.stringify({
        Nombre: nombreF.value.trim() || defValue,
        Genero: generoF.value.trim() || defValue,
        Nacimiento: fechaF.value.trim() || defValue,
        Ubicacion: estadoF.value.trim() || defValue,
        Relacion: relacionF.value.trim() || defValue,
        Numero: numeroF.value.trim() || defValue,
        Contrasena: contrasenaF.value.trim() || defValue
    });

    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/register');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(payLoad);

}

reglog.oninput = function () {
    // console.log(reglog.checked);
    if (!reglog.checked) {
        cardback.style.height = '400px';
        regis1.style.display = 'block';
        regis2.style.display = 'none';
    }
};

cntbtn.onclick = function () {
    regis1.style.display = 'none';
    regis2.style.display = 'block';
    cardback.style.height = '600px';
};

bckbtn.onclick = function () {
    regis1.style.display = 'block';
    regis2.style.display = 'none';
    cardback.style.height = '400px';
};

