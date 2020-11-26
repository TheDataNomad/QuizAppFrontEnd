import React from 'react';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Grid from '@material-ui/core/Grid';
import { Button } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import { AnswerObject } from './Quiz';



type Props = {
  question: string;
  answers: string[];
  callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
  userAnswer: AnswerObject | undefined;
  questionNr: number;
  totalQuestions: number;
};

const QuestionCard: React.FC<Props> = ({
  question,
  answers,
  callback,
  userAnswer,
  questionNr,
  totalQuestions,
}) => (
    
  <Grid>
        <p style={{textAlign: "center", color:"black"}}>
        Question: {questionNr} / {totalQuestions}
        </p>
    <Paper   
    > 
        <p style={{textAlign: "center", padding: "10px", background:"lightblue"}} dangerouslySetInnerHTML={{ __html: question }} />
    </Paper>
    <div>
    <GridList cellHeight={50} cols={1}>
      {answers.map((answer) => (
        // <ButtonWrapper
        //   key={answer}
        //   correct={userAnswer?.correctAnswer === answer}
        //   userClicked={userAnswer?.answer === answer}
        // >
        // </ButtonWrapper>
            <GridListTile>
            <Button 
                type="submit"
                fullWidth
                variant="outlined"
                color="primary"
                disabled={userAnswer ? true : false} value={answer} onClick={callback}>
                    <span dangerouslySetInnerHTML={{ __html: answer }} />
                </Button>
            </GridListTile>

        ))}
    </GridList>       
    </div>
  </Grid>
);

export default QuestionCard;
