import "./curriculum.css"

import type { CurriculumForm, Tab } from "../../types"

interface CardsProps {
  className: string,
  title: string,
  list: Record<string, any>[]
}

const Cards = ({className, title, list}: CardsProps) => (
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

interface CurriculumProps {
  filledForm: CurriculumForm
  setTab: React.Dispatch<React.SetStateAction<Tab>>
}

const Curriculum = ({filledForm, setTab}: CurriculumProps) => {
  const {picture, name, age, email, tel, techTags, jobExperiences, academicExperiences, programmingProjects} = filledForm

  const downloadCurriculum = () => {
    return;
  }

  return (
    <main>
      <header className="personal-information">
        <img src={`${URL.createObjectURL(picture)}`} alt="Candidate's Picture" className="picture" />
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

      <Cards className="companies" title="Companies i worked for:" list={jobExperiences}/>
      <Cards className="degrees" title="My degrees:" list={academicExperiences}/>
      <Cards className="projects" title="Programming projects" list={programmingProjects}/>

      <footer className="actions">
        <button className="edit" onClick={() => setTab("form")}>Edit</button>
        <button className="download" onClick={() => downloadCurriculum()}>Download</button>
      </footer>
    </main>
  )
}

export default Curriculum