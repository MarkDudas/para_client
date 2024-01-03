export interface IJob {
  _id: string;
  jobTitle: string;
  company: string;
  companyImageUrl: string;
  jobDescription: string;
  jobQualifications: string;
  jobResponsibilities: string;
  location: string;
  monthlySalaryFrom: number;
  monthlySalaryTo: number;
  createdAt: string;
  isArchive: boolean;
}

export interface LoginInterface {
  email: string;
  password: string;
}

export interface RegistrationInterface {
  _id: string;
  lastName: string;
  firstName: string;
  email: string;
  address: string;
  position: string;
  role: string;
  personalSummary: string;
  password: string;
}

export interface UserInterface {
  _id: string;
  lastName: string;
  firstName: string;
  email: string;
  address: string;
  position: string;
  role: string;
  createdAt: string;
  personalSummary: string;
  contactNumber: string;
  profileImage: string;
}

export interface ICareerHistory {
  _id: string;
  email: string;
  jobTitle: string;
  companyName: string;
  startedDateMonth: string;
  startedDateYear: string;
  endedDateMonth: string;
  endedDateYear: string;
  description: string;
  createdAt: string;
}

export interface IEducation {
  _id: string;
  email: string;
  school: string;
  course: string;
  yearCompleted: string;
  courseHighlight: string;
}

export interface ILicense {
  _id: string;
  email: string;
  licenseName: string;
  issueingOrg: string;
  issueDateMonth: string;
  issueDateYear: string;
  description: string;
}

export interface ISkills {
  _id: string;
  email: string;
  skill: string;
}

export interface ILanguage {
  _id: string;
  email: string;
  language: string;
}

export interface IApplicant {
  name: string;
  email: string;
  skills: string[];
  job_applying: string;
  jobDescription: string;
  jobQualifications: string;
  experience: string;
  rank: number;
  how: string;
  createdAt: string;
  jobId: string;
  actualJobPosted: string;
  pdfFile: string;
  gender: string;
  birthday: string;
}

export interface ICompany {
  _id: string;
  companyName: string;
  companyLocation: string;
  companyImage: string;
  createdAt: string;
}
