import { FC } from "react";
import styled from "styled-components";
import { AuthenticationForm } from "../components/Form/AuthenticationForm";
export const Index: FC = () => {
  return (
    <_Wrapper>
      <AuthenticationForm />
    </_Wrapper>
  );
};

const _Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
