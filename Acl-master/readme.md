# ACL Coursera

## Overview
This is the project of the Advanced Computer Lab course in the German University in Cairo. The project aims to implement a website similar to Coursera and Udacity.

## Features
1. User authentication and account management system
2. Secure transactions using Stripe API
3. Instructors can upload courses and track the feedback of the course including but not limited to, seeing users reviews and ratings and also tracking their earnings data.
4. Admin system which allows admins to add instructors, set promotions, track complaints and respond to them
5. Instructors can create graded exams for their students to take
6. Free courses to corporate trainees
7. much more... 

## Tech Stack
1. NodeJs (Express)
2. MongoDB (hosted on Mongo Atlas)
3. ReactJs

## Project Structure
The project is split into two servers, one to serve the React frontend files and the other contains the express backend. The user only interacts with the frontend server which in turn will interact with the backend system


## Setup

First clone the repo into your computer, then navigate to the first folder which contains the first `package.json`  file and run the backend server on port 8000
			
			git clone https://github.com/OmarNofal/ACL-Project.git
			cd Acl-master
			npm run server
Now go to the frontend directory and run the React server on port 3000
	
			cd frontend
			npm start
Navigate to http://localhost:3000/ and start experimenting

## Backend Discussion
The backend contains two main URL entry points namely `/api/users/` and `/api/courses/`.

The former contains all the URLs  related to users account management like registering, changing the password, etc...

The latter contains all the URLs related to courses, like getting the course info,
creating a course, taking an exam, etc...

All the functions implementing these routes reside in the `backend/controllers` folder, this is the meat of the project.

### Models
There are many schemas stored in the database, but the most important ones are the following
1. `User`: contains all our users data, including the trainees, instructors and admins
2. `Course` : contains all the courses data with a reference to their instructor
3. `Purchase`: contains all the purchases issued on our system, including the ones which have been cancelled


## Frontend Discussion
The frontend is made using `ReactJs` and communicates with the backend server using `Axios`. The project uses React Router which makes the user feel like the app is in a single webpage, while still being able to easily navigate backwards if needed.
The frontend is hosted on a separate server to allow separation of concerns and ease of development.



### Licence 
`Open Licence. Do whatever you want with the project`