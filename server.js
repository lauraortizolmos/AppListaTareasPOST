const http = require('http');
const fs = require('fs');
const path  = require('path');

http.createServer((req, res) =>{

    console.log(`${req.method} solicita ${req.url}`);

    if(req.method == 'GET'){

        if(req.url == '/'){
            fs.readFile('./JS, CSS, HTML/index.html', 'UTF-8', (err, html) =>{
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.end(html);
            });

        }else if(req.url.match(/.css$/)){
            const reqPath = path.join(__dirname, 'JS, CSS, HTML', req.url);
            const fileStream = fs.createReadStream(reqPath, 'UTF-8');
    
            res.writeHead(200, {'Content-Type': 'text/css'});
            fileStream.pipe(res);
    
        }else if(req.url.match(/.js$/)){
            const reqPath = path.join(__dirname, 'JS, CSS, HTML', req.url);
            const fileStream = fs.createReadStream(reqPath);
    
            res.writeHead(200, {'Content-Type': 'text/js'});
            fileStream.pipe(res);
        }else{
            res.writeHead(404, {'Content-Type': 'text/plain'});
            res.end('404 ERROR');
        }
    
    }else if(req.method == 'POST'){
        let body = '';

        req.on('data', chunk =>{body+= chunk;});

        req.on('end', () =>{
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                  <meta charset="UTF-8">
                  <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, 
                  maximum-scale=1.0, minimum-scale=1.0">
                  <link rel="stylesheet" href="css/estilos.css">
                  <!--<link rel="stylesheet" href="https://necolas.github.io/normalize.css/3.0.2/normalize.css">--> 
                  <link href="https://fonts.googleapis.com/css?family=Patrick+Hand&display=swap&subset=latin-ext,vietnamese" 
                  rel="stylesheet">
           <title>Resultados</title>
           </head>
           <body>
                  <h1>Datos del formulario recibidos</h1>
           <p>${body}</p>
           </body>
           </html>
            `);
        });
    }
}).listen(3000);

console.log('Servidor iniciado...');