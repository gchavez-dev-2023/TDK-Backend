const mongoose = require('mongoose');

const dbConnection = async() => {
    try {
        
        await mongoose.connect(process.env.DB_CNN,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        //   useFindAndModify: false
        });
    } catch (error) {
        console.error(error);
    }
}

module.exports = {
    dbConnection
}