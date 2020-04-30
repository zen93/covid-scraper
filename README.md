## Covid Scraper
- This service is not publicly accessible. It is called by the Cloud Scheduler every 30 mins. It reads data from the coronavirus api and stores it to our database.
- It runs on cloud run (serverless containers)
- We use Docker to containerize the application. Please see the Dockerfile.
- We use cloud build to automatically deploy this code from the master branch to cloud run. See cloudbuild.yaml
![CloudBuild](https://i.ibb.co/sQmmzMZ/covid-cicd.png)

## Instructions to run
- Clone this repo
- run the command `npm install`
- Next, run `npm start`
- Access the site at `localhost:3000`