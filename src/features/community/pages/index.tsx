import { FC, useState } from "react";
import styled from "styled-components";
import {
  Stack,
  Text,
  Tabs,
  Paper,
  Avatar,
  Group,
  Badge,
  Button,
  Progress,
  ThemeIcon,
  Input,
  ActionIcon,
} from "@mantine/core";
import {
  IconUsers,
  IconSearch,
  IconTrophy,
  IconFlame,
  IconPlus,
  IconChevronRight,
  IconStar,
} from "@tabler/icons-react";

export const Index: FC = () => {
  const [activeTab, setActiveTab] = useState<string | null>("discover");
  const [searchQuery, setSearchQuery] = useState("");

  // ダミーデータ
  const popularChallenges = [
    {
      id: 1,
      title: "毎日30分運動する",
      participants: 128,
      category: "フィットネス",
      difficulty: "medium",
    },
    {
      id: 2,
      title: "朝5時に起きる",
      participants: 89,
      category: "生活習慣",
      difficulty: "hard",
    },
    {
      id: 3,
      title: "週3回の読書習慣",
      participants: 215,
      category: "自己啓発",
      difficulty: "easy",
    },
    {
      id: 4,
      title: "1日1回瞑想する",
      participants: 76,
      category: "マインドフルネス",
      difficulty: "easy",
    },
  ];

  const myGroups = [
    {
      id: 1,
      name: "朝活グループ",
      members: 8,
      challenge: "朝5時に起きる",
      progress: 72,
      myStreak: 5,
      topStreak: 12,
      startDate: "2023-10-01",
      endDate: "2023-12-31",
    },
    {
      id: 2,
      name: "プログラミング学習仲間",
      members: 12,
      challenge: "毎日コードを書く",
      progress: 85,
      myStreak: 8,
      topStreak: 15,
      startDate: "2023-09-15",
      endDate: "2023-12-15",
    },
  ];

  return (
    <_Stack>
      <Text
        size="xl"
        fw={700}
        c="dark.8"
        style={{
          borderBottom: "2px solid #FFC107",
          paddingBottom: "8px",
          marginBottom: "16px",
        }}
      >
        コミュニティ
      </Text>

      <Tabs value={activeTab} onChange={setActiveTab} variant="pills">
        <Tabs.List grow mb="md">
          <Tabs.Tab value="discover" leftSection={<IconSearch size={16} />}>
            発見する
          </Tabs.Tab>
          <Tabs.Tab value="mygroups" leftSection={<IconUsers size={16} />}>
            参加中
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="discover">
          <Stack gap="md">
            <Input
              placeholder="チャレンジを検索..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.currentTarget.value)}
              rightSection={<IconSearch size={16} />}
            />

            <Text fw={600} size="md" mt="sm">
              人気のチャレンジ
            </Text>

            {popularChallenges.map((challenge) => (
              <ChallengeCard key={challenge.id}>
                <Group justify="space-between" wrap="nowrap">
                  <Stack gap="xs">
                    <Group gap="xs">
                      <Badge
                        color={
                          challenge.difficulty === "easy"
                            ? "green"
                            : challenge.difficulty === "medium"
                            ? "yellow"
                            : "red"
                        }
                        variant="light"
                      >
                        {challenge.difficulty === "easy"
                          ? "初級"
                          : challenge.difficulty === "medium"
                          ? "中級"
                          : "上級"}
                      </Badge>
                      <Badge color="blue" variant="light">
                        {challenge.category}
                      </Badge>
                    </Group>
                    <Text fw={600}>{challenge.title}</Text>
                    <Group gap="xs">
                      <ThemeIcon color="gray" variant="light" size="sm">
                        <IconUsers size={12} />
                      </ThemeIcon>
                      <Text size="sm" c="dimmed">
                        {challenge.participants}人が参加中
                      </Text>
                    </Group>
                  </Stack>
                  <ActionIcon variant="subtle" color="gray">
                    <IconChevronRight size={16} />
                  </ActionIcon>
                </Group>
              </ChallengeCard>
            ))}

            <Text fw={600} size="md" mt="sm">
              新しいグループ
            </Text>

            <Paper p="md" radius="md" withBorder>
              <Stack gap="md">
                <Text fw={600}>自分のチャレンジをシェアしよう</Text>
                <Text size="sm" c="dimmed">
                  あなたのチャレンジを公開して、同じ目標を持つ仲間を見つけましょう。
                  モチベーションを高め合い、一緒に目標を達成しましょう。
                </Text>
                <Button
                  leftSection={<IconPlus size={16} />}
                  color="yellow"
                  fullWidth
                >
                  新しいグループを作成
                </Button>
              </Stack>
            </Paper>
          </Stack>
        </Tabs.Panel>

        <Tabs.Panel value="mygroups">
          <Stack gap="md">
            {myGroups.map((group) => (
              <GroupCard key={group.id}>
                <Stack gap="md">
                  <Group justify="space-between">
                    <Group gap="sm">
                      <ThemeIcon color="yellow" size="lg" radius="xl">
                        <IconUsers size={20} />
                      </ThemeIcon>
                      <div>
                        <Text fw={600}>{group.name}</Text>
                        <Text size="xs" c="dimmed">
                          {group.startDate} 〜 {group.endDate}
                        </Text>
                      </div>
                    </Group>
                    <Badge>{group.members}人参加中</Badge>
                  </Group>

                  <Text fw={500} size="sm">
                    {group.challenge}
                  </Text>

                  <Stack gap="xs">
                    <Group justify="space-between">
                      <Text size="sm">グループ達成率</Text>
                      <Text size="sm" fw={600} c="blue">
                        {group.progress}%
                      </Text>
                    </Group>
                    <Progress value={group.progress} color="blue" />
                  </Stack>

                  <Group grow>
                    <Paper p="xs" radius="md" withBorder>
                      <Stack gap="xs" align="center">
                        <ThemeIcon color="yellow" variant="light" radius="xl">
                          <IconFlame size={16} />
                        </ThemeIcon>
                        <Text size="xs" c="dimmed">
                          あなたの継続
                        </Text>
                        <Text fw={700}>{group.myStreak}日</Text>
                      </Stack>
                    </Paper>

                    <Paper p="xs" radius="md" withBorder>
                      <Stack gap="xs" align="center">
                        <ThemeIcon color="yellow" variant="light" radius="xl">
                          <IconTrophy size={16} />
                        </ThemeIcon>
                        <Text size="xs" c="dimmed">
                          トップ記録
                        </Text>
                        <Text fw={700}>{group.topStreak}日</Text>
                      </Stack>
                    </Paper>
                  </Group>

                  <MemberList>
                    <MemberAvatar>
                      <Avatar color="blue" radius="xl">
                        YT
                      </Avatar>
                      <ThemeIcon
                        color="yellow"
                        radius="xl"
                        size="sm"
                        className="badge"
                      >
                        <IconStar size={12} />
                      </ThemeIcon>
                    </MemberAvatar>
                    <MemberAvatar>
                      <Avatar color="red" radius="xl">
                        KS
                      </Avatar>
                    </MemberAvatar>
                    <MemberAvatar>
                      <Avatar color="green" radius="xl">
                        TN
                      </Avatar>
                    </MemberAvatar>
                    <MemberAvatar>
                      <Avatar color="grape" radius="xl">
                        MK
                      </Avatar>
                    </MemberAvatar>
                    {group.members > 4 && (
                      <Avatar radius="xl" color="gray">
                        +{group.members - 4}
                      </Avatar>
                    )}
                  </MemberList>

                  <Button variant="light" color="blue" fullWidth>
                    詳細を見る
                  </Button>
                </Stack>
              </GroupCard>
            ))}
          </Stack>
        </Tabs.Panel>
      </Tabs>
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

const ChallengeCard = (props: { children: React.ReactNode }) => (
  <Paper
    p="md"
    radius="md"
    withBorder
    style={{
      transition: "transform 0.2s, box-shadow 0.2s",
    }}
    styles={{
      root: {
        "&:hover": {
          transform: "translateY(-2px)",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
        },
      },
    }}
  >
    {props.children}
  </Paper>
);

const GroupCard = (props: { children: React.ReactNode }) => (
  <Paper p="md" radius="md" withBorder>
    {props.children}
  </Paper>
);

const MemberList = styled.div`
  display: flex;
  align-items: center;
  margin-top: 8px;
`;

const MemberAvatar = styled.div`
  position: relative;
  margin-right: -8px;

  .badge {
    position: absolute;
    bottom: -2px;
    right: -2px;
    border: 2px solid white;
  }
`;
