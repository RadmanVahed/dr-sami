import { createReadStream, existsSync } from 'node:fs'
import { join } from 'node:path'
import { sendStream, getRequestURL } from 'h3'

export default defineEventHandler(async (event) => {
  const url = getRequestURL(event)
  const filePath = url.pathname.replace('/uploads/', '')
  const fullPath = join(getUploadsDir(), filePath)

  if (!existsSync(fullPath)) {
    throw createError({ statusCode: 404, statusMessage: 'File not found' })
  }

  return sendStream(event, createReadStream(fullPath))
})
