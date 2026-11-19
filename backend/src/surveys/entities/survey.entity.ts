import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn,type Relation, UpdateDateColumn } from "typeorm";
import { EProgram } from "../../users/enum/program.enum.js";
import { User } from "../../users/entities/users.entity.js";
import { Question } from "../../questions/entities/question.entity.js";

@Entity('surveys')
export class Survey {

    @PrimaryGeneratedColumn()
    id : number

    @Column({type : "varchar"})
    title : string

    @Column({type : "text"})
    description : string

    @Column({type : "enum", enum : EProgram})
    program : EProgram

    @Column({type : 'boolean', default : true})
    is_activated: boolean

    @Column({type : "timestamp"})
    activation_date : Date

    @Column({type : "timestamp"})
    expiration_date : Date

    @Column({type : 'integer'})
    created_by : number

    @CreateDateColumn()
    created_at : Date

    @UpdateDateColumn()
    updated_at : Date

    @ManyToOne(() => User, (user) => user.Created_surveys) 
    @JoinColumn({name :'created_by'})
    Creater : Relation<User>

    @OneToMany(() => Question, (question) => question.Survey)
    Question : Relation<Question[]>

}
