export const storeCurrentChannel = (channel) => {
  return {
    type: 'STORE_CURRENT_CHANNEL',
    payload: channel
  }
}