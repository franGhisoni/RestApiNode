const { Router } = require('express');
const router = Router();
const sdk = require('api')('@holded/v1.0#3cm531nlbw08qsz');

router.get('/v1/getFacturaPDF', async (req, res) => {
    try {
        sdk.auth('c1e86f21bcc5fdedc6c36bd30cb5b596');
        const { data } = await sdk.getDocumentPDF({ docType: 'invoice', documentId: req.query.id });

        if (!data) {
            return res.status(404).send('No se encontró la factura');
        }

        res.set('Content-Type', 'application/pdf');
        res.status(200).send(data);
    } catch (error) {
        console.error('Error al obtener la factura PDF:', error);
        res.status(500).send('Error al obtener la factura PDF');
    }
});

module.exports = router;
