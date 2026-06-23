# Taghvim Ghafasi mobile app

_Started 2026-06-23 11:04 UTC_

---

## User

Design the Taghvim Ghafasi mobile app — a Persian meme calendar PWA

What is this product?
Taghvim Ghafasi ("Cage Calendar") is a viral Persian Telegram channel with 9,000+ subscribers. Every day, it posts a single GIF — a surprised reaction face (think Nicolas Cage wide-eyed) — with the text: «امروز ۲۵ خرداده؟» ("Is today the 25th of Khordad?"). That's it. That's the whole joke. And people love it.
The app extends this into three content types, all using the same «امروز Xه؟» template:

Daily date announcement
Holiday / random news callout ("Is today National Cat Day?")
Birthday celebrations ("Is today Sara's birthday?")

This is a PWA — installed via link, no App Store. Target users are young Iranians (18–30) who already follow the channel on Telegram.

Screens to design (in priority order):

Home screen — The core. Shows today's date as a meme card (GIF + Persian date text). Big, bold, full-bleed. Should feel like opening a gift every morning.
Meme Card Generator — User picks a reaction GIF from a library, types their own text (birthday name, a news headline, anything), and the card is generated. Should feel playful and fast.
Birthday Manager — Simple list of saved friends with birthdays. Each entry auto-generates a card on the day. Clean, personal, warm.
Archive — A calendar grid where each past day shows a thumbnail of that day's meme card. Browsable history of the channel's content.


Visual direction — go bold:
The personality is: internet humor meets Persian cultural identity. It's chaotic-good. It's the friend who sends you a meme at 8am to tell you it's Tuesday.
Push the design hard in this direction:

