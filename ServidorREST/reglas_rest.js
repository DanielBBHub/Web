// .....................................................................
// ReglasREST.js
// .....................................................................
module.exports.cargar = function( servidorExpress, laLogica  ) {
    // .......................................................
    // GET /prueba
    // .......................................................
    servidorExpress.get('/prueba/', function( peticion, respuesta ){
        console.log( " * GET /prueba " )
        respuesta.send( "¡Funciona!" )
    }) // get /prueba
    // .......................................................
    // GET /longitud/<palabra>
    // .......................................................
    servidorExpress.get(
    '/longitud/:palabra',
    function( peticion, respuesta ){
        console.log( " * GET /longitud " )
        var palabra = peticion.params.palabra
        var solucion = { palabra : palabra, longitud : palabra.length }
        respuesta.send( JSON.stringify( solucion ) )
    }) // get /longitud
    // .......................................................
    // GET /dividir?a=<num>&b=<num>
    // .......................................................
    servidorExpress.get(
    '/dividir',
    function( peticion, respuesta ){
        console.log( " * GET /dividir " )
        var a = peticion.query.a
        var b = peticion.query.b
        if( isNaN(a) || isNaN(b) || b == 0 ) {
            // si a o b no son números, o b es 0
            // no se puede dividir
            // (400 = bad request)
            respuesta.status(400).send(" no puedo dividir ");
            return
        }
        var solucion = { a : a, b : b, division : a/b }
        console.log(solucion)
        respuesta.send( JSON.stringify( solucion ) )
    }) // get /dividir
    // .......................................................
    // GET /muestra
    // .......................................................
    servidorExpress.get(
        '/muestra', 
        async function( peticion, respuesta ){
            console.log( " * GET /muestra " )
            var error = null
            //Llamada a la funcion buscar_muestra() para recoger
            //la muestra introducida en la DB
            try{

                var res = await laLogica.buscar_muestra()
            }
                
            catch (e){
                error = e
            } 

            
            if (error != null){   
                if( res.length == 0 ) {
                    // 404: not found
                    respuesta.status(404).send( "No encontré la muestra" )
                    return
                }
            }
            console.log(res)
            respuesta.send( JSON.stringify( res ) )
        }) // get /muestra
    // .......................................................
    // POST /alta/:muestra/:fecha
    // .......................................................
    servidorExpress.post(
    '/alta/:muestra/:fecha',
    async function( peticion, respuesta ){
        console.log( " * POST /alta " )
        //var datos = JSON.parse(peticion.body)
        console.log( peticion.params.muestra )
        console.log( peticion.params.fecha ) 
        datos = {muestra:peticion.params.muestra, fecha:peticion.params.fecha }
        console.log(datos)
        // supuesto procesamiento
        try{
            await laLogica.insertar_muestra(datos)
        }
            
        catch (e){
            error = e
        } 
    }) // post /alta

    // .......................................................
    // POST /alta
    // .......................................................
    servidorExpress.post(
        '/alta/',
        async function( peticion, respuesta, next ){
            console.log( " * POST /alta " )
            console.log(JSON.parse( peticion.body ) )
            var datos = JSON.parse( peticion.body )
            // supuesto procesamiento
            try{
                var ret = await laLogica.insertar_muestra(datos)
                respuesta.json(ret)
            }
                
            catch (e){
                return next(e)
            } 
        }) // post /alta
} // ()
// .....................................................................
// .....................................................................

    