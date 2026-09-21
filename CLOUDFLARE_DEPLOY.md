# Free Cloudflare deployment

This branch is prepared for Cloudflare Pages Functions + D1 + R2.

1. Create a Cloudflare Pages project from this GitHub repository, branch `cloudflare-free`.
2. Set the build output directory to `public`. No build command is required.
3. Create a D1 database named `kerala-operations` and bind it to the Pages project as `DB`.
4. Create an R2 bucket named `kerala-operations-data` and bind it as `DATASETS`.
5. Run the SQL in `migrations/0001_cluster_mapping.sql` against the D1 database.
6. Redeploy the Pages project.

Cloudflare Pages Functions supports D1 and R2 bindings for server-side API routes. The existing frontend already calls the matching /api endpoints.

The public site will receive a Cloudflare Pages URL such as:
https://<project-name>.pages.dev

This branch intentionally does not contain Cloudflare account IDs or secrets. Those must be supplied in the Cloudflare account that owns the deployment.
