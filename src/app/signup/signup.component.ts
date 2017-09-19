import { Component, OnInit } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
//
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';

import { Router } from '@angular/router';
import { moveIn, fallIn } from '../router.animations';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  animations: [moveIn(), fallIn()],
  // tslint:disable-next-line:use-host-property-decorator
  host: { '[@moveIn]': '' }
})
export class SignupComponent implements OnInit {

  state: string;
  error: any;
  email: string;
  password: string;

  constructor(public afAuth: AngularFireAuth, private router: Router) {

  }

  onSubmit(formData) {
    if (formData.valid) {
      console.log(formData.value);
      firebase.auth().createUserWithEmailAndPassword(formData.value.email, formData.value.password)
        .then(
        (success) => {
          console.log(success);
          this.router.navigate(['/login']);
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
