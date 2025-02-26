import { useCallback, useContext, useState } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut as signOutFirebase,
} from "firebase/auth";
import { FirebaseError } from "firebase/app";
import fireAuth from "../firebase";
import { UserContext } from "../contexts/UserContext";

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const { setUser } = useContext(UserContext);

  const signInWithGoogle = useCallback(async () => {
    const provider = new GoogleAuthProvider();
    try {
      const auth = getAuth();
      await signInWithPopup(auth, provider);
      return { success: true, message: "" };
    } catch (e) {
      if (e instanceof FirebaseError) {
        console.log(e);
      }
      return { success: false, message: "エラーが発生しました" };
    }
  }, []);

  const signIn = useCallback(
    async (email: string, password: string) => {
      setLoading(true);
      try {
        await signInWithEmailAndPassword(fireAuth, email, password);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    },
    []
  );

  const signUp = useCallback(
    async (email: string, password: string) => {
      setLoading(true);

      try {
        await createUserWithEmailAndPassword(fireAuth, email, password);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    },
    []
  );

  const signOut = useCallback(async () => {
    try {
      const auth = getAuth();
      await signOutFirebase(auth);
      setUser({ userId: "", nickname: "" });
      return { success: true, message: "" };
    } catch (e) {
      if (e instanceof FirebaseError) {
        console.log(e);
      }
      return { success: false, message: "エラーが発生しました" };
    }
  }, []);

  return { signInWithGoogle, signIn, signUp, signOut, loading };
};
