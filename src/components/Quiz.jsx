import React, { useState, useEffect, useMemo } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import questionsData from "../data/quiz-questions.json";
import "../styles/components/quiz.scss";

export default function Quiz() {
  // etat et restauration de la preference dyslexie
  const [dyslexiaEnabled, setDyslexiaEnabled] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("dyslexia") === "on") {
      document.body.classList.add("dyslexia");
      setDyslexiaEnabled(true);
    }
  }, []);

  // fonction pour basculer OpenDyslexic
  const toggleDyslexia = () => {
    const on = !dyslexiaEnabled;
    setDyslexiaEnabled(on);
    document.body.classList.toggle("dyslexia", on);
    localStorage.setItem("dyslexia", on ? "on" : "off");
  };

  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [finished, setFinished] = useState(false);

  const navigate = useNavigate();

  // initialisation du quiz
  useEffect(() => {
    const shuffled = [...questionsData].sort(() => Math.random() - 0.5);
    setQuestions(shuffled.slice(0, 10));
    setCurrent(0);
    setScore(0);
    setSelected(null);
    setShowAnswer(false);
    setFinished(false);
  }, []);

  // reset de la selection a chaque question
  useEffect(() => {
    setSelected(null);
    setShowAnswer(false);
  }, [current]);

  const handleAnswer = (opt) => {
    if (showAnswer || selected !== null) return;
    setSelected(opt);
    setShowAnswer(true);
    if (opt === questions[current].answer) {
      setScore((s) => s + 1);
    }
    setTimeout(() => {
      if (current + 1 >= questions.length) {
        setFinished(true);
      } else {
        setCurrent((c) => c + 1);
      }
    }, 3000);
  };

  const restart = () => {
    const shuffled = [...questionsData].sort(() => Math.random() - 0.5);
    setQuestions(shuffled.slice(0, 10));
    setCurrent(0);
    setScore(0);
    setSelected(null);
    setShowAnswer(false);
    setFinished(false);
  };

  const options = useMemo(() => {
    if (!questions[current]) return [];
    const { choices } = questions[current];
    return [...choices].sort(() => Math.random() - 0.5);
  }, [questions, current]);

  // Etat : chargement
  if (!questions.length) {
    const pageTitle = "Quiz WorldScope - Chargement";
    const pageDescription = "Le quiz se charge, veuillez patienter...";
    return (
      <>
        <Helmet>
          <title>{pageTitle}</title>
          <meta name="description" content={pageDescription} />
        </Helmet>

        <div className="quiz-page">
          <div className="quiz" style={{ textAlign: "center" }}>
            <div className="spinner" />
            <p style={{ marginTop: 12 }}>Chargement...</p>
          </div>
          <QuizNavButton onClick={() => navigate("/app")} />
        </div>
      </>
    );
  }

  // Etat : termine
  if (finished) {
    const pageTitle = `Quiz termine - Score ${score}/${questions.length}`;
    const pageDescription = `Vous avez obtenu ${score} bonnes reponses sur ${questions.length} questions.`;
    return (
      <>
        <Helmet>
          <title>{pageTitle}</title>
          <meta name="description" content={pageDescription} />
        </Helmet>

        <div className="quiz-page">
          <div className="quiz">
            <h3>Quiz termine !</h3>
            <p>
              Ton score : <strong>{score}</strong> / {questions.length}
            </p>
            <div className="quiz-footer">
              <button className="quiz-button" onClick={restart}>
                Recommencer
              </button>
            </div>
          </div>
          <QuizNavButton onClick={() => navigate("/app")} />
        </div>
      </>
    );
  }

  // Etat : question en cours
  const { question, flag } = questions[current];
  const pageTitle = `Quiz - Question ${current + 1}/${questions.length}`;
  const pageDescription = flag ? `${question} (${flag})` : question;

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
      </Helmet>

      <div className="quiz-page">
        {/* Toggle OpenDyslexic */}
        <div
          className="quiz-dyslexia-toggle"
          style={{ display: "flex", justifyContent: "flex-end", margin: "1rem 0" }}
        >
          <button className="quiz-button" onClick={toggleDyslexia}>
            {dyslexiaEnabled ? "Desactiver OpenDys" : "Activer OpenDys"}
          </button>
        </div>

        <div className="quiz" tabIndex={-1}>
          <h3>
            Question {current + 1} / {questions.length}
          </h3>
          <p>
            {flag ? (
              <>
                {question}
                <img
                  src={`https://flagcdn.com/48x36/${flag.toLowerCase()}.png`}
                  alt={flag}
                  style={{
                    marginLeft: 12,
                    height: "1.5em",
                    verticalAlign: "middle",
                    borderRadius: "0.18em",
                    boxShadow: "0 1px 3px #0002",
                    display: "inline-block",
                  }}
                />
              </>
            ) : (
              question
            )}
          </p>
          <ul>
            {options.map((opt) => {
              let btnClass = "";
              if (showAnswer) {
                if (opt === questions[current].answer) btnClass = "selected good";
                else if (opt === selected) btnClass = "selected wrong";
              } else if (selected === opt) {
                btnClass = "selected";
              }
              return (
                <li key={opt}>
                  <button
                    className={btnClass}
                    disabled={showAnswer}
                    onClick={() => handleAnswer(opt)}
                    aria-pressed={selected === opt}
                    tabIndex={0}
                  >
                    {opt}
                  </button>
                </li>
              );
            })}
          </ul>
          <div className="quiz-footer" style={{ marginTop: 16 }}>
            <span>
              Score : <b>{score}</b> / {questions.length}
            </span>
          </div>
        </div>

        <QuizNavButton onClick={() => navigate("/app")} />
      </div>
    </>
  );
}

// Bouton navigation reutilisable
function QuizNavButton({ onClick }) {
  return (
    <div className="quiz-nav-btn-wrap">
      <button className="quiz-nav-btn" onClick={onClick}>
        🌍 Retourner explorer le monde
      </button>
    </div>
  );
}