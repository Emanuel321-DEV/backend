import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { UsersEntity } from './users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly usersRepository: Repository<UsersEntity>,
  ) {}

  async findAll() {
    return await this.usersRepository.find({
      select: ['id', 'firstName', 'lastName', 'email'], // Desse modo a senha nao eh retornada
    });
  }

  async store(data: CreateUserDTO) {
    const user = this.usersRepository.create(data);
    await this.usersRepository.save(user);
  }

  async findOneOrFail(conditions) {
    try {
      return await this.usersRepository.findOneOrFail({
        where: {
          email: conditions.email,
        },
      });
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async update(id: string, data: UpdateUserDTO) {
    const user = await this.usersRepository.findOneOrFail({
      where: {
        id,
      },
    });

    await this.usersRepository.merge(user, data);

    await this.usersRepository.save(user);
  }

  async destroy(id: string) {
    await this.usersRepository.findOneOrFail({
      where: {
        id,
      },
    });

    await this.usersRepository.softDelete({ id });
  }
}
