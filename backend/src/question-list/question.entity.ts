import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { QuestionList } from "./question-list.entity";

@Entity()
export class Question {
    private static CONTENT_MAX_LEN = 200;

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: Question.CONTENT_MAX_LEN })
    content: string;

    @Column()
    index: number;

    @Column()
    questionListId: number;

    @Column({ default: 0 })
    usage: number;

    @ManyToOne(() => QuestionList, (questionList) => questionList.questions, {
        onDelete: "CASCADE",
    })
    questionList: QuestionList;
}
