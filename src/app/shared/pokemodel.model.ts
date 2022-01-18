export class PokeModel {
  constructor(
    public name: string,
    public types: string[],
    public number: number,
    public flavorText: string,
    public imageUrl: string
  ) {}
}
