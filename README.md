# 大毛同学

一个干净、现代、偏个人品牌感的介绍页，包含真实邮件发送能力。页面使用 Next.js App Router 构建，联系表单通过 SMTP 发信。

## 本地运行

```bash
npm install
npm run dev
```

打开 `http://127.0.0.1:3000`。

## 邮件配置

复制 `.env.example` 为 `.env.local`，填入：

```bash
SMTP_HOST=mail.spacemail.com
SMTP_PORT=465
SMTP_SECURE=ssl
SMTP_USER=noreply@dmtx.cn
SMTP_PASS=your_smtp_password
SMTP_FROM_NAME=大毛同学
SMTP_FROM_ADDRESS=noreply@dmtx.cn
CONTACT_TO_EMAIL=service@dmtx.cn
CONTACT_CAPTCHA_SECRET=use_a_long_random_string
```

`SMTP_PASS` 是 SMTP 服务邮箱密码，不要提交到仓库。`CONTACT_CAPTCHA_SECRET` 用于生成和校验验证码签名。缺少任意 SMTP 配置时，页面仍可打开，表单提交会返回“邮件服务尚未配置完整”。

## 可用命令

```bash
npm test
npm run build
```
