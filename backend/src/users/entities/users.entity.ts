import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn,type Relation, UpdateDateColumn } from "typeorm";
import { Role } from "../enum/roles.enum.js";
import { EProgram } from "../enum/program.enum.js";
import { Survey } from "../../surveys/entities/survey.entity.js";

@Entity('users')

export class User {
    
    @PrimaryGeneratedColumn()
    id : number

    @Column({type : 'varchar', length : 120})
    username : string

    @Column({type : 'varchar' ,length : 120, unique: true})
    email : string

    @Column({ type : 'varchar', unique: true, nullable : true})
    card_id : string

    @Column({type: 'varchar', length : 120, nullable : true})
    password : string

    @Column({type: 'enum', enum : EProgram, nullable : true})
    program : EProgram

    @Column({type : 'enum', enum : Role, default : Role.ADMIN})
    role : Role

    @Column({type : 'varchar', length: 255, unique:true, nullable: true})
    googleId : string

    @Column({type : 'varchar', length:500, nullable : true})
    avatar : string

    @CreateDateColumn()
    createdAt : Date

    @UpdateDateColumn()
    updatedAt : Date

    @OneToMany(() => Survey, (survey) => survey.Creater)
    Created_surveys : Relation<Survey[]>
}