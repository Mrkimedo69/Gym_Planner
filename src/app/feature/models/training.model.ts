import { Exercise } from "./exercises.model";

export interface Training{
    exercises: Exercise [],
    id: string,
    trainingName: string,
    trainingImage: string
}