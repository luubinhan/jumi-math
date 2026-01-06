
import React, { useState, useEffect } from 'react';
import { Question, GameType } from '../types';
import { getEncouragement } from '../services/geminiService';

const generateMathQuestions = (): Question[] => {
  const qs: Question[] = [];
  for (let i = 0; i < 10; i++) {
    const isAddition = Math.random() > 0.4;
    let a, b, result;

    if (i < 3) { // Dễ
      if (isAddition) {
        a = Math.floor(Math.random() * 6);
        b = Math.floor(Math.random() * 6);
        result = a + b;
      } else {
        a = Math.floor(Math.random() * 10);
        b = Math.floor(Math.random() * (a + 1));
        result = a - b;
      }
    } else if (i < 7) { // Trung bình
      if (isAddition) {
        a = Math.floor(Math.random() * 10) + 1;
        b = Math.floor(Math.random() * 10);
        result = a + b;
      } else {
        a = Math.floor(Math.random() * 15) + 5;
        b = Math.floor(Math.random() * (a - 1)) + 1;
        result = a - b;
      }
    } else { // Khó (lên đến 20)
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

    if (result > 20) result = 20;
    if (result < 0) result = 0;

    const problem = isAddition ? `${a} + ${b} = ?` : `${a} - ${b} = ?`;
    
    const optionsSet = new Set<number>([result]);
    while (optionsSet.size < 4) {
      const wrong = Math.max(0, result + (Math.floor(Math.random() * 7) - 3));
      optionsSet.add(wrong);
    }

    qs.push({
      id: i,
      problem,
      answer: result,
      options: Array.from(optionsSet).sort((x, y) => x - y),
      type: GameType.MATH
    });
  }
  return qs;
};

interface MathGameProps {
  onFinish: (score: number) => void;
}

const MathGame: React.FC<MathGameProps> = ({ onFinish }) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<string>('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  useEffect(() => {
    setQuestions(generateMathQuestions());
  }, []);

  const handleAnswer = async (answer: number) => {
    if (showFeedback) return;
    const currentQ = questions[currentIndex];
    if (!currentQ) return;

    const correct = answer === currentQ.answer;
    
    setIsCorrect(correct);
    if (correct) setScore(prev => prev + 1);

    setShowFeedback(true);
    const msg = await getEncouragement(correct, score + (correct ? 1 : 0));
    setFeedback(msg);

    setTimeout(() => {
      setShowFeedback(false);
      if (currentIndex < 9) {
        setCurrentIndex(prev => prev + 1);
      } else {
        onFinish(score + (correct ? 1 : 0));
      }
    }, 2000);
  };

  const currentQuestion = questions[currentIndex];

  if (questions.length === 0 || !currentQuestion) {
    return (
      <div className="flex flex-col items-center justify-center p-10 space-y-4">
        <div className="animate-spin text-5xl">🌟</div>
        <p className="font-kids text-xl text-slate-500">Đang chuẩn bị thử thách...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      <div className="w-full h-4 bg-slate-100 rounded-full mb-8 overflow-hidden border-2 border-slate-200">
        <div 
          className="h-full bg-green-400 transition-all duration-500"
          style={{ width: `${((currentIndex + 1) / 10) * 100}%` }}
        ></div>
      </div>

      <div className="text-center mb-10">
        <p className="text-slate-400 font-bold uppercase tracking-wider mb-2">Câu hỏi {currentIndex + 1} trên 10</p>
        <h2 className="text-5xl md:text-7xl font-kids text-slate-800 animate-bounce-slow">
          {currentQuestion.problem}
        </h2>
      </div>

      <div className="grid grid-cols-2 gap-4 w-full">
        {currentQuestion.options.map((option, idx) => (
          <button
            key={idx}
            disabled={showFeedback}
            onClick={() => handleAnswer(option as number)}
            className={`
              h-24 md:h-32 text-3xl md:text-4xl font-kids rounded-3xl transition-all active:scale-95 border-b-8
              ${showFeedback ? 'opacity-50' : 'hover:-translate-y-1'}
              ${idx === 0 ? 'bg-blue-400 text-white border-blue-600' : ''}
              ${idx === 1 ? 'bg-orange-400 text-white border-orange-600' : ''}
              ${idx === 2 ? 'bg-pink-400 text-white border-pink-600' : ''}
              ${idx === 3 ? 'bg-purple-400 text-white border-purple-600' : ''}
            `}
          >
            {option}
          </button>
        ))}
      </div>

      {showFeedback && (
        <div className="fixed inset-0 flex items-center justify-center bg-white/80 z-50 animate-in fade-in zoom-in duration-300">
          <div className={`
            p-10 rounded-full text-center max-w-xs shadow-2xl border-4
            ${isCorrect ? 'bg-green-100 border-green-500' : 'bg-red-100 border-red-500'}
          `}>
            <p className="text-2xl font-kids text-slate-800">
              {feedback || (isCorrect ? "Tuyệt vời! 🌟" : "Cố lên nào! 🌈")}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MathGame;
