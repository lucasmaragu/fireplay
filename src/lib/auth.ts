import { auth } from './firebase';
import { signInWithEmailAndPassword, 
    signOut, 
    onAuthStateChanged,
    User,
    createUserWithEmailAndPassword
} from 'firebase/auth';

export const login = (email: string, password: string) => 
    signInWithEmailAndPassword(auth, email, password);

export const logout = () => signOut(auth);

export const registerWithEmail = async (email: string, password: string) => {
    return await createUserWithEmailAndPassword(auth, email, password);
  };



export const onUserChange = (callback: (user: User | null) => void) => 
    onAuthStateChanged(auth, callback);