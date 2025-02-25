import { Progress } from "@mantine/core";
import styled from "styled-components";

type ProgressBarProps = {
  progress: number;
};

export const ProgressBar = ({ progress }: ProgressBarProps) => {

  return (
    <div style={{ position: "relative" }}>
      <Progress.Root w="100%" size={16} radius={8}>
        <Progress.Section
          value={progress}
          color="orange"
          style={{ borderRadius: 8 }}
        >
          <Progress.Label></Progress.Label>
        </Progress.Section>
      </Progress.Root>
      <_Period />
    </div>
  );
};

const _Period = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 16px;
  width: 16px;
  border-radius: 50%;
  background-color: #fd7e14;
`;
