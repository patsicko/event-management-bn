import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from "typeorm";
import { User } from "./User";
import { Event } from "./Event";

@Entity()
export class Booking {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, user => user.bookings)
    user: User;

    @ManyToOne(() => Event, event => event.bookings)
    event: Event;

    @Column()
    numberOfTickets: number;

    @Column({ default: false })
    isCancelled: boolean;


}
