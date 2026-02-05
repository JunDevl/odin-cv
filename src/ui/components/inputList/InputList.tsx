import "./inputlist.css"
import { useEffect, useRef, useState } from "react";

interface InputListProps extends React.HTMLProps<HTMLInputElement> {
  labelText: string,
  maxItems: number,
  listState: [list: string[], setList: React.Dispatch<React.SetStateAction<string[]>>],
}
const InputList = ({labelText, maxItems, listState, ...props}: InputListProps) => {
  const INSERT_ENTRY_TEXT = "+ Press enter to insert";

  const contextList = useRef<HTMLUListElement>(null);
  const input = useRef<HTMLInputElement>(null);

  const [list, setList] = listState;

  const [maxHeight, setMaxHeight] = useState<string>("none");

  const updateWrapperStyleSheet = () => {
    if (list.length >= maxItems) {
      if (contextList.current!.classList.contains("overflows")) return;

      setMaxHeight(window.getComputedStyle(contextList.current!).height);
      
      contextList.current!.classList.add("overflows");
      return;
    }

    setMaxHeight("none");
    contextList.current!.classList.remove("overflows");
  }

  const addNewEntry = (e: React.KeyboardEvent<HTMLInputElement> | React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    const validEntry = input.current!.value !== "" && 
                       input.current!.value !== INSERT_ENTRY_TEXT && 
                       !list.includes(input.current!.value);

    if (!validEntry) return;

    if (("key" in e && e.key === "Enter") || "button" in e) {
      setList([...list, input.current!.value]);
      input.current!.value = ""
    }
  }

  const removeEntry = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    const entry = (e.target as HTMLSpanElement).previousSibling?.textContent;

    const updatedList = list.filter(val => val !== entry);

    setList(updatedList);
  }

  useEffect(() => {
    contextList.current!.attributeStyleMap.set("--item-count", list.length);
    updateWrapperStyleSheet();
  }, [list])

  useEffect(() => {
    contextList.current!.style.maxHeight = maxHeight;
  }, [maxHeight])

  useEffect(() => {
    if (list.length > 0) {
      contextList.current!.attributeStyleMap.set("--item-count", list.length);
      //updateWrapperStyleSheet();
    };
  }, [])

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