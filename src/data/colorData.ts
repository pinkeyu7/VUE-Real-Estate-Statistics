function hexToRgb(hex: string) {
  return [
    parseInt(hex.substring(0, 2), 16),
    parseInt(hex.substring(2, 4), 16),
    parseInt(hex.substring(4, 6), 16),
  ];
}

export class ColorData {
  private steps = 0;
  private startColor: string;
  private endColor: string;

  constructor(steps: number, startColor: string, endColor: string) {
    this.steps = steps;
    this.startColor = startColor;
    this.endColor = endColor;
  }

  public Colors = (): string[] => {
    // Convert hexadecimal color codes to RGB
    const startRgb = hexToRgb(this.startColor);
    const endRgb = hexToRgb(this.endColor);

    const colors: string[] = [];

    // Generate colors
    for (let i = 0; i < this.steps; i++) {
      const r = Math.round(
        startRgb[0] + ((endRgb[0] - startRgb[0]) * i) / (this.steps - 1)
      );
      const g = Math.round(
        startRgb[1] + ((endRgb[1] - startRgb[1]) * i) / (this.steps - 1)
      );
      const b = Math.round(
        startRgb[2] + ((endRgb[2] - startRgb[2]) * i) / (this.steps - 1)
      );
      colors.push(`rgb(${r},${g},${b})`);
    }

    return colors;
  };
}
