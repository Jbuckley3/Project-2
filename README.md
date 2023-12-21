# Task Board App

description:
a collaborative task management application that enables teams to efficiently organize, track, and complete tasks collaboratively. It allows users to create, assign, and manage tasks within a team environment.

User stories:
Ice Box:

-As a user, I want to be able to create a new task with a title, description, and due date, because it helps in organizing work efficiently.
-As a team member, I want to be able to assign tasks to specific team members, because it ensures clear accountability.
-As a user, I want to receive notifications for upcoming task deadlines, so I can stay on top of my responsibilities.

Current/MVP:

-As a user, I want to be able to log in using OAuth authentication, because it provides a secure and convenient way to access the application.
-As a team member, I want to view a list of tasks assigned to me, so I can prioritize my work.
-As a team member, I want to mark tasks as completed, so everyone in the team is aware of the progress.
-As an administrator, I want to be able to delete tasks, in case they are no longer relevant or needed.

Completed:

-As a user, I want to be able to edit task details, because sometimes plans change.
-As a team member, I want to see a history of task activities, so I can understand how a task progressed.


Wireframes:
Landing Page: 

Task List Page: 

Task Details Page: 

User Profile Page: 

ERD:


![erd for task board](public/Screen Shot 2023-12-21 at 1.43.38 PM.png)
User Model:

Attributes: ID, Username, Email, Password (hashed), OAuthID, Profile Image
Task Model:

Attributes: ID, Title, Description, Due Date, Status (Incomplete/Complete), Assigned User (Reference to User Model)


Next Steps:
Implement OAuth authentication for user login.
Create the main Mongoose models for User and Task.
Develop basic CRUD functionality for tasks (Create, Read, Update, Delete).
Style the application for a polished user interface.
Deploy the app on Heroku.


Technologies Used:
Node.js
Express.js
MongoDB
Mongoose
OAuth (e.g., Passport.js)
EJS (as the template engine)
HTML, CSS