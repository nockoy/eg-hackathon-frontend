import { Progress } from "@mantine/core";

type ProgressBarProps = {
  progress: number;
};

export const ProgressBar = ({ progress }: ProgressBarProps) => {
  const displayProgress = progress < 4 ? 4 : progress;

  return (
    <Progress.Root w="100%" size={20} radius={16}>
      <Progress.Section
        value={displayProgress}
        color="orange"
        style={{ borderRadius: 16 }}
      >
        <Progress.Label></Progress.Label>
      </Progress.Section>
    </Progress.Root>
  );
};