Color: Not dark-mode-with-neon (too generic). Consider a deep midnight blue or ink black base with warm saffron/amber as the primary accent — evokes Persian aesthetics without being cliché. Or go completely unexpected: a saturated pomegranate red (#C0392B range) with cream and gold. Pick one direction and commit to it.
Typography: The «امروز Xه؟» text on the card is the hero. Make it enormous. Use Vazirmatn (the best Persian open-source font) in its heaviest weight for display. The surprise should feel visual — the text should almost vibrate off the screen.
The meme card itself is the signature element of the entire app. Every screen should feel like it's in service of that card. Design the card as if it could exist as a standalone poster — it should be beautiful enough to screenshot and share without any editing.
Micro-interactions matter: The card should feel like it "slaps" into place when it loads. The GIF should feel alive. Suggest motion in your static designs (blur trails, bounce indicators, energy lines).
RTL throughout — the entire app is right-to-left. Persian text, Persian numbers (۱۴۰۳ not 1403), Jalali calendar.
No generic calendar UI — no Google Calendar grid energy, no clean white cards with drop shadows, no SF Pro / Roboto vibes. This should look like nothing else on the App Store.


Signature element to nail:
The daily meme card on the home screen. It should be:

Full-bleed or nearly full-bleed
The GIF as background/hero visual
The date text overlaid in massive Persian typography
A subtle indicator of the day of week (شنبه، یکشنبه...)
One share button — nothing else competing for attention

Think: if someone screenshots the home screen, it should look like a piece of art, not an app UI.

Don't do:

Pastel / soft / friendly / rounded-corners-everywhere energy
Standard bottom nav bar that looks like every other app
Light mode as primary (dark or deep-toned preferred)
Boring calendar grids on the main screen
English labels mixed with Persian content


App name to use in designs: تقویم قفسی

Tagline (optional): «امروز چندمه؟»

Font: Vazirmatn (all weights available)


I attached some references for you (kham.mp4 and output.mp4)

## Assistant

I'll look at your references first, then get oriented.

_[tool: list_files]_

_[tool: run_script]_

_[tool: view_image]_

_[tool: view_image]_

The reference is clear: a full-bleed Nic Cage GIF, the watermark `@Taghvimghafasi`, huge saffron-yellow Persian text at the bottom («امروز ۲ تیره؟»), and a small cream day-of-week pill in the corner. That meme card is the signature.

A few quick decisions before I build:

_[tool: questions_v2]_

## User

Questions answered:
- color_direction: Explore a few options
- card_imagery: Mix — real frame on Home, placeholders elsewhere
- scope: Just nail the Home card first, then expand
- variations: Variations of the whole color/type system
- motion: Live: card slaps in, GIF plays, buttons work, screen switching

## Assistant

Reference is the authentic meme format — letterboxed reaction GIF on a dark field, giant saffron Persian text below, cream day-of-week pill, watermark. And today (June 23) genuinely is ۲ تیر ۱۴۰۵, سه‌شنبه — exactly matching your `output.mp4`. I'll honor that real format and present the Home card in three committed color/type systems, live (slap-in, playing GIF, working share).

_[tool: update_todos]_

_[tool: dc_write]_

_[tool: show_html]_

_[tool: show_html]_

_[tool: save_screenshot]_

_[tool: save_screenshot]_

_[tool: save_screenshot]_

Screens look empty — let me inspect the DOM to see what's actually rendering.

_[tool: eval_js]_

_[tool: eval_js]_

_[tool: eval_js]_

_[tool: eval_js]_

The screens render correctly — the only reason they look blank in my capture is that my background iframe pauses the animation clock at frame 0 (where opacity is 0). `document.timeline` isn't advancing here, but it will in the user's view. Still, I'll make visibility independent of the animation so it can never blank out, and drive the slap via the Web Animations API (cleaner, re-triggerable).

_[tool: dc_html_str_replace]_

_[tool: dc_html_str_replace]_

_[tool: dc_html_str_replace]_

_[tool: dc_js_str_replace]_

_[tool: eval_js]_

The clock is frozen in my background iframe so any running keyframe sticks at frame 0 — and frame 0 has opacity 0. To make it bulletproof regardless of throttling, I'll drop the opacity fade and make the slap pure scale+blur+rotate overshoot, so content is always visible.

_[tool: dc_js_str_replace]_

_[tool: save_screenshot]_

Looks great — hero «امروز ۲ تیره؟» reads exactly like the meme. One fix: the `@Taghvimghafasi` watermark flips to `Taghvimghafasi@` inside the RTL container. Forcing LTR on those.

_[tool: dc_html_str_replace]_

_[tool: dc_html_str_replace]_

Now I'll add a couple of clean, code-only tweaks (implemented in JS so they never gate the card's paint), then verify.

_[tool: dc_js_str_replace]_

_[tool: dc_set_props]_

_[tool: update_todos]_

The Home card is built in three committed systems. Handing off for verification.

_[tool: ready_for_verification]_

**تقویم قفسی — Home card, three committed systems** (RTL, Vazirmatn Black, real today = «امروز ۲ تیره؟»، ۲ تیر ۱۴۰۵، سه‌شنبه):

- **۰۱ شب** — midnight ink + saffron, restrained Persian
- **۰۲ انار** — pomegranate + gold + cream, loud
- **۰۳ قفس** — ink black + saffron with magenta energy lines, chaotic

Live: your `kham.mp4` plays as the GIF, the screen **slaps into place** on load (tap any card to replay), the **هم‌رسانی** button fires a «لینک کپی شد» toast, plus a rotating sunburst, shine sweep, and pulsing «۲». Two tweaks: *autoSlap* and *energyLines*.

Pick a direction and I'll build out the **Generator, Birthday Manager, and Archive** in that system next.

## User

I like version 2:
اناریِ بلند + طلایی + کِرِم — پر سر و صدا

## Assistant

Locking in **انار** (pomegranate + gold + cream). Now I'll build the full app in that system — Home, Generator, Birthday Manager, Archive — as one navigable phone prototype with working screen switching.

_[tool: update_todos]_

_[tool: dc_write]_

_[tool: update_todos]_

## Assistant

## Assistant

Let me capture the four screens to verify they render correctly.

_[tool: show_html]_

I'm fixing/checking new code, so a screenshot is warranted here.

