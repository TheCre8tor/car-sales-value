import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  OneToMany,
} from 'typeorm';
import { Report } from 'src/reports/entity/report.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Report, (report) => report.user)
  reports: Array<Report>;

  // Database Hooks ->
  // This hooks will only get called if the repository
  // ```create``` method is called before ```save```

  @AfterInsert()
  logInsert() {
    console.log(`Inserted User with id: ${this.id}`);
  }

  @AfterRemove()
  logRemove() {
    console.log(`Removed User with id`);
  }

  @AfterUpdate()
  logUpdate() {
    console.log(`Updated User with id: ${this.id}`);
  }
}
