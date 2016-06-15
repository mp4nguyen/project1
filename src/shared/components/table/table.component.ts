import {Component,Input,Output,EventEmitter} from 'angular2/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from 'angular2/common';

@Component({
selector: 'my-table',
inputs: ['columns','data'],
template: 
`
<!-- BEGIN SAMPLE TABLE PORTLET-->
<div class="portlet" >
    <div class="portlet-body">
        <div class="table-scrollable">
            <table class="table table-striped table-bordered table-hover order-column" >
                <thead>
	                <tr>
	                    <th *ngFor="#column of columns" >{{column.title}}</th>
	                </tr>
                </thead>
                <tbody>
                    <tr *ngFor="#d of data" (click)="fireRowClickedEvent(d)">
                        <td *ngFor="#column of columns" >{{d[column.fieldName]}}</td>
                    </tr>   
                </tbody>
            </table>
        </div>
    </div>
</div>
` 
})


export class MyTableComponent {
  @Input() columns: any[];
  @Input() data: any[];
  @Output() rowClickedEvent: EventEmitter = new EventEmitter();

  fireRowClickedEvent(row){
  	this.rowClickedEvent.next(row);
  }
}