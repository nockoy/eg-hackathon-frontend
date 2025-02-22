import styled from "styled-components";
import { AuthenticationForm } from "./components/Form/AuthenticationForm";

export const Authentication = () => {
  return (
    <_Wrapper>
      <AuthenticationForm />
    </_Wrapper>
  );
};

const _Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;
