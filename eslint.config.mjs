import next from "eslint-config-next"

export default next.map((config) => {
  if (!("rules" in config)) return config
  return {
    ...config,
    rules: {
      ...config.rules,
      // This codebase intentionally uses effects for localStorage hydration.
      "react-hooks/set-state-in-effect": "off",
      "react-hooks/purity": "off",
      // Copywriting often includes quotes/apostrophes in JSX.
      "react/no-unescaped-entities": "off",
    },
  }
})

