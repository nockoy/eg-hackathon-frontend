import { Progress } from "@mantine/core";
import styled from "styled-components";

type ProgressBarProps = {
  progress: number;
  color: "yellow" | "green" | "orange" | "red" | "gray.4";
  backgroundColor?: string;
};

export const ProgressBar = ({
  progress,
  color,
  backgroundColor = "gray.2",
}: ProgressBarProps) => {
  return (
    <div style={{ position: "relative" }}>
      <Progress.Root w="100%" size={16} radius={8} bg={backgroundColor}>
        <Progress.Section
          value={progress * 100}
          color={color}
          style={{ borderRadius: 8 }}
        >
          <Progress.Label></Progress.Label>
        </Progress.Section>
      </Progress.Root>
      <_Period color={color} />
    </div>
  );
};

const _Period = styled.div<{ color: string }>`
  position: absolute;
  top: 0;
  left: 0;
  height: 16px;
  width: 16px;
  border-radius: 50%;
  background-color: ${({ color }) =>
    color === "yellow"
      ? "#FAB005"
      : color === "green"
      ? "#40C057"
      : color === "orange"
      ? "#FD7E14"
      : color === "gray.4"
      ? "#CED4DA"
      : "#FA5252"};
`;
