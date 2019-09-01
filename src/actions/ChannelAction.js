export const storeCurrentChannel = (channel) => {
  return {
    type: 'STORE_CURRENT_CHANNEL',
    payload: channel
  }
}

export const setPrivateChannel = (value) => {
  return {
    type: 'SET_PRIVATE_CHANNEL',
    payload: value
  }
}