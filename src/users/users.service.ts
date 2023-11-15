import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private repo: Repository<User>) {}

    create(email: string, password: string) {
        const user = this.repo.create({ email, password });
        return this.repo.save(user); // Must pass an entity for hooks to be called
    }

    findOne(id: number) {
        return this.repo.findOne({ where: { id: id } });
    }

    find(email: string) {
        return this.repo.findOne({ where: { email: email } });
    }

    // A Partial is a type helper defined in typescript (no import)
    // This basically tells us that attrs can be any object that
    // has at least or none some of the properties of the user class.
    // Ex. an object with no properties, has at least one property or
    // has all the properties
    async update(id: number, attrs: Partial<User>) {
        const user = await this.repo.findOne({ where: { id: id } });
        if (!user) {
            throw new NotFoundException('user not found');
        }
        Object.assign(user, attrs);
        return this.repo.save(user); // Must pass an entity for hooks to be called
    }

    async remove(id: number) {
        const user = await this.repo.findOne({ where: { id: id } });
        if (!user) {
            throw new Error('user not found');
        }
        return this.repo.remove(user); // Must pass an entity for hooks to be called
    }
}
