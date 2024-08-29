import jsonData from '../assets/data.json'

interface House {
  name: string
  transactionDate: Date
  transactionYearMonth: string
  floor: number
  building: number
  unitPrice: number
  carPrice: number
  housePrice: number
  totalPrice: number
  valid: boolean
}

function stringToInt(str: string): number {
  return parseInt(str.split(',').join(''))
}

export class HouseData {
  private totalFloor = 0
  private totalBuilding = 0
  private houses: House[] = []
  private transactionMonthArray: string[] = []
  private transactionAmount: number[] = []

  constructor() {
    this.houses = jsonData.map((house) => {
      // Record total floor
      const floor: number = stringToInt(house.f.split('/')[1])
      if (floor > this.totalFloor) {
        this.totalFloor = floor
      }

      // Record total building
      const building = stringToInt(house.bu.split('棟')[0].split('A')[1])
      if (building > this.totalBuilding) {
        this.totalBuilding = building
      }

      // Record transaction date
      const dateStr = house.e.split('/')
      const transactionYear = stringToInt(dateStr[0]) + 1911
      const transactionMonth = stringToInt(dateStr[1])
      const transactionDay = stringToInt(dateStr[2])
      const transactionDate = new Date(`${transactionYear}-${transactionMonth}-${transactionDay}`)
      const transactionYearMonth = `${transactionYear}_${transactionMonth
        .toString()
        .padStart(2, '0')}`

      if (!this.transactionMonthArray.includes(transactionYearMonth)) {
        this.transactionMonthArray.push(transactionYearMonth)
        this.transactionAmount.push(0)
      }

      return {
        name: house.bu,
        transactionDate: transactionDate,
        transactionYearMonth: transactionYearMonth,
        floor: stringToInt(house.f.split('/')[0]),
        building: building,
        unitPrice: stringToInt(house.p),
        carPrice: stringToInt(house.cp) * 10000,
        housePrice: stringToInt(house.tp) - stringToInt(house.cp),
        totalPrice: stringToInt(house.tp),
        valid: true
      } as House
    })

    this.transactionMonthArray.sort((m, n) => (m < n ? -1 : 1))

    this.houses.forEach((house) => {
      const ymIndex = this.transactionMonthArray.indexOf(house.transactionYearMonth)
      this.transactionAmount[ymIndex]++
    })
  }

  public Houses = (): House[] => {
    return this.houses
  }
  public TotalHouse = (): number => {
    return this.houses.length
  }
  public TotalFloor = (): number => {
    return this.totalFloor
  }
  public TotalBuilding = (): number => {
    return this.totalBuilding
  }
  public TransactionMonthArray = (): string[] => {
    return this.transactionMonthArray
  }
  public TransactionAmount = (): number[] => {
    return this.transactionAmount
  }
  public Buildings = (): string[] => {
    const buildings: string[] = []
    for (let i = 1; i <= this.totalBuilding; i++) {
      if (i == 4) {
        continue
      }
      buildings.push(`A${i}`)
    }

    return buildings
  }
  public BuildingMap = (): House[][] => {
    // Init
    const buildingMap: House[][] = []
    for (let i = 0; i < this.totalFloor; i++) {
      buildingMap[i] = []
      for (let j = 0; j <= this.totalBuilding; j++) {
        buildingMap[i][j] = { valid: false } as House
      }
    }

    // Act
    this.houses.forEach((house) => {
      buildingMap[this.totalFloor - house.floor][house.building] = house
    })

    // Modified
    buildingMap.forEach((floor) => {
      floor.splice(4, 1)
    })

    return buildingMap
  }
}
