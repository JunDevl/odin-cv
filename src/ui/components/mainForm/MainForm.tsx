import "./mainForm.css";
import { useRef, useState } from "react";
import PhotoPicker from "../photoPicker/PhotoPicker";
import InputList from "../inputList/InputList";
import CardView from "../cardView/CardView";

import type { CurriculumForm, JobExperience, ProgrammingProjects, AcademicExperience, Tab } from "../../types";
import { boilerplateJob, boilerplateProjects, boilerplateAcademic } from "../../boilerplate";

interface MainFormProps {
  formState: [form: CurriculumForm, setForm: React.Dispatch<React.SetStateAction<CurriculumForm>>]
  setTab: React.Dispatch<React.SetStateAction<Tab>>
}

const MainForm = ({formState, setTab}: MainFormProps) => {
  const formElement = useRef<HTMLFormElement>(null);

  const [form, setForm] = formState;

  const {name, age, email, tel} = form;

  const [picture, setPicture] = useState<File | null>(form.picture ?? null);
  const [knownFrameworks, setKnownFrameworks] = useState<string[]>(form.techTags ?? []);
  const [jobExperiences, setJobExperiences] = useState<JobExperience[]>([boilerplateJob]);
  const [programmingProjects, setProgrammingProjects] = useState<ProgrammingProjects[]>([boilerplateProjects]);
  const [academicExperiences, setAcademicExperiences] = useState<AcademicExperience[]>([boilerplateAcademic]);

  const submitForm = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if ("pointerType" in e.nativeEvent && e.nativeEvent.pointerType === "") return;

    if (!picture) throw new Error("Can't generate a curriculum without a picture of a face!");

    const formData = new FormData(formElement.current!);

    setForm({
      picture,
      name: formData.get("name") as string,
      age: Number(formData.get("age")),
      email: formData.get("email") as string,
      tel: formData.get("phone") as string,
      techTags: knownFrameworks,
      jobExperiences,
      programmingProjects,
      academicExperiences
    })

    setTab("curriculum_preview");
  }

  return (
    <>
      <h1 className="main-title">Test</h1>

      <form 
        action="" 
        className="main" 
        onSubmit={e => {e.preventDefault(); e.stopPropagation()}} 
        ref={formElement}
      >
        <div className="wrapper">
          <div className="wrapper-col1">
            <section className="personal-data">
              <PhotoPicker setPhoto={setPicture}/>

              <div className="wrapper">
                <div className="label-input">  
                  <label htmlFor="name">Full name:</label>
                  <input type="text" name="name" id="name" autoComplete="name" value={name}/>
                </div>

                <div className="label-input">
                  <label htmlFor="age">Age:</label>
                  <input type="number" name="age" id="age" value={age}/>
                </div>

                <div className="label-input">  
                  <label htmlFor="email">Email:</label>
                  <input type="email" name="email" id="email" autoComplete="email" value={email}/>
                </div>

                <div className="label-input">  
                  <label htmlFor="phone">Phone number:</label>
                  <input type="tel" name="phone" id="phone" autoComplete="tel" value={tel}/>
                </div>
              </div>
            </section>
          </div>

          <div className="wrapper-col2">  
            <section className="professional-experience">
              <InputList 
                listState={[knownFrameworks, setKnownFrameworks]}
                labelText="Known languages/frameworks:"
                maxItems={5}
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

        <button type="submit" onClick={e => submitForm(e)}>
          Generate Curriculum Vitae
        </button>
      </form>
    </>
  )
}

export default MainForm