

export interface Location {
    accuracy: number;
    altitude: number | null;
    heading: number | null;
    latitude: number;
    longitude: number;
    speed: number | null;
    timeDate: string | null;
}