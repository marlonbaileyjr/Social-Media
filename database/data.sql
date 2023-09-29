INSERT INTO user (firstName, lastName, userName, email, bio, password, dateOfBirth, dateJoined, lastLogin)
VALUES 
('John', 'Doe', 'johndoe123', 'johndoe@example.com', 'An adventurous spirit.', 'password123', '1990-01-01', '2023-09-01', NOW()),
('Jane', 'Smith', 'janesmith456', 'jane.smith@example.com', 'Love to read and travel.', 'securePass456', '1985-02-15', '2023-05-10', NOW()),
('Alice', 'Johnson', 'alicejohnson789', 'alice.johnson@example.com', 'Photographer and coffee lover.', 'photoPass789', '1992-07-20', '2023-08-15', NOW()),
('Bob', 'Martin', 'bobmartin012', 'bob.martin@example.com', 'Music is life.', 'musicLife012', '1988-03-30', '2023-06-20', NOW()),
('Charlie', 'Brown', 'charliebrown345', 'charlie.brown@example.com', 'Always seeking the next adventure.', 'adventurePass345', '1995-09-25', '2023-07-10', NOW());

INSERT INTO friendship (follower, followed) 
VALUES
(1, 2),  -- John follows Jane
(3, 4),  -- Alice follows Bob
(5, 3),  -- Charlie follows Alice
(2, 5),  -- Jane follows Charlie
(4, 1);  -- Bob follows John

INSERT INTO post (caption, userId)
VALUES
("John's latest adventure", 1),  -- Post by John
("Jane's favorite book recommendations", 2),  -- Post by Jane
("Alice's day out in the city", 3),  -- Post by Alice
("Bob's new music playlist", 4),  -- Post by Bob
("Charlie's trip to the mountains", 5);  -- Post by Charlie

INSERT INTO Picture (postId, type, order)
VALUES 
(1, "image", 1),  -- Picture for John's post
(2, "image", 1),  -- Picture for Jane's post
(2, "video", 2),  -- A second media (video) for Jane's post
(3, "image", 1),  -- Picture for Alice's post
(4, "image", 1);  -- Picture for Bob's post

-- COMMENTS

-- 1. John comments on his own post.
INSERT INTO comment (postId, userId, text) VALUES (1, 1, "Thank you all for the likes!");

-- Assuming the comment from John got the ID of 1, we proceed:

-- 2. Jane comments on John's post.
INSERT INTO comment (postId, userId, text) VALUES (1, 2, "Great post, John!");

-- Let's say Jane's comment gets the ID of 2:

-- 3. Alice replies to Jane's comment on John's post.
INSERT INTO comment (postId, userId, text, parentCommentId) VALUES (1, 3, "I agree with Jane!", 2);

-- 4. Bob comments on Alice's post.
INSERT INTO comment (postId, userId, text) VALUES (3, 4, "Wonderful day out, Alice!");

-- 5. Charlie comments on Bob's post.
INSERT INTO comment (postId, userId, text) VALUES (4, 5, "Love the music choice, Bob!");

INSERT INTO likes (userId, postId)
VALUES
(1, 3),  -- John likes Alice's post
(2, 4),  -- Jane likes Bob's post
(3, 5),  -- Alice likes Charlie's post
(4, 1),  -- Bob likes John's post
(5, 2);  -- Charlie likes Jane's post




