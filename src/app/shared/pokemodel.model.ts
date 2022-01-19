export class PokeModel {
  constructor(
    public name: string,
    public types: string[],
    public number: number,
    public imageUrl: string,
    public backImageUrl: string
  ) {}
}
