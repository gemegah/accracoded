#!/usr/bin/env bash
set -euo pipefail

if [[ $# -lt 1 || $# -gt 2 ]]; then
  echo "Usage: $0 <path-to-skill-zip> [skill-name]" >&2
  exit 1
fi

ZIP_PATH="$1"
SKILL_NAME="${2:-}"
CODEX_HOME_DIR="${CODEX_HOME:-$HOME/.codex}"
DEST_ROOT="$CODEX_HOME_DIR/skills"

if [[ ! -f "$ZIP_PATH" ]]; then
  echo "Error: ZIP not found at '$ZIP_PATH'" >&2
  exit 2
fi

TMP_DIR="$(mktemp -d)"
cleanup() {
  rm -rf "$TMP_DIR"
}
trap cleanup EXIT

unzip -q "$ZIP_PATH" -d "$TMP_DIR"

if [[ -z "$SKILL_NAME" ]]; then
  if [[ -f "$TMP_DIR/SKILL.md" ]]; then
    SKILL_NAME="$(basename "$ZIP_PATH" .zip)"
  else
    FIRST_SKILL="$(find "$TMP_DIR" -mindepth 2 -maxdepth 2 -type f -name SKILL.md | head -n 1 || true)"
    if [[ -z "$FIRST_SKILL" ]]; then
      echo "Error: could not find SKILL.md in ZIP contents" >&2
      exit 3
    fi
    SKILL_NAME="$(basename "$(dirname "$FIRST_SKILL")")"
  fi
fi

mkdir -p "$DEST_ROOT"
DEST_DIR="$DEST_ROOT/$SKILL_NAME"

if [[ -e "$DEST_DIR" ]]; then
  echo "Error: destination already exists: $DEST_DIR" >&2
  exit 4
fi

if [[ -f "$TMP_DIR/SKILL.md" ]]; then
  mkdir -p "$DEST_DIR"
  cp -a "$TMP_DIR/." "$DEST_DIR/"
else
  SRC_DIR="$(dirname "$(find "$TMP_DIR" -mindepth 2 -maxdepth 2 -type f -name SKILL.md | head -n 1)")"
  cp -a "$SRC_DIR" "$DEST_DIR"
fi

echo "Installed skill '$SKILL_NAME' to $DEST_DIR"
echo "Restart Codex to pick up new skills."
