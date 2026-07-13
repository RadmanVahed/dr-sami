import { randomUUID } from 'node:crypto'
import { writeFile, mkdir } from 'node:fs/promises'
import { join, extname } from 'node:path'

const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
const ALLOWED_FILE_TYPES = [...ALLOWED_IMAGE_TYPES, 'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']

export default defineEventHandler(async (event) => {
  await requireAdminSession(event)

  const formData = await readMultipartFormData(event)
  if (!formData?.length) {
    throw createError({ statusCode: 400, statusMessage: 'No file uploaded' })
  }

  const fileField = formData.find(f => f.name === 'file')
  if (!fileField?.data || !fileField.filename) {
    throw createError({ statusCode: 400, statusMessage: 'No file found in upload' })
  }

  const mimeType = fileField.type || 'application/octet-stream'
  if (!ALLOWED_FILE_TYPES.includes(mimeType)) {
    throw createError({ statusCode: 400, statusMessage: 'File type not allowed' })
  }

  const ext = extname(fileField.filename) || '.bin'
  const filename = `${randomUUID()}${ext}`
  const uploadsDir = getUploadsDir()
  const subdir = ALLOWED_IMAGE_TYPES.includes(mimeType) ? 'images' : 'files'
  const targetDir = join(uploadsDir, subdir)

  await mkdir(targetDir, { recursive: true })
  await writeFile(join(targetDir, filename), fileField.data)

  const url = `/uploads/${subdir}/${filename}`

  return { url, filename, mimeType }
})
