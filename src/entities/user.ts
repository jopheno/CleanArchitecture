import { UserData } from '@entities/user-data'
import { Either, left } from '@shared/either'
import { Email } from '@entities/email'
import { Name } from '@entities/name'

import { InvalidNameError } from '@entities/errors/invalid-name-error'
import { InvalidEmailError } from '@entities/errors/invalid-email-error'

export class User {
  static create (userData: UserData): Either<InvalidNameError | InvalidEmailError, User> {
    const nameOrError = Name.create(userData.name)
    if (nameOrError.isLeft()) {
      return left(new InvalidNameError())
    }

    const emailOrError = Email.create(userData.email)
    if (emailOrError.isLeft()) {
      return left(new InvalidEmailError())
    }
  }
}
