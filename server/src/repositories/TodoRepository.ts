import { Repository } from "typeorm";
import { Quote } from "../entity/Todo";

export class TodoRepository extends Repository<Quote> {}
