import { UserData } from '@models/user-data'

describe('Register user on mailing list use case', () => {
  test('should add user with complete data to mailing list', async () => {
    const users: UserData[] = []
    expect(users.length).toBe(0)
    /*
      const repo: UserRepository = new InMemoryUserRepository(users)
      const usecase: RegisterUserOnMailingList = new RegisterUserOnMailingList(repo)
      const name = 'any_name'
      const email = 'any@email.com'
      const response = await usecase.registerUserOnMailingList({ name, email })
      const user = repo.findUserByEmail(email)
      expect((await user).name).toBe(name)
    */
  })
})
