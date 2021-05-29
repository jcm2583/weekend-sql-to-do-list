CREATE TABLE "chores" (
	"id" SERIAL PRIMARY KEY,
	"task" VARCHAR (250) NOT NULL,
	"notes" VARCHAR (250) NOT NULL,
  "isComplete" BOOLEAN DEFAULT FALSE
);

INSERT INTO "chores" 
	("task", "notes") 
VALUES 
	('Brush Teeth', 'ALWAYS start the morning off with some fresh breathe!'),
	('Make Bed', 'ALWAYS make your bed in the morning! Or does that come before teeth brushing ???');