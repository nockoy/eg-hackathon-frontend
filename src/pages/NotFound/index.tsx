import styled from "styled-components";

export const NotFound = () => {
  return (
    <_PageWrapper>
      <_Text>NotFound</_Text>
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
