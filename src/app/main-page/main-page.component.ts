import { Component, OnInit } from '@angular/core';
import { GameService } from '../game.service';
import { SessionCriteriaModel } from '../models/session-criteria.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  protected sessionCriteria: SessionCriteriaModel;

  public operationCheckboxes = {
    addition: {checked: true, number: 10, max: 10, min: 5},
    subtraction: {checked: false, number: 10, max: 10, min: 5},
    multiplication:  {checked: false, number: 10, max: 10, min: 5},
    division:  {checked: false, number: 10, max: 20}
  }


  constructor(
    protected gameService: GameService,
    protected router: Router
  ) { }

  ngOnInit() {
  }

  public onClickedPlay() {
    
    this.sessionCriteria = new SessionCriteriaModel({
      numQuestions: 10,
      questionTypes: []
    });

    for (let op in this.operationCheckboxes) {
      if (this.operationCheckboxes[op].checked) {
        let criteria = {
          op,
          number: this.operationCheckboxes[op].number,
          max: this.operationCheckboxes[op].max,
          min: this.operationCheckboxes[op].min
        }
        this.sessionCriteria.questionTypes.push(criteria)
      };
    }

    // pass game data to service
    this.gameService.setSessionCriteriaData(this.sessionCriteria);

    // route to game component
    this.router.navigateByUrl('/game');
  }

}
