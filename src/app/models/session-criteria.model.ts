export class SessionCriteriaModel {
    numQuestions: number;
    questionTypes: Array<any>;

    constructor(criterialModel: SessionCriteriaModel) {
        this.numQuestions = criterialModel.numQuestions;
        this.questionTypes = criterialModel.questionTypes;
    };
}