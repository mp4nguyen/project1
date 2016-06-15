import {Injectable} from "angular2/core";

@Injectable()
export class DialogService {

    activate: (message?: string, title?: string) => Promise<boolean>;
    
}