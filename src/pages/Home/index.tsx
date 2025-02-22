
import styled from "styled-components";
import { useAuth } from "../../hooks/useAuth";

export const Home = () => {
  const { signOut } = useAuth();

  return (
    <div>
      <Text>Home</Text>
      <button
        onClick={signOut}
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
