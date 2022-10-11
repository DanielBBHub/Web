// ........................................................
// mainTest1.js
// ........................................................
const Logica = require( "../Logica.js" )
var assert = require ('assert')
// ........................................................
// main ()
// ........................................................
describe( "Test 1: insertar una muestra", function() {
    // ....................................................
    // ....................................................
    var laLogica = null
    // ....................................................
    // ....................................................
    it( "conectar a la base de datos", function( hecho ) {
        laLogica = new Logica(
        "../db/dbmuestras.db",
        function( err ) {
        if ( err ) {
        throw new Error ("No he podido conectar con dbmuestras.db")
        }
        hecho()
        })
    }) // it
    // ....................................................
    // ....................................................
    it( "puedo insertar una muestra",
    async function() {
        await laLogica.insertar_muestra(
            {muestra: "1232", fecha: '2022-09-20'}
        )
        var res = await laLogica.buscar_muestra( "1232" )
        assert.equal( res.length, 1, "¿no hay un resulado?" )
        assert.equal( res[0].muestra, "1232", "¿no es 1232?" )
        assert.equal( res[0].fecha, '2022-09-20', "¿no es 2022-09-20?" )
    }) // it
    // ....................................................
    // ....................................................

    it( "no puedo insertar una muestra con campo muestra que ya existe",
    async function() {

        var error = null

        try {
            await laLogica.insertar_muestra(
                {muestra: "1234", fecha: '2022-09-21'}
            )
        } catch( err ) {
            error = err
        }

        assert( error, "¿Ha insertado la muestra que ya estaba 1234? (¿No ha pasado por el catch()?" )
    }) // it
    // ....................................................
    // ....................................................
    it( "cerrar conexión a la base de datos",
    async function() {
        try {
            await laLogica.cerrar()
        } catch( err ) {
        // assert.equal( 0, 1, "cerrar conexión a BD fallada: " + err)
            throw new Error( "cerrar conexión a BD fallada: " + err)
        }
    }) // it
}) // describe