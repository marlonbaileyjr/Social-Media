
/*User table*/

CREATE TABLE user(
	userId int PRIMARY KEY AUTO_INCREMENT,
	firstName varchar(30) NOT NULL ,
	lastName varchar(30) NOT NULL,
	userName varchar(30) UNIQUE,
	email varchar(255) UNIQUE,
	profilePicture longblob,
	bio varchar(200),
	password varchar(30) NOT NULL,
	dateOfBirth date NOT NULL,
	dateJoined date NOT NULL,
	lastLogin TIMESTAMP NOT NULL
);

/*Friendship table*/

CREATE TABLE friendship(
	friendshipId int PRIMARY KEY AUTO_INCREMENT,
	follower int,
	followed int,
	uploadTime TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,   
	FOREIGN KEY(follower) REFERENCES user(userId) ON DELETE CASCADE,
	FOREIGN KEY(followed) REFERENCES user(userId) ON DELETE CASCADE
);


/*Post table*/

CREATE TABLE post(
	postId int PRIMARY KEY AUTO_INCREMENT,
	caption varchar(60),
	userId int,
	uploadTime TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,  
	FOREIGN KEY(userId) REFERENCES user(userId) ON DELETE CASCADE
);

/*Picture table*/

CREATE TABLE Picture(
	pictureId int PRIMARY KEY AUTO_INCREMENT,
	postId int,
	media longblob,
	type varchar(30),
	order int,
	uploadTime TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,   
	FOREIGN KEY(postId) REFERENCES post(postId) ON DELETE CASCADE
);

/*Comment table*/

CREATE TABLE comment(
	commentId int PRIMARY KEY AUTO_INCREMENT,
	postId int,
	userId int,
	text varchar(200) NOT NULL,
	parentCommentId int,
	uploadTime TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,  
	FOREIGN KEY(userId) REFERENCES user(userId) ON DELETE CASCADE,
	FOREIGN KEY(postId) REFERENCES post(postId) ON DELETE CASCADE,
	FOREIGN KEY(parentCommentId) REFERENCES comment(commentId)
);

/*Like table*/

CREATE TABLE likes(
	likeId int PRIMARY KEY AUTO_INCREMENT,
	userId int,
	postId int,
	uploadTime TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY(userId) REFERENCES user(userId) ON DELETE CASCADE,
	FOREIGN KEY(postId) REFERENCES post(postId) ON DELETE CASCADE
);
