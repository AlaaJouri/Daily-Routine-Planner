Daily Routine Planner

My app is called "Daily Routine Planner" and it allows users to plan and organize their daily routine.
The application provides features to plan activities, nutrition, sleep times, reading books, and drinking habits. At the
end of the day, users can view the results.
This app could help motivate users to adopt a healthier lifestyle.

Set up

To get started with the project, follow these steps:

1. Clone the project repository from the source control system.

2. Load the maven project by opening a terminal/command prompt and navigating to the project directory. Then run the
following command:

mvn clean install
This will download all the required dependencies and build the project.

3. Next, navigate to the client directory by running the following command:

cd client
Then run the following command to install the required npm packages:

npm install
This will download all the required packages for the client-side application.

4. The project uses a MongoDB database to store data. You will need to set up a local MongoDB instance as specified in the
application.properties file. Make sure that the MongoDB instance is running before proceeding to the next step.

5. Set the MONGODB_URI connection string as an environment variable. This can be done by running the following command:

export MONGODB_URI=<your-mongodb-uri>
Replace <your-mongodb-uri> with the URI of your local MongoDB instance.

6. Finally, navigate back to the project root directory and run the following command to start the application:

mvn spring-boot:run
This will start the server-side application. You can access the client-side application by opening a web browser and
navigating to http://localhost:3000.
