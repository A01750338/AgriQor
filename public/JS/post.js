document.addEventListener('DOMContentLoaded', function() {
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

    submitRegis.addEventListener('click',saveData);

    function saveData(){
        const defValue = 'unknown';

        const payLoad = JSON.stringify({
            nombre: nombreF.value.trim() || defValue,
            numero: numeroF.value.trim() || defValue,
            contrasena: contrasenaF.value.trim() || defValue,
            fecha: fechaF.value.trim() || defValue,
            genero: generoF.value.trim() || defValue,
            relacion: relacionF.value.trim() || defValue,
            estado: estadoF.value.trim() || defValue,
        });

        const xhr = new XMLHttpRequest();
        xhr.open('POST','/register');
        xhr.onload = () => {
            cardback.style.height = '400px';
            regis1.style.display = 'block';
            regis2.style.display = 'none';
        };
        
        console.log(payLoad);

        xhr.send(payLoad);



    }

    reglog.oninput = function(){
        // console.log(reglog.checked);
        if(!reglog.checked){
            cardback.style.height = '400px';
            regis1.style.display = 'block';
            regis2.style.display = 'none';
        }
    }
    
    cntbtn.onclick = function (){
        regis1.style.display = 'none';
        regis2.style.display = 'block';
        cardback.style.height = '600px';
    }

    bckbtn.onclick = function(){
        regis1.style.display = 'block';
        regis2.style.display = 'none';
        cardback.style.height = '400px';
    }

});
