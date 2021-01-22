import { UserData } from '@entities/user-data'
import { Either, left, right } from '@shared/either'
import { Email } from '@entities/email'
import { Name } from '@entities/name'

import { InvalidNameError } from '@entities/errors/invalid-name-error'
import { InvalidEmailError } from '@entities/errors/invalid-email-error'

export class User {
  public readonly name: Name
  public readonly email: Email

  private constructor (name: Name, email: Email) {
    this.name = name
    this.email = email
  }

  static create (userData: UserData): Either<InvalidNameError | InvalidEmailError, User> {
    const nameOrError = Name.create(userData.name)
    if (nameOrError.isLeft()) {
      return left(new InvalidNameError(userData.name))
    }

    const emailOrError = Email.create(userData.email)
    if (emailOrError.isLeft()) {
      return left(new InvalidEmailError(userData.email))
    }

    const name: Name = nameOrError.value as Name
    const email: Email = emailOrError.value as Email

    return right(new User(name, email))
  }
}
