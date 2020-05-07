require('dotenv').config({ path: '.env.example' });
const app = require('./src/middlewares');
const PORT = process.env.PORT || 5000;
app.listen(PORT, (err) => {
    if (err) {
        console.log(err);

    }
    console.log('====================================');
    console.log(`server is ready${PORT}`);
    console.log('====================================');
})