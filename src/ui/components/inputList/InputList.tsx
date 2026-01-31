import "./inputlist.css"
import { useEffect, useRef } from "react";

interface Props extends React.HTMLProps<HTMLInputElement> {
  listState: { list: string[], setList: React.Dispatch<React.SetStateAction<string[]>> },
  labelText: string
}
const InputList = ({listState, labelText, ...props}: Props) => {
  const INSERT_ENTRY_TEXT = "+ Press enter to insert";

  const contextList = useRef<HTMLUListElement>(null);
  const input = useRef<HTMLInputElement>(null);

  const {list, setList} = listState;

  const frameworksListIsFull = (): boolean => {
    const MAXIMUM_OPTIONS = 5;

    return list.length >= MAXIMUM_OPTIONS;
  }

  const addNewEntry = (e: React.KeyboardEvent<HTMLInputElement> | React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    const insertEntryAndStyleWrapper = () => {
      //contextList.current!.style.height = `calc(var(--input-height)*${list.length + 3})`;

      setList([...list, input.current!.value])

      if (frameworksListIsFull()) {
        if (contextList.current!.classList.contains("overflows")) return;

        contextList.current!.style.maxHeight = window.getComputedStyle(contextList.current!).height;
        
        contextList.current!.classList.add("overflows");
        return;
      }

      contextList.current!.style.maxHeight = 'none';
      contextList.current!.classList.remove("overflows");
    }

    const validEntry = input.current!.value !== "" && 
                       input.current!.value !== INSERT_ENTRY_TEXT && 
                       !list.includes(input.current!.value);

    if ("key" in e && e.key === "Enter" && validEntry) {
      insertEntryAndStyleWrapper();
    }

    if ("button" in e && validEntry) {
      insertEntryAndStyleWrapper();
    }
  }

  const removeEntry = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    const entry = (e.target as HTMLSpanElement).previousSibling?.textContent;

    const updatedList = list.filter(val => val !== entry);

    setList(updatedList);
  }

  useEffect(() => {
    contextList.current!.attributeStyleMap.set("--item-count", list.length);
    console.log(list);
  }, [list])

  return (
    <div 
      className="input-list label-input"
      // tabIndex={-1} wip
    >
      <label htmlFor={props.name}>{labelText}</label>
      <div className="input-wrapper">
        <input 
          {...props} 
          onKeyDown={e => addNewEntry(e)}
          ref={input}
        />
        <ul 
          className="frameworks-list" 
          ref={contextList}
          onMouseDown={(e) => e.preventDefault()}
        >
          <div className="wrapper">
            <li 
              key={null} className="insert-entry">{INSERT_ENTRY_TEXT}</li>
              {list.map(item => (
              <li className="framework-item" key={item}>
                <span className="text">{item}</span>
                <span className="close" onClick={e => removeEntry(e)}>&#10005;</span>
              </li>
              ))}
          </div>
        </ul>
      </div>
    </div>
  )
}

export default InputList