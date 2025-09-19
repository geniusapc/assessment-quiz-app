import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
} from "typeorm";


export enum UserRole {
    ADMIN = "ADMIN",
    USER = "USER",
}

@Entity("users")
export class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column("varchar", { unique: true })
    email!: string;

    @Column("varchar", { name: "password" })
    password!: string;


    @ManyToOne("Role", (role: any) => role.users, { eager: true })
    @JoinColumn({ name: "role_id" })
    role!: any;


    @CreateDateColumn({ name: "created_at" })
    createdAt!: Date;

    @UpdateDateColumn({ name: "updated_at" })
    updatedAt!: Date;
}
