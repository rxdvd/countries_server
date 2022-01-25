const {app} = require('./server');
const port = 5500;

app.listen(port, () => { console.log(`Express now listening to ${port}`)})
