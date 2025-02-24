import { Group, Progress, Stack, Text, Tooltip } from "@mantine/core";
import { FC } from "react";
import styled from "styled-components";

export const Index: FC = () => {
  return (
    <_Stack>
      {Array.from({ length: 3 }).map((_, index) => (
        <_Card key={index}>
          <Stack w="100%" gap={16}>
            <Group justify="space-between" w="100%" gap={16}>
              <Stack gap={4} >
                <_Text>ジムに5回行く！</_Text>
                <_Date>～ 3月1日(土) 13:00</_Date>{" "}
              </Stack>
              <Text fz="32" fw={700} c="yellow">
                ￥2,000
              </Text>
            </Group>
            <Progress.Root w="100%" size={20} radius={16}>
              <Tooltip label="Progress">
                <Progress.Section
                  value={28}
                  color="orange"
                  style={{ borderRadius: 16 }}
                >
                  <Progress.Label>Progress</Progress.Label>
                </Progress.Section>
              </Tooltip>
            </Progress.Root>

            <Stack justify="left" w="100%" gap={16}>
              <Text>ジムに5回行く！</Text>
            </Stack>
          </Stack>
        </_Card>
      ))}
    </_Stack>
  );
};

const _Stack = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding-top: 80px;
  padding-bottom: calc(80px + env(safe-area-inset-bottom) * 0.25);
`;

const _Card = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 16px;
  border: 1px solid #e0e0e0;
  padding: 16px;
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
