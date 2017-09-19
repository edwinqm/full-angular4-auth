import { Component, OnInit, HostBinding } from '@angular/core';
import { AngularFireModule, } from 'angularfire2';

// for auth
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';

import { Router } from '@angular/router';
import { moveIn } from '../router.animations';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [moveIn()],
  // tslint:disable-next-line:use-host-property-decorator
  host: { '[@moveIn]': '' }
})
export class LoginComponent implements OnInit {

  user: Observable<firebase.User>;
  error: any;

  constructor(public afAuth: AngularFireAuth, private router: Router) {
    this.user = afAuth.authState;
    afAuth.authState.subscribe((user: firebase.User) => {
      if (user) {
        this.router.navigateByUrl('/members');
      }
    });
  }

  loginFb() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider())
      .then(
      (success) => {
        this.router.navigate(['/members']);
      })
      .catch(
      (err) => {
        this.error = err;
      });
  }

  loginGoogle() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then(
      (success) => {
        this.router.navigate(['/members']);
      })
      .catch(
      (err) => {
        this.error = err;
      });
  }

  ngOnInit() {
  }

}
