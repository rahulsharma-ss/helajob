import strings from "../constants/language";

export function customPostRequest(body) {
  let languageCode =
    strings._language == "english"
      ? "en"
      : strings._language == "arabic"
      ? "ar"
      : strings._language == "greek"
      ? "el"
      : "en";

  return {
    method: "Post",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "X-localization": languageCode
    },
    body: JSON.stringify(body)
  };
}

export function customGet(token) {
  let languageCode =
    strings._language == "english"
      ? "en"
      : strings._language == "arabic"
      ? "ar"
      : strings._language == "greek"
      ? "el"
      : "en";

  return {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
      "X-localization": languageCode
    }
  };
}

export function zendeskGet(token) {
  let languageCode =
    strings._language == "english"
      ? "en"
      : strings._language == "arabic"
      ? "ar"
      : strings._language == "greek"
      ? "el"
      : "en";

  return {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Basic ${token}`,
      "X-localization": languageCode
    }
  };
}

export function zendeskPost(body, token) {
  let languageCode =
    strings._language == "english"
      ? "en"
      : strings._language == "arabic"
      ? "ar"
      : strings._language == "greek"
      ? "el"
      : "en";

  return {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      Accept: "application/json",
      Authorization: `Basic ${token}`,
      "X-localization": languageCode
    },
    body: JSON.stringify(body)
  };
}

export function customPost(body, token) {
  let languageCode =
    strings._language == "english"
      ? "en"
      : strings._language == "arabic"
      ? "ar"
      : strings._language == "greek"
      ? "el"
      : "en";

  return {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
      "X-localization": languageCode
    },
    body: JSON.stringify(body)
  };
}
