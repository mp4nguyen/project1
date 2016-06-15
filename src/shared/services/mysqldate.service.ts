import {Injectable} from 'angular2/core';

// do whatever you want for logging here, add methods for log levels etc.
@Injectable()

export class MysqlDate {

    constructor (){

    }

    public mysqlDate(dateSTR: string) {
        if(dateSTR){
            var t = dateSTR.split(/[- : T .]/);               
            // Apply each element to the Date function
            var d = new Date(t[0], t[1]-1, t[2], t[3], t[4], t[5]);
            //var myDate = new Date(dateSTR);
            //console.log(">>>apt date from send email = ",dateSTR,"   ",t,"   ",d);
            //console.log(myDate.getMonth()," ",myDate.getDay()," ",myDate.getYear());
            return d; // No TZ subtraction on this sample
        }
        return "";    
    }

}

