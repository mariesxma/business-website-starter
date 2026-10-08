# Security

Do not post credentials, real enquiry contents, or private customer data in public issues. Use GitHub's private vulnerability reporting if it is enabled for the repository; otherwise contact the maintainer through a verified channel before sharing sensitive details.

The starter validates contact input, checks the configured origin, bounds request bodies, uses fixed server-side recipients, and fails closed on rate-limit errors. These are baseline controls, not a guarantee against spam or abuse. The contact endpoint is public and origin headers are not authentication.

There is no user authentication or private-data API. The optional catalogue exposes published records only. Add authorization before introducing private data or management operations.

Keep dependencies current and review provider documentation before live deployment. Do not commit secrets or local environment files.
