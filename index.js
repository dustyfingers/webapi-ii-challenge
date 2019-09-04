const server = require('./server.js');

const port = 8000;
server.listen(port, () => console.log(`\n Listnening on port ${port} \n`));
