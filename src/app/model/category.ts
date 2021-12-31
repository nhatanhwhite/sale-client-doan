import { UserSystem } from "./user-system";
import {PetDTO} from '../dto/pet-dto';

export class Category {
    id?: number;
    categoryName?: string;
    lastUpdate?: string;
    userSystem?: UserSystem;
    products?: PetDTO[];
}
