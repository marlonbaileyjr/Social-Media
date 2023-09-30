import img1 from './img/download.png'
import img2 from './img/test.png'
import img3 from './img/test1.jpeg'
//import img4 from './img/w3kr4m2fi3111.png'
import post1 from './img/pos1.jpeg'
import post2 from './img/post2.jpeg'
import post3 from './img/post3.jpeg'
import post4 from './img/post4.jpeg'
import post5 from './img/post5.jpeg'

export const items = [
    {
        "post": {
          "postId": 1,
          "caption": "John's latest adventure",
          "userId": 1,
          "uploadTime": "2023-09-29T12:00:00Z"
        },
        "comments": [
          {
            "commentId": 1,
            "postId": 1,
            "userId": 1,
            "text": "Thank you all for the likes!",
            "parentCommentId": null,
            "uploadTime": "2023-09-29 10:10:00"
          },
          {
            "commentId": 2,
            "postId": 1,
            "userId": 2,
            "text": "Great post, John!",
            "parentCommentId": null,
            "uploadTime": "2023-09-29 10:15:00"
          },
          {
            "commentId": 3,
            "postId": 1,
            "userId": 3,
            "text": "I agree with Jane!",
            "parentCommentId": 2,
            "uploadTime": "2023-09-29 10:20:00"
          }
        ],
        "pictures": [
          {
            "pictureId": 1,
            "postId": 1,
            "type": "image",
            "order": 1,
            "media": img1,
            "uploadTime": "2023-09-29T00:00:00Z"
          }
        ],
        "likes": [
          {
            "likeId": 4,
            "userId": 4,
            "postId": 1,
            "uploadTime": "2023-09-29T12:30:00Z"
          }
        ]
      }
      ,
      {
        "post": {
          "postId": 2,
          "caption": "Jane's favorite book recommendations",
          "userId": 2,
          "uploadTime": "2023-09-29T12:30:00Z"
        },
        "comments": [],
        "pictures": [
          {
            "pictureId": 2,
            "postId": 2,
            "type": "image",
            "order": 1,
            "media": img2,
            "uploadTime": "2023-09-29T00:00:00Z"
          },
          {
            "pictureId": 3,
            "postId": 2,
            "type": "video",
            "order": 2,
            "media": img3,
            "uploadTime": "2023-09-29T00:00:00Z"
          }
        ],
        "likes": [
          {
            "likeId": 5,
            "userId": 5,
            "postId": 2,
            "uploadTime": "2023-09-29T12:40:00Z"
          }
        ]
      }
  ];
  
export const items2 = [
    {
        "post": {
          "postId": 3,
          "caption": "Alice's day out in the city",
          "userId": 3,
          "uploadTime": "2023-09-29T13:00:00Z"
        },
        "comments": [
          {
            "commentId": 4,
            "postId": 3,
            "userId": 4,
            "text": "Wonderful day out, Alice!",
            "parentCommentId": null,
            "uploadTime": "2023-09-29 10:25:00"
          }
        ],
        "pictures": [
          {
            "pictureId": 4,
            "postId": 3,
            "type": "image",
            "order": 1,
            "media": post1,
            "uploadTime": "2023-09-29T00:00:00Z"
          }
        ],
        "likes": [
          {
            "likeId": 1,
            "userId": 1,
            "postId": 3,
            "uploadTime": "2023-09-29T12:00:00Z"
          }
        ]
      }
      ,
      {
        "post": {
          "postId": 4,
          "caption": "Bob's new music playlist",
          "userId": 4,
          "uploadTime": "2023-09-29T13:30:00Z"
        },
        "comments": [
          {
            "commentId": 5,
            "postId": 4,
            "userId": 5,
            "text": "Love the music choice, Bob!",
            "parentCommentId": null,
            "uploadTime": "2023-09-29 10:30:00"
          }
        ],
        "pictures": [
          {
            "pictureId": 5,
            "postId": 4,
            "type": "image",
            "order": 1,
            "media": post2,
            "uploadTime": "2023-09-29T00:00:00Z"
          }
        ],
        "likes": [
          {
            "likeId": 2,
            "userId": 2,
            "postId": 4,
            "uploadTime": "2023-09-29T12:10:00Z"
          }
        ]
      }
      ,
      {
        "post": {
          "postId": 5,
          "caption": "Charlie's trip to the mountains",
          "userId": 5,
          "uploadTime": "2023-09-29T14:00:00Z"
        },
        "comments": [],
        "pictures": [],
        "likes": [
          {
            "likeId": 3,
            "userId": 3,
            "postId": 5,
            "uploadTime": "2023-09-29T12:20:00Z"
          }
        ]
      }
      ,
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
