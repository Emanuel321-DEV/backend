import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateLocalDTO, UpdateLocalDTO } from 'src/local/dto/local.dto';
import { Repository } from 'typeorm';
import { LocalEntity } from './local.entity';
import axios from 'axios';

@Injectable()
export class LocalService {
  constructor(
    @InjectRepository(LocalEntity)
    private readonly localRepository: Repository<LocalEntity>,
  ) {}

  async findAll() {
    return await this.localRepository.find();
  }

  async store(data: CreateLocalDTO) {
    const findCep = await (
      await axios.get(`http://viacep.com.br/ws/${data.cep}/json`)
    ).data;

    const cepFormatted = `Rua: ${findCep.logradouro}, Bairro: ${findCep.bairro}, ${findCep.localidade} - ${findCep.uf}`;

    const dataFormatted = {
      name: data.name,
      cep: cepFormatted,
      numberLocal: data.numberLocal,
      company: data.company,
    };

    const local = await this.localRepository.create(dataFormatted);
    const saveLocal = await this.localRepository.save(local);

    return saveLocal;
  }

  async findOneOrFail(id: string) {
    try {
      return await this.localRepository.findOneOrFail({
        where: {
          id,
        },
      });
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async update(id: string, data: UpdateLocalDTO) {
    const local = await this.localRepository.findOneOrFail({
      where: {
        id,
      },
    });
    const findCep = await (
      await axios.get(`http://viacep.com.br/ws/${data.cep}/json`)
    ).data;

    const cepFormatted = `Rua: ${findCep.logradouro}, Bairro: ${findCep.bairro}, ${findCep.localidade} - ${findCep.uf}`;

    const dataFormatted = {
      name: data.name,
      cep: cepFormatted,
      numberLocal: data.numberLocal,
      company: data.company,
    };

    await this.localRepository.merge(local, dataFormatted);

    return await this.localRepository.save(local);
  }

  async destroy(id: string) {
    await this.localRepository.findOneOrFail({
      where: {
        id,
      },
    });

    await this.localRepository.softDelete({ id });
  }
}
