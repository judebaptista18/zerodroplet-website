"use client";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider } from "antd";
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AntdRegistry>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#356fae",
            colorInfo: "#417fc2",
            colorLink: "#356fae",
            colorSuccess: "#2f8134",
            colorText: "#293e55",
            borderRadius: 10,
            fontFamily: "Arial, Helvetica, sans-serif",
          },
          components: { Button: { controlHeight: 44 } },
        }}
      >
        {children}
      </ConfigProvider>
    </AntdRegistry>
  );
}
