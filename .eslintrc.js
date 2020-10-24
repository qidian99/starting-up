module.exports = {
  "extends": [
    "react-app",
  ],
  "rules": {
    "additional-rule": "warn"
  },
  "overrides": [
    {
      "files": [
        "**/*.ts?(x)",
        "**/*.js?(x)"
      ],
      "rules": {
        "no-unused-vars": "off"
      }
    }
  ]
}
