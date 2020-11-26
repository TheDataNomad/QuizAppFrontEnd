import { shuffleArray } from './utils';

export type Question = {
  category: string;
  correct: string;
  difficulty: string;
  incorrect: string[];
  question: string;
};



export type QuestionsState = Question & { answers: string[] };

export const fetchQuizQuestions = async (amount: number, course: string, difficulty: string): Promise<QuestionsState[]> => {
  const number = amount + 1 
  const endpoint = `http://localhost:4567/questions/${course}/${difficulty}/${number}`
  const data = await (await fetch(endpoint)).json();
  return data.map((question: Question) => ({
    ...question,
    answers: shuffleArray([...question.incorrect, question.correct])
  }))
};


export const fetchLogin = async (username: string, pass: string) => {
  const endpoint = `http://localhost:4567/login/${username}/${pass}`
  const data = await (await fetch(endpoint)).json();
  return data
}

export const fetchRegister = async (username: string, pass: string) => {
  const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user: username, password: pass}),
  };  
  const response = await fetch('http://localhost:4567/register', requestOptions);
  const data = await response.json();
  return data
}

export const fetchResults = async (course: string, diff: string, result: string, user: string) => {
  const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ courseName: course, dificulty: diff , score: result}),
  };  
  const response = await fetch(`http://localhost:4567/results/${user}`, requestOptions);
  const data = await response.json();
  console.log(data)
  return data
}

export const getResults = async (user: string) => {
  const endpoint = `http://localhost:4567/results/${user}`
  const data = await (await fetch(endpoint)).json();
  return data
}