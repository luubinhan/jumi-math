
import React, { useState, useEffect } from 'react';
import { Question, GameType } from '../types';
import { getEncouragement } from '../services/geminiService';
import sadDog from '../assets/sad-dog.png';
import funDog from '../assets/fun-dog.png';

const generateMathQuestions = (): Question[] => {
  const qs: Question[] = [];
  for (let i = 0; i < 10; i++) {
    const isAddition = Math.random() > 0.4;
    let a, b, result;

    if (i < 3) {
      if (isAddition) {
        a = Math.floor(Math.random() * 6);
        b = Math.floor(Math.random() * 6);
        result = a + b;
      } else {
        a = Math.floor(Math.random() * 10);
        b = Math.floor(Math.random() * (a + 1));
        result = a - b;
      }
    } else if (i < 7) {
      if (isAddition) {
        a = Math.floor(Math.random() * 10) + 1;
        b = Math.floor(Math.random() * 10);
        result = a + b;
      } else {
        a = Math.floor(Math.random() * 15) + 5;
        b = Math.floor(Math.random() * (a - 1)) + 1;
        result = a - b;
      }
    } else {
      if (isAddition) {
        a = Math.floor(Math.random() * 11) + 5;
        b = Math.floor(Math.random() * (21 - a));
        result = a + b;
      } else {
        a = Math.floor(Math.random() * 6) + 15;
        b = Math.floor(Math.random() * 10) + 5;
        result = a - b;
      }
    }

    const problem = isAddition ? `${a} + ${b} = ?` : `${a} - ${b} = ?`;
    const solvedProblem = isAddition ? `${a} + ${b} = ${result}` : `${a} - ${b} = ${result}`;
    
    const optionsSet = new Set<number>([result]);
    while (optionsSet.size < 4) {
      const wrong = Math.max(0, result + (Math.floor(Math.random() * 7) - 3));
      optionsSet.add(wrong);
    }

    qs.push({
      id: i,
      problem,
      solvedProblem,
      answer: result,
      options: Array.from(optionsSet).sort((x, y) => x - y),
      type: GameType.MATH
    } as any);
  }
  return qs;
};

interface MathGameProps {
  onFinish: (score: number) => void;
}

const MathGame: React.FC<MathGameProps> = ({ onFinish }) => {
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    setQuestions(generateMathQuestions());
  }, []);

  const handleAnswer = (answer: number) => {
    if (showResult) return;
    setSelectedAnswer(answer);
    const correct = answer === questions[currentIndex].answer;
    if (correct) {
      setScore(prev => prev + 1);
    }
    setFeedback(getEncouragement(correct));
    setShowResult(true);
  };

  const handleNext = () => {
    setShowResult(false);
    setSelectedAnswer(null);
    setFeedback("");
    if (currentIndex < 9) {
      setCurrentIndex(prev => prev + 1);
    } else {
      onFinish(score);
    }
  };

  const currentQuestion = questions[currentIndex];

  if (questions.length === 0 || !currentQuestion) {
    return (
      <div className="flex flex-col items-center justify-center p-10 space-y-4 text-center">
        <div className="animate-spin text-5xl">🌟</div>
        <p className="font-kids text-xl text-slate-500">Đang chuẩn bị...</p>
      </div>
    );
  }

  const isCorrect = selectedAnswer === currentQuestion.answer;

  return (
    <div className="flex flex-col items-center">
      <div className="w-full h-4 bg-slate-100 rounded-full mb-8 overflow-hidden border-2 border-slate-200">
        <div 
          className="h-full bg-green-400 transition-all duration-500"
          style={{ width: `${((currentIndex + 1) / 10) * 100}%` }}
        ></div>
      </div>

      <div className="text-center mb-4 h-40 flex flex-col justify-center">
        <p className="text-slate-400 font-bold uppercase tracking-wider mb-2">Câu {currentIndex + 1}/10</p>
        
        {/* {showResult && (
          <p className={`font-kids text-2xl mb-2 animate-bounce ${isCorrect ? 'text-green-500' : 'text-red-500'}`}>
            {feedback}
          </p>
        )} */}
        {showResult && !isCorrect && (
          <div className="w-16 h-16 mx-auto mb-3 animate-bounce rounded-full">
            <img className="rounded-full" src={sadDog} alt="" />
          </div>
        )}
        {showResult && isCorrect && (
          <div className="w-16 h-16 mx-auto mb-3 animate-bounce rounded-full">
            <img className="rounded-full" src={funDog} alt="" />
          </div>
        )}
        
        <h2 className={`font-kids transition-all duration-300 ${showResult ? 'text-6xl md:text-8xl text-blue-600' : 'text-5xl md:text-7xl text-slate-800'}`}>
          {showResult ? currentQuestion.solvedProblem : currentQuestion.problem}
        </h2>
      </div>

      <div className="grid grid-cols-2 gap-4 w-full mb-8">
        {currentQuestion.options.map((option: number, idx: number) => {
          const isCorrectOption = option === currentQuestion.answer;
          const isSelected = option === selectedAnswer;
          
          let btnClass = "bg-slate-100 text-slate-700 border-slate-300";
          if (showResult) {
            if (isCorrectOption) btnClass = "bg-green-500 text-white border-green-700 scale-105 z-10";
            else if (isSelected) btnClass = "bg-red-400 text-white border-red-600 opacity-70";
            else btnClass = "bg-slate-50 text-slate-300 border-slate-200 opacity-30";
          } else {
            const colors = ['bg-blue-400 border-blue-600', 'bg-orange-400 border-orange-600', 'bg-pink-400 border-pink-600', 'bg-purple-400 border-purple-600'];
            btnClass = `${colors[idx % colors.length]} text-white`;
          }

          return (
            <button
              key={idx}
              disabled={showResult}
              onClick={() => handleAnswer(option)}
              className={`
                h-24 md:h-32 text-4xl md:text-5xl font-kids rounded-3xl transition-all border-b-8
                ${!showResult ? 'hover:-translate-y-1 active:scale-95' : ''}
                ${btnClass}
              `}
            >
              {option}
            </button>
          );
        })}
      </div>

      <div className={`h-24 flex items-center justify-center transition-all duration-300 ${showResult ? 'opacity-100 scale-100' : 'opacity-0 scale-50 pointer-events-none'}`}>
        <button
          onClick={handleNext}
          className="w-24 h-24 bg-yellow-400 hover:bg-yellow-300 text-white rounded-full flex items-center justify-center text-5xl shadow-xl border-b-8 border-yellow-600 active:scale-95 transition-all"
        >
          ➔
        </button>
      </div>
    </div>
  );
};

export default MathGame;
