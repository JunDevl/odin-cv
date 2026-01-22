import { useState, useRef } from "react";
import "./cardview.css";

interface Props<T> {
  group: string,
  cards: {items: T[], 
          setItems: React.Dispatch<React.SetStateAction<T[]>>}
  objectSchema: T
}

const CardView = ({group, cards, objectSchema}: Props<any>) => {
  const {items, setItems} = cards;

  const [entryMode, setEntryMode] = useState<boolean>(false);

  const formElement = useRef<HTMLLIElement>(null);

  const handleNewCard = () => {
    const inputs = formElement.current?.querySelectorAll("input"); // wip
  }

  const newItemForm = 
    <li key={undefined} ref={formElement}>
      {Object.entries(objectSchema).map(([key, value]) => (
        <input type={value instanceof Date ? "date" : "text"} className={key}></input>
      ))}
      <div className="actions">
        <button onClick={() => handleNewCard()}>Ok</button>
        <button>Cancel</button>
      </div>
    </li>

  return (
    <ul className={`cards ${group}`}>
      { /* Pretty slow operation with thousands of items */ }
      {items.map(item => {
        const entries = Object.entries(item);

        let uniqueKey = "";
        let children = [];
        for (const [key, value] of entries) {
          uniqueKey += String(value)
          children.push(
            <p className={key}>{value instanceof Date ? value.toLocaleDateString() : String(value)}</p>
          );
        };

        return (
          <li key={uniqueKey} className="card-item">
            {children}
          </li>
        )
      })}
      {entryMode && newItemForm}
      <li key={null} className="add" onClick={() => !entryMode && setEntryMode(true)}>
        <button id={`add-${group}`}>
          &#x2b;
        </button>
      </li>
    </ul>
  )
}

export default CardView