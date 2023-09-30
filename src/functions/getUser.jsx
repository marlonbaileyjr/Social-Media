import img1 from '../img/pfimg1.jpeg'
import img2 from '../img/pfimg2.jpeg'
import img3 from '../img/pfimg3.jpeg'
import img4 from '../img/pfimg4.jpeg'
import img5 from '../img/pfimg5.jpeg'

export const users = [
    {
      "userId": 1,
      "firstName": "John",
      "lastName": "Doe",
      "userName": "johndoe123",
      "email": "johndoe@example.com",
      "bio": "An adventurous spirit.",
      "password": "password123",
      "dateOfBirth": "1990-01-01",
      "dateJoined": "2023-09-01",
      "profilePicture": img1
    },
    {
      "userId": 2,
      "firstName": "Jane",
      "lastName": "Smith",
      "userName": "janesmith456",
      "email": "jane.smith@example.com",
      "bio": "Love to read and travel.",
      "password": "securePass456",
      "dateOfBirth": "1985-02-15",
      "dateJoined": "2023-05-10",
      "profilePicture": img2
    },
    {
      "userId": 3,
      "firstName": "Alice",
      "lastName": "Johnson",
      "userName": "alicejohnson789",
      "email": "alice.johnson@example.com",
      "bio": "Photographer and coffee lover.",
      "password": "photoPass789",
      "dateOfBirth": "1992-07-20",
      "dateJoined": "2023-08-15",
      "profilePicture": img3
    },
    {
      "userId": 4,
      "firstName": "Bob",
      "lastName": "Martin",
      "userName": "bobmartin012",
      "email": "bob.martin@example.com",
      "bio": "Music is life.",
      "password": "musicLife012",
      "dateOfBirth": "1988-03-30",
      "dateJoined": "2023-06-20",
      "profilePicture": img4
    },
    {
      "userId": 5,
      "firstName": "Charlie",
      "lastName": "Brown",
      "userName": "charliebrown345",
      "email": "charlie.brown@example.com",
      "bio": "Always seeking the next adventure.",
      "password": "adventurePass345",
      "dateOfBirth": "1995-09-25",
      "dateJoined": "2023-07-10",
      "profilePicture": img5
    }
  ];
  
  function getUserById(userId) {
    return users.find(user => user.userId === userId);
  }
  
  export default getUserById;
  