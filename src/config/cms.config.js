/**
 * CMS集成配置文件
 * 支持Strapi和Contentful，可通过环境变量切换
 *
 * 环境变量：
 * - REACT_APP_USE_CMS: 是否启用CMS (true/false)
 * - REACT_APP_CMS_PROVIDER: CMS提供商 (strapi/contentful)
 * - REACT_APP_CMS_URL: CMS API URL
 * - REACT_APP_CMS_API_KEY: CMS API密钥（Contentful需要）
 * - REACT_APP_CMS_SPACE_ID: Contentful Space ID
 */

// ===== CMS提供商配置 =====

export const CMS_PROVIDERS = {
  STRAPI: "strapi",
  CONTENTFUL: "contentful",
  LOCAL: "local"
};

// 当前CMS配置
export const cmsConfig = {
  enabled: process.env.REACT_APP_USE_CMS === "true",
  provider: process.env.REACT_APP_CMS_PROVIDER || CMS_PROVIDERS.LOCAL,
  baseUrl: process.env.REACT_APP_CMS_URL || "http://localhost:1337",
  apiKey: process.env.REACT_APP_CMS_API_KEY || "",
  spaceId: process.env.REACT_APP_CMS_SPACE_ID || "",
  timeout: 5000,
  retryAttempts: 3,
  retryDelay: 1000
};

// ===== Strapi配置 =====

export const strapiConfig = {
  apiVersion: "api",
  endpoints: {
    articles: "/articles",
    photos: "/photos",
    videos: "/videos",
    gameProjects: "/game-projects",
    workExperiences: "/work-experiences",
    education: "/education"
  },
  populateFields: {
    articles: "?populate=*",
    photos: "?populate=*",
    videos: "?populate=awards",
    gameProjects: "?populate=screenshots,milestones"
  }
};

/**
 * 构建Strapi API URL
 * @param {string} endpoint - 端点名称
 * @param {Object} params - 查询参数
 * @returns {string} 完整URL
 */
export const buildStrapiUrl = (endpoint, params = {}) => {
  if (!cmsConfig.enabled || cmsConfig.provider !== CMS_PROVIDERS.STRAPI) {
    return "";
  }

  let url = `${cmsConfig.baseUrl}/${strapiConfig.apiVersion}${strapiConfig.endpoints[endpoint]}`;

  // 添加populate字段
  if (strapiConfig.populateFields[endpoint]) {
    url += strapiConfig.populateFields[endpoint];
  }

  // 添加查询参数
  const queryParams = new URLSearchParams(params);
  if (queryParams.toString()) {
    url += (url.includes("?") ? "&" : "?") + queryParams.toString();
  }

  return url;
};

// ===== Contentful配置 =====

export const contentfulConfig = {
  endpoints: {
    entries: "/entries",
    assets: "/assets"
  },
  contentTypes: {
    article: "article",
    photo: "photo",
    video: "video",
    gameProject: "gameProject",
    workExperience: "workExperience",
    education: "education"
  }
};

/**
 * 构建Contentful API URL
 * @param {string} contentType - 内容类型
 * @param {Object} params - 查询参数
 * @returns {string} 完整URL
 */
export const buildContentfulUrl = (contentType, params = {}) => {
  if (!cmsConfig.enabled || cmsConfig.provider !== CMS_PROVIDERS.CONTENTFUL) {
    return "";
  }

  const baseUrl = `https://cdn.contentful.com/spaces/${cmsConfig.spaceId}/environments/master`;
  const queryParams = new URLSearchParams({
    access_token: cmsConfig.apiKey,
    content_type: contentfulConfig.contentTypes[contentType],
    ...params
  });

  return `${baseUrl}${
    contentfulConfig.endpoints.entries
  }?${queryParams.toString()}`;
};

// ===== 通用CMS请求方法 =====

/**
 * 发起CMS请求
 * @param {string} url - 请求URL
 * @param {Object} options - fetch选项
 * @returns {Promise<Object>} 响应数据
 */
export const fetchFromCMS = async (url, options = {}) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), cmsConfig.timeout);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
      headers: {
        "Content-Type": "application/json",
        ...options.headers
      }
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(
        `CMS API error: ${response.status} ${response.statusText}`
      );
    }

    return await response.json();
  } catch (error) {
    clearTimeout(timeoutId);

    if (error.name === "AbortError") {
      throw new Error("CMS request timeout");
    }

    throw error;
  }
};

/**
 * 带重试的CMS请求
 * @param {Function} requestFn - 请求函数
 * @param {number} attempts - 重试次数
 * @returns {Promise<Object>} 响应数据
 */
export const fetchWithRetry = async (
  requestFn,
  attempts = cmsConfig.retryAttempts
) => {
  try {
    return await requestFn();
  } catch (error) {
    if (attempts <= 1) {
      throw error;
    }

    // 等待后重试
    await new Promise(resolve => setTimeout(resolve, cmsConfig.retryDelay));
    return fetchWithRetry(requestFn, attempts - 1);
  }
};

// ===== CMS健康检查 =====

/**
 * 检查CMS是否可用
 * @returns {Promise<boolean>}
 */
export const checkCMSHealth = async () => {
  if (!cmsConfig.enabled) {
    return false;
  }

  try {
    let healthUrl;

    if (cmsConfig.provider === CMS_PROVIDERS.STRAPI) {
      healthUrl = `${cmsConfig.baseUrl}/_health`;
    } else if (cmsConfig.provider === CMS_PROVIDERS.CONTENTFUL) {
      healthUrl = buildContentfulUrl("article", {limit: 1});
    }

    if (!healthUrl) return false;

    const response = await fetch(healthUrl, {
      method: "GET",
      signal: AbortSignal.timeout(3000)
    });

    return response.ok;
  } catch (error) {
    console.warn("CMS health check failed:", error);
    return false;
  }
};

// ===== 数据转换器 =====

/**
 * 转换Strapi响应为统一格式
 * @param {Object} strapiData - Strapi响应数据
 * @returns {Array|Object} 标准化数据
 */
export const transformStrapiResponse = strapiData => {
  if (Array.isArray(strapiData.data)) {
    return strapiData.data.map(item => ({
      id: item.id,
      ...item.attributes
    }));
  }

  return {
    id: strapiData.data.id,
    ...strapiData.data.attributes
  };
};

/**
 * 转换Contentful响应为统一格式
 * @param {Object} contentfulData - Contentful响应数据
 * @returns {Array|Object} 标准化数据
 */
export const transformContentfulResponse = contentfulData => {
  return contentfulData.items.map(item => ({
    id: item.sys.id,
    ...item.fields
  }));
};

export default {
  cmsConfig,
  CMS_PROVIDERS,
  buildStrapiUrl,
  buildContentfulUrl,
  fetchFromCMS,
  fetchWithRetry,
  checkCMSHealth,
  transformStrapiResponse,
  transformContentfulResponse
};
