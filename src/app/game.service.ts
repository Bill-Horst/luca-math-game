import { Injectable, EventEmitter } from '@angular/core';
import { QuestionModel } from './models/question.model';
import { SessionCriteriaModel } from './models/session-criteria.model';
import { QuestionGenerationService } from './question-generation.service';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  /**
   * the array of questions to be displayed
   */
  protected questionArray: Array<QuestionModel>;

  /**
   * the criteria for generation of questions
   */
  protected sessionCriteriaData: SessionCriteriaModel;

  constructor(protected questionGenerationService: QuestionGenerationService) {
    this.questionArray = [new QuestionModel({ question: '', answers: [] })];
  }

  /**
   * 
   * @param data the criteria to be set
   * 
   * sets criteria to passed criteria
   */
  public setSessionCriteriaData(data: SessionCriteriaModel) {
    this.sessionCriteriaData = data;
    this.setQuestionSet(this.sessionCriteriaData);
  }

  /**
   * returns the question array to be displayed in game
   */
  public getQuestionSet() {
    return this.questionArray;
  }

  /**
   * 
   * @param criteria the criteria to be passed in to generate the questions
   * 
   * sets the question set based on passed criteria
   */
  protected setQuestionSet(criteria: SessionCriteriaModel) {
    this.questionArray = this.generateQuestionData(criteria);
  }

  /**
   * 
   * @param data the criteria to be used to generate the questions
   * 
   * generates the questions based on the question criteria
   */
  protected generateQuestionData(data: SessionCriteriaModel): Array<QuestionModel> {
    let questions = new Array<QuestionModel>();
    
    data.questionTypes.forEach(op => {
      if (op.op === 'addition') {
        for (let numQ = 0; numQ < op.number; numQ++) {
          questions.push(this.questionGenerationService.generateAdditionQuestion(op.min, op.max));
        }
      }

      if (op.op === 'subtraction') {
        for (let numQ = 0; numQ < op.number; numQ++) {
          questions.push(this.questionGenerationService.generateSubtractionQuestion(op.min, op.max));
        }
      }

      if (op.op === 'multiplication') {
        for (let numQ = 0; numQ < op.number; numQ++) {
          questions.push(this.questionGenerationService.generateMultiplicationQuestion(op.min, op.max));
        }
      }

      if (op.op === 'division') {
        for (let numQ = 0; numQ < op.number; numQ++) {
          questions.push(this.questionGenerationService.generateDivisionQuestion(op.max));
        }
      }
    });

    return questions;
  }
}
