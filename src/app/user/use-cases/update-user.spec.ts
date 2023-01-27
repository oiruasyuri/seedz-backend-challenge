import { User } from '@prisma/client';
import { InMemoryUserRepository } from '../../../../test/repositories/in-memory-user-repository';
import { NameIsRequired } from './errors/name-is-required';
import { PasswordIsRequired } from './errors/password-is-required';
import { UserNotFound } from './errors/user-not-found';
import { UpdateUser } from './update-user';

describe('update user', () => {
  let userRepository: InMemoryUserRepository;
  let updateUser: UpdateUser;
  let user: User;

  beforeAll(() => {
    userRepository = new InMemoryUserRepository();
    updateUser = new UpdateUser(userRepository);

    user = {
      id: 'test-id',
      name: 'Test Name',
      email: 'test@email.com',
      password: 'test_password',
    };

    userRepository.create(user);
  });

  it('It should not be possible to submit blank user name', async () => {
    const userUpdate = { name: '' };

    await expect(updateUser.execute(user.id, userUpdate)).rejects.toThrowError(
      NameIsRequired,
    );
  });

  it('It should not be possible to submit blank user password', async () => {
    const userUpdate = { password: '' };

    await expect(updateUser.execute(user.id, userUpdate)).rejects.toThrowError(
      PasswordIsRequired,
    );
  });

  it('It should be possible to update the username and password', async () => {
    const userUpdate = { name: 'Example Name', password: 'example_password' };

    await expect(
      updateUser.execute(user.id, userUpdate),
    ).resolves.not.toThrowError();

    expect(userRepository.users[0].id).toEqual(user.id);
    expect(userRepository.users[0].name).toEqual(userUpdate.name);
    expect(userRepository.users[0].password).toEqual(userUpdate.password);
  });

  it('It should not be possible to update a non existent user', async () => {
    const id = 'example-id';
    const userUpdate = { name: 'Example Name', password: 'example_password' };

    await expect(updateUser.execute(id, userUpdate)).rejects.toThrowError(
      UserNotFound,
    );
  });
});
