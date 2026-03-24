# Write-up — Collaborative Board Activity Explorer

## Planning and scope

I spent about **15 minutes** reading the requirements carefully, then sketched the pages I would need and a rough UI for each. I settled on a **home page** listing the user’s boards and a **board page** where the user can explore activity: view, filter, and sort notes.

Three areas I wanted to keep in sight throughout: **UX**, **accessibility**, and **performance**.

## UX — what I optimized for

- The user can see which boards are available and open one.
- On a board, the user can see the notes and **filter** and **sort** them.
- Filter and sort controls stay **visible** even when the list is long (sticky header with the controls, scrollable note area below).

## Accessibility

I aimed for:

- **Semantic HTML** where it mattered (e.g. `main`, `section`, `header`, `search`, `article` for each note).
- **Keyboard access** for interactive controls.
- **Visible focus** and a focus order that matches reading order (left–right, top–bottom).
- **Labels** tied to inputs so screen readers get proper names (e.g. comboboxes for filters).

## Performance

My main concern was boards with **many** note cards. I first thought about **lazy loading** as you scroll. After some quick research, it still looked like you could end up with a **large DOM** once the user has scrolled through a lot—so I switched to **window virtualization**: only render what’s on screen (plus a small overscan), recycle rows as you scroll, instead of mounting every card at once.

## Stack choices

**Next.js (App Router)** fit the exercise well: **Route Handlers** for JSON, **server-side rendering** for the initial load, room for a virtualization library, and a straightforward path to unit and e2e tests. **Tailwind** for styling—I’m not a big fan of utility-class workflows, but it’s fast when there’s no fixed design system to match, and styling wasn’t the main point of the task.

## Implementation plan (high level)

1. Repo + scaffolding with the chosen tools.
2. Routes for pages and APIs, load data, **provisional UI** to prove virtualization and scrolling.
3. Filter/sort (and related state) on the board view.
4. Reusable UI pieces for repeated patterns, then style pass.
5. Unit tests, e2e tests, and basic automated accessibility checks.

## Frontend architecture (summary)

- **Data:** two HTTP endpoints (backed by static JSON): board list, and notes + metadata per board.
- **Pages:** home (board list) and dynamic board page (notes + controls).
- **State:** board data is fetched on the server and passed into the client board view; **filter, sort, and grid/virtualizer layout** use **local React state** (`useState`, `useMemo` for the derived note list)—no global store. Filters aren’t synced to the URL yet; I’d revisit that if shareable views mattered.
- **UI:** shared components for links, buttons, selects, and the note card.
- **Layout:** responsive grid for notes; controls reflow on smaller widths.
- **Performance:** SSR for pages + **window virtualization** for the note grid.
- **Accessibility:** semantics, keyboard use, labels; **axe** on main flows in e2e plus manual spot-checks where it helped.

## Trade-offs and what I’d do next

- **Sort by creation time / “recent” highlights:** the brief lists sorting by creation time and highlighting recent notes as examples. I didn’t implement those yet. I’m treating **`createdAt` as a timestamp** (ISO string in hydrated data) because the name strongly suggests “created at”; the sample JSON uses an empty string, so that’s an **assumption** I’d confirm with product/engineering in a real project.
- **Virtualization vs screen readers:** only a subset of notes exists in the DOM at once. That’s normal for virtual lists, but I’d **research** whether we need live-region announcements or another pattern so assistive tech users aren’t surprised—possibly out of scope for a short exercise, but worth a proper pass later.
- **Mobile:** on small viewports the control block uses a lot of vertical space. **Collapsible filters** (or a single “Filters” disclosure) would help.
- **Visual design:** generic gray/neutral look, not tied to any real product skin.

## AI tooling

I used **Cursor** in **Plan** mode early on to sanity-check tooling and direction against the brief, and **Agent** mode for a large share of the implementation—especially **scaffolding** and the **testing** setup—while I reviewed diffs and kept decisions mine (stack, UX, what to ship vs defer).

For **this document**, I wrote the substance myself (my notes and decisions); I used **Cursor** mainly to tighten wording, fix English, and catch small mistakes—not to invent the process or the trade-offs.

## Time (honor system, ~4 hours total)

| Phase                      | Approx. time | Notes                                                                                                  |
| -------------------------- | ------------ | ------------------------------------------------------------------------------------------------------ |
| Requirements & plan        | 15 min       | Read brief, sketch routes and “done”                                                                   |
| Core vertical slice        | ~70 min      | Catalog/API wiring, home + board, first working UI                                                     |
| Virtualization & grid      | ~55 min      | Window virtualizer, layout math, sticky header                                                         |
| Filters, sort, empty state | ~40 min      | Author/color/order, reset, extracted sort/filter helpers, empty message, remeasure hooks               |
| Polish & hardening         | ~30 min      | Layout/overflow fixes, `components/ui`, shared note colors, semantics, small self-review fixes         |
| Testing                    | ~15 min      | Vitest + Playwright + axe wired; unit/API/component tests; happy-path e2e; serious/critical axe checks |

**Total:** about **4 hours** including the initial read and plan.
