import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
    CreateDateColumn,
    UpdateDateColumn,
} from "typeorm";

@Entity("questions")
export class Question {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column("text", { name: "question_text" })
    questionText!: string;

    @Column("varchar", { array: true })
    options!: string[];

    // store index of the correct answer (0 = first option, 1 = second, etc.)
    @Column("integer", { name: "correct_answer" })
    correctAnswer!: number;

    @Column("integer", { name: "created_by" })
    createdBy!: number;

    @ManyToOne("User", (user: any) => user.questions, { onDelete: "CASCADE" })
    @JoinColumn({ name: "created_by" })
    creator!: string;

    @CreateDateColumn({ name: "created_at" })
    createdAt!: Date;

    @UpdateDateColumn({ name: "updated_at" })
    updatedAt!: Date;
}
