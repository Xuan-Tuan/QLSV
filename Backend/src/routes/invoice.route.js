const express = require('express');
const { invoiceController } = require('../../controllers/invoice.controller');
const router = express.Router();
const auth = require('../../middlewares/auth');

router.post('/', invoiceController.createInvoice);
router.get('/', invoiceController.getInvoices);
router.patch('/:id', invoiceController.updateInvoice);
router.delete('/:id', invoiceController.deleteInvoice);

router.get('/my-invoices', auth(), invoiceController.getMyInvoices);
router.post('/my-invoices', auth(), invoiceController.userRequestPay);
router.post('/request-pay', auth(), invoiceController.requestPay);

module.exports = router;
