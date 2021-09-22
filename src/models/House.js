export class House {
  constructor(houseData = {}) {
    this.houseId = houseData._id
    this.bedrooms = houseData.bedrooms
    this.bathrooms = houseData.bathrooms
    this.levels = houseData.levels
    this.year = houseData.year
    this.price = houseData.price
    this.img = houseData.img
    this.description = houseData.description
    this.creatorId = houseData.creatorId
    this.creator = houseData.creator || {}
  }
}
