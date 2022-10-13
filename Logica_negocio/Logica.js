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
        var textoSQL = "insert into Muestras values(NULL, $major, $minor );"
        var valoresParaSQL = { $major: datos.major, $minor: datos.minor}
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
    // datos:{id:int, major:text, minor:text}
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
