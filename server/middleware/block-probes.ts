const PROBE_PATTERN = /\.(?:env|php|sql|bak|git|asp|aspx)(?:$|[/?#])|\/wp-login\.php(?:$|[/?#])/i

export default defineEventHandler((event) => {
  const { pathname } = getRequestURL(event)

  if (PROBE_PATTERN.test(pathname)) {
    setResponseStatus(event, 404)
    return 'Not Found'
  }
})
