import "./inputlist.css"
import { useEffect, useRef } from "react";

interface Props extends React.HTMLProps<HTMLInputElement> {
  itemsState: { knownFrameworks: string[], setKnownFrameworks: React.Dispatch<React.SetStateAction<string[]>> },
  labelText: string
}
const InputList = ({itemsState, labelText, ...props}: Props) => {
  const INSERT_ENTRY_TEXT = "+ Press enter to insert";

  const frameworksListElement = useRef<HTMLUListElement>(null);
  const input = useRef<HTMLInputElement>(null);

  const {knownFrameworks, setKnownFrameworks} = itemsState;

  const frameworksListIsFull = (): boolean => {
    const MAXIMUM_OPTIONS = 5;

    return knownFrameworks.length >= MAXIMUM_OPTIONS;
  }

  const handleNewEntry = (e: React.KeyboardEvent<HTMLInputElement> | React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    const insertEntryAndStyleWrapper = () => {
      //frameworksListElement.current!.style.height = `calc(var(--input-height)*${knownFrameworks.length + 3})`;

      setKnownFrameworks([...knownFrameworks, input.current!.value])

      if (frameworksListIsFull()) {
        if (frameworksListElement.current!.classList.contains("overflows")) return;

        frameworksListElement.current!.style.maxHeight = window.getComputedStyle(frameworksListElement.current!).height;
        
        frameworksListElement.current!.classList.add("overflows");
        return;
      }

      frameworksListElement.current!.style.maxHeight = 'none';
      frameworksListElement.current!.classList.remove("overflows");
    }

    const validEntry = input.current!.value !== "" && 
                       input.current!.value !== INSERT_ENTRY_TEXT && 
                       !knownFrameworks.includes(input.current!.value);

    if ("key" in e && e.key === "Enter" && validEntry) {
      insertEntryAndStyleWrapper();
    }

    if ("button" in e && validEntry) {
      insertEntryAndStyleWrapper();
    }
  }

  useEffect(() => {
    frameworksListElement.current!.attributeStyleMap.set("--item-count", knownFrameworks.length);
  }, [knownFrameworks])

  return (
    <div 
      className="input-list label-input"
      // tabIndex={-1} wip
    >
      <label htmlFor={props.name}>{labelText}</label>
      <div className="input-wrapper">
        <input 
          {...props} 
          onKeyDown={(e) => handleNewEntry(e)}
          ref={input}
        />
        <ul 
          className="frameworks-list" 
          ref={frameworksListElement}
          onMouseDown={(e) => e.preventDefault()}
        >
          <div className="wrapper">
            <li 
              key={null} className="insert-entry">{INSERT_ENTRY_TEXT}</li>
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