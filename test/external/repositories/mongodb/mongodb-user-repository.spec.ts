import { MongoHelper } from '@/external/repositories/mongodb/helper'
import { MongodbUserRepository } from '@/external/repositories/mongodb'

describe('MongoDB User Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(() => {
    MongoHelper.clearColection('users')
  })

  test('when user is added, it should exist', async () => {
    const userRepository = new MongodbUserRepository()
    const userData = {
      name: 'any_name',
      email: 'any@mail.com'
    }
    await userRepository.add(userData)
    expect(await userRepository.exists(userData)).toBeTruthy()
  })

  test('find all users should return all added users', async () => {
    const userRepository = new MongodbUserRepository()
    await userRepository.add({
      name: 'any_name',
      email: 'any@mail.com'
    })
    await userRepository.add({
      name: 'second_name',
      email: 'second@mail.com'
    })

    const users = await userRepository.findAllUsers()
    expect(users[0].name).toEqual('any_name')
    expect(users[1].name).toEqual('second_name')
  })
})
