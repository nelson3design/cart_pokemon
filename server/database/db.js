const sql = require('mysql2')

const conn= sql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'db_pokemon'
})



conn.connect((error)=>{
    if(error){
        console.error('erro da conexão: '+ error)
        return
    }
    console.log('conetado com o banco de dados com sucesso!')
})

module.exports = conn;
