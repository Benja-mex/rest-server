const { Router } = require('express');
const router = Router();
const { usuariosallGet, 
        usuariosGet,
        usuariosPost,
        usuariosPut,
        usuariosDelete} = require('../controllers/user');

router.get('/:id', usuariosGet );
router.get('/', usuariosallGet );
router.post('/', usuariosPost);
router.put('/:id', usuariosPut);
router.delete('/', usuariosDelete);

module.exports = router;