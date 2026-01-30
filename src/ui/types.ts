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