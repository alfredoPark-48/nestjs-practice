import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    AfterInsert,
    AfterUpdate,
    AfterRemove,
} from 'typeorm';
// import { Exclude } from 'class-transformer';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    // @Exclude() This decorator is used to not include the password when returning the user entity
    password: string;

    @AfterInsert()
    logInsert() {
        console.log(`Inserted user with id ${this.id}`);
    }

    @AfterUpdate()
    logUpdate() {
        console.log(`Updated user with id ${this.id}`);
    }

    @AfterRemove()
    logRemove() {
        console.log(`Removed user with id ${this.id}`);
    }
}
