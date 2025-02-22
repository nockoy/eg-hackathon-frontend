import styled from "styled-components";
import { useAuth } from "../../hooks/useAuth";
import { Stack } from "@mantine/core";
import { DefaultLayout } from "../../components/Layout/DefaultLayout";

export const Home = () => {
  const { signOut } = useAuth();

  return (
    <DefaultLayout>
      <Stack align="center" justify="center" gap="8">
        <_Text>これはホームです</_Text>
        <_Button onClick={signOut}>ログアウト</_Button>
      </Stack>
    </DefaultLayout>
  );
};

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