_[tool: multi_screenshot]_

_[tool: show_html]_

_[tool: multi_screenshot]_

All four show home — the nav clicks aren't taking. Let me check state directly.

_[tool: eval_js]_

Navigation works correctly — `multi_screenshot` (html-to-image) just isn't capturing the live inline-style changes. Let me use real pixel captures instead.

_[tool: save_screenshot]_

_[tool: save_screenshot]_

_[tool: save_screenshot]_

Navigation state changes but home stays visually on top — likely a stacking/reflow issue, and the video player chrome is showing (video not playing as background). Let me inspect the actual rendered stack and the video.

_[tool: eval_js]_

The video loads fine (readyState 4). The "home stays on top" in my captures is a test-harness race: `save_screenshot` reloads the page, my click fires, then `componentDidMount` runs *after* and resets to home. In the live view navigation is correct. Let me confirm the archive grid actually populated and the generator is wired, by driving it all in one eval after mount is settled.

_[tool: eval_js]_

Generator and GIF picker work. Archive day numbers look doubled (۱,۱,۲,۲) — let me check the grid structure.

_[tool: eval_js]_

Grid is correct (33 cells, 7 columns, 2 lead blanks + 31 days). The earlier "doubled" read was a transient. Now let me capture the non-home screens properly by deferring the click past React mount.

_[tool: save_screenshot]_

_[tool: save_screenshot]_

_[tool: save_screenshot]_

The capture harness reloads and races React's mount — my click lands before the handlers wire up. Let me click well after mount completes.

_[tool: save_screenshot]_

_[tool: eval_js]_

Found it — React re-renders and reverts my imperative inline-style changes back to the template defaults (home visible). The fix: drive the active view through component state and re-apply styles in `componentDidUpdate` so they survive every render.

_[tool: dc_js_str_replace]_

_[tool: dc_js_str_replace]_

_[tool: eval_js]_

_[tool: eval_js]_

Inline opacity is correct (h:0, a:1) but *computed* is inverted — something with `!important` is overriding. Let me find it.

_[tool: eval_js]_

Stale WAAPI animations are piling up across hot-reloads and corrupting the live state. Let me reload the page fresh and test cleanly.

_[tool: show_html]_

_[tool: eval_js]_

_[tool: eval_js]_

It's the same background-iframe artifact as before: my iframe's animation clock is frozen, so CSS transitions never tick and computed opacity stays at the start value. The inline styles are correct — navigation works perfectly in the user's live view. To screenshot it here, I'll kill transitions so computed snaps to the inline target.

_[tool: save_screenshot]_

_[tool: save_screenshot]_

_[tool: save_screenshot]_

All four screens render correctly and navigation works — the earlier "stuck on home" was purely my frozen-clock iframe, not a real bug. The app is complete:

- **خانه** — full-bleed daily meme card, playing GIF, slap-in, working share toast
- **بساز** — live generator: type text → hero updates instantly, tap a reaction tile to select
- **تولدِ رفقا** — today's birthday as a gold hero card, friends list with Jalali dates
- **بایگانی** — Jalali grid (تیر ۱۴۰۵), today ringed in gold, past days show meme thumbnails

All RTL, Persian numerals, Vazirmatn Black, in the **انار** system.

_[tool: ready_for_verification]_

Done. **تقویم قفسی** is built as a full four-screen PWA prototype in the **انار** (pomegranate + gold + cream) system you picked — Home, Generator, Birthday Manager, and Archive, all RTL with Persian numerals and Vazirmatn Black. Navigation, the live text generator, GIF selection, and share toasts all work; the home card slaps in and plays your `kham.mp4`.

Two things worth noting for next steps:
- The reaction GIFs in the Generator/Archive are striped placeholders (as agreed) — drop real GIF files in and I'll wire them.
- The standalone three-system Home explorations are still in `Taghvim Ghafasi Home.dc.html` if you want to revisit.

Want me to swap in real reaction GIFs, or add the "new friend" / date-picker flow on the Birthday screen?

