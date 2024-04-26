import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { Booking } from "./Booking"

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column()
    email: string

    @Column()
    password:string

    @Column({default:'user'})
    role:string

    @OneToMany(() => Booking, booking => booking.user)
    bookings: Booking[];


}
