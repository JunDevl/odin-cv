import "./curriculum.css"

import type { CurriculumForm, Tab } from "../../types"

interface Props {
  filledForm: CurriculumForm
  tabState: [tab: Tab, setTab: React.Dispatch<React.SetStateAction<Tab>>]
}

const Curriculum = ({filledForm, tabState}: Props) => {
  const {picture, name, age, email, tel, techTags, jobExperiences, academicExperiences, programmingProjects} = filledForm

  const generateCardSection = (className: string, title: string, list: Record<string, any>[]) => {
    return (
    <section className={`${className} cards`}>
      <h2>{title}</h2>

      <ul>
        {list.map(card => {
          const entries = Object.entries(card);

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
              {children}
            </li>
          )
        })}
      </ul>
    </section>
    )
  }

  return (
    <main>
      <header className="personal-information">
        <img src="" alt="Candidate's Picture" className="picture" />
        <div>
          <h1 className="name">{name}</h1>
          <h3 className="age">{age}</h3>
          <h3 className="email">{email}</h3>
          <h3 className="phone-number">{tel}</h3>
        </div>
      </header>
      <section className="knowledge">
        Knowledge: <span className="list">{techTags.reduce((prev, cur) => `${prev}, ${cur}`)}</span>
      </section>

      {generateCardSection("companies", "Companies i worked for:", jobExperiences)}

      {generateCardSection("degrees", "My degrees:", academicExperiences)}

      {generateCardSection("projects", "Programming projects:", programmingProjects)}

      <footer className="actions">
        <button className="edit">Edit</button>
        <button className="download">Download</button>
      </footer>
    </main>
  )
}

export default Curriculum