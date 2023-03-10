# Alladin Melico
![Screenshot 2023-03-10 at 7 41 47 PM](https://user-images.githubusercontent.com/40887666/224307489-b5a3d6e4-61ac-4a42-8c09-b7e5baad7a9f.png)
![Screenshot 2023-03-10 at 7 40 48 PM](https://user-images.githubusercontent.com/40887666/224307680-838d45a1-f8f5-41df-aea3-e53d1fd605d8.png)
![Screenshot 2023-03-10 at 7 41 08 PM](https://user-images.githubusercontent.com/40887666/224307743-64cb02ca-9d55-4fcd-af2e-a25a8fb64de9.png)


## ⚙️ Installation 
### Backend
Open a new terminal and run the following: 
- `cd api`
- `yarn`
- `yarn dev`

### Frontend
Open a new terminal and run the following: 
- `cd client`
- `yarn`
- `yarn dev`

## ⚡️ How to use
1. Register by going to `/register` path. You won't be able to access th homepage `/` without going through authentication.
2. Choose 3 Starter Pokemons. You may click the "Get Random Set" button to get a new set. You wouldn't be able to update starter pokemon after onboarding. <i>Note: You wouldn't be able to access the homepage without the Starter Pokemons</i>
3. Click the "Shop" button to go to shop panel. <i>Note: You can only buy items up to $1000 in total. You can remove or add items indefinitely.</i>
4. Play around!
5. Click the Logout button on bottom right corner of the screen to logout. 

## 🗄️ Database Schema
The User table has many Pokemons. The UserId of the Pokemon table belongs to the User table. The items column is just a string with containing list of items. Since this app only uses SQLite, we can't put a column with array as the data type. The items are only being parsed and serialized. We only have three contant items, we can just retrieve the details of an item given unique identifier. 
![Pokemon ERD](https://user-images.githubusercontent.com/40887666/224315468-dcc3ec24-1ccc-4511-ae72-814da0d644b6.png)
