import { FC } from "react";
import styled from "styled-components";
import { useAuth } from "../../../hooks/useAuth";
import { Button } from "@mantine/core";

export const Index: FC = () => {
  const { signOut } = useAuth();

  return (
    <_Stack>
      <_Text>開発中です</_Text>
      <Button
        color="yellow"
        variant="outline"
        radius="xl"
        size="md"
        pr={14}
        h={48}
        styles={{ section: { marginLeft: 22 } }}
        onClick={signOut}
      >
        ログアウト
      </Button>
    </_Stack>
  );
};

const _Stack = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding-top: 80px;
  padding-bottom: calc(80px + env(safe-area-inset-bottom) * 0.2);
`;

const _Text = styled.div`
  font-size: 20px;
  font-weight: bold;
`;
