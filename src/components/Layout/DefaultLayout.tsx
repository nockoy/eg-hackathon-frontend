import { FC, ReactNode } from "react";
import styled from "styled-components";

export const DefaultLayout: FC<{ children: ReactNode }> = ({
  children,
}) => {
  return (
    <_Wrapper>
      {children}
    </_Wrapper>
  );
};

const _Wrapper = styled.div`
  width: 100vw;
  height: 100svh;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* justify-content: center; */
`;

