document.addEventListener('DOMContentLoaded', function () {
  // Tu código JavaScript aquí
  const ctx = document.getElementById('myChart');
  const ctx2 = document.getElementById('myChart2');
  const ctx3 = document.getElementById('myChart3');

  getDATA();

  let Char1D = [];

  function getDATA() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', '/admin/estadisticas');
    xhr.onload = () => {
      const body = JSON.parse(xhr.responseText);

      for (const row of body) {
        Char1D.push(row.total);
        console.log(Char1D);
      }

      loadChar1();
    };
    xhr.send();
  }

  function loadChar1() {
    new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Hombre', 'Mujer'],
        datasets: [{
          label: '# of Votes',
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

  new Chart(ctx2, {
    type: 'polarArea',
    data: {
      labels: ['Cliente', 'Fabricante agroinsumos', 'Distribuidor agroinsumos', 'Proveedor de seguros', 'Financiera', 'Empresa CPG', 'Acopiador', 'Inversionista', 'Público General'],
      datasets: [{
        label: '# of Votes',
        data: [2, 3, 7, 8, 6, 4, 3, 2, 4],
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
  new Chart(ctx3, {
    type: 'bar',
    data: {
      labels: ["Aguascalientes",
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
        "Zacatecas"],
      datasets: [{
        label: '# of Votes',
        data: [2, 3, 7, 8, 6, 4, 3, 2, 4],
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
});
