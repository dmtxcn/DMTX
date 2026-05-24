# 大毛同学

一个干净、现代、偏个人品牌感的介绍页，包含真实邮件发送能力。页面使用 Next.js App Router 构建，联系表单通过 Resend API 发信。

## 本地运行

```bash
npm install
npm run dev
```

打开 `http://127.0.0.1:3000`。

## 邮件配置

复制 `.env.example` 为 `.env.local`，填入：

```bash
RESEND_API_KEY=your_resend_api_key
CONTACT_TO_EMAIL=you@example.com
RESEND_FROM_EMAIL=Da Mao <hello@your-domain.com>
```

`RESEND_FROM_EMAIL` 需要使用 Resend 已验证的发信域名。缺少任意配置时，页面仍可打开，表单提交会返回“邮件服务尚未配置完整”。

## 可用命令

```bash
npm test
npm run build
```
