module.exports = {
  "extends": [
    "react-app",
  ],
  "rules": {
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
