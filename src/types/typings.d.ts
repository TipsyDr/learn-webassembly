declare namespace API {
  /**
   *
   * @export
   * @interface ApiResponse
   */
  export interface ApiResponse {
    /**
     *
     * @type {number}
     * @memberof ApiResponse
     */
    code: string;
    /**
     *
     * @type {string}
     * @memberof ApiResponse
     */
    message?: string;
    /**
     *
     * @type {string}
     * @memberof ApiResponse
     */
    requsetId?: string;
    /**
     *
     * @type {boolean}
     * @memberof ApiResponse
     */
    success?: boolean;
  }

  /**
   *
   * @export
   * @interface Login
   */
  export interface Login {
    /**
     *
     * @type {string}
     * @memberof Login
     */
    token: string;
  }

  /**
   *
   * @export
   * @interface Pagination
   */
  export interface Pagination {
    /**
     *
     * @type {number}
     * @memberof Pagination
     */
    totalCount?: number;
    /**
     *
     * @type {number}
     * @memberof Pagination
     */
    currPage?: number;
    /**
     *
     * @type {number}
     * @memberof Pagination
     */
    totalPages?: number;
    /**
     *
     * @type {number}
     * @memberof Pagination
     */
    pageNumber?: number;
    /**
     *
     * @type {number}
     * @memberof Pagination
     */
    totalElements?: number;
    /**
     *
     * @type {number}
     * @memberof Pagination
     */
    pageSize?: number;
  }

  /**
   *
   * @export
   * @interface BagSetInfo
   */
  export interface BagSetInfo {
    /**
     *
     * @type {string}
     * @memberof BagSetInfo
     */
    bagSetId?: string;
    /**
     *
     * @type {string}
     * @memberof BagSetInfo
     */
    id?: number;
    /**
     *
     * @type {string}
     * @memberof BagSetInfo
     */
    fileNum?: number;
    /**
     *
     * 车牌号
     * @type {string}
     * @memberof BagSetInfo
     */
    carLicense?: string;
    /**
     *
     * @type {string}
     * @memberof BagSetInfo
     */
    startTime?: string;
    /**
     *
     * @type {string}
     * @memberof BagSetInfo
     */
    endTime?: string;
    /**
     *
     * 文件数量
     * @type {number}
     * @memberof BagSetInfo
     */
    size?: number;
    /**
     *
     * 持续时长
     * @type {number}
     * @memberof BagSetInfo
     */
    duration?: number;
    /**
     *
     * 文件大小
     * @type {number}
     * @memberof BagSetInfo
     */
    fileSize?: number;
    /**
     *
     * 系统版本
     * @type {string}
     * @memberof BagSetInfo
     */
    installVersion?: string;
    /**
     *
     * 地图版本
     * @type {string}
     * @memberof BagSetInfo
     */
    hdMapVersion?: string;
    /**
     *
     * 场景标签
     * @type {string[]}
     * @memberof BagSetInfo
     */
    sceneFeatures?: string[];
    /**
     *
     * 任务标签
     * @type {string[]}
     * @memberof BagSetInfo
     */
    taskType?: string[];
  }

  /**
   *
   * @export
   * @interface User
   */
  export interface User {
    /**
     *
     * @type {number}
     * @memberof User
     */
    id?: number;
    /**
     * 名称
     * @type {string}
     * @memberof User
     */
    username?: string;
    /**
     * 昵称
     * @type {string}
     * @memberof User
     */
    nickname?: string;
    /**
     * 密码
     * @type {string}
     * @memberof User
     */
    password?: string;
    /**
     * 手机号
     * @type {string}
     * @memberof User
     */
    mobile?: string;
    /**
     * 手机号验证是否通过 1 通过, 2 未通过
     * @type {number}
     * @memberof User
     */
    mobileVerified?: number;
    /**
     * 邮箱
     * @type {string}
     * @memberof User
     */
    email?: string;
    /**
     * 邮箱验证是否通过 1 通过, 2 未通过
     * @type {number}
     * @memberof User
     */
    emailVerified?: number;
    /**
     * 1 可用, 2 禁用, 3 注销
     * @type {number}
     * @memberof User
     */
    status?: number;
    /**
     * 性别 1 男, 2 女, 3 未知
     * @type {number}
     * @memberof User
     */
    gender?: number;
    /**
     * 地址
     * @type {string}
     * @memberof User
     */
    address?: string;
    /**
     * 最近一次登录IP地址
     * @type {string}
     * @memberof User
     */
    lastLoginIp?: string;
    /**
     * 最近一次登录时间
     * @type {string}
     * @memberof User
     */
    lastLoginTime?: string;
    /**
     * 登录次数
     * @type {number}
     * @memberof User
     */
    loginCount?: number;
    /**
     * 头像图片
     * @type {string}
     * @memberof User
     */
    avatar?: string;
    /**
     * 创建人ID
     * @type {number}
     * @memberof User
     */
    createBy?: number;
    /**
     * 修改人ID
     * @type {number}
     * @memberof User
     */
    updateBy?: number;
    /**
     *
     * @type {string}
     * @memberof User
     */
    createdAt?: string;
    /**
     *
     * @type {string}
     * @memberof User
     */
    updatedAt?: string;
    /**
     *
     * @type {string}
     * @memberof User
     */
    deletedAt?: string;
  }
  /**
   *
   * @export
   * @interface UserPagination
   */
  export interface UserPagination {
    /**
     * json repose code
     * @type {number}
     * @memberof UserPagination
     */
    code?: number;
    /**
     * total numbers
     * @type {number}
     * @memberof UserPagination
     */
    totalElements?: number;
    /**
     * offset
     * @type {number}
     * @memberof UserPagination
     */
    offset?: number;
    /**
     * limit
     * @type {number}
     * @memberof UserPagination
     */
    limit?: number;
    /**
     *
     * @type {Array<User>}
     * @memberof UserPagination
     */
    list?: Array<User>;
  }

  /**
   *
   * @export
   * @interface SceneDescriptionChild
   */
  export interface SceneDescriptionChild {
    /**
     *
     * @type {string}
     * @memberof SceneDescriptionChild
     */
    title?: string;
    /**
     *
     * @type {string}
     * @memberof SceneDescriptionChild
     */
    value?: string;
    /**
     *
     * @type {string}
     * @memberof SceneDescriptionChild
     */
    key?: string;
    /**
     *
     * @type {string}
     * @memberof SceneDescriptionChild
     */
    children?: Array<SceneDescriptionChild>;
  }
}
