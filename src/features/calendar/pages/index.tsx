import { FC, useState } from "react";
import styled from "styled-components";
import {
  Stack,
  Text,
  Tabs,
  Paper,
  Progress,
  Group,
  Badge,
  ThemeIcon,
  Box,
  SegmentedControl,
} from "@mantine/core";
import {
  IconCalendarStats,
  IconChartBar,
  IconChartPie,
  IconFlame,
  IconTrophy,
} from "@tabler/icons-react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

export const Index: FC = () => {
  const [activeTab, setActiveTab] = useState<string | null>("calendar");
  const [viewMode, setViewMode] = useState("month");
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  // ダミーデータ
  const streakData = { current: 5, longest: 12 };
  const completionRate = 78;
  const weekdayDistribution = [15, 12, 8, 10, 9, 18, 22]; // 月〜日
  const timeDistribution = [2, 5, 8, 12, 15, 20, 18, 10, 5, 3]; // 時間帯別

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
        チャレンジ分析
      </Text>

      <Tabs value={activeTab} onChange={setActiveTab} variant="pills">
        <Tabs.List grow mb="md">
          <Tabs.Tab
            value="calendar"
            leftSection={<IconCalendarStats size={16} />}
          >
            カレンダー
          </Tabs.Tab>
          <Tabs.Tab value="stats" leftSection={<IconChartBar size={16} />}>
            統計
          </Tabs.Tab>
          <Tabs.Tab value="insights" leftSection={<IconChartPie size={16} />}>
            インサイト
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="calendar">
          <Stack gap="md">
            <SegmentedControl
              value={viewMode}
              onChange={setViewMode}
              data={[
                { value: "month", label: "月表示" },
                { value: "week", label: "週表示" },
                { value: "heatmap", label: "ヒートマップ" },
              ]}
              fullWidth
            />

            <Paper p="md" radius="md" withBorder>
              <StyledCalendar
                value={selectedDate}
                onChange={(value) =>
                  setSelectedDate(value instanceof Date ? value : null)
                }
                className="custom-calendar"
                tileClassName={({ date }) => {
                  const day = date.getDate();
                  if (day % 3 === 0) return "achievement-high";
                  if (day % 3 === 1) return "achievement-medium";
                  if (day % 7 === 0) return "achievement-low";
                  return "";
                }}
              />
            </Paper>

            {selectedDate && (
              <Paper p="md" radius="md" withBorder>
                <Stack gap="xs">
                  <Text fw={600} size="md">
                    {selectedDate.toLocaleDateString("ja-JP", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                    の記録
                  </Text>
                  <Group gap="xs">
                    <Badge color="green">達成：3/5</Badge>
                    <Badge color="blue">コミット：2件</Badge>
                  </Group>
                  <Text size="sm" c="dimmed">
                    今日は目標の60%を達成しました。朝のコミットが特に効果的でした。
                  </Text>
                </Stack>
              </Paper>
            )}
          </Stack>
        </Tabs.Panel>

        <Tabs.Panel value="stats">
          <Stack gap="md">
            <Paper p="md" radius="md" withBorder>
              <Stack gap="xs">
                <Group justify="space-between">
                  <Text fw={600}>継続日数</Text>
                  <Group gap="xs">
                    <ThemeIcon
                      color="yellow"
                      variant="light"
                      radius="xl"
                      size="sm"
                    >
                      <IconFlame size={14} />
                    </ThemeIcon>
                    <Text fw={700} c="yellow.7">
                      {streakData.current}日連続
                    </Text>
                  </Group>
                </Group>
                <Progress
                  value={(streakData.current / streakData.longest) * 100}
                  color="yellow"
                />
                <Text size="xs" c="dimmed">
                  最長記録: {streakData.longest}日
                </Text>
              </Stack>
            </Paper>

            <Paper p="md" radius="md" withBorder>
              <Stack gap="xs">
                <Text fw={600}>達成率</Text>
                <Group justify="center" mt="xs">
                  <Box
                    style={{ position: "relative", width: 120, height: 120 }}
                  >
                    {/* ここに円グラフを表示 */}
                    <Text
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        fontSize: 24,
                        fontWeight: 700,
                        color: "#228be6",
                      }}
                    >
                      {completionRate}%
                    </Text>
                  </Box>
                </Group>
                <Text size="sm">
                  目標達成率は前月比{" "}
                  <span style={{ color: "#40c057", fontWeight: 600 }}>
                    +12%
                  </span>
                </Text>
              </Stack>
            </Paper>

            <Paper p="md" radius="md" withBorder>
              <Stack gap="xs">
                <Text fw={600}>曜日別達成状況</Text>
                <Group grow mt="xs" align="flex-end" style={{ height: 100 }}>
                  {weekdayDistribution.map((value, index) => (
                    <div
                      key={index}
                      style={{
                        height: `${value * 4}px`,
                        backgroundColor:
                          index === 6 || index === 5 ? "#fab005" : "#228be6",
                        borderRadius: "4px 4px 0 0",
                        width: "100%",
                      }}
                    />
                  ))}
                </Group>
                <Group grow>
                  {["月", "火", "水", "木", "金", "土", "日"].map(
                    (day, index) => (
                      <Text key={index} size="xs">
                        {day}
                      </Text>
                    )
                  )}
                </Group>
              </Stack>
            </Paper>
          </Stack>
        </Tabs.Panel>

        <Tabs.Panel value="insights">
          <Stack gap="md">
            <Paper p="md" radius="md" withBorder>
              <Stack gap="xs">
                <Group justify="space-between">
                  <Text fw={600}>最適な時間帯</Text>
                  <ThemeIcon color="teal" variant="light" radius="xl">
                    <IconTrophy size={16} />
                  </ThemeIcon>
                </Group>
                <Text size="sm">
                  あなたの達成率が最も高い時間帯は{" "}
                  <span style={{ fontWeight: 600, color: "#2c974b" }}>
                    18:00〜20:00
                  </span>{" "}
                  です。 この時間帯にコミットすると成功率が30%向上します。
                </Text>
              </Stack>
            </Paper>

            <Paper p="md" radius="md" withBorder>
              <Stack gap="xs">
                <Text fw={600}>時間帯別達成状況</Text>
                <Group grow mt="xs" align="flex-end" style={{ height: 100 }}>
                  {timeDistribution.map((value, index) => (
                    <div
                      key={index}
                      style={{
                        height: `${value * 4}px`,
                        backgroundColor:
                          value > 15
                            ? "#40c057"
                            : value > 10
                            ? "#228be6"
                            : "#adb5bd",
                        borderRadius: "4px 4px 0 0",
                        width: "100%",
                      }}
                    />
                  ))}
                </Group>
                <Group grow>
                  {[
                    "6",
                    "8",
                    "10",
                    "12",
                    "14",
                    "16",
                    "18",
                    "20",
                    "22",
                    "24",
                  ].map((time, index) => (
                    <Text key={index} size="xs">
                      {time}
                    </Text>
                  ))}
                </Group>
              </Stack>
            </Paper>

            <Paper p="md" radius="md" withBorder>
              <Stack gap="xs">
                <Text fw={600}>パターン分析</Text>
                <Text size="sm">
                  週末の達成率が平日より23%高くなっています。
                  また、連続して3日以上コミットすると、その後の1週間の達成率が40%向上する傾向があります。
                </Text>
              </Stack>
            </Paper>
          </Stack>
        </Tabs.Panel>
      </Tabs>
    </_Stack>
  );
};

const StyledCalendar = styled(Calendar)`
  width: 100% !important;
  max-width: 100% !important;
  border: none !important;

  .react-calendar__viewContainer {
    width: 100%;
  }

  .react-calendar__month-view {
    width: 100%;
  }

  .react-calendar__month-view__days {
    display: grid !important;
    grid-template-columns: repeat(7, 1fr);
    width: 100%;
  }

  .react-calendar__tile {
    max-width: initial !important;
  }

  .react-calendar__tile--active {
    background: #ffc107 !important;
  }

  .achievement-high {
    background-color: rgba(64, 192, 87, 0.1) !important;
    color: #2c974b !important;
    font-weight: 600 !important;
  }

  .achievement-medium {
    background-color: rgba(250, 176, 5, 0.1) !important;
    color: #b06000 !important;
  }

  .achievement-low {
    background-color: rgba(255, 107, 107, 0.1) !important;
    color: #e03131 !important;
  }
`;

const _Stack = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding-top: 80px;
  padding-bottom: calc(80px + env(safe-area-inset-bottom) * 0.2);
`;
