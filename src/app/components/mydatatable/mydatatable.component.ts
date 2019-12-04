import { Component, OnInit } from '@angular/core';
import { ObjectDataTableAdapter } from '@alfresco/adf-core';
import { DataCellEvent, DataRowActionEvent } from '@alfresco/adf-core';
@Component({
  selector: 'apa-mydatatable',
  templateUrl: './mydatatable.component.html',
  styleUrls: ['./mydatatable.component.scss']
})
export class MydatatableComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  data = new ObjectDataTableAdapter(
    [
      {
        id: 1,
        firstName: 'Name #1',
        lastName: 'Lastname #1',
        status: 'green', 
        icon: 'material-icons://folder_open'
      },
      {
        id: 2,
        firstName: 'Name #2',
        lastName: 'Lastname #2',
        status: 'red', 
        icon: 'material-icons://accessibility'
      },
      {
        id: 3,
        firstName: 'Name #3',
        lastName: 'Lastname #3',
        status: 'green', 
        icon: 'material-icons://alarm'
      }
    ]
  );

  onRowClick(event) {
    // console.log(event.value.id);
  }

  onShowRowActionsMenu(event: DataCellEvent) {
    let myAction = {
      title: '删除'
      // your custom metadata needed for onExecuteRowAction
    };
    event.value.actions = [
      myAction
    ];
  }

  onExecuteRowAction(event: DataRowActionEvent) {
    let args = event.value;
    console.log(args.row);
    console.log(args.action);
    window.alert(`My custom action: ${args.action.title}`);
  }
  
  showSettings(){

  }

  delete(){
    
  }
}

