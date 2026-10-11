# 资料维护后台

主责：Junhan Huang；数据结构与权限复核：Xiang Yu；权限测试：Qizhen Cai。

本目录预留独立资料后台。首版只维护地点、任务模板、支持资源和纠错审核；后台业务界面尚未实现。管理接口入口在 cloudfunctions/moodsky/domains/admin.js。

开始实现前先在 Issue 中确认登录方式、运营角色查询和输入输出结构，复用共享接口约定。运营员不得读取私人天气、正文、微信身份映射或导出文件。不能通过客户端传入 role 或 ownerId 获取权限。
