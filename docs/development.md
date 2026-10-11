# 组员开发步骤

## 没有仓库写权限也可以开始

在 GitHub 打开 MoodSky，点击 Fork，克隆自己账号中的仓库：

```sh
git clone https://github.com/YOUR_GITHUB_NAME/MoodSky.git
cd MoodSky
git remote add upstream https://github.com/HX-Jan/MoodSky.git
npm ci
npm run setup
git switch -c feature/f01-weather-record
```

YOUR_GITHUB_NAME 替换为自己的 GitHub 用户名。完成任务后：

```sh
npm run cloud:prepare
npm run check
git add miniprogram/modules/journal
git commit -m "feat(journal): add weather selection"
git push -u origin feature/f01-weather-record
```

示例目录和提交说明按实际任务替换；逐项检查暂存文件，提交所有相关调用方、测试和约定。随后在 GitHub 创建 PR，base 为 HX-Jan/MoodSky 的 main，head 为自己的任务分支。

同步团队主分支：

```sh
git fetch upstream
git switch main
git merge --ff-only upstream/main
git switch feature/f01-weather-record
git merge upstream/main
```

任务分支有未提交修改时先提交或暂存，再切换分支。若 main 的 fast-forward 失败，不要强推，先查清本地主分支上的额外提交。

## 已获写权限的成员

负责人在 Settings → Collaborators 中邀请实际 GitHub 账号，成员接受邀请后直接克隆团队仓库。在自己任务分支上开发并推送，仍通过 PR 合并，不直接提交到 main。操作中的 upstream/main 替换为 origin/main。

GitHub 写权限和微信小程序开发者权限是两件事；负责人分别配置。GitHub 账号名单未提供前统一走 Fork + PR。

## 本地检查

团队开发工具使用 Node.js 24。npm ci 根据锁文件安装；更新依赖要同时提交 package.json 与 package-lock.json。

| 命令                                   | 用途                                                       |
| -------------------------------------- | ---------------------------------------------------------- |
| npm run setup                          | 首次创建个人配置并生成云函数共享代码；不会覆盖已有个人配置 |
| npm run cloud:prepare                  | 修改 shared 后生成部署用副本                               |
| npm run format                         | 自动整理格式                                               |
| npm run check                          | 运行代码、格式、结构与关键边界测试                         |
| npm ci --prefix cloudfunctions/moodsky | 安装云函数 SDK                                             |
| node scripts/check-cloud.js            | 安装云 SDK 后检查加载与查询构造，不发送真实数据库请求      |

使用微信开发者工具导入仓库根目录。默认 touristappid 配合关闭云能力用于四页结构预览；若当前工具限制游客预览，由负责人提供获授权的团队 AppID。团队 AppID 通过 PR 统一写入 project.config.json，不能每个人提交自己的 AppID。个人开发工具配置放在被忽略的 project.private.config.json。

## 云端联调

1. 负责人建立独立测试环境并关联团队 AppID，确认实际支持的云函数运行时与 SDK。开发 Node.js 24 不代表云运行时必须使用同一版本。
2. 在本地 miniprogram/config/environment.local.js 写测试 cloudEnvId，需要调用云端时再将 cloudEnabled 设为 true；不提交该文件。
3. 运行 npm run cloud:prepare，再安装云函数依赖。通过微信开发者工具对 moodsky 云函数执行“上传并部署：云端安装依赖”。
4. 根据 database/collections.json 建集合、核验唯一索引能力；为全部集合设置客户端 read:false、write:false。数据库 SDK 的服务端访问仍需云函数逐项授权。
5. 先检查 system.health，再实现并测试账号查询。当前账号、运营角色和清理回执适配器均未实现，私人接口不会开放写入。
6. 每次 shared 变动后重新生成并部署同一版本的云函数；不要仅更新前端或手改生成副本。

此基础版本没有创建云环境、数据库、存储或部署凭证。database 中的 JSON 是设计与人工配置清单，不会自动生效。公开支持资源与地点在资料核验前保持空态。

云 SDK 锁定为 wx-server-sdk 4.0.2。其底层依赖的安全检查发现旧依赖问题，因此 package.json 将 @cloudbase/database 固定为1.5.1、axios 固定为0.34.0；当前依赖审计为0项已知漏洞，SDK加载及本地查询构造通过。真实云端兼容仍需以上联调验证；升级 SDK 时重新评估这两项 overrides，不随意删除锁文件或回退版本。

## 接入一个新功能

Issue 写 UW3-Fxx 和验收条件 → 前后端确认 docs/api.md 的输入输出 → 在分工目录实现 → 在 tests 添加关键行为或权限测试 → 更新需求实现状态 → npm run check → PR 审核。并发、幂等、实际权限和清理任务必须用测试环境验证后再标记完成。
