# Ksolve Hiring challenge
# Virtual Classroom
# Video Demo
https://e365ultra-my.sharepoint.com/:v:/g/personal/g7_e365ultra_onmicrosoft_com/EWw7n6XWreNFnhCewg3vG-sBtHJMzPVJpTfJxttUXi9aOA?nav=eyJyZWZlcnJhbEluZm8iOnsicmVmZXJyYWxBcHAiOiJPbmVEcml2ZUZvckJ1c2luZXNzIiwicmVmZXJyYWxBcHBQbGF0Zm9ybSI6IldlYiIsInJlZmVycmFsTW9kZSI6InZpZXciLCJyZWZlcnJhbFZpZXciOiJNeUZpbGVzTGlua0NvcHkifX0&e=xBHZTC

# Tech Stack 
- React.js – for front-end
- Node.js – for Back-end
- Express.js – for server
- MongoDB Compass– for Database
- Editor – VS Code

Note - The below steps are for VS Code
# Steps For running Front-end
- step 1: git clone https://github.com/Gaurav122000/virtual-classroom.git
- step 2: cd virtual-classroom
- step 3: cd classroom-front-end
- step 4: npm i
- step 5: npm run dev 

# Steps for running Back-end
- step 1: open a new terminal
- step 2: cd virtual-classroom\classroom-back-end 
- step 3: npm i
- step 4: npm start

now both the front and back ends are fully running

## ![image](https://github.com/user-attachments/assets/ddb003fa-a413-4b1b-8c5f-1e08b9ab7752)

### User Registration/Login
  - User registers or logs in through the front end.
  - Frontend sends the request to the backend.
  - Then Backend validates the user and generates a JWT token.
  - Token is sent back to the front end for authenticated requests.
  - 
### Class Management
  - Admin/Instructors create and manage classes.
  - Classes have multiple units, and units have multiple sessions.
  - Each session can contain multiple lectures and comments.

### Course Material Access
  - Enrolled students can access course materials.
  - Frontend requests the course data from the backend.
  - The backend retrieves the data from MongoDB and sends it to the frontend.

### Discussion Feature
  - Users can add comments to lectures.
  - Comments can be nested to facilitate discussions.
  - Real-time updates using Web Sockets for live discussions.
    
### Security and Privacy
  - JWT for authentication.
  - Role-based access control for authorization.
  - Secure coding practices to protect user data.



