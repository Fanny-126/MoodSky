# 模块分工与共同修改范围

按 2026-10-11 最终博客与项目计划建立，职责与原材料一致。姓名是团队职责标识；没有据此猜测 GitHub 账号。

| 成员          | 主责目录与成果                                                                               |
| ------------- | -------------------------------------------------------------------------------------------- |
| Xiang Hong    | 项目经理、后端集成；cloudfunctions/moodsky/domains/journal.js、review.js；记录和回顾 F01—F10 |
| Junhan Huang  | 后端校园服务；domains/campus.js、admin.js；地点/支持资料 F11—F16 和资料维护后台              |
| Jiawei Fang   | 后端任务与数据管理；domains/tasks.js、account.js；F17—F23                                    |
| Linghan Chen  | 小程序结构、公共组件、导航；pages/me、F21—F24 的前端，配合 Campus 模拟内容                   |
| Yifan Ji      | pages/today、modules/journal；记录 F01—F04 与轻选择 F20                                      |
| Zhifeng Dai   | pages/universe、modules/review；回顾、月份档案、卡片与静态装饰 F05—F10                       |
| Qinghan Zhang | pages/campus、modules/campus；校园地点、支持资料 F11—F16                                     |
| Qizhen Chen   | modules/tasks；小任务 F17—F19、前端集成与联调                                                |
| Jiaqi Zhu     | styles/tokens.wxss、公共视觉规范、四页原型和设计素材审核                                     |
| Xiang Yu      | database/、shared/types.d.ts；集合、字段、唯一规则、索引、权限与恢复规则                     |
| Yuen Lin      | tests/；功能、集成、兼容、异常流程与回归验证                                                 |
| Qizhen Cai    | tests/；账号隔离、运营权限、导出/删除、性能与可用性验证                                      |

任务 UI 由 Qizhen Chen 在 modules/tasks 内建设，再由集成人与 Today/Me 页面负责人协商嵌入，不增加第五个主标签页。F20 独立轻选择入口不依赖先保存日记。

共享修改需要共同复核：

| 文件或范围                                                    | 应参与的成员                                  |
| ------------------------------------------------------------- | --------------------------------------------- |
| shared/constants.js、contracts.js、validation.js、docs/api.md | Xiang Hong、Qizhen Chen、相关前后端、Xiang Yu |
| app.json、app.js、公共组件                                    | Linghan Chen、Qizhen Chen、相关页面负责人     |
| database/、账号与删除/导出流程                                | Xiang Yu、Jiawei Fang、Xiang Hong、Qizhen Cai |
| 设计变量与共用样式                                            | Jiaqi Zhu、相关前端                           |
| CI、依赖、仓库保护                                            | Xiang Hong，必要时请测试成员复核              |

CODEOWNERS 当前只使用已知的真实账号 @HX-Jan，覆盖协作基础设施与共享边界。组员提供账号且获写权限后，由负责人通过 PR 按本表补齐模块归属；不会把姓名写成无效 GitHub 用户。
