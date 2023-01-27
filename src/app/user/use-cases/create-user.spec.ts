import { InMemoryUserRepository } from '../../../../test/repositories/in-memory-user-repository';
import { CreateUser } from './create-user';
import { EmailInUse } from './errors/email-in-use';
import { EmailIsRequired } from './errors/email-is-required';
import { NameIsRequired } from './errors/name-is-required';
import { PasswordIsRequired } from './errors/password-is-required';

describe('create user', () => {
  let userRepository: InMemoryUserRepository;
  let createUser: CreateUser;

  beforeAll(() => {
    userRepository = new InMemoryUserRepository();
    createUser = new CreateUser(userRepository);
  });

  it('It should not be possible to create a user without name', async () => {
    const user = {
      name: '',
      email: 'test@email.com',
      password: 'test_password',
    };

    await expect(createUser.execute(user)).rejects.toThrowError(NameIsRequired);
  });

  it('It should not be possible to create a user without email', async () => {
    const user = {
      name: 'Test Name',
      email: '',
      password: 'test_password',
    };

    await expect(createUser.execute(user)).rejects.toThrowError(
      EmailIsRequired,
    );
  });

  it('It should not be possible to create a user without password', async () => {
    const user = {
      name: 'Test Name',
      email: 'test@email.com',
      password: '',
    };

    await expect(createUser.execute(user)).rejects.toThrowError(
      PasswordIsRequired,
    );
  });

  it('It should be possible to create a user', async () => {
    const user = {
      name: 'Test Name',
      email: 'test@email.com',
      password: 'test_password',
    };

    await expect(createUser.execute(user)).resolves.not.toThrowError();

    expect(userRepository.users[0].id).toBeDefined();
    expect(userRepository.users[0].name).toEqual(user.name);
    expect(userRepository.users[0].email).toEqual(user.email);
    expect(userRepository.users[0].password).toEqual(user.password);
  });

  it('It should not be possible to create a user with email in use', async () => {
    const user = {
      name: 'Test Name',
      email: 'test@email.com',
      password: 'test_password',
    };

    await expect(createUser.execute(user)).rejects.toThrowError(EmailInUse);
  });
});
