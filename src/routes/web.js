const express = require('express')
const {home_controller, auth_controller} = require('../controllers/index')
const {auth_valid} = require('../validation/index')

let router = express.Router()

function init_routes(app) {
  router.get('/', home_controller)
  router.get('/login',auth_controller.render_login_page)
  router.get('/register',auth_controller.render_register_page)
  router.get('/recover',auth_controller.render_recover_account_page)

  router.post("/user-create-new-account",auth_valid.register_valid, auth_controller.create_new_account)
  router.get("/active-account/:token",auth_controller.user_active_account)
  router.get("/recover-account/:email",auth_valid.valid_email,auth_controller.send_verify_code)
  router.get("/send-verify-code/:verify_code/:email",auth_valid.valid_verify_code,auth_controller.recover_user_password)

  // catch 404 and forward to error handler
  router.use(function(req, res, next) {
    // respond with html page
    return res.render('./404_page/index')
  });
  
  return app.use('/', router)
}

module.exports = init_routes;