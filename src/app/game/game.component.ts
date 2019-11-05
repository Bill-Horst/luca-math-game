import { Component, OnInit } from '@angular/core';
import { GameService } from '../game.service';
import { QuestionModel } from '../models/question.model';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  // indicates whether game is currently in progress (questions are being asked / answered)
  public gameInProgress: boolean = false;
  // running count of questions answered correctly
  public numberCorrect: number = 0;
  // running count of questions answered incorrectly
  public numberWrong: number = 0;
  // the questions to be asked during the session
  public questions: Array<any>;
  // the question currently being displayed
  public currentQuestion: QuestionModel;
  /**
   * the index of the current question being displayed
   */
  protected currentQuestionIndex: number = 0;

  constructor(protected gameService: GameService) {
    this.questions = this.gameService.getQuestionSet();
  }

  ngOnInit() {
    // this.generateQuestions();
    this.questions = this.gameService.getQuestionSet();
    this.startGame();
  }

  protected startGame() {
    this.gameInProgress = true;
    if (this.questions) {
      this.currentQuestion = this.questions[this.currentQuestionIndex];
    }
  }

  public answerChosen(answer) {
    if (answer.correct) {
      this.numberCorrect++;
      // alert('Correct!');
    } else {
      this.numberWrong++;
      // alert('Nope!');
    }

    this.currentQuestion.answerChosen = answer;
    this.currentQuestion.correctAnswer = this.currentQuestion.answers.find(ans => ans.correct);

    // this.currentdesiredQuestionData.answeredCorrectly = answer.correct;
    if (this.questions[this.currentQuestionIndex + 1] && this.questions[this.currentQuestionIndex + 1] !== undefined) {
      this.currentQuestionIndex++;
      this.currentQuestion = this.questions[this.currentQuestionIndex];
    } else {
      this.gameInProgress = false;
    }

  }

}
