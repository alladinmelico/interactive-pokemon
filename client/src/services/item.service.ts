import axios from 'axios'
import authHeader from './auth-header.service'

const LOCAL_ITEM_ENDPOINT = 'http://localhost:9000/api/items'

export default class ItemService {
  public async saveAllItems(items: { items: string }): Promise<any> {
    const { data } = await axios.put(LOCAL_ITEM_ENDPOINT, items, {
      headers: { ...authHeader(), 'Content-Type': 'application/json' },
    })
    return await data
  }

  public async getAllItems(): Promise<any> {
    const { data } = await axios.get(LOCAL_ITEM_ENDPOINT, {
      headers: { ...authHeader(), 'Content-Type': 'application/json' },
    })
    return await data
  }
}
