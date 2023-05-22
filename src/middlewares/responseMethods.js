export function responseMethods(req, res, next) {
  // metodos para la respuesta
  res.addToken = token => {
    res.header('authorization', token)
  }
  res.sendSuccess = result => {
    res.json({ status: 'success', result })
  }
  res.sendClientError = error => {
    res.status(400).json({ status: 'error', error })
  }
  res.sendServerError = error => {
    res.status(500).json({ status: 'error', error })
  }
  res.sendAuthError = error => {
    res.status(401).json({ status: 'error', error: 'Authentication Failed' })
  }
  res.sendPermissionError = error => {
    res.status(403).json({ status: 'error', error: "you don't have permission to do this action" })
  }
  next()
}

