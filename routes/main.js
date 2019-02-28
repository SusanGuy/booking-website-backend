module.exports = app => {
  app.get('/', function(request, response) {
    response.send(`
      <!DOCTYPE html>
      <html>
      <body>

      <h1>My First Heading</h1>
      <p>My first paragraph.</p>

      </body>
      </html>

          `);
    console.log('Hello');
  });
};
