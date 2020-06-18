// URL constants for appliation
// Live Server URLS
export const SERVER_URL = "https://portal.helajob.com/api/v1/"; // Server URL
export const IMAGE_URL = "https://portal.helajob.com/img/"; // Image URL
export const PROFILE_IMG_URL = "https://portal.helajob.com/"; // Profile image URL

// export const SERVER_URL = "http://34.211.31.84:7039/api/v1/"; // Server URL

export const GRAPH_API =
  "https://graph.facebook.com/v2.5/me?fields=email,first_name,last_name,name,picture&access_token="; // Facebook graph api

export function qrUrl(type) {
  switch (type) {
    case 0:
      return "service/requestQRForServiceBreakStart"; //Break start
    case 1:
      return "service/requestQRForServiceEnd"; //Service end
    case 2:
      return "service/requestQRForServiceBreakEnd"; //Break end
    case 3:
      return "service/requestQRForServiceStart"; //service start
    default:
      return alert("invalid type");
  }
}
