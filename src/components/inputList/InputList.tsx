import "./inputlist.css"
import { useRef } from "react";

interface Props extends React.HTMLProps<HTMLInputElement> {
  itemsState: { knownFrameworks: string[], setKnownFrameworks: React.Dispatch<React.SetStateAction<string[]>> }
}
const InputList = ({itemsState, ...props}: Props) => {
  const INSERT_ENTRY_TEXT = "+ Press enter to insert a new entry";

  const frameworksListElement = useRef<HTMLUListElement>(null);

  const {knownFrameworks, setKnownFrameworks} = itemsState;

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;

    if (target.value !== "" && 
        target.value !== INSERT_ENTRY_TEXT &&
        e.key === "Enter" && 
        !knownFrameworks.includes(target.value)) {
      setKnownFrameworks([...knownFrameworks, target.value])
      
    }
  }

  const handleFocus = (e: React.FocusEvent<HTMLDivElement>) => {
    console.log(e);
    frameworksListElement.current!.style.height = `calc(var(--input-height)*${knownFrameworks.length + 2})`;
  }

  const handleBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    console.log(e);
    frameworksListElement.current!.style.height = "100%";
  }

  return (
    <div 
      className="input-list"
      // tabIndex={-1} wip
    >
      <label htmlFor={props.name}>Known languages/frameworks:</label>
      <div className="input-wrapper">
        <input 
          {...props} 
          onKeyDown={(e) => handleKeyDown(e)}
          onFocus={(e) => handleFocus(e)}
          onBlur={(e) => handleBlur(e)}
        />
        <ul className={`frameworks-list`} ref={frameworksListElement}>
          <li key={INSERT_ENTRY_TEXT} className="insert-entry">{INSERT_ENTRY_TEXT}</li>
          {knownFrameworks.map(item => (
            <li className="framework-item" key={item}>

              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default InputList