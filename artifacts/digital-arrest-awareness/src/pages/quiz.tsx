import { useState } from "react";
import { CheckSquare, ArrowRight, ShieldCheck, RefreshCw, Trophy, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { data } from "@/lib/data";
import { motion, AnimatePresence } from "framer-motion";

export default function Quiz() {
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const questions = data.quizQuestions;
  const currentQuestion = questions[currentQuestionIdx];
  const isLastQuestion = currentQuestionIdx === questions.length - 1;

  const handleSelectOption = (idx: number) => {
    if (isAnswered) return;
    setSelectedOption(idx);
  };

  const handleSubmit = () => {
    if (selectedOption === null) return;
    
    setIsAnswered(true);
    if (selectedOption === currentQuestion.correctAnswer) {
      setScore(s => s + 1);
    }
  };

  const handleNext = () => {
    if (isLastQuestion) {
      setShowResults(true);
    } else {
      setCurrentQuestionIdx(idx => idx + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestionIdx(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setShowResults(false);
  };

  if (showResults) {
    const percentage = (score / questions.length) * 100;
    const isGood = percentage >= 80;
    
    return (
      <div className="max-w-2xl mx-auto py-8 flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", bounce: 0.5 }}
          className="mb-8"
        >
          {isGood ? (
            <div className="bg-green-100 text-green-600 p-8 rounded-full">
              <Trophy className="h-24 w-24" />
            </div>
          ) : (
            <div className="bg-secondary/20 text-secondary p-8 rounded-full">
              <AlertTriangle className="h-24 w-24" />
            </div>
          )}
        </motion.div>
        
        <h1 className="text-4xl font-black text-primary mb-2">Quiz Complete!</h1>
        <p className="text-2xl font-bold mb-6">
          Aapka Score: <span className={isGood ? "text-green-600" : "text-secondary"}>{score}/{questions.length}</span>
        </p>
        
        <p className="text-lg text-muted-foreground mb-8 max-w-lg font-medium">
          {isGood 
            ? "Bahut badiya! Aap scams pehchanne mein mahir hain. Is knowledge ko apne doston aur parivar ke saath share karein."
            : "Aapko aur savdhan rehne ki zarurat hai. Please 'Red Flags' aur 'Kya Karein' sections ko dhyan se padhein taaki aap safe rahein."
          }
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <Button size="lg" onClick={resetQuiz} variant="outline" className="font-bold border-2">
            <RefreshCw className="mr-2 h-5 w-5" /> Retake Quiz
          </Button>
          <Button size="lg" className="font-bold">
            <ShieldCheck className="mr-2 h-5 w-5" /> Back to Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto flex flex-col gap-6 pb-16">
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-2xl font-black text-primary flex items-center gap-2">
          <CheckSquare className="h-6 w-6 text-secondary" />
          Awareness Quiz
        </h1>
        <span className="font-bold text-muted-foreground">
          Question {currentQuestionIdx + 1} of {questions.length}
        </span>
      </div>
      
      <Progress value={((currentQuestionIdx + 1) / questions.length) * 100} className="h-2 mb-4" />

      <Card className="border-2 shadow-md">
        <CardContent className="p-6 md:p-8">
          <h2 className="text-xl md:text-2xl font-bold mb-8 text-foreground leading-snug">
            {currentQuestion.question}
          </h2>
          
          <div className="space-y-3">
            {currentQuestion.options.map((option, idx) => {
              let btnClass = "border-border hover:bg-muted justify-start text-left h-auto py-4 px-6 white-space-normal";
              
              if (isAnswered) {
                if (idx === currentQuestion.correctAnswer) {
                  btnClass = "bg-green-100 border-green-500 text-green-800 hover:bg-green-100 justify-start text-left h-auto py-4 px-6 white-space-normal";
                } else if (idx === selectedOption) {
                  btnClass = "bg-red-100 border-red-500 text-red-800 hover:bg-red-100 justify-start text-left h-auto py-4 px-6 white-space-normal";
                } else {
                  btnClass = "border-border opacity-50 justify-start text-left h-auto py-4 px-6 white-space-normal";
                }
              } else if (selectedOption === idx) {
                btnClass = "border-primary bg-primary/5 text-primary justify-start text-left h-auto py-4 px-6 white-space-normal ring-2 ring-primary/20";
              }

              return (
                <Button
                  key={idx}
                  variant="outline"
                  className={`w-full font-medium text-base transition-all ${btnClass}`}
                  onClick={() => handleSelectOption(idx)}
                  disabled={isAnswered}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-6 h-6 rounded-full border-2 border-current flex items-center justify-center shrink-0 mt-0.5">
                      <span className="text-xs font-bold">{String.fromCharCode(65 + idx)}</span>
                    </div>
                    <span>{option}</span>
                  </div>
                </Button>
              );
            })}
          </div>

          <AnimatePresence>
            {isAnswered && (
              <motion.div
                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                animate={{ opacity: 1, height: 'auto', marginTop: 24 }}
                exit={{ opacity: 0, height: 0, marginTop: 0 }}
                className="overflow-hidden"
              >
                <div className={`p-4 rounded-lg border ${selectedOption === currentQuestion.correctAnswer ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                  <p className="font-bold mb-1 flex items-center gap-2">
                    {selectedOption === currentQuestion.correctAnswer ? (
                      <span className="text-green-600 flex items-center gap-1"><ShieldCheck className="h-5 w-5"/> Correct!</span>
                    ) : (
                      <span className="text-red-600 flex items-center gap-1"><AlertTriangle className="h-5 w-5"/> Incorrect</span>
                    )}
                  </p>
                  <p className="text-sm font-medium text-foreground/80">{currentQuestion.explanation}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>

      <div className="flex justify-end mt-4">
        {!isAnswered ? (
          <Button 
            size="lg" 
            className="font-bold px-8" 
            onClick={handleSubmit}
            disabled={selectedOption === null}
          >
            Check Answer
          </Button>
        ) : (
          <Button 
            size="lg" 
            className="font-bold px-8" 
            onClick={handleNext}
          >
            {isLastQuestion ? "See Results" : "Next Question"} <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        )}
      </div>
    </div>
  );
}
