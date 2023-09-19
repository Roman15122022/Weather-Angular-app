

export class BackgroundFactory {
  private timeOfDay: string;
  private BlackOrWhite: string;

  constructor(timeOfDay: string, BlackOrWhite: string) {
    this.timeOfDay = timeOfDay;
    this.BlackOrWhite = BlackOrWhite;
  }

  static createMorning(): BackgroundFactory {
    return new BackgroundFactory('morning', 'afterBlack');
  }

  static createDay(): BackgroundFactory {
    return new BackgroundFactory('day', 'afterBlack');
  }

  static createEvening(): BackgroundFactory {
    return new BackgroundFactory('evening', 'afterWhite');
  }

  static createNight(): BackgroundFactory {
    return new BackgroundFactory('night', 'afterWhite');
  }
  static createBackground(hours: number): { timeOfDay: string, BlackOrWhite: string } {
    if (hours >= 5 && hours < 12) {
      return { timeOfDay: 'morning', BlackOrWhite: 'afterBlack' };
    } else if (hours >= 12 && hours < 19) {
      return { timeOfDay: 'day', BlackOrWhite: 'afterBlack' };
    } else if (hours >= 19 && hours < 22) {
      return { timeOfDay: 'evening', BlackOrWhite: 'afterWhite' };
    } else {
      return { timeOfDay: 'night', BlackOrWhite: 'afterWhite' };
    }
  }

  getTimeOfDay(): string {
    return this.timeOfDay;
  }

  getBlackOrWhite(): string {
    return this.BlackOrWhite;
  }

}
