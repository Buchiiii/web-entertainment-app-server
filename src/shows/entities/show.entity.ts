import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("shows")
export class Show {
  @PrimaryGeneratedColumn("uuid")
  id: string;
  @Column()
  title: string;

  @Column("simple-json")
  thumbnail: {
    trending: {
      small: string;
      large: string;
    };
    regular: {
      small: string;
      medium: string;
      large: string;
    };
  };
  @Column()
  year: number;

  @Column()
  category: string;

  @Column()
  rating: string;

  @Column()
  isBookmarked: boolean;

  @Column()
  isTrending: boolean;
}
