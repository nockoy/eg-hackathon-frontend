import { FC } from "react";
import styled from "styled-components";

export const Index: FC = () => {
  return (
    <_Stack>
      <_Text>これはコミュニティです</_Text>
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
  padding-top: 96px;
  padding-bottom: calc(96px + env(safe-area-inset-bottom) * 0.25);
`;