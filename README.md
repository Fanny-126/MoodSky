# MoodSky

MoodSky 是 12 人团队的原生 JavaScript 微信小程序项目。四个主页面为 Today、Campus、Weather Universe 和 Me。

这是团队开始开发用的基础版本：四页导航、共享变量、前后端接口骨架、分模块目录和自动检查已经建立。记录、导出、注销等业务仍待实现；未实现的接口明确返回 NOT_IMPLEMENTED，不会假装保存成功。当前仅系统健康检查和固定校园气象示意返回成功。

## 从这里开始

1. 阅读[组员开发步骤](docs/development.md)和[协作规定](CONTRIBUTING.md)。
2. 在[模块分工表](docs/team.md)找到自己的目录，在 GitHub Issues 领取或创建任务。
3. 对照[最终需求基线](docs/requirements.md)、[架构说明](docs/architecture.md)和[接口约定](docs/api.md)开始实现。

安装 Node.js 24，克隆仓库后执行：

```sh
git clone https://github.com/HX-Jan/MoodSky.git
cd MoodSky
npm ci
npm run setup
npm run check
```

然后使用微信开发者工具导入此目录。默认游客 AppID 和关闭的云服务适合查看四页骨架；真实云端联调需由负责人统一配置团队 AppID、测试云环境与平台成员权限，见[云配置步骤](docs/development.md#云端联调)。

## 目录与边界

| 目录                             | 用途                                                   |
| -------------------------------- | ------------------------------------------------------ |
| miniprogram/pages/               | 四个主页面；不要各自另建导航入口                       |
| miniprogram/modules/             | journal、review、campus、tasks、account 前端模块       |
| miniprogram/components/、styles/ | 公共组件与设计变量                                     |
| miniprogram/shared/              | 唯一共享来源：天气、标签、限制、日期、接口、错误和类型 |
| miniprogram/services/api.js      | 唯一云函数调用入口                                     |
| cloudfunctions/moodsky/domains/  | 按记录、回顾、校园、任务、账号和资料管理拆分的服务骨架 |
| database/                        | 集合、索引与客户端权限设计；尚未部署                   |
| admin/                           | 校园资料后台预留入口                                   |
| tests/                           | 接口、权限门禁、日期和输入边界测试                     |
| docs/、.github/                  | 团队文档、Issue/PR 模板、代码归属与 CI                 |

前端通过统一服务调用云函数；云函数从可信微信调用上下文取得身份，再检查内部账号、归属与运营权限。共享代码由命令复制进云函数部署目录，禁止手工维护第二份。

## 协作入口

main 是稳定分支。每人一个任务分支；通过 Pull Request 审核合并，使用 Squash 保持提交历史清晰。仓库主分支要求 quality 检查通过、至少一名有写权限的审核者批准，并处理完评审讨论；禁止强推和删除主分支。仓库管理员也遵守这些规则。

公开仓库让组员可以立即 Fork、开发并提交 PR。直接推送任务分支需要负责人邀请实际 GitHub 账号；访问公开仓库不会自动获得写权限。不要共享 GitHub 或微信主账号。

## 当前验证范围

npm run check 检查代码、格式、路由、24 项需求映射、共享代码一致性以及关键接口边界。CI 同时安装云 SDK 并检查入口加载。这些检查不能替代微信开发者工具真机检查、实际数据库权限验证和业务验收；当前尚未进行真实微信云环境部署。

项目采用原生小程序云函数调用方式，参考[腾讯云开发官方接入文档](https://docs.cloudbase.net/recipes/add-cloud-function-wechat-miniprogram)。分支保护依据 [GitHub 官方说明](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches)设置。
