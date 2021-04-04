const multer = require('multer')
const helpers = require('./helpers/helpers')

const multerOptions = {
  filename: (req, file, next) => {
    const ext = file.mimetype.split('/')[1]
    next(null, file.originalname + '-' + Date.now() + '.' + ext)
  },
  fileFilter: (req, file, next) => {
    if (!file) {
      next(null, true)
    }
  },
}

const multerConfig = {
  storage: multer.diskStorage({
    destination: (req, file, next) => {
      next(null, './upload/image')
    },
    filename: (req, file, next) => {
      const ext = file.mimetype.split('/')[1]
      next(null, file.originalname + '-' + Date.now() + '.' + ext)
    },
    fileFilter: (req, file, next) => {
      if (!file) {
        next(null, true)
      }
    },
  }),
}

const multerConfigDialog = {
  storage: multer.diskStorage({
    destination: (req, file, next) => {
      next(
        null,
        `./upload/dialogs/${req.query.dialogId}/${helpers.fileTypeDetection(
          file.mimetype
        )}s`
      )
    },
    ...multerOptions,
  }),
}

module.exports = {
  multer,
  multerConfig,
  multerOptions,
  multerConfigDialog,
}
