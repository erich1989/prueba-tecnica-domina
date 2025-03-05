const express = require('express');
const response = require('../../network/response');
const controller = require('./controller');

const router = express.Router();

// router.get('/:data', authenticateToken, async (req, res) => {
//     try {
//         const data = req.params.data;
//         const infoUser = await controller.getAllUser(data);
//         response.success(req, res, infoUser, 200);
//     } catch (error) {
//         response.error(req, res, 'Unexpected Error', 500, error)
//     }
// });

// router.get('/', authenticateToken, async (req, res) => {
//     try {
//         const infoUser = await controller.getInfoUser();
//         response.success(req, res, infoUser, 200);
//     } catch (error) {
//         response.error(req, res, 'Unexpected Error', 500, error)
//     }
// });

router.post('/',
    // authenticateToken,
    // checkAdminUser,
    // checkExistingEmail,
    async (req, res) => {
        try {
            const role = await controller.createRole(req.body);
            response.success(req, res, role, 200);
        } catch (error) {
            response.error(req, res, 'Unexpected Error', 500, error)
        }
    });

// router.put('/update', authenticateToken, checkAdminUser, async (req, res) => {
//     try {
//         const info = await controller.update(req.body);
//         response.success(req, res, info, 200);
//     } catch (error) {
//         response.error(req, res, 'Unexpected Error', 500, error)
//     }
// });

// router.delete('/delete', authenticateToken, async (req, res) => {
//     try {
//         const info = await controller.deleteElement(req.body);
//         response.success(req, res, info, 200);
//     } catch (error) {
//         response.error(req, res, 'Unexpected Error', 500, error)
//     }
// });


module.exports = router;