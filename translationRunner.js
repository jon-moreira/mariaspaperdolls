const path = require("path");
const manageTranslations = require("react-intl-translations-manager").default;

manageTranslations({
  messagesDirectory: path.join(__dirname, "src/i18n/"),
  translationsDirectory: path.join(__dirname, "src/i18n/"),
  languages: ["en", "pt"] // any language you need
});