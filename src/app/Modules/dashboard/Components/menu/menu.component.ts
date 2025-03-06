import { Component, EventEmitter, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectAuthUserName } from '../../../../store/auth/auth.selectors';


@Component({
  selector: 'app-menu',
  standalone: false,
  
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
 
})
export class MenuComponent {
  @Output() menuToogle = new EventEmitter();

  authUserName$: Observable<string | undefined>;

  constructor(private store: Store) {
    
    this.authUserName$ = this.store.select(selectAuthUserName);
    
    }
}
