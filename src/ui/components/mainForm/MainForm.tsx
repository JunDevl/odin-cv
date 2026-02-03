import "./mainForm.css";
import { useState } from "react";
import PhotoPicker from "../photoPicker/PhotoPicker";
import InputList from "../inputList/InputList";
import CardView from "../cardView/CardView";

import type { JobExperience, ProgrammingProjects, AcademicExperience } from "../../types";
import { boilerplateJob, boilerplateProjects, boilerplateAcademic } from "../../boilerplate";

const MainForm = () => {
  const [photo, setPhoto] = useState<File | null>(null);
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
              <PhotoPicker photoState={[photo, setPhoto]}/>

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
                listState={[knownFrameworks, setKnownFrameworks]}
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
                  cards={[jobExperiences, setJobExperiences]} 
                />
              </div>
            </section>
          </div>

        </div>

        <section className="projects">
          <CardView
            group="projects-cards"
            schema={boilerplateProjects}
            cards={[programmingProjects, setProgrammingProjects]}
          />
        </section>

        <section className="academic-experience">
          <CardView 
            group="degree-cards"
            schema={boilerplateAcademic}
            cards={[academicExperiences, setAcademicExperiences]}
          />
        </section>

        <button type="submit">
          Generate Curriculum Vitae
        </button>
      </form>
    </>
  )
}

export default MainForm