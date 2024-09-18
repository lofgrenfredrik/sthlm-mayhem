



export default function Form({handleSubmit, setTextValue, textValue}) {
  return (
    <form className="flex justify-center items-center w-full h-full flex-col gap-6" onSubmit={handleSubmit}>
      <input
          type="text"
          value={textValue}
          onChange={(e) => setTextValue(e.target.value)}
          placeholder="Movements"
      />

      {/* <input
          type="text"
          value={time.value}
          onChange={(e) => time.setValue(e.target.value)}
          placeholder="minutes"
      /> */}

      <button type="submit" className="p-4 bg-slate-300">Add Item</button>
    </form>
  )
}
