const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let groupSchema = new Schema({
  group_name: String,
  user_created_id : String,
  user_amount : Number,
  message_amount : { type: Number, default: 0}, 
  avatar: {type: String, default: null},
  members: [],
  invite_message: String,
  created_at : { type: Number, default: Date.now},
  removed_at: { type: Number, default: null},
  updated_at: { type: Number, default: null} 
});

groupSchema.statics = { 
  create_new(model){
    return this.create(model)
  },

  get_list_group(user_id){
    return this.find({
      $or: [
        {"user_created_id": user_id, "removed_at": null},
        {"members": user_id, "removed_at": null}
      ]
    }).sort({"created_at": -1}) .exec()
  }
}

module.exports = mongoose.model("Groups",groupSchema);