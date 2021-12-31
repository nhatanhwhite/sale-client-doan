import { News } from "../model/news";

export class ViewPostDto {
    news?:News;
    fiveBestNew?:News[];
    related?:News[];
}
