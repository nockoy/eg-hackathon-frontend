import { FC } from "react";
import { AppShell, Group, Stack, Text } from "@mantine/core";

export const BottomNavBar: FC = () => {
  return (
    <AppShell>
      <AppShell.Footer>
        <Group grow gap={0}>
          <Stack h={60} align="center" justify="center" gap={0}>
            <span className="material-icons">home</span>
            <Text size="xs">ホーム</Text>
          </Stack>
          <Stack h={60} align="center" justify="center" gap={0}>
            <span className="material-icons">search</span>
            <Text size="xs">チャレンジ</Text>
          </Stack>
          <Stack h={60} align="center" justify="center" gap={0}>
            <span className="material-icons">person</span>
            <Text size="xs">マイページ</Text>
          </Stack>
        </Group>
      </AppShell.Footer>
    </AppShell>
  );
};
