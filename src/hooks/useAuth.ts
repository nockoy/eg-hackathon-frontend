import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
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

export const useAuth = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const signInWithGoogle = useCallback(async () => {
    const provider = new GoogleAuthProvider();
    try {
      const auth = getAuth();
      await signInWithPopup(auth, provider);
      navigate("/");
      return { success: true, message: "" };
    } catch (e) {
      if (e instanceof FirebaseError) {
        console.log(e);
      }
      return { success: false, message: "エラーが発生しました" };
    }
  }, [navigate]);

  const signIn = useCallback(
    async (email: string, password: string) => {
      setLoading(true);
      try {
        await signInWithEmailAndPassword(fireAuth, email, password);
        navigate("/");
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    },
    [navigate]
  );

  const signUp = useCallback(
    async (email: string, password: string) => {
      setLoading(true);

      try {
        await createUserWithEmailAndPassword(fireAuth, email, password);
        navigate("/");
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    },
    [navigate]
  );

  const signOut = useCallback(async () => {
    try {
      const auth = getAuth();
      await signOutFirebase(auth);
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
