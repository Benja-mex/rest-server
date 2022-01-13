const { Router } = require('express');
const router = Router();
const { consecutivoallGet, 
        consecutivoGet,
        consecutivoPost,
        consecutivoPut,
        consecutivoDelete} = require('../controllers/consecutivos');

router.get('/:id', consecutivoGet );
router.get('/', consecutivoallGet );
router.post('/', consecutivoPost);
router.put('/:id', consecutivoPut);
router.delete('/', consecutivoDelete);

module.exports = router;