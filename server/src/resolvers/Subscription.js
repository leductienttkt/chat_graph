function newMessageSubscribe (parent, args, context, info) {
  return context.db.subscription.message(
    { where: { mutation_in: ['CREATED'] } },
    info,
  )
}

const newMessage = {
  subscribe: newMessageSubscribe
}

module.exports = {
  newMessage,
}
