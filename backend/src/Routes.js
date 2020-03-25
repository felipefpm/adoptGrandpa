const express = require("express");
const OngController = require('./Controllers/OngController')
const CasesController = require('./Controllers/CasesController')
const ProfileController = require('./Controllers/ProfileController')
const SessionsController = require('./Controllers/SessionController')

const routes = express.Router();

routes.post('/session', SessionsController.create)

routes.get('/ongs', OngController.index)
routes.post("/ongs", OngController.create);

routes.get('/cases', CasesController.index)
routes.post("/cases", CasesController.create);
routes.delete("/cases/:id", CasesController.delete)

routes.get('/profile', ProfileController.index)

module.exports = routes;