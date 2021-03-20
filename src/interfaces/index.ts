export interface Submission {
    type: string;
    title: string;
    text: string;
    status: string;
    votes: number,
    voted: boolean,
    location: string,
    image: string,
}
