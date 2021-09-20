const fileTypeDetection = type => {
  switch (type.split('/')[0]) {
    case 'image':
      return 'image'
    case 'audio':
      return 'audio'
    case 'video':
      return 'video'
    default:
      return 'document'
  }
}

const replaceAll = (str, find, replace) =>
  str.replace(new RegExp(find, 'g'), replace)

const generateKeys = len => {
  const symbols =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let password = ''
  for (let i = 0; i < len; i++) {
    password += symbols.charAt(Math.floor(Math.random() * symbols.length))
  }
  return password
}

const clearingKeys = fn => {
  setTimeout(async () => {
    await fn()
  }, 300_000)
}

const isCloseProfile = json => {
  try {
    return JSON.parse(json)['switchBtn']['closeProfile']
  } catch (error) {
    return false
  }
}

module.exports = {
  fileTypeDetection,
  replaceAll,
  generateKeys,
  clearingKeys,
  isCloseProfile,
}
