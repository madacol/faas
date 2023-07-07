exports.up = pgm => {
    pgm.sql`
        CREATE TABLE personality_questions (
            personality_question_id SERIAL PRIMARY KEY,
            question VARCHAR(1024) NOT NULL,
            created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE personality_answers (
            personality_answer_id SERIAL PRIMARY KEY,
            answer INTEGER NOT NULL CHECK (answer >= 1 AND answer <= 5),
            personality_question_id INTEGER NOT NULL REFERENCES personality_questions(personality_question_id) ON DELETE CASCADE,
            user_id INTEGER NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
            created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            UNIQUE (personality_question_id, user_id)
        );
        COMMENT ON COLUMN personality_answers.answer IS '1 = Strongly Disagree, 2 = Disagree, 3 = Neutral, 4 = Agree, 5 = Strongly Agree';

        INSERT INTO personality_questions (question)
        VALUES ('I enjoy being around a lot of people')
            , ('I believe everything in life happens for a reason')
            , ('I’m easily annoyed by spelling and grammar mistakes')
            , ('I enjoy evening get-togethers more when everyone is tipsy')
            , ('God is an important part of my life')
            , ('I work very hard')
            , ('I care deeply about the environment')
            , ('I’m in a serious long-term relationship')
            , ('I like to help others')
            , ('I like having intellectual conversations')
            , ('I get irritated easily')
            , ('I’m very careful with how I spend my money')
            , ('I find it difficult to remain calm when I’m under pressure')
            , ('With enough time I think science will explain everything')
            , ('I am very easy to satisfy')
            , ('I believe people are inherently good')
            , ('I’d love to learn a useful skill')
            , ('I believe in the importance of art')
            , ('I often feel blue')
            , ('Marriage should only be between a man and a Woman')
            , ('I almost always carry out my plans')
            , ('I prefer to live in an ethnically diverse community (asking for your ethnicity) ')
            , ('I am currently a full-time employee earning a salary')
            , ('I try to be a leader of others')
            , ('I am a big fan of podcasts')
            , ('I grew up in the city I currently live in')
            , ('I spend time reflecting on things')
            , ('I feel awful if I’m unable to follow through on a commitment I made')
            , ('I try to look stylish in social settings')
            , ('I try to understand myself')
            , ('When it comes to personal development I’d like to level up certain aspects of myself')
            , ('I very much prefer variety to routine')
            , ('I make friends easily')
            , ('I have an opinion on one or more political matters')
            , ('I’m a parent')
            , ('I’d like to go out and party more often')
            , ('I’m interested in some topics in science or technology')
            , ('I’m usually informed and up to date on next and current events')
            , ('I’m only interested in deep and meaningful new friendships')
            , ('I use profanity when talking with good friends')
            , ('I have a university degree')
            , ('I like to take it easy in life')
            , ('I tend to think very highly on myself')
            , ('I want to try new and fun ways of exercising')
            , ('Smoking marihuana can be a fun activity for me')
            , ('Efforts to make men and women more equal are a great idea')
            , ('If I’m feeling the music, I’ll definitely go to the dance floor')
            , ('I’m really determined to be very successful at what I do')
            , ('I love listening to music')
            , ('I’m interested in certain topics within the field of Business and Economics')
            , ('I am comfortable even in unfamiliar situations')
            , ('I really love dinner parties')
            , ('I love nature and outdoors')
            , ('Religion is a force for good in the world')
            , ('I enjoy being around intelligent people')
            , ('I get stressed easily')
            , ('Social justice should be the core foundation of any economic system')
            , ('Employees should have the right to strike without the fear of losing their job')
            , ('It should be legal for adults to smoke marijuana')
            , ('I like to play sports')
            , ('I’d like to go out with others for some drinks more often')
            , ('I’m a big fan of playing games with friends')
            , ('I smoke cigarettes')
            , ('I’d love to work on useful & fun Do-it-yourself project')
            , ('I can speak another language other than English')
            , ('I could be great at almost anything because skills comes only from practice')
            , ('I could use a support group that’s suffering from the same problems as me')
            , ('There is a side of me that’s very artistic')
            , ('The government has an obligation to preserve the life of unborn babies')
            , ('The government should reduce the number of immigrants coming into this country')
            , ('Both sides of the Israeli-Palestinian conflict have very legitimate concerns')
            , ('I’d love a partner to exercise with')
            , ('I believe there is an absolutely right and wrong')
            , ('I exercise regularly')
            , ('I prefer to have predictability and structure in my life')
            , ('I love to do exciting things')
            , ('I try to always look at the bright side of life')
            , ('I’m bad at resisting temptation ')
            , ('I own a dog')
            , ('I do my best to avoid any mistake')
            , ('I love to read books')
            , ('I’m really good at what I do')
            , ('I’d love to go to the cinema more often')
        ;
    `
};

exports.down = pgm => {
    pgm.sql`DROP TABLE personality_answers`;
    pgm.sql`DROP TABLE personality_questions`;
}