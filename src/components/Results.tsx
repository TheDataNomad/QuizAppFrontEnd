import React, {Component} from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

//import {getResults} from '../API';



function createData(name: string, calories: string, fat: number) {
  return { name, calories, fat};
}

const rows = [
  createData('sample', "meidum", 3),
  createData('sample', "hard", 4),
];

var name = localStorage.userName;

class Results extends Component {
  constructor(props: Readonly<{}>) {
    super(props);
 
    this.state = {
      hits: [],
    };
  }
 
  componentDidMount() {
    fetch(`http://localhost:4567/results/${name}`)
      .then(response => response.json())
      .then(data => this.setState({ hits: data.hits }));
  }

  render() {
  return (
    <TableContainer component={Paper}>
      <Table style={{minWidth: 650}} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Course</TableCell>
            <TableCell align="right">Difficulty</TableCell>
            <TableCell align="right">Results</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
}
export default Results;