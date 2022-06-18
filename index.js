// Importamos los modulos
const https = require("https");
const fs = require("fs");
const { json } = require("stream/consumers");

//1. Recibir por la línea de comando los siguientes argumentos:
//a. Nombre del archivo que se creará.
//b. Extensión del archivo.
//c. Indicador económico que se desea convertir.
//d. Cantidad de pesos que se quiere cambiar.

const argumentos = process.argv.slice(2);

// Variables argumentos

let name_file = argumentos[0];
let ext_file = argumentos[1];
let ind_ec = argumentos[2];
let qnt_clp = Number(argumentos[3]);

https.get("https://mindicador.cl/api", (resp) => {
    resp.on("data", (data) => {
        let indicadores = JSON.parse(data);
        let dolar_value = indicadores.dolar.valor;
        let dl_convert = (qnt_clp / dolar_value).toFixed(2);

        //A la fecha: Thu Sep 03 2020 18:41:00 GMT-0400 (GMT-04:00)
        //Fue realizada cotización con los siguientes datos:
        //Cantidad de pesos a convertir: 250000 pesos
        //Convertido a "dólar" da un total de:
        //$324,06

        fs.writeFile(
            `${name_file}.${ext_file}`,
            `A la fecha: ${Date()} \nFue realizada cotización con los siguientes datos:\nCantidad de pesos a convertir: ${qnt_clp}\nConvertido a ${ind_ec} da un total de:\n$${dl_convert}`,
            "utf8",
            () => {

                console.log("Archivo creado con éxito");

                fs.readFile(`${name_file}.${ext_file}`, "utf8",
                    (err, data) => {
                        console.log(`Contenido del archivo: \n${data}`);
                    });
            }
        );
    });
})
.on("error", (err) => {
    console.log("Error" + err.message);
});