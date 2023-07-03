require("dotenv").config();
const mysql = require("mysql2");

function Random(request, response) {

    const _response = { message: "", success: false, data: [] };
    
    const connection = mysql.createConnection(process.env.DATABASE_URL);
    
        connection.connect((error) => {
    
            if(error) {
                response.send({ ... _response, message: "Unable to connect to database" });
            }
            else {
    
                connection.query(`SELECT content AS q_content, author AS q_author FROM quotebook ORDER BY RAND() LIMIT 1;`, (error, result) => {

                    if(error) {
                        response.send({ ... _response, message: "Unable to get quote" });
                    }
                    else {
                        response.send({ ... _response, success: true, data: result });
                    };

                });
    
            };
    
        });

};

module.exports = Random;