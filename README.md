BASIC TODO-LIST / NOTE-TAKING APP
This is my first full-stack project built using the MERN stack.

There are various issues inside this codebase that I will fix in the future. Most problems are related to access control for pages.

✅ Steps to Run This Project for Production:
First, create an .env file in the root directory.

Then run npm run build.

Lastly, run npm run start.
(For development, replace start with server → npm run server)

⚠️ Minor Inconveniences (which I plan to fix):
When you start the project, the login page is shown by default. So, you have to manually type /signup instead of /login to sign up.

As mentioned above, you currently cannot navigate freely in the app — here are the available routes:
/login = Login page
/signup = Signup page
/ = Home page

After one hour of login, the session expires. You’ll need to log in again to continue using the app.
