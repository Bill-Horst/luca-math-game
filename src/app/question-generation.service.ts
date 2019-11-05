import { Injectable } from '@angular/core';
import { QuestionModel } from './models/question.model';

@Injectable({
  providedIn: 'root'
})
export class QuestionGenerationService {



  constructor() { }

  public generateAdditionQuestion(min: number = 0, max: number = 10): QuestionModel {

    let currentQuestion;
    let answers = [];

    // generate two numbers
    let number1 = Math.floor(Math.random() * (max - min) + min);
    let number2 = Math.floor(Math.random() * (max - min) + min);

    // generate and assign answer
    let correctAnswer = number1 + number2;

    // assign properties to generated questions
    currentQuestion = `${number1} + ${number2} = ?`;

    // push answer to array
    answers.push({ correct: true, answer: correctAnswer });

    // assign first trick question and push to array
    let trick1 = -1;
    do {
      trick1 = Math.floor(Math.random() * max) + number1;
    } while (trick1 === correctAnswer);
    answers.push({ correct: false, answer: trick1 });

    // assign second trick question and push to array
    let trick2 = -1;
    do {
      trick2 = Math.floor(Math.random() * max) + number2;
    } while (trick2 === trick1 || trick2 === correctAnswer);
    answers.push({ correct: false, answer: trick2 });

    // shuffle answers
    answers = this.shuffle(answers);

    return {
      question: currentQuestion,
      answers
    }
  }

  public generateSubtractionQuestion(min: number = 0, max: number = 10): QuestionModel {
    let currentQuestion;
    let answers = [];
    let number1;
    let number2;

    // generate two numbers
    number1 = Math.floor(Math.random() * (max - min) + min);
    do {
    number2 = Math.floor(Math.random() * (max - min) + min);
    } while (number2 > number1);

    // generate and assign answer
    let correctAnswer = number1 - number2;

    // assign properties to generated questions
    currentQuestion = `${number1} - ${number2} = ?`;

    // push answer to array
    answers.push({ correct: true, answer: correctAnswer });

    // assign first trick question and push to array
    let trick1 = -1;
    do {
      trick1 = Math.floor(Math.random() * max) + number1;
    } while (trick1 === correctAnswer);
    answers.push({ correct: false, answer: trick1 });

    // assign second trick question and push to array
    let trick2 = -1;
    do {
      trick2 = Math.floor(Math.random() * max) + number2;
    } while (trick2 === trick1 || trick2 === correctAnswer);
    answers.push({ correct: false, answer: trick2 });

    // shuffle answers
    answers = this.shuffle(answers);

    return {
      question: currentQuestion,
      answers
    }
  }

  public generateMultiplicationQuestion(min: number = 0, max: number = 10): QuestionModel {
    let currentQuestion;
    let answers = [];

    // generate two numbers
    let number1 = Math.floor(Math.random() * (max - min) + min);
    let number2 = Math.floor(Math.random() * (max - min) + min);

    // generate and assign answer
    let correctAnswer = number1 * number2;

    // assign properties to generated questions
    currentQuestion = `${number1} x ${number2} = ?`;

    // push answer to array
    answers.push({ correct: true, answer: correctAnswer });

    // assign first trick question and push to array
    let trick1 = correctAnswer + number1;
    answers.push({ correct: false, answer: trick1 });

    // assign second trick question and push to array
    let trick2 = correctAnswer + number2;
    answers.push({ correct: false, answer: trick2 });

    // TODO: make this better and work with more than just two trick answers
    if (trick1 === trick2) {answers.pop(); answers.push({correct: false, answer: trick2+1})}

    // shuffle answers
    answers = this.shuffle(answers);

    return {
      question: currentQuestion,
      answers
    }
  }

  public generateDivisionQuestion(max: number = 10): QuestionModel {
    let currentQuestion;
    let answers = [];
    let number1;
    let number2;
    let correctAnswer;

    // generate and assign large number
    number1 = Math.floor(Math.random() * (max - 1) + 1);

    // gather all factors of large number
    let factors = [];
    for (let n = 1; n <= number1; n++) {
      if (number1 % n === 0) {
        factors.push(n);
      }
    }

    // assign second number and correct answer
    number2 = number1 / factors[Math.floor(Math.random() * factors.length)] // try to make it so if there's a factor other than 1 or the number, use that one... we got too many 11/11 and 7/7 and 7/1 and 13/13 etc
    if (factors.length > 2) {
      number2 = number1 / factors[Math.floor(Math.random() * (factors.length - 1))]
    }
    correctAnswer = number1 / number2;

    // assign properties to generated questions
    currentQuestion = `${number1} / ${number2} = ?`;

    // push answer to array of answers
    answers.push({ correct: true, answer: correctAnswer });

    // assign first trick question and push to array
    let trick1 = correctAnswer + number1;
    answers.push({ correct: false, answer: trick1 });

    // assign second trick question and push to array
    let trick2 = correctAnswer + number2;
    answers.push({ correct: false, answer: trick2 });

    // TODO: make this better and work with more than just two trick answers
    if (trick1 === trick2) {answers.pop(); answers.push({correct: false, answer: trick2+1})}

    // shuffle answers
    answers = this.shuffle(answers);

    return {
      question: currentQuestion,
      answers
    }
  }

  protected shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  }


}
