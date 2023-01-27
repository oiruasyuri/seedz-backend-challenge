import { User } from '@prisma/client';
import { InMemoryUserRepository } from '../../../../test/repositories/in-memory-user-repository';
import { UserNotFound } from './errors/user-not-found';
import { ReadUser } from './read-user';

describe('read user', () => {
  let userRepository: InMemoryUserRepository;
  let readUser: ReadUser;
  let user: User;

  beforeAll(() => {
    userRepository = new InMemoryUserRepository();
    readUser = new ReadUser(userRepository);

    user = {
      id: 'test-id',
      name: 'Test Name',
      email: 'test@email.com',
      password: 'test_password',
    };
  });

  it('It should not be possible to read a non existent user', async () => {
    await expect(readUser.execute(user.id)).rejects.toThrowError(UserNotFound);
  });

  it('It should be possible to read a user', async () => {
    await userRepository.create(user);

    await expect(readUser.execute(user.id)).resolves.toEqual(user);
  });
});
