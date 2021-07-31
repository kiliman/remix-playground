import { randomBytes } from 'crypto'

export async function getUser(id: number) {
  const rand = randomBytes(10).toString('base64')
  console.log('getUser', rand)
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        id,
        username: 'jdoe',
        rand,
      })
    }, 1000)
  })
}
