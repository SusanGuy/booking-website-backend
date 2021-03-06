const html = `
  <!DOCTYPE html>
  <html>
    <body>
      <h1>Heritage Wildlife API</h1>
      <div><b>Endpoints:</b></div>
      <ul>
        <li>/user</li>
        <li>/user/:id</li>
      </ul>
      <br />
      <br />
      <div><b>Authors:</b></div>
      <ul>
        <li>Susan Subedi (ssubedi1@go.olemiss.edu)</li>
        <ul>
          <li>Software Developer (Backend)</li>
        </ul>
        <br />
        <li>Giwoo (gglee@go.olemiss.edu)</li>
        <ul>
          <li>DevOps Engineer</li>
        </ul>
      </ul>
    </body>
  </html>
`;

module.exports = ({ app, logger }) => {
  app.get('/', (request, response) => {
    logger.emit('follow', { from: 'userA', to: 'userB' });
    response.send(html);
  });
};
