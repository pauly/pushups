module.exports = (message, length = 100) => {
  message = String(message || '')
  if (message.length <= length) return message
  return message.substr(0, length - 1).trim() + '…'
}
