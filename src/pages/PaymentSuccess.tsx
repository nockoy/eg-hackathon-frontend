import { useEffect } from "react";
import {
  Title,
  Text,
  Button,
  Stack,
  Paper,
  ThemeIcon,
  useMantineTheme,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { IconCheck, IconHome } from "@tabler/icons-react";

export const PaymentSuccess = () => {
  const navigate = useNavigate();
  const theme = useMantineTheme();

  useEffect(() => {
    // URLパラメータから支払い情報を取得することも可能
    const urlParams = new URLSearchParams(window.location.search);
    const paymentId = urlParams.get("paymentId");

    // 必要に応じてバックエンドに支払い完了を通知
    if (paymentId) {
      // api.post('/api/payments/confirm', { payment_id: paymentId });
    }
  }, []);

  return (
    <div
      style={{
        minHeight: "80vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
      }}
    >
      <Paper
        withBorder
        style={{
          padding: 24,
          borderRadius: theme.radius.lg,
          boxShadow: theme.shadows.lg,
          maxWidth: 500,
          width: "100%",
        }}
      >
        <Stack align="center" gap={32} p={24}>
          <ThemeIcon size={80} radius={100} color="green">
            <IconCheck size={50} />
          </ThemeIcon>

          <Title
            order={1}
            style={{
              fontWeight: 900,
              marginBottom: 16,
              textAlign: "center",
              color: theme.colors.green[6],
            }}
          >
            支払い完了！
          </Title>

          <Text
            size="lg"
            style={{
              textAlign: "center",
              color: theme.colors.gray[7],
            }}
          >
            PayPayでの支払いが正常に完了しました
            <br />
            チャレンジに参加する準備が整いました！
          </Text>

          <Stack gap={16} w="100%">
            {/* <Stack align="center" gap={4}>
              <Text size="sm" c="dimmed">
                取引ID:
              </Text>
              <Text size="sm" ta="center">
                {new URLSearchParams(window.location.search).get("paymentId") ||
                  "N/A"}
              </Text>
            </Stack> */}
            <Stack align="center" gap={4}>
              <Text size="sm" c="dimmed">
                支払日時:
              </Text>
              <Text size="sm" ta="center">
                {new Date().toLocaleString("ja-JP")}
              </Text>
            </Stack>
          </Stack>

          <Button
            leftSection={<IconHome size={20} />}
            onClick={() => navigate("/")}
            size="md"
            radius="md"
          >
            ホームに戻る
          </Button>
        </Stack>
      </Paper>
    </div>
  );
};

export default PaymentSuccess;
