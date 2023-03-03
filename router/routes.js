const express = require('express');
const router = express.Router();
const Luchador = require('../models/Luchador');

// Index
router.get('/', async (req, res) => {

    try {
        const arrayLuchadoresDB = await Luchador.find();
        console.log(arrayLuchadoresDB);
        res.render('index', {
            arrayLuchador: arrayLuchadoresDB
        })
    } catch (e) {
        console.error(e)
    }
})
// Crear
router.get('/create', (req, res) => {
    res.render('create')
})

router.post('/', async (req, res) => {
    const body = req.body
    console.log(body)
    try {
        const ufcDB = new Luchador(body)
        await ufcDB.save()
        res.redirect('/')
    } catch (error) {
        console.log('error', error)
    }
})
// Editar
router.get('/:id', async (req, res) => {
    const id = req.params.id
    try {
        const ufcDB = await Luchador.findOne({ _id: id })

        console.log(ufcDB)
        res.render('detalle', {
            luchador: ufcDB,
            error: false
        })
    } catch (error) {
        console.log('Se ha producido un error', error)
        res.render('detalle', {
            error: true,
            mensaje: 'Luchador no encontrado!'
        })
    }
})

router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const body = req.body;
    console.log(id)
    console.log('body', body)
    try {
        const ufcDB = await Luchador.findByIdAndUpdate(
            id, body, { useFindAndModify: false }
        )
        console.log(ufcDB)
        res.json({
            estado: true,
            mensaje: 'Luchador editado'
        })
    } catch (error) {
        console.log(error)
        res, json({
            estado: false,
            mensaje: 'Problema al editar el luchador'
        })
    }
})

// Eliminar
router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    console.log('_id desde backend', id)
    try {
        const ufcDB = await Luchador.findByIdAndDelete({ _id: id });
        console.log(ufcDB)

        if (!ufcDB) {
            res.json({
                estado: false,
                mensaje: 'No se puede eliminar el luchador.'
            })
        } else {
            res.json({
                estado: true,
                mensaje: 'luchador eliminado.'
            })
        }
    } catch (error) {
        console.log(error)
    }
})



module.exports = router;