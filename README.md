## Skill ZIP installer helper

This repo includes a helper script to install a Codex skill from a local ZIP file:

```bash
./scripts/install-skill-from-zip.sh /path/to/skill.zip [optional-skill-name]
```

Behavior:
- Installs into `${CODEX_HOME:-~/.codex}/skills/<skill-name>`.
- Fails if destination already exists.
- Detects `SKILL.md` either at ZIP root or one directory below root.
