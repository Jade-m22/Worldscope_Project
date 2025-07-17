import React, { useState, useEffect } from 'react';

export default function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [current,   setCurrent]   = useState(0);
  const [score,     setScore]     = useState(0);
  const [loading,   setLoading]   = useState(true);

  useEffect(() => {
    fetch('https://opentdb.com/api.php?amount=15&category=22&encoding=url3986')
      .then(res => {
        if (!res.ok) throw new Error('Erreur réseau');
        return res.json();
      })
      .then(data => {
        const decoded = data.results.map(q => ({
          ...q,
          question:           decodeURIComponent(q.question),
          correct_answer:     decodeURIComponent(q.correct_answer),
          incorrect_answers:  q.incorrect_answers.map(a => decodeURIComponent(a))
        }));
        setQuestions(decoded);
      })
      .catch(err => {
        console.error(err);
        alert('Impossible de charger le quiz');
      })
      .finally(() => setLoading(false));
  }, []);

  const handleAnswer = answer => {
    if (answer === questions[current].correct_answer) {
      setScore(s => s + 1);
    }
    setCurrent(c => c + 1);
  };

  if (loading) return <p>Chargement…</p>;
  if (current >= questions.length) {
    return (
      <div>
        <h2>Quiz terminé!</h2>
        <p>Ton score: <strong>{score}</strong> / {questions.length}</p>
      </div>
    );
  }

  const { question, correct_answer, incorrect_answers } = questions[current];
  const options = [...incorrect_answers, correct_answer].sort(() => Math.random() - 0.5);

  return (
    <div>
      <h3>Question {current+1} / {questions.length}</h3>
      <p dangerouslySetInnerHTML={{ __html: question }} />
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {options.map((opt,i) => (
          <li key={i} style={{ margin: '0.5rem 0' }}>
            <button onClick={() => handleAnswer(opt)}>{opt}</button>
          </li>
        ))}
      </ul>
    </div>
  );
}