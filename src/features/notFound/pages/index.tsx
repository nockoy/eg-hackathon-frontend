import { FC } from "react";
import styled from "styled-components";
import { Stack } from "@mantine/core";
import { useNavigate } from "react-router-dom";

export const Index: FC = () => {
  const navigate = useNavigate();

  return (
    <_Wrapper>
      <Stack align="center" justify="center" gap="24">
        <_Text>
          Opps! <br />
          お探しのページは見つかりませんでした
        </_Text>
        <_Button onClick={() => navigate("/")}>
          <_Text>ホームに戻る</_Text>
        </_Button>
      </Stack>
    </_Wrapper>
  );
};

const _Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const _Button = styled.div`
  background-color: #3400c2;
  color: #fff;
  padding: 10px 20px;
  border-radius: 16px;
  cursor: pointer;
`;

const _Text = styled.div`
  font-size: 20px;
  font-weight: bold;
  text-align: center;
`;
