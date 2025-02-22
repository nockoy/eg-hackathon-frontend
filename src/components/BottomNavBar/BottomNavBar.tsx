import { FC } from "react";
import { AppShell, Group, Stack, Text } from "@mantine/core";

export const BottomNavBar: FC = () => {
  return (
    <AppShell>
      <AppShell.Footer>
        <Group grow gap={0}>
          <Stack h={60} align="center" justify="center" gap={0}>
            <span className="material-icons">account_circle</span>
            <Text size="xs">Events</Text>
          </Stack>
          <Stack h={60} align="center" justify="center" gap={0}>
            <span className="material-icons">account_circle</span>
            <Text size="xs">Events</Text>
          </Stack>
          <Stack h={60} align="center" justify="center" gap={0}>
            <span className="material-icons">account_circle</span>
            <Text size="xs">Events</Text>
          </Stack>
        </Group>
      </AppShell.Footer>
    </AppShell>
  );
};
