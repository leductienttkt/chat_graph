function user(root, args, context, info) {
  return context.db.query.user({ where: { id: root.user.id } }, info)
}

function token(root, args, context, info) {
  return root.token
}

module.exports = { token, user }
