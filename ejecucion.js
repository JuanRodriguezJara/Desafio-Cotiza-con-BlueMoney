const child_process = require('child_process');

child_process.exec(`node index.js cotizacion txt dolar 250000`,
    (error, data) => {
        if(error) {
            console.log(`Error de ejecucion: ${error}`);
            return;
        }

        console.log(`Resultado: ${data}`);
    });