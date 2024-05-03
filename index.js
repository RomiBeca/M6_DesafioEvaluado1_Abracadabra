import express from 'express'
import { usuarios } from './modulo.usuarios.js';
import path from 'path'
const app = express()
const __dirname = import.meta.dirname;

app.use(express.static(path.join(__dirname + '/public')))

function intermedio(req, res, next) {
    const usuario = req.params.usuario;
    const usuarioEncontrado = usuarios.find(us => us === usuario);
    if (usuarioEncontrado) {
        return next()
    } else {
        return res.redirect('/assets/img/who.jpeg')
    }
}

function numeroRandom(req, res, next) {
    const n = parseInt(req.params.n)
    const randomNumber = Math.floor(Math.random() * 4) + 1
    console.log(randomNumber)

    if (n === randomNumber) {
        next()
    } else {
        res.sendFile(__dirname + '/public/assets/img/voldemort.jpg');
    }
}

app.get('/abracadabra/juego/:usuario', intermedio, (req, res, next) => {
    res.sendFile(path.join(__dirname, '/public/juego.html'))
});

app.get('/abracadabra/usuarios', (req, res) => {
    res.json({ usuarios: usuarios })
})

app.get('/abracadabra/conejo/:n', numeroRandom, (req, res) => {
    res.sendFile(path.join(__dirname, '/public/assets/img/conejito.jpg'))
});

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}}`)
})