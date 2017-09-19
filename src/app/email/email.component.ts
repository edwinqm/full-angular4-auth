import { Component, OnInit } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
//
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';

import { Router } from '@angular/router';
import { moveIn, fallIn } from '../router.animations';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css'],
  animations: [moveIn(), fallIn()],
  // tslint:disable-next-line:use-host-property-decorator
  host: { '[@moveIn]': '' }
})
export class EmailComponent implements OnInit {

  user: Observable<firebase.User>;
  state: string;
  error: any;
  email: string;
  password: string;

  constructor(public afAuth: AngularFireAuth, private router: Router) {
    this.user = afAuth.authState;
    afAuth.authState.subscribe((user: firebase.User) => {
      if (user) {
        this.router.navigateByUrl('/members');
      }
    });
  }

  onSubmit(FormData) {
    if (FormData.valid) {
      console.log(FormData.value);
      this.afAuth.auth.signInWithEmailAndPassword(FormData.value.email, FormData.value.password)
        .then(
        (success) => {
          console.log(success);
          this.router.navigate(['/members']);
        }).catch(
        (err) => {
          console.log(err);
          this.error = err;
        });
    }
  }

  ngOnInit() {
  }

}
