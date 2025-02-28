import React, { useState } from "react";
import { Button } from "@mantine/core";
import { v4 as uuidv4 } from "uuid";
import api from "../../api/axios";

interface PayPayButtonProps {
  amount: number;
  description?: string;
  onSuccess?: () => void;
  onError?: (error: Error | unknown) => void;
}

const PayPayButton: React.FC<PayPayButtonProps> = ({
  amount,
  description = "商品購入",
  onSuccess,
  onError,
}) => {
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    try {
      setLoading(true);
      // 注文IDを生成（一意である必要があります）
      const orderId = `order_${uuidv4()}`;

      console.log("リクエスト送信中...", {
        amount,
        order_id: orderId,
        description,
      });

      // バックエンドAPIを呼び出して決済リクエストを作成
      const response = await api.post("/api/paypay/create-payment", {
        amount,
        order_id: orderId,
        description,
      });

      console.log("レスポンス:", response.data);

      if (response.data.status !== "success") {
        throw new Error("決済リクエストの作成に失敗しました");
      }

      // PayPayのQRコードURLを取得
      const paymentUrl = response.data.data.url;

      if (!paymentUrl) {
        throw new Error("PayPayのURLが見つかりません");
      }

      // PayPayの支払い画面にリダイレクト
      console.log("リダイレクト先URL:", paymentUrl);
      window.location.href = paymentUrl;

      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error("PayPay決済エラー:", error);
      if (onError) {
        onError(error);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      variant="contained"
      color="primary"
      onClick={handlePayment}
      disabled={loading}
      style={{
        backgroundColor: "#FF0033",
        "&:hover": {
          backgroundColor: "#CC0033",
        },
      }}
    >
      {loading ? "処理中..." : "PayPayで支払う"}
    </Button>
  );
};

export default PayPayButton;
