import { useState } from "react"
import "./inputlist.css"

interface Props extends React.HTMLProps<HTMLInputElement> {
  itemsState: { knownFrameworks: string[], setKnownFrameworks: React.Dispatch<React.SetStateAction<string[]>> }
}
const InputList = ({itemsState, ...props}: Props) => {
  const INSERT_ENTRY_TEXT = "+ Press enter to insert a new entry";

  const {knownFrameworks, setKnownFrameworks} = itemsState;

  type ListVisibility = "shown" | "hidden"
  const [ listVisibility, setListVisibility ] = useState<ListVisibility>("hidden");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;

    if (target.value !== "" && 
        target.value !== INSERT_ENTRY_TEXT &&
        e.key === "Enter" && 
        !knownFrameworks.includes(target.value)) 
      setKnownFrameworks([...knownFrameworks, target.value])
    
  }

  return (
    <div className="input-list">
      <label htmlFor={props.name}>Known languages/frameworks:</label>
      <input 
        {...props} 
        onFocus={() => setListVisibility("shown")} 
        onBlur={() => setListVisibility("hidden")}
        onKeyDown={(e) => handleKeyDown(e)}
      />
      <ul className={`list ${listVisibility}`}>
        {knownFrameworks.map(item => <li key={item}>{item}</li>)}
        <li key={INSERT_ENTRY_TEXT} className="insert-entry">{INSERT_ENTRY_TEXT}</li>
      </ul>
    </div>
  )
}

export default InputList