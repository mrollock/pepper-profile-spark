

# Plan: Pepper Sauce Profile v1.0 → v1.2 Update

**STATUS: IMPLEMENTED**

All changes from the v1.2 update have been applied:

## Completed

- ✅ 1A. Item 21 text revised
- ✅ 1B. New Scoville Gate item 29 (substance use/numbing) inserted
- ✅ 1C. Fire items renumbered 30–34
- ✅ 1D. Fire option display orders rotated (31: C,D,E,A,B · 32: E,A,B,C,D · 33: B,C,D,E,A)
- ✅ 1E. getConditionLabel handles id 29
- ✅ 1F. getPrimaryFireType uses [30,31,32,33]
- ✅ 1G. getChronicFireType uses responses[34]
- ✅ 2A. Scoville gate checks [6,17,24,29]
- ✅ 2B. Two-table submission (quiz_submissions + anonymous_responses)
- ✅ 2C. Landing says "34 items"
- ✅ 2D. Privacy statement added below email inputs
- ✅ 2E. Modular per-gate Scoville results (988, DV Hotline, SAMHSA)
- ✅ 2F. Educational-purpose framing at top of results
- ✅ 2G. FIRE_CONDITION_MAP expanded (C→2, D→4, E→5)
- ✅ 3A. anonymous_responses table created (insert-only RLS)
- ✅ 3B. Gate boolean columns added to quiz_submissions
- ✅ 3C. Item-level columns dropped from quiz_submissions
