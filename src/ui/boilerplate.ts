import type { JobExperience, ProgrammingProjects, AcademicExperience } from "./types"

export const boilerplateJob: JobExperience = {
  companyName: 'Boring Co.',
  position: 'Depressed Office Guy',
  responsibilitiesDescription: 'Be depressed about everything',
  initDate: new Date(),
  finalDate: new Date()
}

export const boilerplateProjects: ProgrammingProjects = {
  title: "ChatGPT",
  description: "Invented chatgpt",
  tags: ["ai", "llm", "future"],
  githubSource: "https://github.com/JunDevl"
}

export const boilerplateAcademic: AcademicExperience = {
  institutionName: '',
  area: '',
  date: new Date()
}