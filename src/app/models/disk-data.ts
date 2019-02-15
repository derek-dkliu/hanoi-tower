export class DiskData {
  public value: number;
  public draggable: boolean;
  public width: number;
  public color: string;

  constructor(value: number, draggable: boolean) {
    this.value = value;
    this.draggable = draggable;
    this.width = this.getDiskWidth();
    this.color = this.getRandomColor();
  }

  getDiskWidth(): number {
    return 30 + 10 * (10 - this.value);
  }

  getRandomColor(): string {
    const letters = '9ABCDE'.split('');
    let color = '#';
    for (let i = 0; i < 6; i++ ) {
      color += letters[Math.floor(Math.random() * letters.length)];
    }
    return color;
  }
}
