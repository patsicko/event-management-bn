import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Booking } from "./Booking";


@Entity()
export class Event {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    date: Date;

    @Column()
    location: string;

    @Column()
    availableTickets: number;

    @OneToMany(() => Booking, booking => booking.event)
    bookings: Booking[];
}
