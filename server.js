const http = require('http');
const url = require('url');
const fs = require('fs');
const port = 3000;

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const { pathname } = parsedUrl;
  const headers=req.headers;

  if (pathname === '/') {
      // Respuesta para la operación GET en la raíz
      res.setHeader('Content-Type', 'text/html');
      res.statusCode = 200;
      res.end(`
            <!DOCTYPE html>
            <html>
              <head>
              <title>Fomulario</title>
              </head>
            <body>
              <button onclick="get()"> Get </button>
              <h1> Enviar datos al servidor HTTP </h1>
                <form action="/post" method="post">
                    <input type="text" name="texto" placeholder="Ingrese texto">
                    <button onclick="post()"> Post </button>
                </form>
              <script>
                function get(){
                    window.location.href="http://localhost:${port}/get";
                }
                function post(){
                  window.location.href="http://localhost:${port}/post";
                }
              </script>
            </body>
            </html>
      `);
   } else if (pathname === '/get' && req.method === 'GET') {
      // Respuesta para la operación GET en /data
      // Puedes personalizar esta parte para manejar los datos que quieras devolver
      const responseData = 'Estos son los datos obtenidos mediante GET';
      res.setHeader('Content-Type', 'text/html');
      res.statusCode = 200;
      res.end(`<html>
      <head>
        <title>GET Request</title>
      </head>
      <body>
        <h1>${responseData}</h1>
        <pre> ${JSON.stringify(headers,null,2)} </pre>
        <h1> Metodo </h1>
        <h1> URL: ${req.url}</h1>
      </body>
      </html>
      `);
    } else if (req.method === 'POST' || pathname === '/post') {
    // Respuesta para la operación POST
    let requestData = '';

    req.on('data', (chunk) => {
      requestData += chunk;
    });

    req.on('end', () => {
      res.setHeader('Content-Type', 'text/html');
      res.statusCode = 200;
      res.end(`<html>
      <head>
        <title>POST Request</title>
      </head>
      <body>
        <h1>Operacion POST realizada</h1>
        <pre> ${JSON.stringify(headers,null,2)} </pre>
        <h1> Metodo: POST </h1>
        <h1> URL: ${req.url}</h1>
        <h1> Datos enviados: ${JSON.stringify(requestData)}</h1>
      </body>
      </html>`);
    });
  } else if (req.method === 'PUT' || pathname==='put') {
    // Respuesta para la operación PUT
    res.setHeader('Content-Type', 'text/html');
    res.statusCode = 200;
    res.end('<html><head><title>PUT Request</title></head><body><h1>Operación PUT realizada</h1></body></html>');
  } else {
    // Respuesta para otros métodos HTTP
    res.setHeader('Content-Type', 'text/html');
    res.statusCode = 405; // Método no permitido
    res.end('<html><head><title>Error 405</title></head><body><h1>Método no permitido</h1></body></html>');
  }
});


server.listen(port, () => {
  console.log(`Servidor HTTP escuchando en el puerto http://localhost:${port}/`);
});


