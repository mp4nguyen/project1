import {Injectable, provide} from 'angular2/core';
import {Moment} from 'moment/moment';
import * as moment from 'moment';

// do whatever you want for logging here, add methods for log levels etc.
@Injectable()
export class MyLogger {

  constructor (){

  }

  public log(...args: any[]) {
    
    var e = new Error('dummy');
  	var stack = e.stack.replace(/^[^\(]+?[\n$]/gm, '')
      .replace(/^\s+at\s+/gm, '')
      .replace(/^Object.<anonymous>\s*\(/gm, '{anonymous}()@')
      .split('\n');
  	let fullPath = stack[1];
    let subPath = fullPath.substring(fullPath.indexOf('(') + 1 ,fullPath.length - 1);
  	console.log(subPath);
    args.splice(0, 0, subPath);
    args.splice(0, 0, moment().format('YYYY/MM/DD HH:mm:ss.SSS'));
  	//args.push(stack[1]);
    console.log.apply(console, args);
  }

}

export var LOGGING_PROVIDERS:Provider[] = [
      provide(MyLogger, {useClass: MyLogger}),
    ];