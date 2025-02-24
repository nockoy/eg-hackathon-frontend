import { Group, Stack } from "@mantine/core";
import { FC } from "react";
import styled from "styled-components";

export const Index: FC = () => {
  return (
    <_Stack>
      <_Box>
        <Group justify="left" w="100%" gap={16} p={16}>
          <img
            src="/img/logo.png"
            alt="committy"
            style={{ width: 40, height: 40 }}
          />
          <Stack gap={4}>
            <_Text>3日に1回資格勉強</_Text>
            <_Date>～ 3月1日(土) 13:00</_Date>
          </Stack>
        </Group>
      </_Box>
      <_Box>
        <Group justify="left" w="100%" gap={16} p={16}>
          <img
            src="/img/logo.png"
            alt="committy"
            style={{ width: 40, height: 40 }}
          />
          <Stack gap={4}>
            <_Text>週2でオンライン英会話</_Text>
            <_Date>～ 3月1日(土) 13:00</_Date>
          </Stack>
        </Group>
      </_Box>
      <_Box>
        <Group justify="left" w="100%" gap={16} p={16}>
          <img
            src="/img/logo.png"
            alt="committy"
            style={{ width: 40, height: 40 }}
          />
          <Stack gap={4}>
            <_Text>ジムに2回行く！</_Text>
            <_Date>～ 3月1日(土) 13:00</_Date>
          </Stack>
        </Group>
        <img
          src="/img/committy.svg"
          alt="committy"
          style={{ width: "100%", backgroundColor: "#DADCE0" }}
        />
        <Stack justify="left" w="100%" gap={16} p={16}>
          <_Text>進捗</_Text>
        </Stack>
      </_Box>
      <_Box>
        <Group justify="left" w="100%" gap={16} p={16}>
          <img
            src="/img/logo.png"
            alt="committy"
            style={{ width: 40, height: 40 }}
          />
          <Stack gap={4}>
            <_Text>ジムに2回行く！</_Text>
            <_Date>～ 3月1日(土) 13:00</_Date>
          </Stack>
        </Group>
        <img
          src="/img/committy.svg"
          alt="committy"
          style={{ width: "100%", backgroundColor: "#DADCE0" }}
        />
        <Stack justify="left" w="100%" gap={16} p={16}>
          <_Text>進捗</_Text>
        </Stack>
      </_Box>
      <_Box>
        <Group justify="left" w="100%" gap={16} p={16}>
          <img
            src="/img/logo.png"
            alt="committy"
            style={{ width: 40, height: 40 }}
          />
          <Stack gap={4}>
            <_Text>ジムに2回行く！</_Text>
            <_Date>～ 3月1日(土) 13:00</_Date>
          </Stack>
        </Group>
        <img
          src="/img/committy.svg"
          alt="committy"
          style={{ width: "100%", backgroundColor: "#DADCE0" }}
        />
        <Stack justify="left" w="100%" gap={16} p={16}>
          <_Text>進捗</_Text>
        </Stack>
      </_Box>
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

const _Box = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 16px;
  border: 1px solid #e0e0e0;
`;

const _Text = styled.div`
  font-size: 16px;
  font-weight: bold;
  line-height: 1.6;
`;

const _Date = styled.div`
  font-size: 14px;
  line-height: 1.6;
`;
