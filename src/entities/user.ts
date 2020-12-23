import { UserData } from '@entities/user-data'
import { Either, left } from '@shared/either'
import { InvalidEmailError } from '@entities/errors/invalid-email-error'
import { Email } from '@entities/email'

export class User {
  static create (userData: UserData): Either<InvalidEmailError, User> {
    const emailOrError = Email.create(userData.email)
    if (emailOrError.isLeft()) {
      return left(new InvalidEmailError())
    }
  }
}
