const createServer = require('./server');
const port = process.env.port || 8000 ;
const app = createServer();

app.listen(port,()=>console.log('server is running at port ' + port));