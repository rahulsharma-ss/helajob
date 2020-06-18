// export const myLanguage = "english"; // Change here to make changes throghout the app

import LocalizedStrings from "react-native-localization";
import arabic from "../utilities/languages/arabic.json";
import english from "../utilities/languages/english.json";
import greek from "../utilities/languages/greek.json";

const strings = new LocalizedStrings({
  english,
  arabic,
  greek
});

export default strings;
