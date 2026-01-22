import "./home.css"
import { useState } from "react"
import InputList from "../inputList/InputList"
import CardView from "../cardView/CardView"

import type { JobExperience, AcademicExperience } from "../../types"

const boilerplateJob: JobExperience = {
  companyName: '',
  position: '',
  responsibilitiesDescription: '',
  initDate: new Date(),
  finalDate: new Date()
}

const boilerplateAcademic: AcademicExperience = {
  institutionName: '',
  area: '',
  date: new Date()
}

const Home = () => {
  const [knownFrameworks, setKnownFrameworks] = useState<string[]>([]);
  const [jobExperiences, setJobExperiences] = useState<JobExperience[]>([boilerplateJob]);
  const [academicExperiences, setAcademicExperiences] = useState<AcademicExperience[]>([boilerplateAcademic]);

  return (
    <>
      <h1 className="main-title">Test</h1>

      <form action="" className="main" onSubmit={(e) => e.preventDefault()}>
        <div className="wrapper">
          <div className="wrapper-col1">
            <section className="personal-data">
              <input type="file" name="photo" id="photo" />

              <div className="wrapper">
                <div className="label-input">  
                  <label htmlFor="name">Full name:</label>
                  <input type="text" name="name" id="name"/>
                </div>

                <div className="label-input">
                  <label htmlFor="age">Age:</label>
                  <input type="number" name="age" id="age"/>
                </div>
              </div>
            </section>
          </div>

          <div className="wrapper-col2">  
            <section className="contact-info">
              <div className="label-input">  
                <label htmlFor="email">Email:</label>
                <input type="email" name="email" id="email" />
              </div>

              <div className="label-input">  
                <label htmlFor="phone">Phone number:</label>
                <input type="tel" name="phone" id="phone" />
              </div>
            </section>

            <section className="professional-experience">
              <InputList 
                itemsState={{knownFrameworks, setKnownFrameworks}} 
                type="text" 
                name="frameworks" 
                id="frameworks" 
                autoComplete="off"
              />

              <CardView 
                group="work-places" 
                cards={{items: jobExperiences, setItems: setJobExperiences}} 
                objectSchema={jobExperiences[0]}
              />
            </section>
          </div>

        </div>

        <section className="projects">
          <div className="project">
            <h2 className="title">Project Title</h2>

            <h3 className="description">Project Description</h3>

            <p className="tags">Javascript, HTML, CSS, React</p>
          </div>
        </section>

        <section className="academic-experience">
          add degrees
        </section>

        <button type="submit">
          Generate Curriculum Vitae
        </button>
      </form>
    </>
  )
}

export default Home