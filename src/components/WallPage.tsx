import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';

import { NavLink } from 'react-router-dom';

import { GlobalStyle} from './QuizPage.styles';

import Results from './Results';
import { Select } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(8),
    display: 'flex',
    width: "200px",
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(0),
  },
  submit: {
    margin: theme.spacing(1.5, 0, 0),
    minWidth: 150,

  },
  select: {
    minWidth: 150,
  }
}));


const Quiz: React.FC = () => {
  const [course, setCourse] = useState('');
  const [difficulty, setDifficulty] = useState('');
  
  var userId = localStorage.userName;
  localStorage.course = course;
  localStorage.difficulty = difficulty;


  const classes = useStyles();
  return (
    <>
      <GlobalStyle />
      <Grid>
        <h3 style={{marginTop: "45px"}}> Hello {userId} </h3>
      </Grid>
      <Grid>
          <h3 style={{textAlign: "center",marginTop: "40px"}}> Do a quiz: </h3>
      </Grid>
      <Grid container spacing={4} justify="center">
          <Grid item>
          <FormControl>
            <InputLabel id="choose course">Course</InputLabel>
            <Select className={classes.select}
                labelId="choose course"
                id="choose course"
                value={course}
                onChange={e => setCourse(e.target.value as string)}
                >
                <MenuItem value={"Python"}>Python</MenuItem>
                <MenuItem value={"Arabic"}>Arabic</MenuItem>
            </Select>
        </FormControl>
          </Grid>
          <Grid item>
            <FormControl>
            <InputLabel id="choose difficulty">Difficulty</InputLabel>
            <Select className={classes.select}
                labelId="choose difficulty"
                id="choose difficulty"
                value={difficulty}
                onChange={e => setDifficulty(e.target.value as string)}
                >
                <MenuItem value={"easy"}>easy</MenuItem>
                <MenuItem value={"medium"}>medium</MenuItem>
                <MenuItem value={"hard"}>hard</MenuItem>
            </Select>
            </FormControl>
          </Grid>
          <Grid item>
          <NavLink to="/Quiz">
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
            >
                Start
            </Button>
            </NavLink>
          </Grid>
      </Grid>
      <h3 style={{marginTop: "120px"}}> Previous Results </h3>
      <Results/>
    </>
  );
};

export default Quiz;
