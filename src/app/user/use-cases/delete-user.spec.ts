import { User } from '@prisma/client';
import { InMemoryUserRepository } from '../../../../test/repositories/in-memory-user-repository';
import { DeleteUser } from './delete-user';
import { UserNotFound } from './errors/user-not-found';

describe('delete user', () => {
  let userRepository: InMemoryUserRepository;
  let deleteUser: DeleteUser;
  let user: User;

  beforeAll(() => {
    userRepository = new InMemoryUserRepository();
    deleteUser = new DeleteUser(userRepository);

    user = {
      id: 'test-id',
      name: 'Test Name',
      email: 'test@email.com',
      password: 'test_password',
    };

    userRepository.create(user);
  });

  it('It should be possible to delete a user', async () => {
    await expect(deleteUser.execute(user.id)).resolves.not.toThrowError();

    expect(userRepository.users).toHaveLength(0);
  });

  it('It should not be possible to delete a non existent user', async () => {
    await expect(deleteUser.execute(user.id)).rejects.toThrowError(
      UserNotFound,
    );
  });
});
