import { FC } from "react";
import styled from "styled-components";

export const Index: FC = () => {
  return (
    <_Stack>
      <_Text>開発中です</_Text>
    </_Stack>
  );
};

const _Text = styled.div`
  font-size: 20px;
  font-weight: bold;
`;

const _Stack = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding-top: 80px;
  padding-bottom: calc(80px + env(safe-area-inset-bottom) * 0.25);
`;