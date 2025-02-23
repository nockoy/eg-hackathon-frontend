import { FC } from "react";
import styled from "styled-components";

export const Index: FC = () => {
  return <_Text>これはホームです</_Text>;
};

const _Text = styled.div`
  height: 1000px;
  font-size: 20px;
  font-weight: bold;
`;
