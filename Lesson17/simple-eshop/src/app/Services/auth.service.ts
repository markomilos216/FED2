import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthResponse } from '../Models/AuthResponse';
import { FormGroup } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { BehaviorSubject, catchError, tap, throwError, filter } from 'rxjs';
import { User } from '../Models/User';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';
import { SnackBarService } from './snack-bar.service';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user = new BehaviorSubject<User | null>(null);
  allUsers = new BehaviorSubject<User[]>([])
  authUser!: any
  
  constructor(private http: HttpClient, 
              private firestore: AngularFirestore, 
              private router: Router,
              private snackBarService: SnackBarService) {} 

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
      const newUser = {
        name: registerForm.value.name,
        surname: registerForm.value.surname,
        email: registerForm.value.email,
        phone: registerForm.value.phone,
        role: 'admin'
      }
      this.sendEmailVerification(res.idToken)
      this.saveUserToFirestore(res.localId, newUser)
    }))
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
      firebase.auth().signInWithEmailAndPassword(res.email, loginForm.value.password)
      this.authUser = firebase.auth().currentUser;  
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
        const userData = doc.data() as {name: string, surname: string, phone: string, role: string, addresses: [], paymentCards: []};
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
          expiresInDateTimeValue,
          userData?.addresses,
          userData?.paymentCards
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

  changePassword(newPassword: string, currentPassword: string) {
    const credentials = firebase.auth.EmailAuthProvider.credential(this.authUser.email, currentPassword);

    this.authUser.reauthenticateWithCredential(credentials).then(() => {
      this.authUser.updatePassword(newPassword).then(() => {
        this.snackBarService.showSnackBar('Password changed successfuly', 'success')
      }).catch(() => {
        this.snackBarService.showSnackBar('Password not changed', 'error')
      });
    }).catch(() => {
      this.snackBarService.showSnackBar('Current password is not correct', 'error')
    });
  }
 
  changeUserInfoWihoutEmail(name: string | undefined, surname: string | undefined, email: string | undefined, phone: number | undefined, role: string | undefined, userId: string | undefined){
    this.firestore.collection('users').doc(userId).set({
      name: name,
      surname: surname,
      email: email,
      phone: phone,
      role: role
    })
    this.snackBarService.showSnackBar('Your data has been successfully updated.', 'success')

    const res = {
      localId: userId,
      email: email,
      idToken: localStorage.getItem('token'),
      expiresIn: '3600'
    }
    this.loadUserFromFirestore(res)
  }

  changeUserInfoWithEmail(name: string | undefined, surname: string | undefined, email: string | undefined, phone: number | undefined, role: string | undefined, userId: string | undefined, confirmPassword: string){
    const credential = firebase.auth.EmailAuthProvider.credential(this.authUser.email, confirmPassword)

    this.authUser.reauthenticateWithCredential(credential).then(() => {
      this.authUser.updateEmail(email).then(() => {
        this.changeUserInfoWihoutEmail(name, surname, email, phone, role, userId)
      }).catch(() => {
        this.snackBarService.showSnackBar('Something went wrong, please try again later', 'error')
      })
    })
    .catch((error: any) => {
      if (error.code === 'auth/wrong-password') {
        this.snackBarService.showSnackBar('Incorrect password', 'error');
      } else {
        this.snackBarService.showSnackBar('Reauthentication failed. Try again.', 'error');
      }
    })
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

  addAddress(addressForm: FormGroup){
    const currentUser = this.user.value
    const newAddress = {
      id: Date.now(),
      name: addressForm.value.name,
      surname: addressForm.value.surname,
      email: addressForm.value.email,
      phone: addressForm.value.phone,
      city: addressForm.value.city,
      street: addressForm.value.street,
      postalCode: addressForm.value.postalCode,
      state: addressForm.value.state
    }

    this.firestore.collection('users').doc(currentUser!.id).update({
      addresses: firebase.firestore.FieldValue.arrayUnion(newAddress)
    }).then(() => {
      this.snackBarService.showSnackBar('Address added successfully', 'success')
      this.loadUserFromFirestore({ localId: currentUser!.id, idToken: localStorage.getItem('token')})
      this.router.navigate(['/my-account/delivery-address'])
    }).catch(() => {
      this.snackBarService.showSnackBar('Failed to add address', 'error')
    })
  }

  deleteAddress(addressId: number){
    const currentUser = this.user.value

    this.firestore.collection('users').doc(currentUser?.id).get().subscribe(doc => {
      if(doc.exists){
        const userData = doc.data() as any
        const updatedAddresses = userData.addresses.filter((address: any) => address.id !== addressId)  

        this.firestore.collection('users').doc(currentUser?.id).update({
          addresses: updatedAddresses
        }).then(() => {
          this.snackBarService.showSnackBar('Address deleted successfully', 'success');
          this.loadUserFromFirestore({ localId: currentUser?.id, idToken: localStorage.getItem('token') });
        }).catch(() => {
          this.snackBarService.showSnackBar('Failed to delete address', 'error');
        })
      }
    })
  }

  updateAddress(addressId: number, updatedAddress: any) {
    const currentUser = this.user.value;
    const updatedAddresses = (currentUser?.addresses ?? []).map((address: any) =>
      address.id === addressId ? { ...address, ...updatedAddress } : address
    );

    this.firestore.collection('users').doc(currentUser!.id).update({
      addresses: updatedAddresses
    }).then(() => {
      this.snackBarService.showSnackBar('Address updated successfully', 'success');
      this.loadUserFromFirestore({ localId: currentUser!.id, idToken: localStorage.getItem('token') });
      this.router.navigate(['/my-account/delivery-address']);
    }).catch(() => {
      this.snackBarService.showSnackBar('Failed to update address', 'error');
    });
  }

  addCard(cardForm: FormGroup){
    const currentUser = this.user.value
    const newCard = {
      id: Date.now(),
      name: cardForm.value.name,
      surname: cardForm.value.surname,
      cardNumber: cardForm.value.cardNumber,
      expirationDate: cardForm.value.expirationDate,
      ccv: cardForm.value.ccv,
    }

    this.firestore.collection('users').doc(currentUser!.id).update({
      paymentCards: firebase.firestore.FieldValue.arrayUnion(newCard)
    }).then(() => {
      this.snackBarService.showSnackBar('Card added successfully', 'success')
      this.loadUserFromFirestore({ localId: currentUser!.id, idToken: localStorage.getItem('token')})
      this.router.navigate(['/my-account/payment-cards'])
    }).catch(() => {
      this.snackBarService.showSnackBar('Failed to add card', 'error')
    })
  }

  deleteCard(cardId: number){
    const currentUser = this.user.value

    this.firestore.collection('users').doc(currentUser?.id).get().subscribe(doc => {
      if(doc.exists){
        const userData = doc.data() as any
        const updatedCards = userData.paymentCards.filter((card: any) => card.id !== cardId)  

        this.firestore.collection('users').doc(currentUser?.id).update({
          paymentCards: updatedCards
        }).then(() => {
          this.snackBarService.showSnackBar('Card deleted successfully', 'success');
          this.loadUserFromFirestore({ localId: currentUser?.id, idToken: localStorage.getItem('token') });
        }).catch(() => {
          this.snackBarService.showSnackBar('Failed to delete card', 'error');
        })
      }
    })
  }

  updateCard(cardId: number, updatedCard: any) {
    const currentUser = this.user.value;
    const updatedCards = (currentUser?.paymentCards ?? []).map((card: any) =>
      card.id === cardId ? { ...card, ...updatedCard } : card
    );

    this.firestore.collection('users').doc(currentUser!.id).update({
      paymentCards: updatedCards
    }).then(() => {
      this.snackBarService.showSnackBar('Card updated successfully', 'success');
      this.loadUserFromFirestore({ localId: currentUser!.id, idToken: localStorage.getItem('token') });
      this.router.navigate(['/my-account/payment-cards']);
    }).catch(() => {
      this.snackBarService.showSnackBar('Failed to update card', 'error');
    });
  }

}

