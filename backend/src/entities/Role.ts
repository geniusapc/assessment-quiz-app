// src/entities/Role.ts
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
} from "typeorm";


@Entity("roles")
export class Role {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column("varchar", { unique: true, length: 50 })
    name!: string;

    @Column("text", { nullable: true })
    description?: string;

    @OneToMany("User", (user: any) => user.role)
    users!: string[];

    @CreateDateColumn({ name: "created_at" })
    createdAt!: Date;

    @UpdateDateColumn({ name: "updated_at" })
    updatedAt!: Date;
}