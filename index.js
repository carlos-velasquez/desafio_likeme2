const { guardarPost, obtenerRegistros, modificarPost, borrarPost } = require('./consultas.js');

const cors = require('cors');
const express = require('express');
const app = express();

app.use(cors());
app.use(express.json());

app.listen(3001, console.log('servidor encendido'));

app.get('/posts', async (req, res) => {
    const posts = await obtenerRegistros();
    res.json(posts)
})

app.post("/posts", async (req, res) => {
    try {
        const { titulo, url, descripcion } = req.body;
        await guardarPost(titulo, url, descripcion);
        res.send('Post agregado');
    } catch (error) {
        res.status(500).send(error);
    }
    
})

app.put("/posts/:id", async (req, res) => {
    try {
        const { id } = req.params;
        await modificarPost(id);
    } catch (error){
        res.status(500).send(error)
    }
})

app.delete("/posts/:id", async (req, res) => {
    const { id } = req.params;
    await borrarPost (id);
    res.send("posts eliminado");
})