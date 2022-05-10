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

### 查询好友

**Path：** /chat/search/:id

**Method：** get

**接口描述：**

#### 请求参数

**无**

#### 返回数据
| 参数名称 | 类型 | 是否必须 | 默认值        | 备注   |
| -------- | -------- | -------- | ----------- | ------ |
| status   | number     | 是       | 无 | 查询状态 |
| searchUser   | Array     | 是       | 无 | 查询结果数据 |
| -id   | number    | 是       | 无 | 用户id |
| -username   | string    | 是       | 无 | 用户名称 |
| -mobile   | string    | 是       | 无 | 手机号 |
| -birthday   | string    | 否       | null | 生日 |
| -create_time   | string    | 是       | null | 创建账号时间 |
| -sex   | string    | 是      | 无 | 性别 |
| -sign   | string    | 是      | null | 个性签名 |

### 添加好友

**Path：** /chat/addfriend/

**Method：** post

**接口描述：** 


#### 请求参数

**Query**

| 参数名称 | 是否必须 | 示例        | 备注   |
| -------- | -------- | ----------- | ------ |
| toekn   | 是       | "XXX.XXX.XXX" | 用户登录唯一凭证 |
| id   | 是       | 1 | 要添加的用户id |

### 返回数据

| 参数名称 | 类型 | 是否必须 | 默认值        | 备注   |
| -------- | -------- | -------- | ----------- | ------ |
| status   | number     | 是       | 无 | 查询状态 |
| searchUser   | Array     | 是       | 无 | 查询结果数据 |
| -id   | number    | 是       | 无 | 用户id |
| -username   | string    | 是       | 无 | 用户名称 |
| -mobile   | string    | 是       | 无 | 手机号 |
| -birthday   | string    | 否       | null | 生日 |
| -create_time   | string    | 是       | null | 创建账号时间 |
| -sex   | string    | 是      | 无 | 性别 |
| -sign   | string    | 是      | null | 个性签名 |

### 获取好友申请数据

**Path：** /chat/applylist/

**Method：** post

**接口描述：** 


#### 请求参数

**Query**

| 参数名称 | 是否必须 | 示例        | 备注   |
| -------- | -------- | ----------- | ------ |
| toekn   | 是       | "XXX.XXX.XXX" | 用户登录唯一凭证 |
| apply_list   | 是       | { myApply: [ 2, 3 ], apllyToMe: [] } | 传递好友申请列表信息 |

### 返回数据

| 参数名称 | 类型 | 是否必须 | 默认值        | 备注   |
| -------- | -------- | -------- | ----------- | ------ |
| status   | number     | 是       | 无 | 查询状态 |
| msg   | string     | 是       | 无 | 查询结果说明 |
| data   | Object    | 是       | 无 | 查询结果 |
| -myApply   | Array    | 是       | [] | 我申请的好友列表 |
| -applyToMe   | Array    | 是       | [] | 向我申请的好友列表 |