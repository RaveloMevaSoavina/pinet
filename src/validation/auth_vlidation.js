const {check} = require('express-validator')
const {recover_account_valid_mess} = require('../../lang/vi')

let register_valid = [
  check('user_email',"email").not().isEmpty().isEmail(),
  check('name_account',"account").isAlphanumeric().isLength({max:255}).isLength({min:1}),
  check('user_password',"password").isAlphanumeric().isLength({max:255}).isLength({min:1})
]

let valid_email = [
  check('email',recover_account_valid_mess.email_incorrect).not().isEmpty().matches(/^[a-zA-Z0-9]+(@gmail\.com)$/)
]

let valid_verify_code = [
  check('verify_code',recover_account_valid_mess.verify_code_incorrect).matches(/^[A-Za-z0-9]+$/)
]

module.exports = {
  register_valid,
  valid_email,
  valid_verify_code
}