export class Job {
  constructor(jobData) {
    this.id = jobData.id
    this.jobTitle = jobData.jobTitle
    this.description = jobData.description
    this.rate = jobData.rate
    this.hours = jobData.hours
    this.company = jobData.company
    this.creatorId = jobData.creatorId
    this.creator = jobData.creator || {}
  }
}
