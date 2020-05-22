require('dotenv').config();

const app = require('./src/middlewares');
const PORT = process.env.PORT || 5000;
app.listen(PORT, (err) => {
    if (err) {
        console.log(err);

    }
    console.log('====================================');
    console.log(`server is ready ${PORT}`);
    console.log('====================================');
})

/** just in case some thing wrong happend in port
 * First, you would want to know which process is using port 5000/3000

sudo lsof -i :5000/3000
this will list all PID listening on this port, once you have the PID you can terminate it with the following:
PID: Is anum :)
kill -9 {PID}
 */