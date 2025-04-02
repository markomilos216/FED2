import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthResponse } from '../Models/AuthResponse';
import { FormGroup } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { BehaviorSubject, catchError, tap, throwError } from 'rxjs';
import { User } from '../Models/User';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user = new BehaviorSubject<User | null>(null);
  allUsers = new BehaviorSubject<User[]>([])
  constructor(private http: HttpClient, private firestore: AngularFirestore, private router: Router) { }

  getUser(){
    return this.user
  }

  getAllUsers(){
    return this.allUsers.asObservable()
  }

  loadAllUsers(){
    this.firestore.collection('users').valueChanges({idField: 'id'}).subscribe(users => {
      this.allUsers.next(users as User[])
    })
  }

  signUp(registerForm: FormGroup){
    const authData = {
      email: registerForm.value.email,
      password: registerForm.value.password,
      returnSecureToken: true
    };
    return this.http.post<AuthResponse>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBtaaBxQms6F3BwkWrBXmUr_lkzPwFuT8w', 
      authData
    ).pipe(catchError(this.handleError), tap((res) => {
      this.sendEmailVerification(res.idToken)
      
      const newUser = {
        name: registerForm.value.name,
        surname: registerForm.value.surname,
        email: registerForm.value.email,
        phone: registerForm.value.phone,
        password: registerForm.value.password,
        role: 'user'
    }
      this.saveUserToFirestore(res.localId, newUser)
    }))
  }

  sendEmailVerification(idToken: string){
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyBtaaBxQms6F3BwkWrBXmUr_lkzPwFuT8w`;
    const body = {
      requestType: "VERIFY_EMAIL",
      idToken: idToken
    };
  
    this.http.post(url, body).subscribe({
      next: () => console.log("Verification email sent"),
      error: (err) => console.error("Failed to send verification email", err)
    });
  }

  logIn(loginForm: FormGroup){
    const data = {
      email: loginForm.value.email,
      password: loginForm.value.password,
      returnSecureToken: true
    }
    return this.http.post<AuthResponse>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBtaaBxQms6F3BwkWrBXmUr_lkzPwFuT8w',
      data
    ).pipe(catchError(this.handleError), tap((res) => {
      localStorage.setItem('token', res.idToken)
      this.loadUserFromFirestore(res)
    }))
  }

  logOut(){
    this.user.next(null)
    localStorage.removeItem('token')
    this.router.navigate(['/login'])
  }

  private saveUserToFirestore(userId: string, userData: any) {
    this.firestore.collection('users').doc(userId).set(userData)
  }

  loadUserFromFirestore(res: any){
    this.firestore.collection('users').doc(res.localId).get().subscribe(doc => {
      if(doc.exists){
        const userData = doc.data() as {name: string, surname: string, phone: string, role: string};
        const expiresInTimeStamp = new Date().getTime() + Number(res.expiresIn) * 1000
        const expiresInDateTimeValue = new Date(expiresInTimeStamp)
        const user = new User(
          res.localId,
          userData?.name,
          userData?.surname,
          res.email,
          userData?.phone,
          userData?.role,
          res.idToken,
          expiresInDateTimeValue
        );
        this.user.next(user);

        if(userData.role === 'admin'){
          this.loadAllUsers()
        }
      }
    })
  }

  private handleError(err: any){
    let errorMessage = 'An unknown error has occured';
        
    if(!err.error || !err.error.error){
      return throwError(() => errorMessage)
    }
    switch(err.error.error.message){
      case 'EMAIL_EXISTS': 
          errorMessage = 'User with this email already exists';
        break;
        case 'OPERATION_NOT_ALLOWED':
          errorMessage = 'This operation is not allowed'
          break;
        case 'INVALID_LOGIN_CREDENTIALS':
          errorMessage = 'Email or password is incorrect.'
          break;
    }
    return throwError(() => errorMessage)
  }

  changeUserRole(user: User, inputValue: string){
    this.firestore.collection('users').doc(user.id).update({role: inputValue})
  }
}
