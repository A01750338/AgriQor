document.addEventListener('DOMContentLoaded', function() {
    // Tu código JavaScript aquí
    const ctx = document.getElementById('myChart');
    const ctx2 = document.getElementById('myChart2');
    const ctx3 = document.getElementById('myChart3');

    getDATA1();
    getDATA2();
    getDATA3();
    
    const estados = ["Aguascalientes",
    "Baja California",
    "Baja California Sur",
    "Campeche",
    "Chiapas",
    "Chihuahua",
    "Ciudad de México",
    "Coahuila",
    "Colima",
    "Durango",
    "Guanajuato",
    "Guerrero",
    "Hidalgo",
    "Jalisco",
    "México",
    "Michoacán",
    "Morelos",
    "Nayarit",
    "Nuevo León",
    "Oaxaca",
    "Puebla",
    "Querétaro",
    "Quintana Roo",
    "San Luis Potosí",
    "Sinaloa",
    "Sonora",
    "Tabasco",
    "Tamaulipas",
    "Tlaxcala",
    "Veracruz",
    "Yucatán",
    "Zacatecas"];
    const relaciones = ['Cliente','Fabricante agroinsumos','Distribuidor agroinsumos','Proveedor de seguros','Financiera','Empresa CPG','Acopiador','Inversionista','Público General'];
    
    let Char1D = [];
    let Char2D = [];
    let Char3D = [];
    
    function getDATA1(){
        const xhr = new XMLHttpRequest();
        xhr.open('GET','/admin/estadisticas/gen');
        xhr.onload = () =>{
            const body = JSON.parse(xhr.responseText);
            
            for (const row of body){
                Char1D.push(row.total);
                console.log(Char1D);
            }
        loadChar1();
        };
        xhr.send();
    }
    function getDATA2(){
        const xhr = new XMLHttpRequest();
        xhr.open('GET','/admin/estadisticas/ubi');
        xhr.onload = () =>{
            const body = JSON.parse(xhr.responseText);
            
            let lista = {};
            
            for(const row of body){
              lista[row.ubicacion]=row.total;
            }
            console.log(lista);
            estados.forEach(estado =>{
              
              Char2D.push(lista[estado]);
              
            });
          loadChar2();
        };
        xhr.send();
    }
    function getDATA3(){
        const xhr = new XMLHttpRequest();
        xhr.open('GET','/admin/estadisticas/rel');
        xhr.onload = () =>{
            const body = JSON.parse(xhr.responseText);
            
            let lista = {};
            
            for(const row of body){
              lista[row.relacion]=row.total;
            }
            console.log(lista);
            relaciones.forEach(rel =>{
              
              Char3D.push(lista[rel.toLocaleLowerCase()]);
              
            });
          console.log(Char3D);
          loadChar3();
        };
        xhr.send();
    }

    function loadChar1(){
         new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Hombre','Mujer'],
      datasets: [{
        label: 'Usuarios',
        data: Char1D,
        borderWidth: 1
      }]
    },
    options: {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Género de Usuarios'
      }
    }
  },
  });
    }
    
    function loadChar2(){
      new Chart(ctx3, {
    type: 'bar',
    data: {
      labels: estados,
      datasets: [{
        label: 'Usuarios',
        data: Char2D,
        borderWidth: 1
      }]
    },
    options: {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Ubicacion de Usuarios'
      }
    }
  },
  });
    }
  function loadChar3(){
    new Chart(ctx2, {
    type: 'polarArea',
    data: {
      labels: relaciones,
      datasets: [{
        label: 'Usuarios',
        data: Char3D,
        borderWidth: 1
      }]
    },
    options: {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Relación con Verqor'
      }
    }
  },
  });  
  }
  
  
});
