import { FC } from "react";
import styled from "styled-components";
import { useAuth } from "../../../hooks/useAuth";
import { Stack } from "@mantine/core";

export const Index: FC = () => {
  const { signOut } = useAuth();

  return (
    <Stack w="100%" pt={96} pb={100}>
      <_Text>これは設定です</_Text>
      <_Button onClick={signOut}>ログアウト</_Button>
    </Stack>
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
