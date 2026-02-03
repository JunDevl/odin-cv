export type CurriculumForm = {
  picture: File,
  name: string,
  age: number,
  email: string,
  tel: string,
  techTags: string[], // every piece of programming tech the candidate knows (could be programming languages, frameworks, libraries)
  jobExperiences: JobExperience[],
  programmingProjects: ProgrammingProjects[],
  academicExperiences: AcademicExperience[]
}

export type JobExperience = {
  companyName: string,
  position: string,
  responsibilitiesDescription: string,
  initDate: Date | null,
  finalDate: Date | null
}

export type ProgrammingProjects = {
  title: string,
  description: string,
  tags: string[],
  githubSource: string,
}

export type AcademicExperience = {
  institutionName: string,
  area: string,
  date: Date | null
}