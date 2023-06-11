# Melodic Adventures

Melodic Adventures is a website where music enthusiasts can come and join various music instrument classes as they please. The website provides a platform for students to select classes, make payments, enroll, and manage their classes. Instructors have the power to add classes, and the admin has control over user roles, class approval, and feedback.

## Features

- User Roles: There are three user roles - student, instructor, and admin.
- Class Selection: Students can select a class from the classes page.
- Dashboard: Students have a dashboard where they can see their selected classes, make payments, enroll, and delete selected classes if they change their minds. Enrolled classes are displayed in the "My Enrolled Classes" section, and there is a payment history in the dashboard.
- Class Addition: Instructors have the ability to add classes by providing class name, image, available seats, price, etc. Added classes are shown in the "My Classes" section of their dashboard. Initially, the added class is in the "pending" state, and if approved by the admin, it will be shown on the classes page.
- Admin Control: The admin dashboard provides two routes - "Manage Users" and "Manage Classes". In the "Manage Users" section, the admin can control the roles of registered users, making someone an instructor or admin. In the "Manage Classes" section, the classes added by instructors are displayed, and the admin can approve or deny a class. The admin also has the ability to provide feedback.

## Homepage

The homepage consists of the following sections:

1. Slider Banner: A visually appealing banner displayed on the homepage, showcasing the features and highlights of Melodic Adventures.
2. Popular Classes: This section displays popular music instrument classes that users can explore.
3. Popular Instructors: This section highlights popular music instructors.

Please note that users who are not logged in can view the homepage, the popular classes section, and the popular instructors section. However, class selection and access to dashboard routes are protected and require authentication.

## Technologies/Packages Used

- Frontend: React, ReactRouter, TailwindCSS, DaisyUi, Axios, TanStackQuery
- Backend: Node.js, Express.js
- Database: MongoDB
- Authentication: Firebase, JSON Web Tokens (JWT)

## Contributing

Contributions to Melodic Adventures are welcome! If you would like to contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes and test them thoroughly.
4. Commit your changes with descriptive commit messages.
5. Push your changes to your forked repository.
6. Submit a pull request explaining your changes.

##
1. live link :https://melodic-adventures.web.app/

## License

Melodic Adventures is released under the [MIT License](https://opensource.org/licenses/MIT).

Feel free to modify this template while keeping the functionalities intact to suit the Melodic Adventures website, which is music instrument-related.