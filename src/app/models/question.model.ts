export class QuestionModel {
    question: string;
    answers: Array<any>;
    correctAnswer?: number;
    answerChosen?: number;

    constructor(question: QuestionModel) {
        this.question = question.question;
        this.answers = question.answers;
    }
}