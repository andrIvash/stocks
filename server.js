//server.js
const config = require('./server/config');
const app = require('./app');

app.listen(config().get('port'),
    () => console.log(`Example app listening on port ${config().get('port')}!`));