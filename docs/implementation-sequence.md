# Implementation sequence

These 60 pull requests form an ordered stack. Each branch is based on the preceding one so the review diff stays focused. Review and merge from 01 upward, retargeting each next pull request to `main` after its predecessor merges. Prefer merge commits for the stack; squash or rebase merging changes ancestry and may require restacking descendants. Do not delete predecessor branches until dependent pull requests have been retargeted. The final branch contains the complete starter. No pull requests are merged automatically.

1.  Scaffold the React and Cloudflare application
2.  Centralize the public brand configuration
3.  Preserve the licenses for reusable source code
4.  Introduce reusable color and spacing tokens
5.  Set fluid typography and readable content widths
6.  Add an accessible shared navigation shell
7.  Add a configurable footer and sample-content notice
8.  Build an original homepage hero
9.  Create typed example services and reusable cards
10. Build the sample services page
11. Build a generic about page
12. Create the contact page and configurable email fallback
13. Provide an explicitly unfinished privacy-policy worksheet
14. Provide a terms-of-use worksheet
15. Create a helpful not-found page
16. Add a recoverable client error boundary
17. Add an accessible route-loading state
18. Configure page titles and social metadata
19. Create an original SVG favicon
20. Expose configurable crawler rules
21. Generate a sitemap for public pages
22. Add a progressively enhanced FAQ
23. Build an illustrative project estimator
24. Build a reusable milestone timeline
25. Build accessible sample metric bars
26. Adapt the interactive workflow diagram with fictional content
27. Add a generic layered architecture diagram
28. Assemble a chart and interaction gallery
29. Adapt the layout for phones and narrow screens
30. Respect reduced motion and support printing
31. Extract shared contact validation
32. Build configurable enquiry email messages
33. Bound and validate streamed JSON request bodies
34. Introduce the configurable contact API handler
35. Fail closed when contact rate limiting is unavailable
36. Reject bot honeypot submissions
37. Wire the Worker to configurable email delivery and demo mode
38. Connect a reusable contact form to the backend
39. Handle slow contact requests without losing form contents
40. Announce form outcomes and prevent accidental duplicate submissions
41. Test contact security and backend failure paths
42. Test email composition and streamed body boundaries
43. Define an optional public catalogue database schema
44. Add the catalogue migration and fictional seed data
45. Implement a bounded published-resource query
46. Expose the opt-in read-only catalogue endpoint
47. Test catalogue visibility and database failure behavior
48. Validate deployment identity and live email configuration
49. Scan distributable files for source content and secrets
50. Document local setup and demo behavior
51. Document branding and content customization
52. Document Cloudflare deployment and email activation
53. Document opt-in database setup and public-data boundaries
54. Document application architecture and extension points
55. Add contribution guidance and focused review templates
56. Run template checks in GitHub Actions
57. Test the built Worker public routes
58. Apply baseline HTTP security headers
59. Document accessibility checks and the security reporting boundary
60. Finish the template guide and ordered pull-request map
