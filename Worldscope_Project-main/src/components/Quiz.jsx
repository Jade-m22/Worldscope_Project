import React, { useState, useEffect } from "react";

export default function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=10&encoding=url3986")
      .then(res => res.json())
      .then(data => {
        // décoder les URL-encodages
        const decoded = data.results.map(q => ({
          ...q,
          question: decodeURIComponent(q.question),
          correct_answer: decodeURIComponent(q.correct_answer),
          incorrect_answers: q.incorrect_answers.map(a => decodeURIComponent(a))
        }));
        setQuestions(decoded);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const handleAnswer = (answer) => {
    if (answer === questions[current].correct_answer) {
      setScore(score + 1);
    }
    setCurrent(current + 1);
  };

  if (loading) return <p>Chargement du quiz…</p>;
  if (current >= questions.length) {
    return (
      <div>
        <h2>Quiz terminé !</h2>
        <p>
          Votre score : {score} / {questions.length}
        </p>
      </div>
    );
  }

  const q = questions[current];
  const options = [...q.incorrect_answers, q.correct_answer]
    .sort(() => Math.random() - 0.5);

  return (
    <div>
      <h3>Question {current + 1} / {questions.length}</h3>
      <p>{q.question}</p>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {options.map((opt, i) => (
          <li key={i}>
            <button onClick={() => handleAnswer(opt)}>
              {opt}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
