export class PokeModel {
  constructor(
    public name: string,
    public types: [string, string?],
    public number: number,
    public flavorText: string,
    public imageUrl: string
  ) {}
}
