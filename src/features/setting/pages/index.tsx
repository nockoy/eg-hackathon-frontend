import { FC, useContext, useState } from "react";
import styled from "styled-components";
import { useAuth } from "../../../hooks/useAuth";
import { UserContext } from "../../../contexts/UserContext";
import {
  Avatar,
  Button,
  Divider,
  Group,
  Paper,
  Stack,
  Switch,
  Text,
  TextInput,
  ThemeIcon,
  ActionIcon,
  Modal,
  Textarea,
} from "@mantine/core";
import {
  IconBell,
  IconChevronRight,
  IconEdit,
  IconLock,
  IconLogout,
  IconMoon,
  IconUser,
  IconWallet,
  IconBrandGithub,
  IconBrandGoogle,
} from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";

export const Index: FC = () => {
  const { signOut } = useAuth();
  const { userId, nickname } = useContext(UserContext);
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [opened, { open, close }] = useDisclosure(false);
  const [editedNickname, setEditedNickname] = useState(nickname);
  const [bio, setBio] = useState("目標達成のために頑張っています！");

  const handleSaveProfile = () => {
    // setNickname(editedNickname);
    // APIを呼び出してニックネームを更新する処理をここに追加
    close();
  };

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
        設定
      </Text>

      {/* プロフィールセクション */}
      <Paper p="md" radius="md" withBorder>
        <Group justify="space-between" mb="md">
          <Text fw={600} size="md">
            プロフィール
          </Text>
          <ActionIcon color="yellow" variant="subtle" onClick={open}>
            <IconEdit size={18} />
          </ActionIcon>
        </Group>

        <Group justify="center" mb="md">
          <Avatar size={80} color="yellow" radius={80} src={null}>
            {nickname?.substring(0, 2) || "ユ"}
          </Avatar>
        </Group>

        <Stack gap={4} align="center" mb="md">
          <Text fw={700} size="lg">
            {nickname || "ユーザー"}
          </Text>
          <Text size="xs" c="dimmed">
            ID: {userId}
          </Text>
        </Stack>

        <Text size="sm" c="dimmed" mb="md">
          {bio}
        </Text>

        <Group grow>
          <Paper p="xs" withBorder radius="md">
            <Stack gap={0} align="center">
              <Text size="xs" c="dimmed">
                達成チャレンジ
              </Text>
              <Text fw={700}>3</Text>
            </Stack>
          </Paper>
          <Paper p="xs" withBorder radius="md">
            <Stack gap={0} align="center">
              <Text size="xs" c="dimmed">
                最長継続日数
              </Text>
              <Text fw={700}>14日</Text>
            </Stack>
          </Paper>
          <Paper p="xs" withBorder radius="md">
            <Stack gap={0} align="center">
              <Text size="xs" c="dimmed">
                総獲得額
              </Text>
              <Text fw={700} c="green.6">
                ¥12,000
              </Text>
            </Stack>
          </Paper>
        </Group>
      </Paper>

      {/* アカウント設定セクション */}
      <Paper p="md" radius="md" withBorder>
        <Text fw={600} size="md" mb="md">
          アカウント設定
        </Text>

        <Stack gap={0}>
          <SettingItem
            icon={<IconUser size={20} />}
            title="アカウント情報"
            onClick={() => {}}
          />
          <SettingItem
            icon={<IconLock size={20} />}
            title="パスワード変更"
            onClick={() => {}}
          />
          <SettingItem
            icon={<IconWallet size={20} />}
            title="支払い方法"
            onClick={() => {}}
          />
        </Stack>
      </Paper>

      {/* 連携サービス */}
      <Paper p="md" radius="md" withBorder>
        <Text fw={600} size="md" mb="md">
          連携サービス
        </Text>

        <Stack gap={0}>
          <SettingItem
            icon={<IconBrandGithub size={20} />}
            title="GitHub"
            description="未連携"
            onClick={() => {}}
          />
          <SettingItem
            icon={<IconBrandGoogle size={20} />}
            title="Google"
            description="連携済み"
            onClick={() => {}}
          />
        </Stack>
      </Paper>

      {/* アプリ設定セクション */}
      <Paper p="md" radius="md" withBorder>
        <Text fw={600} size="md" mb="md">
          アプリ設定
        </Text>

        <Stack gap={12}>
          <Group justify="space-between">
            <Group>
              <ThemeIcon color="gray" variant="light" size="md" radius="xl">
                <IconMoon size={18} />
              </ThemeIcon>
              <Text>ダークモード</Text>
            </Group>
            <Switch
              checked={darkMode}
              onChange={(event) => setDarkMode(event.currentTarget.checked)}
              color="yellow"
            />
          </Group>

            <Group justify="space-between">
            <Group>
              <ThemeIcon color="gray" variant="light" size="md" radius="xl">
                <IconBell size={18} />
              </ThemeIcon>
              <Text>通知</Text>
            </Group>
            <Switch
              checked={notifications}
              onChange={(event) =>
                setNotifications(event.currentTarget.checked)
              }
              color="yellow"
            />
          </Group>
        </Stack>
      </Paper>

      {/* ログアウトボタン */}
      <Button
        color="yellow"
        variant="outline"
        radius="xl"
        size="md"
        h={48}
        leftSection={<IconLogout size={18} />}
        onClick={signOut}
        fullWidth
      >
        ログアウト
      </Button>

      {/* バージョン情報 */}
      <Text size="xs" c="dimmed">
        バージョン 1.0.0
      </Text>

      {/* プロフィール編集モーダル */}
      <Modal
        opened={opened}
        onClose={close}
        title="プロフィール編集"
        centered
        radius="md"
      >
        <Stack gap="md">
          <Group justify="center">
            <Avatar size={80} color="yellow" radius={80} src={null}>
              {editedNickname?.substring(0, 2) || "ユ"}
            </Avatar>
          </Group>

          <TextInput
            label="ニックネーム"
            value={editedNickname}
            onChange={(e) => setEditedNickname(e.currentTarget.value)}
            placeholder="ニックネームを入力"
          />

          <Textarea
            label="自己紹介"
            value={bio}
            onChange={(e) => setBio(e.currentTarget.value)}
            placeholder="自己紹介を入力"
            minRows={3}
          />

          <Group justify="right" mt="md">
            <Button variant="subtle" color="gray" onClick={close}>
              キャンセル
            </Button>
            <Button color="yellow" onClick={handleSaveProfile}>
              保存
            </Button>
          </Group>
        </Stack>
      </Modal>
    </_Stack>
  );
};

// 設定項目コンポーネント
const SettingItem = ({
  icon,
  title,
  description,
  onClick,
}: {
  icon: React.ReactNode;
  title: string;
  description?: string;
  onClick: () => void;
}) => (
  <>
    <Group
      justify="space-between"
      py="md"
      style={{ cursor: "pointer" }}
      onClick={onClick}
    >
      <Group>
        <ThemeIcon color="gray" variant="light" size="md" radius="xl">
          {icon}
        </ThemeIcon>
        <div>
          <Text>{title}</Text>
          {description && (
            <Text size="xs" c="dimmed">
              {description}
            </Text>
          )}
        </div>
      </Group>
      <IconChevronRight size={16} color="#adb5bd" />
    </Group>
    <Divider />
  </>
);

const _Stack = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding-top: 80px;
  padding-bottom: calc(80px + env(safe-area-inset-bottom) * 0.2);
`;
