import { Injectable, inject } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { getAuth, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { User } from '../models/user.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { getFirestore, setDoc, doc} from '@angular/fire/firestore';



@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  auth = inject(AngularFireAuth);
  firestore = inject(AngularFirestore)

  //acceder//
  signIn(user: User) {
    return signInWithEmailAndPassword(getAuth(), user.email, user.password)
  }

  //actualizar usuarios//
  updateUser(displayName: string) {
    return updateProfile(getAuth().currentUser, { displayName } )
    }

  setDocument(path: string, data: any) {
    return setDoc(doc(getFirestore(), path), data);

  }
  
}
