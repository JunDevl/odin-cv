import "./home.css"
import { useState } from "react"
import InputList from "../inputList/InputList"

const Home = () => {
  const [ knownFrameworks, setKnownFrameworks ] = useState<string[]>([]);

  return (
    <>
      <h1 className="main-title">Test</h1>

      <form action="" className="main" onSubmit={(e) => e.preventDefault()}>
        <section className="general-data">
          <input type="file" name="photo" id="photo" />

          <label htmlFor="name">Full name:</label>
          <input type="text" name="name" id="name"/>

          <label htmlFor="age">Age:</label>
          <input type="number" name="age" id="age"/>

          <label htmlFor="email">Email:</label>
          <input type="email" name="email" id="email" />

          <label htmlFor="phone">Phone number:</label>
          <input type="tel" name="phone" id="phone" />
        </section>

        <section className="professional-experience">
          <InputList itemsState={{knownFrameworks, setKnownFrameworks}} type="text" name="frameworks" id="frameworks" autoComplete="off"/>

          <div className="work-places">
            <label htmlFor="">Worked as a Software Engineer</label>
            <label htmlFor="">on Microsoft</label>
            <label htmlFor="">for 25 years</label>
          </div>
        </section>

        <section className="academic-experience">
          add degrees
        </section>

        <section className="projects">
          <div className="project">
            <h2 className="title">Project Title</h2>

            <h3 className="description">Project Description</h3>

            <p className="tags">Javascript, HTML, CSS, React</p>
          </div>
        </section>

        <button type="submit">
          test bgn
        </button>
      </form>
    </>
  )
}

export default Home