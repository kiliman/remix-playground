export async function getUser(id: number) {
  console.log('getUser')
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ id, username: 'jdoe' })
    }, 1000)
  })
}
