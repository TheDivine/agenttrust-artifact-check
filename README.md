# AgentTrust Artifact Check

Experimental local artifact inspection and digest-bound review. MIT; Node.js 24+; no dependencies or installation step.

```sh
npm test
npm run demo
node src/cli.mjs approve examples/artifact approval.json local-reviewer
node src/cli.mjs verify examples/artifact approval.json
```

Changing bytes or file paths invalidates approval. The record must be outside the inspected directory; existing records are never overwritten. Review findings require `--ack-review` after human review. HIGH findings cannot be approved.

## What is implemented

Deterministic SHA-256 file manifest, simple static heuristics for fetch-to-shell, instruction override, dynamic evaluation, sensitive paths and lifecycle hooks. Directory inputs only; symlinks and special files rejected. Limits: 1,000 files, 1 MiB per file, 8 MiB total. Root `.git` excluded. Binary content requires review.

CLI exits: 0 success/no findings, 1 input/error, 2 blocked/invalid approval, 3 review required. API exports `inspect(root)`, `approve(root, recordPath, reviewerLabel, acknowledgeReview=false)`, `verifyArtifact(root, record)`.

## Trust boundaries

No findings does not mean malware-free. This is not an antivirus, provenance verifier, dependency scanner or sandbox. It never runs inspected code. Approval is an unsigned local record, and reviewer is only a label. An attacker who can modify the trusted record can forge approval. Keep records and the inspector outside attacker control. Use a quiescent local directory; concurrent changes and inspection-to-execution races are not prevented. File modes, extended attributes and empty directories are not covered. Installed dependencies and archives are not resolved.

## Project status

Initial experimental prototype extracted from [AgentTrust Spend Demo](https://github.com/TheDivine/agenttrust-spend-demo), commit `920142ad4be65a37e4e9c35fa1a50e44f9feff2e`. Not production certified. Next: immutable snapshots, authenticated signed reviews, provenance adapters and integration with dedicated scanners. Blockchain anchoring is outside this version.
