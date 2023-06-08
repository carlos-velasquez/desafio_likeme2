const { Pool } = require('pg');

const pool = new Pool ({
    host: 'localhost',
    user: 'postgres',
    password: 'asterisco',
    database: 'likeme',
    allowExitOnIdle: true
})

const obtenerRegistros = async () => {
    const { rows } = await pool.query("SELECT * FROM posts");
    console.log(rows);
    return rows;
}

//obtenerRegistros()

//agregamos nuestro pirmer registro
const guardarPost = async (titulo, url, descripcion, likes = 0) => {
    const consulta = "INSERT INTO posts VALUES(DEFAULT, $1, $2, $3, $4)";
    const values = [titulo, url, descripcion, likes];
    const result = await pool.query(consulta, values);
    console.log('Post Agregado');
    return result;
}

//guardarPost()

const modificarPost = async (id) => {
    const consulta = "UPDATE posts SET likes = likes + 1 where id = $1";
    const values = [id];
    const result = await pool.query(consulta, values);
}

const borrarPost = async (id) =>{
    const consulta = "DELETE FROM posts WHERE id = $1";
    const values = [id];
    const result = await pool.query(consulta, values);

} 

module.exports = { guardarPost, obtenerRegistros, modificarPost, borrarPost }