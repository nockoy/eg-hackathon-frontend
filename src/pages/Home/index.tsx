import { FirebaseError } from "firebase/app";
import { getAuth, signOut } from "firebase/auth";
import { useCallback } from "react";
import styled from "styled-components";

export const Home = () => {
  const signOutFromFirebase = useCallback(async () => {
    try {
      const auth = getAuth()
      await signOut(auth)
      return { success: true, message: '' }
    } catch (e) {
      if (e instanceof FirebaseError) {
        console.log(e)
      }
      return { success: false, message: 'エラーが発生しました' }
    }
  }, [])

  return (
    <div>
      <Text>Home</Text>
      <button
        onClick={signOutFromFirebase}
      >
        ログアウト
      </button>
    </div>
  );
};

const Text = styled.div`
  font-size: 20px;
  font-weight: bold;
`;
