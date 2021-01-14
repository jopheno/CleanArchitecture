import { InvalidEmailError } from '@entities/errors/invalid-email-error'
import { UserData } from '@entities/user-data'
import { UserRepository } from '@ports/user-repository'
import { InMemoryUserRepository } from '@repositories/in-memory-user-repository'
import { left } from '@shared/either'
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

  test('should not add user with invalid email to mailing list', async () => {
    const users: UserData[] = []
    expect(users.length).toBe(0)

    const repo: UserRepository = new InMemoryUserRepository(users)
    const usecase: RegisterUserOnMailingList = new RegisterUserOnMailingList(repo)
    const name = 'any_name'
    const invalidEmail = 'invalid_email'
    const response = await usecase.registerUserOnMailingList({ name: name, email: invalidEmail })
    const user = await repo.findUserByEmail(invalidEmail)
    expect(user).toBeNull()
    expect(response).toEqual(left(new InvalidEmailError()))
  })
})
