export interface Report {
  title: string;
  description: string;
  location: number[];
  type: string;
  votes: number,
  voted?: boolean,
  image?: string,
}
