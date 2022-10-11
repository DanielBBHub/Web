// .....................................................................
// Logica.js
// .....................................................................
const sqlite3 = require( "sqlite3" )
// .....................................................................
// .....................................................................
module.exports = class Logica {
// .................................................................
// nombreBD: Texto
// -->
// constructor () -->
// .................................................................
    constructor( nombreBD, cb ) {
        this.laConexion = new sqlite3.Database(
        nombreBD,
        ( err ) => {
            if( ! err ) {
                this.laConexion.run( "PRAGMA foreign_keys = ON" )
            }
            cb( err)
        })
    } // ()
    // .................................................................
    // datos:{muestra:text, fecha:DATE}
    // -->
    // insertarPersona() -->
    // .................................................................
    insertar_muestra( datos ) {
        var textoSQL = "insert into Muestras values(NULL, $muestra, $fecha );"
        var valoresParaSQL = { $muestra: datos.muestra, $fecha: datos.fecha}
        return new Promise( (resolver, rechazar) => {

            this.laConexion.run( textoSQL, valoresParaSQL, function( err ) {
                ( err ? rechazar(err) : resolver(1) )
                })

            })
        } 
    // .................................................................
    // 
    // -->
    // buscar_muestra() -->
    // datos:{id:int, muestra:text, fecha:DATE}
    // .................................................................
    buscar_muestra() {
        var textoSQL = "SELECT * FROM Muestras ORDER BY id DESC LIMIT 1";
        
        return new Promise( (resolver, rechazar) => {
        this.laConexion.all( textoSQL, [],
            ( err, res ) => {
                ( err ? rechazar(err) : resolver(res) )
                }) 
            })
    } // ()

    cerrar() {
        return new Promise( (resolver, rechazar) => {
        this.laConexion.close( (err)=>{
            ( err ? rechazar(err) : resolver() )
            })
            })
    }          
}// ()
