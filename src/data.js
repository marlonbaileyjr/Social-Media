import img1 from './img/download.png'
import img2 from './img/test.png'
import img3 from './img/test1.jpeg'
import img4 from './img/w3kr4m2fi3111.png'
import post1 from './img/pos1.jpeg'
import post2 from './img/post2.jpeg'
import post3 from './img/post3.jpeg'
import post4 from './img/post4.jpeg'
import post5 from './img/post5.jpeg'
export const items = [
    { imageUrl: img1, caption: 'Caption for Image 1',user: 'Madeline123' },
    { imageUrl: img2, caption: 'Caption for Image 2',user: 'Moses233' },
  ];
  
export const items2 = [
    { imageUrl: img3, caption: 'Caption for Image 1',user: 'Jixny332' },
    { imageUrl: img4, caption: 'Caption for Image 2',user: 'lly_23' },
  ];

export const postsWithPictures = [
    {
        postId: 1,
        captionText: "My first post!",
        userId: 1,
        timestamp: "2023-01-02T11:00:00Z",
        picture: {
            pictureId: 1,
            media: post1, 
            type: "image/png",
            order: 1,
            timestamp: "2023-01-02T11:05:00Z"
        }
    },
    {
        postId: 2,
        captionText: "Another sunny day",
        userId: 2,
        timestamp: "2023-01-03T14:00:00Z",
        picture: {
            pictureId: 2,
            media: post2,
            type: "image/jpg",
            order: 1,
            timestamp: "2023-01-03T14:05:00Z"
        }
    },
    {
        postId: 3,
        captionText: "Love this view!",
        userId: 3,
        timestamp: "2023-01-04T09:00:00Z",
        picture: {
            pictureId: 3,
            media: post3,
            type: "image/jpg",
            order: 1,
            timestamp: "2023-01-04T09:05:00Z"
        }
    },
    {
        postId: 4,
        captionText: "Throwback to last summer",
        userId: 4,
        timestamp: "2023-01-05T17:00:00Z",
        picture: {
            pictureId: 4,
            media: post4,
            type: "image/png",
            order: 1,
            timestamp: "2023-01-05T17:05:00Z"
        }
    },
    {
        postId: 5,
        captionText: "Enjoying a cozy evening",
        userId: 5,
        timestamp: "2023-01-06T20:00:00Z",
        picture: {
            pictureId: 5,
            media: post5,
            type: "image/png",
            order: 1,
            timestamp: "2023-01-06T20:05:00Z"
        }
    }
];

export const comments = [
  {
      commentId: 1,
      postId: 1,
      userId: 2,
      text: "Great post!",
      timestamp: "2023-01-02T12:00:00Z"
  },
  {
      commentId: 2,
      postId: 1,
      userId: 3,
      text: "Thanks for sharing.",
      timestamp: "2023-01-02T13:00:00Z"
  },
  {
      commentId: 3,
      postId: 2,
      userId: 4,
      text: "Looks wonderful!",
      timestamp: "2023-01-03T15:00:00Z"
  },
  {
      commentId: 4,
      postId: 2,
      userId: 1,
      text: "Where was this taken?",
      timestamp: "2023-01-03T16:00:00Z"
  },
  // ... [add more comments for posts 3, 4, and 5]
];
