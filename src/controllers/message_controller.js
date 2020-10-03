const {message_services} = require('../services/index')
const {send_message_error} = require('../../lang/vi')
const {app} = require('../config/app')
const uid = require('uid')
const multer = require('multer')

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, app.avatar_directory)
  },
  filename: function (req, file, cb) {
    let match = app.avatar_type
    if(match.indexOf(file.mimetype) == -1) return cb(send_message_error.send_image_type_error, null)

    let avatar_name = `${uid()}-${new Date().getTime()}-${file.originalname}` 
    cb(null, avatar_name)
  }
})

let upload_avatar = multer({ 
  storage: storage,
  limits: {fileSize: app.avatar_limit_size}
}).array('message_images',50);

let user_send_file_image_persional = async (req, res) => {

  upload_avatar(req, res, async (error) => {

    if(error) {
      if(error.message){
        return res.status(500).send(send_message_error.send_image_error)
      }

      return res.status(500).send(error)
    }

    
    try {
      let sender_id = req.session.user_id
      let receiver_id = req.body.receiver_id
      let src_images = []
      
      req.files.forEach(file => {
        src_images.push(file.filename)
      })
      
      let result_send_images_message = await message_services.user_send_file_image_persional(sender_id,receiver_id,src_images)

      return res.status(200).send(result_send_images_message)

    } catch (error) {
      return res.status(500).send(error)
    }
  })

}


let get_persional_messages = async (req, res) => {
  try {
    let yourself_user_id = req.session.user_id;
    let partner_id = req.params.user_id;

    let list_messages = await message_services.get_persional_messages(yourself_user_id,partner_id)

    return res.status(200).send(list_messages)
  } catch (error) {
    return res.status(500).send()
  }
}

module.exports = {
  get_persional_messages,
  user_send_file_image_persional
}