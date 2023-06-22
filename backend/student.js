module.exports = function Student() {
    const mongoose = require("mongoose");
    const QR = require("./models/qr");
    const csvtojson = require("csvtojson");

    mongoose.connect('mongodb://127.0.0.1:27017/qrcode');
    const db = mongoose.connection;

    db.on('error', console.error.bind(console, "connection error:"));
    db.once('open', () => {
        console.log("Database connected");
    });

    let arrayToInsert = [];
    csvtojson().fromFile("./response.csv").then(async (source) => {
        let len = source.length;
        console.log(len);
        for (let i = 0; i < len; i++) {
            let singleRow = {
                enrollment_id: source[i]["Enrollment Number"],
                name: source[i]["Full Name"],
                email: source[i]["Email id"],
                scanned: false
            };
            arrayToInsert.push(singleRow);
        }
        await QR.deleteMany()
            .then(() => {
                console.log("Data deleted");
            })
            .catch((error) => {
                console.log(error);
            });
        //Inserting into the table QR
        await QR.insertMany(arrayToInsert)
            .then(() => {
                console.log("Data inserted");
            })
            .catch((error) => {
                console.log(error);
            })
    })
}

