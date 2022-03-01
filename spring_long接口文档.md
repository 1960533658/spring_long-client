# spring_long接口文档

## 用户user

### 登录 账户名-密码
**Path：** /user/login

**Method：** POST

**接口描述：**
#### 请求参数

**Query**

| 参数名称 | 是否必须 | 示例        | 备注   |
| -------- | -------- | ----------- | ------ |
| username   | 是       | kangkang | 用户名 |
| password   | 是       | kangkang | 密码 |

#### 返回数据

| 参数名称 | 类型 | 是否必须 | 默认值        | 备注   |
| -------- | -------- | -------- | ----------- | ------ |
| status   | number     | 是       |  | 登陆后端状态 |
| msg   | string     | 是       |  | 登录状态 |
| userInfo   | object    | 是       |  | token |

### 注册
**Path：** /user/regist

**Method：** POST

**接口描述：**
#### 请求参数

**Query**

| 参数名称 | 是否必须 | 示例        | 备注   |
| -------- | -------- | ----------- | ------ |
| username   | 是       | kangkang | 用户名 |
| password   | 是       | kangkang | 密码 |
| mobile   | 是       | 13111111111 | 手机号 |

#### 返回数据

| 参数名称 | 类型 | 是否必须 | 默认值        | 备注   |
| -------- | -------- | -------- | ----------- | ------ |
| status   | number     | 是       |  | 注册状态 |
| msg   | string     | 是       |  | 登录状态文字描述 |
| userInfo   | object    | 是       |  | 用户自动登录 |