# @biliy/cli

Bilibili command line tool:
- convert bvid to avid
- download danmaku in xml and ass formats

## Installation

```bash
pnpm add @biliy/cli -g
```

## Usage

```bash
> biliy help b2a

Usage: biliy b2a [options] <bvid>

convert bvid to aid

Arguments:
  bvid        such as BV1eW4y1W72d

Options:
  -h, --help  display help for command
```

```bash
> biliy help dm

Usage: biliy dm [options] <value>

download danmaku in XML and ASS formats

Arguments:
  value       videoURL or bvid

Options:
  -h, --help  display help for command
```