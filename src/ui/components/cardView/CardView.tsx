import { useState, useRef } from "react";
import "./cardview.css";

interface Props<T> {
  group: string,
  schema: T,
  cards: {items: T[], 
          setItems: React.Dispatch<React.SetStateAction<T[]>>}
}

const CardView = <T extends Record<string, any>>({group, schema, cards}: Props<T>) => {
  const {items, setItems} = cards;

  const [entryMode, setEntryMode] = useState<boolean>(false);

  const formElement = useRef<HTMLLIElement>(null);

  const insertCard = () => {
    const inputs = formElement.current!.querySelectorAll("input"); // wip

    let formData: Record<string, any> = {};

    inputs.forEach(input => {
      const isDate = input.type === "date";

      formData[[...input.classList.values()][0]] = isDate ? input.valueAsDate : input.value;
    })

    setEntryMode(false);

    let emptyPropertiesCount = 0;
    
    Object.values(formData).forEach(val => emptyPropertiesCount += Number(!val));

    console.log(emptyPropertiesCount);

    setItems(i => [...i, formData as T]);
  }

  const removeCard = (key: string) => {
    const filteredItems = items.filter(item => {
      const concatValues = Object.values(item).reduce((prev, cur) => String(prev) + String(cur));
      return concatValues !== key;
    })

    setItems(filteredItems);
  }

  const newItemForm =
    <li key="_FORM" ref={formElement}>
      {Object.entries(schema).map(([key, value]) => {
        const isDate = value instanceof Date;
        const capitalizedKey = `${key[0].toUpperCase()}${key.slice(1)}`

        return (<>
          {isDate && <label htmlFor={capitalizedKey}>{capitalizedKey}:</label>}
          <input 
            type={isDate ? "date" : "text"} 
            className={`${key} card-input`}
            id={capitalizedKey}
            placeholder={isDate ? "" : capitalizedKey}
          />
        </>)
      })}
      <div className="actions">
        <button onClick={() => insertCard()}>Ok</button>
        <button onClick={() => setEntryMode(false)}>Cancel</button>
      </div>
    </li>

  return (
    <ul className={`cards ${group}`}>
      {items.map(item => {
        const entries = Object.entries(item);

        let uniqueKey = "";
        let children = [];
        for (const [key, value] of entries) {
          uniqueKey += String(value);
          children.push(
            <p className={key}>{value instanceof Date ? value.toLocaleDateString() : String(value)}</p>
          );
        };

        return (
          <li key={uniqueKey} className="card-item">
            <div className="close" onClick={() => removeCard(uniqueKey)}>&#10005;</div>
            {children}
          </li>
        )
      })}
      {entryMode && newItemForm}
      <li key="_ADD"className="add">
        <button 
          id={`add-${group}`} 
          onClick={(e) => {!entryMode && setEntryMode(true); e.preventDefault()}}
          type="button"
        >
          &#x2b;
        </button>
      </li>
    </ul>
  )
}

export default CardView