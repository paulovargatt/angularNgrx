export interface ExerciseModel {
    id: string;
    name;
    duration;
    calories;
    date?: Date;
    state?: 'completed' | 'cancelled' | null;
}
