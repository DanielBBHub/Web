// ........................................................
// mainTest1.js
// ........................................................
var request = require ('request')
var assert = require ('assert')
// ........................................................
// ........................................................
const IP_PUERTO="http://localhost:8080"
// ........................................................
// main ()
// ........................................................
describe( "Test 1 : Recuerda arrancar el servidor", function() {
// ....................................................
// ....................................................

    it( "probar que GET /prueba responde ¡Funciona!", function( hecho ) {
        request.get(
        { url : IP_PUERTO+"/prueba", headers : { 'User-Agent' : 'Daniel' }},
            function( err, respuesta, carga ) {
                assert.equal( err, null, "¿ha habido un error?" )
                assert.equal( respuesta.statusCode, 200, "¿El código no es 200 (OK)" )
                assert.equal( carga, "¡Funciona!", "¿La carga no es ¡Funciona!?" )
                hecho()
            } // callback()
            ) // .get
        }) // it

        // ....................................................
        // ....................................................

        it( "probar GET /longitud", function( hecho ) {
        request.get(
        { url : IP_PUERTO+"/longitud/hola",
        headers : { 'User-Agent' : 'Daniel' }},
            function( err, respuesta, carga ) {
                assert.equal( err, null, "¿ha habido un error?" )
                assert.equal( respuesta.statusCode, 200, "¿El código no es 200 (OK)" )
                var solucion = JSON.parse( carga )
                assert.equal( solucion.longitud, 4, "¿La longitud no es 4?" )
                hecho()
            } // callback
        ) // .get
        }) // it

        // ....................................................
        // ....................................................

        it( "probar GET /dividir", function( hecho ) {
        request.get(
        { url : IP_PUERTO+"/dividir?a=10&b=2.5",
        headers : { 'User-Agent' : 'Daniel'}},
            function( err, respuesta, carga ) {
                assert.equal( err, null, "¿ha habido un error?" )
                assert.equal( respuesta.statusCode, 200, "¿El código no es 200 (OK)" )
                var solucion = JSON.parse( carga )
                assert.equal( solucion.division, 4, "¿El cociente es no es 4?" )
                hecho()
                } // callback
            ) // .get
        }) // it

        // ....................................................
        // ....................................................

        it( "probar GET /muestra", function( hecho ) {
            request.get(
            { url : IP_PUERTO+"/muestra",
            headers : { 'User-Agent' : 'Daniel'}},
                function( err, respuesta, carga ) {
                    var solucion = JSON.parse( carga )
                    console.log(solucion)
                    assert.equal( solucion[0].muestra, '1234', "¿La muestra no es 1234?" )
                    hecho()
                    } // callback
                ) // .get
            }) // it
    
            // ....................................................
            // ....................................................

        /* it( "probar POST /alta", function( hecho ) {
        //var datos_muestra = { muestra : "1223", fecha : '2022-09-20'}
        request.post(
        { url : IP_PUERTO+"/alta/1123/2022-09-20",
        headers : { 'User-Agent' : 'Daniel', 'Content-Type' : 'application/json' },
        //body : JSON.stringify( datos_muestra )
        },
            async function( err, respuesta, carga ) {
                assert.equal( err, null, "¿ha habido un error?" )
                assert.equal( respuesta.statusCode, 200, "¿El código no es 200 (OK)" )
                assert.equal( carga, "OK", "¿La carga no es OK" )
                hecho()
                } // callback
            ) // .post
        }) // describe */

    it( "probar POST /alta", function( hecho ) {
    var datos_muestra = { muestra : "1225", fecha : '2022-09-21'}
    request.post(
    { url : IP_PUERTO+"/alta",
    headers : { 'User-Agent' : 'Daniel', 'Content-Type' : 'application/json' },
    body : JSON.stringify( datos_muestra )
    },
        async function( err, respuesta, carga ) {
            assert.equal( err, null, "¿ha habido un error?" )
            assert.equal( respuesta.statusCode, 200, "¿El código no es 200 (OK)" )
            assert.equal( carga, "OK", "¿La carga no es OK" )
            hecho()
            } // callback
        ) // .post
})
})
