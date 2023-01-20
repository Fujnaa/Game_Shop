# Game_Shop
A game shop web application, made using React, .NET and MongoDB.

The goal of this web application is to simulate an online video-game shop with an online database featuring information about video games and users.

The web application has authentification and authorization integrated. Meaning that certain users have admin privileges and can manually add new games to the shop.
On the other hand, regular users can just add items to the cart, simulating a buyer experience.

Cryptography has been also integrated, all the passwords from users have been encrypted and safely stored in the database.
By using JWT tokens I've secured that there is no possible way to get to the passwords, unless of course, you get to the token and decrypt it.

The project was made for a class by the name of "Web Oriented Programming".

In order to run a demo of the application (sadly without the data from the database) you would need to download the github project, and open it with Visual Studio Code.
Firstly, open two separate terminals, which will be used in order to run both the database and the frontend of the application.
Enter the backend folder by typing the "cd backend" command, and run the database using "dotnet run".
Afterwards, using the second terminal enter the frontend folder with "cd frontend" and run the frontend with "npm start".
Congrats! You just successfully ran my application!

This project was made entirely by me, Vuk Stojić.
Here's my contact if any questions arise: stojicvukk@gmail.com
