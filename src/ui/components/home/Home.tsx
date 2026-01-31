import "./home.css";
import { useState } from "react";
import InputList from "../inputList/InputList";
import CardView from "../cardView/CardView";

import type { JobExperience, ProgrammingProjects, AcademicExperience } from "../../types";
import { boilerplateJob, boilerplateProjects, boilerplateAcademic } from "../../boilerplate";

const Home = () => {
  const [knownFrameworks, setKnownFrameworks] = useState<string[]>([]);
  const [jobExperiences, setJobExperiences] = useState<JobExperience[]>([boilerplateJob]);
  const [programmingProjects, setProgrammingProjects] = useState<ProgrammingProjects[]>([boilerplateProjects]);
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
                  <input type="text" name="name" id="name" autoComplete="name" />
                </div>

                <div className="label-input">
                  <label htmlFor="age">Age:</label>
                  <input type="number" name="age" id="age"/>
                </div>

                <div className="label-input">  
                  <label htmlFor="email">Email:</label>
                  <input type="email" name="email" id="email" autoComplete="email" />
                </div>

                <div className="label-input">  
                  <label htmlFor="phone">Phone number:</label>
                  <input type="tel" name="phone" id="phone" autoComplete="tel" />
                </div>
              </div>
            </section>
          </div>

          <div className="wrapper-col2">  
            <section className="professional-experience">
              <InputList 
                listState={{list: knownFrameworks, setList: setKnownFrameworks}}
                labelText="Known languages/frameworks:"
                type="text" 
                name="frameworks" 
                id="frameworks" 
                autoComplete="off"
              />
              <div className="work-places">
                <label>Job experiences:</label>
                <CardView 
                  group="work-places-cards"
                  schema={boilerplateJob}
                  cards={{items: jobExperiences, setItems: setJobExperiences}} 
                />
              </div>
            </section>
          </div>

        </div>

        <section className="projects">
          <CardView
            group="projects-cards"
            schema={boilerplateProjects}
            cards={{items: programmingProjects, setItems: setProgrammingProjects}}
          />
        </section>

        <section className="academic-experience">
          <CardView 
            group="degree-cards"
            schema={boilerplateAcademic}
            cards={{items: academicExperiences, setItems: setAcademicExperiences}}
          />
        </section>

        <button type="submit">
          Generate Curriculum Vitae
        </button>
      </form>
    </>
  )
}

export default Home