export default function LoadingCard(props: any) {
  return (
    <div className="flex flex-wrap max-w-lg justify-center gap-5 ">
      {Array.from(Array(props.count)).map((item, index) => (
        <div
          key={index}
          className="animate-pulse max-w-xs h-40 w-36 rounded-lg bg-slate-200"
        />
      ))}
    </div>
  )
}
