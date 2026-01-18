import "./inputlist.css"
import { useEffect, useRef } from "react";

interface Props extends React.HTMLProps<HTMLInputElement> {
  itemsState: { knownFrameworks: string[], setKnownFrameworks: React.Dispatch<React.SetStateAction<string[]>> }
}
const InputList = ({itemsState, ...props}: Props) => {
  const INSERT_ENTRY_TEXT = "+ Press enter to insert a new entry";

  const frameworksListElement = useRef<HTMLUListElement>(null);

  const {knownFrameworks, setKnownFrameworks} = itemsState;

  /*
  const observer = new IntersectionObserver(([e]) => {
    if (!e.isIntersecting) frameworksListElement.current!.style.height = "20px";
  }, { rootMargin: "0px 0px 0px 0px", threshold: [1] });
  */

  const frameworksListOverflowsScreen = (): boolean => {
    //console.log(window.getComputedStyle(frameworksListElement.current!).getPropertyValue("calc(--input-height)"))
    //const styleMap = frameworksListElement.current!.computedStyleMap()
    const inputHeightString = window.getComputedStyle(frameworksListElement.current!).getPropertyValue("--input-height");
    const rootStyle = getComputedStyle(document.documentElement);

    const incrementHeight = parseFloat(inputHeightString.slice(0, -3)) * parseFloat(rootStyle.fontSize);

    const nextHeight = frameworksListElement.current?.offsetHeight! + incrementHeight;

    const listBoundingRect = frameworksListElement.current!.getBoundingClientRect();
    const viewportHeight = document.documentElement.offsetHeight;

    return listBoundingRect.bottom > viewportHeight;
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;

    if (target.value !== "" && 
        target.value !== INSERT_ENTRY_TEXT &&
        e.key === "Enter" && 
        !knownFrameworks.includes(target.value)) {
      frameworksListElement.current!.style.height = `calc(var(--input-height)*${knownFrameworks.length + 3})`;

      setKnownFrameworks([...knownFrameworks, target.value])

      if (frameworksListOverflowsScreen()) {
        frameworksListElement.current!.style.maxHeight = !frameworksListElement.current!.classList.contains("overflows") ? frameworksListElement.current!.style.height : frameworksListElement.current!.style.maxHeight;

        frameworksListElement.current!.style.overflowY = "scroll";
        
        frameworksListElement.current!.classList.add("overflows");
        return;
      }

        frameworksListElement.current!.style.overflowY = "visible";

      frameworksListElement.current!.style.maxHeight = 'none';
      frameworksListElement.current!.classList.remove("overflows");
    }
  }

  const handleFocus = (e: React.FocusEvent<HTMLDivElement>) => {
    frameworksListElement.current!.style.height = `calc(var(--input-height)*${knownFrameworks.length + 2})`;
  }

  const handleBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    frameworksListElement.current!.style.height = "100%";
  }

  /*
  useEffect(() => {
    observer.observe(frameworksListElement.current!);
  }, [])
  */

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