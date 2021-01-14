import { UserData } from '@entities/user-data'
import { UserRepository } from '@ports/user-repository'
import { InMemoryUserRepository } from '@repositories/in-memory-user-repository'
import { RegisterUserOnMailingList } from './register-user-on-mailing-list'

describe('Register user on mailing list use case', () => {
  test('should add user with complete data to mailing list', async () => {
    const users: UserData[] = []
    expect(users.length).toBe(0)

    const repo: UserRepository = new InMemoryUserRepository(users)
    const usecase: RegisterUserOnMailingList = new RegisterUserOnMailingList(repo)
    const name = 'any_name'
    const email = 'any@email.com'
    const response = await usecase.registerUserOnMailingList({ name, email })
    const user = repo.findUserByEmail(email)
    expect((await user).name).toBe(name)
    expect(response.value.name).toBe('any_name')
  })
})
