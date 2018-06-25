function messages(parent, args, context, info) {
  return context.db.query.messages({}, info)
}

function users(parent, args, context, info) {
  return context.db.query.users({}, info)
}

function messages_by_user(parent, args, context, info) {
  const where = args.sender_id
    ? {
        OR: [
          {receiver: {id: args.receiver_id}, sender: {id: args.sender_id}},
          {receiver: {id: args.sender_id}, sender: {id: args.receiver_id}}
        ],
      }
    : {}

  return context.db.query.messages({ where }, info)
}

module.exports = {messages_by_user, messages, users }
