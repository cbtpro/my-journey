# Prisma Accelerate 示例：Next.js 入门项目

此项目展示了如何在 Next.js 应用中使用 Prisma ORM 和 Prisma Accelerate。它[演示了](./app/api/route.ts#L15-46) Accelerate 的每种[缓存策略](https://www.prisma.io/docs/data-platform/accelerate/concepts#cache-strategies)。

## 前置要求

要成功运行该项目，您需要以下内容：

- 一个 **公开可访问的数据库连接字符串**
- 您的 **Accelerate 连接字符串**（包含您的 **Accelerate API 密钥**）。您可以通过在 [Prisma 数据平台](https://pris.ly/pdp)帐户中启用 Accelerate 获得该连接字符串（请参阅[文档](https://www.prisma.io/docs/platform/concepts/environments#api-keys)以了解更多）。

## 开始使用

### 1. 克隆仓库

克隆仓库，进入项目目录并安装依赖：

```bash
git clone git@github.com:prisma/prisma-examples.git --depth=1
cd prisma-examples/accelerate/nextjs-starter
npm install
```

### 2. 配置环境变量

在项目根目录下创建一个 `.env` 文件：

```bash
touch .env
```

然后打开 `.env` 文件，并将 `DATABASE_URL` 和 `DIRECT_URL` 环境变量设置为您的数据库连接字符串和 Accelerate 连接字符串的值：

```bash
# .env

# Accelerate 连接字符串（Prisma Client 用于查询）
DATABASE_URL="__YOUR_ACCELERATE_CONNECTION_STRING__"

# 数据库连接字符串（Prisma Migrate 用于迁移）
DIRECT_URL="__YOUR_DATABASE_CONNECTION_STRING__"

NEXT_PUBLIC_URL="http://localhost:3000"
```

请注意，`__YOUR_DATABASE_CONNECTION_STRING__` 和 `__YOUR_ACCELERATE_CONNECTION_STRING__` 是占位符值，需要替换为您的数据库和 Accelerate 连接字符串的实际值。Accelerate 连接字符串的结构如下：`prisma://accelerate.prisma-data.net/?api_key=__YOUR_ACCELERATE_API_KEY__`。

### 3. 运行迁移以创建 `Quotes` 表并填充数据库

Prisma 模式文件包含一个简单的 `Quotes` 模型。您可以使用以下命令将该模型映射到数据库并创建相应的 `Quotes` 表：

```bash
npx prisma migrate dev --name init
```

现在，您的数据库中已经有一个空的 `Quotes` 表。接下来，运行[种子脚本](./prisma/seed.ts)以在表中创建一些示例记录：

```bash
npx prisma db seed
```

### 4. 为 Accelerate 生成 Prisma Client

使用 Accelerate 时，Prisma Client 不需要查询引擎。因此，您应该按以下方式生成它：

```bash
npx prisma generate --no-engine
```

### 5. 启动应用

您可以使用以下命令运行应用：

```bash
npm run dev
```

在 UI 底部，您可以看到不同 Accelerate 缓存策略的性能和其他统计数据（例如缓存命中率）：

![演示](./demo.gif)

## 资源

- [Accelerate 性能测试](https://accelerate-speed-test.vercel.app/)
- [Accelerate 文档](https://www.prisma.io/docs/accelerate)
- [Prisma Discord](https://pris.ly/discord)
