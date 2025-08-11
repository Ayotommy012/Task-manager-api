import app from './app.js';
import { sequelize } from './database/initDb.js';
const PORT = 3000;

//db connection check
async function assertDbConnection() {
    try {
        await sequelize.authenticate();
    } catch (error) {
        console.log(error)
    }
}
//start server
// This function initializes the server and database connection
async function init(){
    console.log('starting server...');
    try {
        await assertDbConnection();
        await sequelize.sync({ force: false }); //make sure you set it to false after first run

// port listening
        app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

init();