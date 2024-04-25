document.addEventListener('DOMContentLoaded', function() {
    // Tu código JavaScript aquí
    const tabla = document.getElementById('jugadores');
    
    
    getTable();
    
    function getTable(){
        const xhr = new XMLHttpRequest();
        xhr.open('GET','/estadisticas');
        xhr.onload = () => {
            const body = JSON.parse(xhr.responseText);
            let pos = 0;
            let result = `
                <tr>
                    <th>Posición</th>
                    <th>Usuario</th>
                    <th>Dinero ganado</th>
                    <th>Prestador</th>
                    <th>Desastres</th>
                    <th>Fortunas</th>
                </tr>
            `;
            for (const row of body){
                result +=`
                    <tr>
                        <td>${pos+=1}</td>
                        <td>${row.nombre}</td>
                        <td>${row.ganado}</td>
                        <td>${row.prestador}</td>
                        <td>${row.desastres}</td>
                        <td>${row.fortunas}</td>
                    </tr>
                `;
            }
            tabla.innerHTML = result;
            
        };
        xhr.send();
    }
});
