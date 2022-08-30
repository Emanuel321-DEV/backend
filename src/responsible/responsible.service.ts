import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import { Repository } from 'typeorm';
import {
  CreateResponsibleDTO,
  UpdateResponsibleDTO,
} from './dto/responsible.dto';
import { ResponsibleEntity } from './responsible.entity';

@Injectable()
export class ResponsibleService {
  constructor(
    @InjectRepository(ResponsibleEntity)
    private readonly responsibleRepository: Repository<ResponsibleEntity>,
  ) {}

  async findAll() {
    return await this.responsibleRepository
      .createQueryBuilder()
      .select('responsible')
      .from(ResponsibleEntity, 'responsible')
      .groupBy('responsible.id')
      .getRawMany();
  }

  async store(data: CreateResponsibleDTO) {
    try {
      const findCep = await (
        await axios.get(`http://viacep.com.br/ws/${data.cepResponsible}/json`)
      ).data;

      const cepFormatted = `Rua: ${findCep.logradouro}, Bairro: ${findCep.bairro}, ${findCep.localidade} - ${findCep.uf}`;

      const dataUpdate = {
        nameResponsible: data.nameResponsible,
        telephone: data.telephone,
        numberHome: data.numberHome,
        cepResponsible: cepFormatted,
        company: data.company,
        local: data.local,
      };
      const responsible = this.responsibleRepository.create(dataUpdate);
      await this.responsibleRepository.save(responsible);
    } catch (error) {
      console.log(error);
    }
  }

  async findOneOrFail(id: string) {
    try {
      return await this.responsibleRepository
        .createQueryBuilder()
        .select('responsible')
        .from(ResponsibleEntity, 'responsible')
        .groupBy('responsible.id')
        .where('responsible.id = :id', { id: id })
        .getRawOne();
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async update(id: string, data: UpdateResponsibleDTO) {
    const responsible = await this.responsibleRepository.findOneOrFail({
      where: {
        id,
      },
    });

    const findCep = await (
      await axios.get(`http://viacep.com.br/ws/${data.cepResponsible}/json`)
    ).data;

    const cepFormatted = `Rua: ${findCep.logradouro}, Bairro: ${findCep.bairro}, ${findCep.localidade} - ${findCep.uf}`;

    const dataUpdate = {
      nameResponsible: data.nameResponsible,
      telephone: data.telephone,
      numberHome: data.numberHome,
      cepResponsible: cepFormatted,
      company: data.company,
      local: data.local,
    };

    this.responsibleRepository.merge(responsible, dataUpdate);

    await this.responsibleRepository.save(responsible);
  }

  async destroy(id: string) {
    await this.responsibleRepository.findOneOrFail({
      where: {
        id,
      },
    });

    await this.responsibleRepository.softDelete({ id });
  }
}
