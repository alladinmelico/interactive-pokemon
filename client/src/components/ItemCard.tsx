export default function ItemCard(props: any) {
  return (
    <div
      className={`max-w-xs p-4 rounded border-2 border-slate-200  ${
        props.isOnDeck
          ? 'hover:border-red-400'
          : 'hover:outline-2 hover:outline'
      } ${
        props.isItemOnBudget
          ? 'cursor-pointer  outline-offset-2 outline-green-500'
          : 'opacity-25'
      }`}
      onClick={
        props.isItemOnBudget
          ? () => props.addItemToDeck(props.index)
          : undefined
      }
    >
      <div className="w-full relative">
        {!props.isFull && props.isItemOnBudget && (
          <img
            src={props.item.sprite}
            alt={props.item.name}
            className="object-contain object-center mx-auto animate-ping absolute top-0 left-0 right-0"
          />
        )}
        <img
          src={props.item.sprite}
          alt={props.item.name}
          className="object-contain object-center mx-auto "
        />
      </div>
      <div className="mt-5">
        <p className="badge">${props.item.price}</p>
        <p className="capitalize text-center mt-3">
          {props.item.name.replace(/-/g, '')}
        </p>
      </div>
    </div>
  )
}
