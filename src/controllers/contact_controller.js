const {contact_services} = require('../services/index')

let search_friend_to_add_contact = async (req, res) => {
  let key_word = req.params.key_word;
  let user_id = req.session.user_id
  
  try {
    let result_search = await contact_services.search_friend_to_add_contact(key_word,user_id)

    return res.status(200).send(result_search)
  } catch (error) {
    return res.status(500).send(error)
  }
}

let send_request_contact = async (req, res) => {
  let receiver_req_id = req.params.receiver_req_id;
  let sender_req_id = req.session.user_id;
  
  try {
    let receiver_req_profile = await contact_services.send_request_contact(sender_req_id, receiver_req_id)

    // edit data to send back
    let result = {
      user_id: receiver_req_profile._id,
      username: receiver_req_profile.username,
      avatar: receiver_req_profile.avatar,
      class: receiver_req_profile.class
    }
    return res.status(200).send(result)
  } catch (error) {
    return res.status(500).send()
  }
}


module.exports = {
  search_friend_to_add_contact,
  send_request_contact
}