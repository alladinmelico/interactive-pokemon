import Items from './Items.constant'
import { body } from 'express-validator'

export interface ItemRequest {
  name: string
  itemId: number
}

class ItemValidator {
  checkAddOne() {
    return [
      body('items').custom((val) => {
        if (val == '') {
          return true
        }
        let sum = 0
        val.split(',').forEach((item: string) => {
          const itemObj = Items.get(item)
          if (!itemObj) {
            throw new Error('Invalid Item name')
          }
          sum += itemObj.price
        })

        if (sum > 1000) {
          throw new Error('Items exceeded $1000')
        }
        return true
      }),
    ]
  }
}

export default new ItemValidator()
