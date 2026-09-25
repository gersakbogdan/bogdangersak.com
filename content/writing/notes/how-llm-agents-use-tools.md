---
title: How LLM agents actually use tools
description: Following a tool call from the model's request to the next step in the loop.
type: note
topics: [ai, engineering]
status: draft
created: 2026-09-23
---

This is a working outline for a note, ready to expand with a concrete example.

## The question

What happens between an agent deciding it needs a tool and receiving a result?

Trace one small example end to end. Capture the request, the tool arguments, the execution, and the response the model sees.

## What to investigate

- Which part of the application actually executes the tool?
- Where are permissions, validation, and errors handled?
- What state survives the next iteration?
- How does the loop know when to stop?

## Next step

Build a minimal example and annotate its event log before drawing conclusions.
