require("dotenv").config();
const mysql = require("mysql2");

function Create(request, response) {

    const _response = { message: "", success: false };
    
    let _content = request.query.content;
    let _author = request.query.author;
    let _date = new Date();
    
    if(typeof(_content) !== "undefined" && typeof(_author) !== "undefined" && _content.length < 450) {

        const connection = mysql.createConnection(process.env.DATABASE_URL);
    
        connection.connect((error) => {
    
            if(error) {
                response.send({ ... _response, message: "Unable to connect to database" });
            }
            else {
    
                _content = mysql.escape(_content);
                _author = mysql.escape(_author);
    
                connection.query(`INSERT INTO quotebook (content,author,date)VALUES("${_content}", "${_author}", "${_date.toISOString().split('T')[0]}");`, (error, result) => {

                    if(error) {
                        response.send({ ... _response, message: "Unable to create quote" });
                    }
                    else {
                        response.send({ ... _response, success: true });
                    };

                });
    
            };
    
        });

    }
    else {
        response.send({ ... _response, message: "Invalid data" });
    };

};

module.exports = Create;