import {BlackOrWhite, PeriodOfDay} from "./enums";


export class BackgroundFactory {
  private periodOfDay: PeriodOfDay;
  private blackOrWhite: BlackOrWhite;

  constructor(periodOfDay: PeriodOfDay, blackOrWhite: BlackOrWhite) {
    this.periodOfDay = periodOfDay;
    this.blackOrWhite = blackOrWhite;
  }

  getPeriodOfDay(): PeriodOfDay {
    return this.periodOfDay;
  }

  getBlackOrWhite(): BlackOrWhite {
    return this.blackOrWhite;
  }
  static createBackground(hours: number): BackgroundFactory {

    switch (true) {
      case hours >= 5 && hours < 12:
        return new BackgroundFactory(PeriodOfDay.MORNING, BlackOrWhite.BLACK)
        break;
      case hours >= 12 && hours < 19:
        return new BackgroundFactory(PeriodOfDay.DAY, BlackOrWhite.BLACK )
        break;
      case hours >= 19 && hours < 22:
        return new BackgroundFactory(PeriodOfDay.EVENING, BlackOrWhite.WHITE)
        break;
      default:
        return new BackgroundFactory(PeriodOfDay.NIGHT, BlackOrWhite.WHITE )
        break;
    }
  }

}
