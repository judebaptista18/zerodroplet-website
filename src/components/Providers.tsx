"use client";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider } from "antd";
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AntdRegistry>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#0b8f87",
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
