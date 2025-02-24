import { FC } from "react";
import styled from "styled-components";
import { useAuth } from "../../../hooks/useAuth";

export const Index: FC = () => {
  const { signOut } = useAuth();

  return (
    <_Stack>
      <_Text>これは設定です</_Text>
      <_Button onClick={signOut}>ログアウト</_Button>
    </_Stack>
  );
};

const _Stack = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding-top: 96px;
  padding-bottom: calc(96px + env(safe-area-inset-bottom) * 0.25);
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
