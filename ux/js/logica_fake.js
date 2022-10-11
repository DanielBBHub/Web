// ---------------------------------------------------------------------
// LogicaFake.js
// ---------------------------------------------------------------------

const IP_PUERTO = "http://localhost:8080";
// ---------------------------------------------------------------------
// ---------------------------------------------------------------------
export default class LogicaFake {

    async init() {
        var metodo = this;
    }

    async buscar_muestra() {
        console.log("EMPIEZA LA EJECUCION DE: buscar_muestra()")

		var metodo = this;
        //Se crea la peticion /muestra
		var url = IP_PUERTO + '/muestra'
		await fetch(url , {
            method: 'GET',
            headers: new Headers(
            //Partes del header que se han añadido para 
            //posibilitar la comunicacion con el servidor REST
            { 'Users-Agent' : 'Daniel',
            'Access-Control-Allow-Origin': '*',
            'Content-type': 'application/json'}),
            mode: "cors"
            

        }) 
        //Se recoge el JSON de la cabecera de la respuesta 
        .then(response => response.json())
        //Una vez recogida se pasa la muestra y la fecha de esta a la funcion cargar_muestra()
        .then(data => 
            this.cargarMuestra(data[0].muestra,data[0].fecha)
            )
        .catch(err => console.error(err));
         
		console.log("ACABA LA EJECUCION DE: buscar_muestra()")
    }

    async insertar_muestra() {
		var metodo = this;
        console.log("EMPIEZA LA EJECUCION DE: insertar_muestra()")
        //Se recogen los valores de muestra y la fecha de esta
        var muestra = document.getElementById("valorMuestraInput").value
        var fecha = document.getElementById("fechaMuestraInput").value
        //Se formatean para pasarlo como JSON en la cabecera de la peticion
        var datos_muestra = {muestra: muestra, fecha: fecha}
        console.log(datos_muestra)
        //Se crea la peticion /alta para introducir la medida 
		var url = IP_PUERTO + '/alta'
		await fetch(url , {
            method: 'POST',
            headers: new Headers(
            //Partes del header que se han añadido para 
            //posibilitar la comunicacion con el servidor REST
            { 'Users-Agent' : 'Daniel',
            'Access-Control-Allow-Origin': '*',
            'Content-type': 'application/json'}),
            body: JSON.stringify(datos_muestra),
            mode: "cors"
            

        }) 
        .catch(err => console.error(err));
         
		console.log("ACABA LA EJECUCION DE: insertar_muestra()")
    }
	
    // .................................................................
    // muestra,fecha:Texto
    // -->
    // cargarMuestra() -->
    // .................................................................
    cargarMuestra( muestra ){
        console.log("EMPIEZA LA EJECUCION DE: cargarMuestra()")

        var metodo = this
        var muestra_txt = document.getElementById("valorMuestraTxt").textContent 
		document.getElementById("valorMuestraTxt").textContent = "Valor de la muestra: " + muestra;

        console.log("ACABA LA EJECUCION DE: cargarMuestra()")
	}
}
// ---------------------------------------------------------------------
// ---------------------------------------------------------------------

