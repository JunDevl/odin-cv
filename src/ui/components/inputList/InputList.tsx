import "./inputlist.css"
import { useRef } from "react";

interface Props extends React.HTMLProps<HTMLInputElement> {
  itemsState: { knownFrameworks: string[], setKnownFrameworks: React.Dispatch<React.SetStateAction<string[]>> },
  labelText: string
}
const InputList = ({itemsState, labelText, ...props}: Props) => {
  const INSERT_ENTRY_TEXT = "+ Press enter to insert a new entry";

  const frameworksListElement = useRef<HTMLUListElement>(null);

  const {knownFrameworks, setKnownFrameworks} = itemsState;

  const frameworksListIsFull = (): boolean => {
    const MAXIMUM_OPTIONS = 5;

    return knownFrameworks.length >= MAXIMUM_OPTIONS;
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;

    if (target.value !== "" && 
        target.value !== INSERT_ENTRY_TEXT &&
        e.key === "Enter" && 
        !knownFrameworks.includes(target.value)) {
      frameworksListElement.current!.style.height = `calc(var(--input-height)*${knownFrameworks.length + 3})`;

      setKnownFrameworks([...knownFrameworks, target.value])

      if (frameworksListIsFull()) {
        frameworksListElement.current!.style.maxHeight = !frameworksListElement.current!.classList.contains("overflows") ? frameworksListElement.current!.style.height : frameworksListElement.current!.style.maxHeight;
        
        frameworksListElement.current!.classList.add("overflows");
        return;
      }

      frameworksListElement.current!.style.maxHeight = 'none';
      frameworksListElement.current!.classList.remove("overflows");
    }
  }

  const handleFocus = () => {
    frameworksListElement.current!.style.height = `calc(var(--input-height)*${knownFrameworks.length + 2})`;
  }

  const handleBlur = () => {
    frameworksListElement.current!.style.height = "100%";
  }

  return (
    <div 
      className="input-list label-input"
      // tabIndex={-1} wip
    >
      <label htmlFor={props.name}>{labelText}</label>
      <div className="input-wrapper">
        <input 
          {...props} 
          onKeyDown={(e) => handleKeyDown(e)}
          onFocus={() => handleFocus()}
          onBlur={() => handleBlur()}
        />
        <ul 
          className="frameworks-list" 
          ref={frameworksListElement}
          onMouseDown={(e) => e.preventDefault()}
        >
          <div className="wrapper">
            <li key={null} className="insert-entry">{INSERT_ENTRY_TEXT}</li>
              {knownFrameworks.map(item => (
              <li className="framework-item" key={item}>

                {item}
              </li>
              ))}
          </div>
        </ul>
      </div>
    </div>
  )
}

export default InputList