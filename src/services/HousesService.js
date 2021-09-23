import { AppState } from '../AppState.js'
import { House } from '../models/House.js'
import { logger } from '../utils/Logger.js'
import { api } from './AxiosService.js'

class HousesService {
  async getHouses() {
    AppState.houses = []
    const res = await api.get('api/houses')
    AppState.houses = res.data.map(h => new House(h))
    logger.log(AppState.houses)
  }

  async getHouseById(houseId) {
    AppState.house = null
    const res = await api.get(`api/houses/${houseId}`)
    AppState.house = new House(res.data)
  }

  async createHouse(house) {
    const res = await api.post('api/houses', house)
    AppState.house = new House(res.data)
  }

  async editHouse(house) {
    const res = await api.put(`api/houses/${house.houseId}`, house)
    AppState.house = new House(res.data)
  }

  async removeHouse(houseId) {
    await api.delete(`api/houses/${houseId}`)
    AppState.house = null
    AppState.houses.filter(h => h.id !== houseId)
  }
}

export const housesService = new HousesService()
