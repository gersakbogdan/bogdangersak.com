# Cloudflare deployment

## Current setup

The application is a static Astro site. Wrangler uploads only `dist/`; there is no Worker script, database, or server-rendered code.
The repository and Cloudflare account still need to be connected. No deployment is recorded yet.

Use the Free plan. Dependencies are locked, Node 22 is selected in .nvmrc, and npm run build checks the content and types.

## 1. GitHub

Create a public repository named `bogdangersak.com` under the intended account.
Initialize this local project on main, review the files being committed, and push them to that repository.
Enable Discussions in repository Settings.

Install [giscus](https://github.com/apps/giscus) for this repository only.
Use [giscus.app](https://giscus.app/) to select the repository and an Announcements-type category.
Copy the exact repository node ID and category ID into `src/config/community.json`.
Also fill in `repository` as owner/repository. These IDs are public configuration, not secrets.

The component uses pathname mapping with strict matching. Keep published URLs stable.
The allowed production domains are listed in .giscus.json. Add the exact workers.dev hostname there if comments should be tested on that hostname.

## 2. Cloudflare

Sign in to the intended Cloudflare account. For CLI deployment:

```sh
npx wrangler login
npx wrangler whoami
npm run deploy:check
npm run deploy
```

deploy:check builds the site and validates the upload configuration without publishing.
deploy builds and uploads to the worker named bogdangersak-com.
If the account already has a Worker with that name, inspect it before deployment rather than overwriting an unrelated project.
If multiple accounts are available, select the intended account explicitly.

For automatic updates, connect this Worker to its GitHub repository in Cloudflare:
- Production branch: main
- Build command: npm run build
- Deploy command: npx wrangler deploy
- Root directory: repository root
- Node version: 22

Future pushes to main then build and deploy automatically.
A failed build must be fixed before the update is published.

## 3. Domain

WHOIS and DNS checked on 2026-09-23:
- Registrar: Namecheap
- Nameservers: dns1.registrar-servers.com and dns2.registrar-servers.com
- Apex A record: 162.255.119.237
- MX records use Namecheap email forwarding. The owner confirmed on 2026-09-23 that no @bogdangersak.com email service is used; no mailbox or forwarding migration is needed.
- TXT: v=spf1 include:spf.efwd.registrar-servers.com ~all
- www CNAME: parkingpage.namecheap.com.

Keep registration at Namecheap. Add bogdangersak.com as a Cloudflare zone on the Free plan.
Review the entire existing DNS zone in Namecheap and copy all required records into Cloudflare before changing nameservers.
Public queries are not a complete inventory of every subdomain or mail record.
Namecheap documents free forwarding as available only on its BasicDNS, PremiumDNS, or FreeDNS nameservers. Confirm whether any forwarding aliases are in use. If they are, arrange replacement forwarding before the nameserver switch; copying MX records alone is not sufficient.
Reference: https://www.namecheap.com/support/knowledgebase/article.aspx/308/2214/how-to-set-up-free-email-forwarding/

Cloudflare will assign two nameservers. Set exactly those nameservers in Namecheap's domain settings.
Wait for the Cloudflare zone to become active.

In the Worker's Settings > Domains & Routes, add bogdangersak.com as a Custom Domain.
Cloudflare provisions its DNS record and certificate.
Once the active zone and existing records have been verified, optionally add the custom domain to wrangler.jsonc:
```json
"routes": [{ "pattern": "bogdangersak.com", "custom_domain": true }]
```

Configure www to redirect to the canonical apex domain if desired.
Verify HTTPS, navigation, an article, the 404 page, comment loading, and existing email service.

## References

- [Workers Static Assets](https://developers.cloudflare.com/workers/static-assets/)
- [Git integration and Builds](https://developers.cloudflare.com/workers/ci-cd/builds/)
- [Custom domains](https://developers.cloudflare.com/workers/configuration/routing/custom-domains/)
- [giscus configuration](https://giscus.app/)
