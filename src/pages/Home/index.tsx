import styled from "styled-components";
import { useAuth } from "../../hooks/useAuth";
import { Stack } from "@mantine/core";

export const Home = () => {
  const { signOut } = useAuth();

  return (
    <_PageWrapper>
      <Stack align="center" justify="center" gap="8">
        <_Text>これはホームです</_Text>
        <_Button onClick={signOut}>ログアウト</_Button>
      </Stack>
    </_PageWrapper>
  );
};

const _PageWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const _Text = styled.div`
  font-size: 20px;
  font-weight: bold;
`;

const _Button = styled.div`
  background-color: #3400c2;
  color: #fff;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
`;
