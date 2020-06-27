# IDEAGRAM

## Application Description
This application acts as a visual discovery engine for finding ideas like countries, recipes, home and style inspiration, and many more. 

## Application link
[http://ideagram.herokuapp.com/](http://ideagram.herokuapp.com/)

## Database/Storage
* **MongoDB** is a document-oriented NoSQL database used for high volume data storage
* **Cloudinary** is a cloud service that offers a solution to a web application's entire image management pipeline.

## Technologies
* **EJS** is used to generate HTML with plain javascript to append to frontend.
* **Method-override** is used to to convert HTTP verbs such as PUT or DELETE in places where the client doesn't support it
* **shortid** is used to create amazingly short non-sequential url-friendly unique ids
* **Bcrypt** is used to hash and store passwords in database
* **Express-session** is used to store the user state with each given being assiged a unique session. 
* **MomentJS** is used as a wrapper to handle Date object
* **Multer** is used to handle multipart/form-data for images uploading 
* **Bootstrap Material Design** is used for CSS framework for HTML and CSS design templates

## Objective
The objective of the project is to build a working full **CRUD** (Create, Read, Update and Delete) application using **Node.js**, **MongoDB**, **Express** and **EJS** that adhere to **MVC** (Models, Views, and Controllers) file structure.

## Approaches Taken
* set up a basic MVC structure with basic CRUD routes.
* set up database with collections and schema validation in the MongoDB
* built authentication page
* linked the app to heroku
* modular testing on the upload file with cloudinary and multer. 
    > initially this is not in the full code, after basic functional test completed, implement it to the routes.
* follow the initial wireframe design and user stories
  > started with show route for albums, then images, comments and lastly users.

## Accomplishments
* The application is meeting the mininum viable product (MVP)'s requirements.
* Every user is able to create album, add image to existing album, view other users, view all albums, view all images, add comment, delete comment/image/ablum, edit comment/album, follow/unfollow users/albums, etc.
* the image file can be uploaded through local file. 

## Difficulties faced
* One form to handle two routes, upload image via file and upload via url. (unsolved)
    > The route for upload image via file has a middleware (Multer) and have a enctype="multipart/form-data" while the route for upload image via url didn't have the enctype type. 

* Can't reformat the date object by moment(Node.js library) when doing DOM manupulation through jquery. 
    > Need to format the date to be same as the previous comment container

    
## Wireframe Design and User Stories
* ### Landing Page (Not Signed in)
* ### Login and Signup Page
* ### Landing Page (Signed in)
* ### All Albums
* ### All Images
* ### Album Page
* ### User Profile Page
* ### Comments Modal

## Additional Features were under Considerations
* **Notifications** - application to send notifcation to user when there is another user commented on image, add new image to the album, followed album has new image, has new follower, etc. 
* **Enhance Users Database** - to get more users profile into the database like profile picture, email address, gender, age, biodata, etc. 
* **Like feature for image** - to have a like button for individual image

## Credits
* All the **alpha trials users** and **fellow coursemates** 
