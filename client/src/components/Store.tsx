import { useEffect, useState } from 'react'
import ItemCard from './ItemCard'
import ITEMS, { Item } from '../types/Items.constant'
import ItemService from '../services/item.service'

export default function Store(props: any) {
  const [myItems, setMyItems] = useState<Array<Item>>([])
  const TOTAL_BUDGET = 1000

  const itemService = new ItemService()

  function saveAllItems(items: Array<Item>): void {
    const formattedItems = items.map((obj) => obj.name).join(',')
    itemService.saveAllItems({ items: formattedItems })
  }

  function removeItemOnDeck(index: number): void {
    setMyItems((prev) => {
      const newData = prev.filter((item, i) => i != index)
      saveAllItems(newData)
      return newData
    })
  }

  function addItemToDeck(index: number): void {
    setMyItems((prev) => {
      const newData = [...prev, ITEMS[index]]
      saveAllItems(newData)
      return newData
    })
  }

  function totalPurchase(): number {
    return myItems.reduce((prev, curr) => prev + curr.price, 0)
  }

  function isItemOnBudget(index: number): boolean {
    return ITEMS[index].price + totalPurchase() <= TOTAL_BUDGET
  }

  function getProgressColor(): string {
    const percent = (totalPurchase() / TOTAL_BUDGET) * 100
    if (percent > 80) {
      return 'red'
    } else if (percent > 50) {
      return 'orange'
    } else if (percent > 25) {
      return 'yellow'
    } else {
      return 'green'
    }
  }

  useEffect(() => {
    itemService.getAllItems().then((response) => {
      if (response.data) {
        setMyItems(response.data)
      }
    })
  }, [])

  return (
    <div className="flex flex-col sm:flex-row justify-around gap-10">
      <div className="flex flex-col gap-3 p-10 border-2 border-dashed border-slate-200 rounded-lg">
        {ITEMS.map((item, index) => (
          <ItemCard
            key={item.name}
            item={item}
            addItemToDeck={addItemToDeck}
            isItemOnBudget={isItemOnBudget(index)}
            isFull={totalPurchase() >= TOTAL_BUDGET}
            index={index}
          />
        ))}
      </div>
      <div className="">
        <p className="text-primary text-3xl mb-5">My Items</p>
        <div className="flex flex-wrap gap-2 p-5 bg-white rounded-t-lg">
          {myItems.length ? (
            myItems.map((item, index) => (
              <div
                key={item.name + index}
                className="p-3 border border-slate-300 outline-red-500 outline-offset-2 hover:outline hover:outline-2 rounded-lg cursor-pointer"
                onClick={(e) => removeItemOnDeck(index)}
              >
                <img
                  src={item.sprite}
                  alt={item.name}
                  className="object-contain object-center mx-auto"
                />
              </div>
            ))
          ) : (
            <div className="italic">No Items yet, buy now!</div>
          )}
        </div>
        <div className="bg-slate-200 w-full h-2 mb-5">
          <div
            className="h-2 opacity-50"
            style={{
              width: `${Math.floor((totalPurchase() / TOTAL_BUDGET) * 100)}%`,
              backgroundColor: getProgressColor(),
            }}
          />
        </div>
        <div className="flex justify-end gap-2 text-lg">
          <p className="text-primary font-black">
            ${totalPurchase()}
            <span className="text-slate-400 font-light">/$1000</span>
          </p>
        </div>
      </div>
    </div>
  )
}
