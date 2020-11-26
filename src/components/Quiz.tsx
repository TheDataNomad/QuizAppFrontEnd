import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

import { NavLink } from 'react-router-dom';

import { fetchQuizQuestions, QuestionsState, fetchResults} from '../API';
import QuestionCard from './QuestionCard';
import { GlobalStyle} from './QuizPage.styles';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));




export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
};

const TOTAL_QUESTIONS = 5;

const Quiz: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionsState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  var courseTitle = localStorage.course;
  var difficultyMode = localStorage.difficulty;
  var name = localStorage.userName;
  console.log(courseTitle);
  console.log(difficultyMode);
  console.log(name);
  const startTrivia = async () => {
    setLoading(true);
    setGameOver(false);
    const newQuestions = await fetchQuizQuestions(
      TOTAL_QUESTIONS,
      courseTitle,
      difficultyMode,
    );
    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);
  };

  const saveResults = async () => {
    const resultValue = `${score}/${TOTAL_QUESTIONS}`
    const resultsStoring = await fetchResults(courseTitle, difficultyMode, resultValue, name);
    console.log(resultsStoring)
  };

  console.log("This is the score" + score)

  const checkAnswer = (e: any) => {
    if (!gameOver) {
      // User's answer
      const answer = e.currentTarget.value;
      // Check answer against correct answer
      const correct = questions[number].correct === answer;
      // Add score if answer is correct
      if (correct) setScore((prev) => prev + 1);
      // Save the answer in the array for user answers
      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct,
      };
      setUserAnswers((prev) => [...prev, answerObject]);
    }
  };
  
  const nextQuestion = () => {
    // Move on to the next question if not the last question
    const nextQ = number + 1;

    if (nextQ === TOTAL_QUESTIONS) {
      setGameOver(true);
    } else {
      setNumber(nextQ);
    }
  };
  const classes = useStyles();
  return (
    <>
      <GlobalStyle />
      <Grid>
          <Grid>
          <h1 style={{textAlign: "center"}}> {courseTitle} Quiz - {difficultyMode}</h1>
          </Grid>
          <Grid>
            {gameOver && userAnswers.length === 0 ? (
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={startTrivia}
                >
                Start
              </Button>
            ) : null}
          </Grid>
          <Grid justify="center" alignItems="center">
              {!gameOver && userAnswers.length < 5 ? 
              <p style={{textAlign: "center", color:"black"}}>Score: {score}</p> 
              : null}
          </Grid>
          <Grid >
              {loading ? <p style={{textAlign: "center"}}>Loading Questions...</p> : null}
          </Grid>
          <Grid >
            {!loading && !gameOver && userAnswers.length < 5 && (
            <QuestionCard
                questionNr={number + 1}
                totalQuestions={TOTAL_QUESTIONS}
                question={questions[number].question}
                answers={questions[number].answers}
                userAnswer={userAnswers ? userAnswers[number] : undefined}
                callback={checkAnswer}
            />
            )}
          </Grid>
          <Grid>
            {!gameOver && !loading && userAnswers.length === number + 1 && number !== TOTAL_QUESTIONS - 1 ? (
                <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={nextQuestion}
            >
            Next Question
          </Button>
            ) : null}
          </Grid>
          <Grid>
            {userAnswers.length === TOTAL_QUESTIONS ? (
                <p style={{textAlign: "center", color: "black"}}>Final Score: {score}/{TOTAL_QUESTIONS} </p>
            ) : null}
          </Grid>
          <Grid>
            {userAnswers.length === TOTAL_QUESTIONS ? (
              <NavLink to="/profile">
                <Button
                type="submit"
                fullWidth
                variant="outlined"
                color="secondary"
                className={classes.submit}
                onClick={saveResults}
            >
            Done
          </Button>
          </NavLink>
            ) : null}
          </Grid>
          {console.log(`${score}/${TOTAL_QUESTIONS}`)}
      </Grid>
    </>
  );
};

export default Quiz;
