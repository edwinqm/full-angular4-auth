import { Component, OnInit } from '@angular/core';
import { AngularFireModule, } from 'angularfire2';

// for auth
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';

import { Router } from '@angular/router';
import { moveIn, fallIn, moveInLeft } from '../router.animations';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css'],
  animations: [moveIn(), fallIn(), moveInLeft()],
  // tslint:disable-next-line:use-host-property-decorator
  host: { '[@moveIn]': '' }
})
export class MembersComponent implements OnInit {

  user: Observable<firebase.User>;
  name: any;
  state: string;

  constructor(public afAuth: AngularFireAuth, private router: Router) {
    this.user = afAuth.authState;
    afAuth.authState.subscribe((user: firebase.User) => {
      if (user) {
        this.name = user;
      }
    });
  }

  logout() {
    this.afAuth.auth.signOut();
    console.log('logged out');
    this.router.navigateByUrl('/login');
  }

  ngOnInit() {
  }

}
