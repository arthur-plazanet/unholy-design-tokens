Hey

I’m a bit surprised by how this turned out. Also why it happens now

There’s a lot of things - probably would have been better to sync first 😅 I didn't expect you would come with such a big refactoring - and that I would be pressed to review as we don't have much time :/ also I feel you misunderstood my idea of getting rid of Tailwind, and there's this "AI part"
We will find some

---

### **"Tailwind and CSS architecture Bootcamp"**

🗒️ There is a special page for me - you quoted and used the 4 private messages of our chat (part 2 🔝 ) as source material for AI (not fair :D) regarding Tailwind - this was casual talks, with as we stated resulted in a bit harsh “tone”.

I also don’t know which part is from AI / which is from you. But I will assume that every words and statements present there is from you, or at least the meaning of the sections.

I do find some part quite opinionated and tends to interpret some of my personal thoughts, to being condescension on my way of work or regarding Design Systems, so I will answer in the same way.

I asked ChatGPT about it

<img width="1468" height="300" alt="image" src="https://github.com/user-attachments/assets/ba7ad480-4563-41d4-afbc-8d9f8403584c" />

<img width="1742" height="1206" alt="image" src="https://github.com/user-attachments/assets/da7d0200-0644-4a05-b14a-888868f9badf" />

Don't get me wrong, I'm not mad, but definitely want to correct many points 😄

I will for the most part not using any AI, I think some subjects require details as the refactoring is quite big

---

<details>
<summary>The Design System</summary>
  ## The status of the Design System
  We started implementing a new design system in the end of 2024.
  Having such PR ~1 year later can not be more illustrating how the lack of communication and the process went quite wrong.
  I take [**@bilbo7833**](https://github.com/bilbo7833) as witness on how many times he didn't understand why was it so long, and why I took so much time. The truth is we were both working on our side - without proper sync... to mitigate - the current UI Library works, I'm just personally not super happy of the result.
  There were some messages a while ago
<img width="998" height="1022" alt="image" src="https://github.com/user-attachments/assets/ff8c309c-a68a-4300-89da-ad5c058b9975" />
[link](https://teams.microsoft.com/l/message/19:4ae921a1580a414888d0f3ec32618b9f@thread.v2/1733059683515?context=%7B%22contextType%22%3A%22chat%22%7D)

(The all exchange is worth reading, also Joshi's answer and ask the question of if we should have done from scratch for example)

We still don't have all the screws.

</details>

---

I think I will start by explaining why I considered moving away from Tailwind, as that will help to answer many questions from the `.md` files and to review the overall PR.

### **TL;DR - I found back [this comment](https://github.com/reteach/reteach-app/pull/4063#issuecomment-2449480616) I put on the initialization of the UI Library. (exactly one year ago)**

I list the concerns I had with Tailwind and "utility-first" in general.
One year later, I can unfortunately confirm these concerns, but now I can and will describe more *why*

# Why I fear Tailwind in the long term or in a big project short/mid-term

First I'll clarify my incentives when working with design system / UI libraries. In this PR there's statements that assume my vision on a Design System and give me recommendations, I will put my take, also it's more clear if we disagree from the early point 😄
Moving away from Tailwind is not *only* a personal preference

## I care about bridging the gap between Developers and Design System foundations 

<a id="ds-conception"></a> Foundations are the core base variables that shape every color, size, and style in the product.

🎨 Once defined, they bring the first important factor: **$\large{\color{teal}{\text{Consistency}}}$**.

But here's one key: I think **$\large{\color{teal}{\text{Consistency}}}$** that can last without getting too much tech debt is to **limit these variables**, rather than having a larger scale.
You can always extend later, but reducing is harder.

This brings more robustness to the system, an immediate visual catch from the end-user, and more important, an easier **$\large{\color{lightgreen}{\text{Scalability}}}$** from day one.

It's how I would define an efficient starting point for a Design System. The rest is in the hands of designer 🖌️
I thought important to define this before next part

## <img width="20" alt="image" src="https://github.com/user-attachments/assets/5eed85b8-b9c9-4aed-b92d-b0ccc0eb388b" /> Tailwind's workflow - how is it used

Origins of Tailwind

### 1. The "Separation of Concerns" and HTML semantics - why Tailwind was created

From Tailwind doc (version 3 - it's important to write for later :))

> Rapidly build modern websites without ever leaving your HTML.

Tailwind was originally created in opposition of semantic CSS which would bring too much complexity and poor vision on layout / spacing / colors and bloat your CSS code.

There is this article from the creator [https://adamwathan.me/css-utility-classes-and-separation-of-concerns](https://adamwathan.me/css-utility-classes-and-separation-of-concerns) (it's worth the read) where he stated that at the end, HTML is tied to CSS and CSS is tied to HTML - and by any method, we end up duplicating CSS.

It's where he wrote the "Utility-First" term for the first time 😉

### 2. Concept

From Tailwind [docs](https://v3.tailwindcss.com/):

> A utility-first CSS framework packed with classes like flex, pt-4, text-center and rotate-90 that can be composed to build any design, directly in your markup.

With Tailwind, you get a ready-to-go configuration and design token that you can then customize, add your own tools etc. but the core of it is utility classes (and *only* utility classes) aiming lack of abstraction.

One class = one single thing, easy to get on board. Perfect for prototyping, and if your theme config is in accordance with a defined design system, you're ready to go.

---

### 3. Building component that don't rely on the content and without abstraction

As they state:

> When you realize how productive you can be working exclusively in HTML with predefined utility classes, working any other way will feel like torture.

So you create components, it's fast and you might end-up with component as such (`RtDateRangePicker`)

```vue
<template>
  <div
    id="default-daterangepicker"
    class="rt-flex rt-items-center rt-gap-2 rt-flex-col"
  >
    <div class="rt-relative rt-w-full">
      <div
        class="rt-absolute rt-inset-y-0 rt-end-0 rt-flex rt-items-center rt-pe-4 rt-pointer-events-none"
      >
        <CalendarIcon />
      </div>
      <input
        id="default-datepicker-1"
        datepicker
        type="text"
        class="rt-bg-white rt-appearance-none rt-border rt-border-solid rt-border-neutral-400 focus:rt-border-neutral-800 focus:rt-outline-0 rt-rounded-lg rt-block rt-w-full rt-pe-9 rt-p-2.5"
        :placeholder="placeholder"
      />
    </div>
    <div class="rt-relative rt-grow-0">
      <span class="rt-body-small-regular">{{ spanWord }}</span>
    </div>
    <div class="rt-relative rt-w-full">
      <div
        class="rt-absolute rt-inset-y-0 rt-end-0 rt-flex rt-items-center rt-pe-4 rt-pointer-events-none"
      >
        <CalendarIcon />
      </div>
      <input
        id="default-datepicker-2"
        datepicker
        type="text"
        class="rt-bg-white rt-appearance-none rt-border rt-border-solid rt-border-neutral-400 focus:rt-border-neutral-800 focus:rt-outline-0 rt-rounded-lg rt-block rt-w-full rt-pe-9 rt-p-2.5"
        :placeholder="placeholder"
      />
    </div>
  </div>
</template>
```

At first writing, it's fine, and can be done fast. The UI is built continuously as you chain the utility classes.

Good for initial **$\large{\color{teal}{\text{Consistency}}}$**

But what if this component needs to be changed / modified in the future? This change could simply be a border / background change from one part of the Datepicker for example.

---

## ⚙️ Complexity as the project grows - What problems does Tailwind bring

### 1. Readability 👓

- It can be hard hard to see what each tag is doing or rendering if no visual on a browser or so
- There are a lot of `<div>` - and we *don't know at first what is doing what*, you need to read class by class to understand it, as elements are not identified (see [here](https://github.com/arthur-plazanet/thoughts/pull/1#naming-things))
- `-neutral-400` or `-neutral-800` (or even with any word such `-primary-400` or `-primary-800` - even though a bit better) doesn't bring a lot of *context*

❓ Which brings the question: "Why this new language? What does it bring?"
*What is Tailwind* at the end?

Tailwind create utility classes that usually do one thing, based on declarative CSS properties

| **Raw CSS Declaration** | **Tailwind Utility Class** | **Applied in HTML**        | **Final Rendered UI**                           |
| ----------------------- | -------------------------- | -------------------------- | ----------------------------------------------- |
| `display: flex;`        | `.flex { display: flex; }` | `<div class="flex"></div>` | 🧩 Element is displayed as a flexbox container. |

---

### 2. Tailwind is a layer on top of native CSS

### ⚙️ Why does it bring more complexity:

- By mapping CSS declaration to a new syntax - you now depend on any changes from the original API
- It's a new grammar to learn, on top of HTML/CSS (as additional "layer")
- Even though it can be considered "industry-standard" - `p-3` doesn't always resolve to the same value as each theming is different.
- As each new "tool" / library we decide to use on top of native standards, it bring inconsistencies
  - Tailwind classes are not always directly intuitive or worded as the corresponded CSS rule. A few examples:
    - In CSS Flexbox or Grid, `justify-content` / `align-items` / `align-content` are often used to position items in a layout. How does it translate in terms of Tailwind's classes?
      - `justify-*` for `justify-content` - which makes sense and is consistent with the initial syntax
      - but for `align-items`, it is `items-*`
    - `font-weight` is `font-*` but `font-size` is `text-*`
    - `border-radius` is `rounded-*`
- Maintainability is a concern, as we rely on an external tool (see [Tailwind v4](https://github.com/arthur-plazanet/thoughts/pull/1#tailwind-v4))

---

### 3. Semantic 📏 and understandable code

### This is our `RtSkeleton`

```vue
<template>
  <div
    class="    rt-relative rt-w-full rt-h-full rt-group data-[loading=true] [&_.rt-skeleton-placeholder]:rt-opacity-0"
    ref="skeletonRef"
    v-bind="attrs"
  >
    <div
      class="rt-skeleton-placeholder rt-absolute rt-inset-0 rt-z-10 group-data-[loading=true]:rt-opacity-100 rt-pointer-events-none rt-transition-opacity rt-duration-400 rt-ease-in-out"
      :style="skeletonStyles"
    >
      <RtSkeletonText />
    </div>
    <div
      class="transition-opacity rt-duration-400 ease-in-out z-20 relative rt-h-full group-data-[loading=true]:rt-opacity-0 group-data-[loading=true]:rt-pointer-events-none"
    >
      <slot />
    </div>
  </div>
</template>
```

### Here is a pretty much equivalent component in my [UI Library](https://github.com/use-compose/ui/blob/dev/src/components/YSkeleton/YSkeleton.vue) - `YSkeleton`

```vue
<template>
  <div :class="getClasses">
    <slot>
      <div class="brutalist-skeleton brutalist-skeleton-line"></div>
      <div class="brutalist-skeleton brutalist-skeleton-block"></div>
      <div class="brutalist-skeleton brutalist-skeleton-circle"></div>
    </slot>
  </div>
</template>
```

Here's our RtModalHeader:

```vue
<template>
  <header :class="$slots.default ? '' : 'rt-px-10 rt-py-6'">
    <slot>
      <div class="rt-flex rt-items-start rt-gap-x-4">
        <div class="rt-pt-2 rt-pb-4 rt-flex rt-flex-1 rt-flex-col rt-gap-y-1">
          <RtHeading
            size="2"
            variant="bold"
            class="rt-m-0 rt-text-neutral-900"
            >{{ header }}</RtHeading
          >
          <RtHeading
            size="3"
            v-if="hasSubHeader"
            class="rt-m-0 rt-text-neutral-700"
            >{{ subHeader }}</RtHeading
          >
        </div>
        <div v-if="hasCloseButton" class="rt-flex rt-items-start">
          <RtIconButton variant="secondary" tone="neutral" @click="close">
            <CloseIcon color="neutral-600" />
          </RtIconButton>
        </div>
      </div>
    </slot>
  </header>
</template>
```

Equivalent in [@use-compose/ui](https://github.com/use-compose/ui/blob/dev/src/components/YModal/components/YModalHeader.vue) - `YModalHeader`

```vue
<template>
  <header class="y-modal-header">
    <slot>
      <div class="flex justify-between">
        <h2 class="margin-0">{{ header }}</h2>
        <CloseIcon
          v-if="props.hasCloseButton"
          class="cursor-pointer align-self-start"
          :width="48"
          :height="48"
          @click="close"
        />
      </div>
    </slot>
  </header>
</template>
```

None of these code is perfect, they both might get tech debt with time. The difference is that in the Tailwind version, it's utility *only*, while in the other the setup is more hybrid:

- It uses Design Tokens (with [Style-Dictionary](https://github.com/use-compose/ui/blob/dev/style-dictionary/config.js))
- It also uses utility classes but not for everything
- But take also advantage of *semantic* classes. This doesn't have to be "one new class every time" but content related shorter word that help the reader.

Concretely, what does that change?
We could argue for days about which approach is better for your system with thousands of components / more scalable, makes more sense etc.

But which one is more readable / easy to get into as a new developer getting into the codebase?

**Note:** ➡️ I want to make the code clearer enough that anyone can understand and start contributing from day 1 🏄

For this, I do think using a more semantic approach help for scalability

Important

All of these points **assume that your initial Tailwind configuration is already done and won't change**

---

## Deeper issues - Scalability and Consistency 👨‍💻

### 1. Maintainability

In addition of previous points:

- Tailwind initial theming configuration is already made and ready to start. Which can be fine, but not if you want to build a robust scalable design system in my opinion. I truly believe in [this](#ds-conception) and that the bases need to be done at the beginning :) It will take times, as a diesel - to sync and start 🎨🔗💻 but then it's a no game :) 🚗💨⛽️
  Also we have cases that relate to this it seems.
- It makes PR overall hard to review - [here](https://github.com/reteach/reteach-app/pull/5353/files#diff-7f5e41be8bf12d701559fe2972a7d676c4a0b52eab800e1d1b57af11179df708L12) the vertical scrollbar
- If you need to change a value in a component, you might need to do a global search and change individual Tailwind classes rather than one center single-source-of-truth
- Reusable components: you rely on the framework you use (Vue in our case) to create *visible* components to reuse
- DevTools and editor support are not fully up-to-date ([https://devtoolsfortailwind.com/](https://devtoolsfortailwind.com/)) so you rely on more and more tools (and Tailwind-related) which sometimes are not free

From the comment in the UI Library initialization, there's one part:

[image](https://github.com/user-attachments/assets/8a314d53-1d67-4840-a685-065956a30a58)

That brings, I think, a really important drawback of Tailwind

---

### <a id="naming-things"></a> **2. Naming things ✍️**

In Design, as well a in a codebase, we need to know "what" exactly we are dealing with.

- Is it a complete component?
  - In Figma, this would be shown as an extracted and standalone component
  - In the codebase... it depends, you rely on the factor that if the codebase is using a Framework (Vue, React) to name the component or not
  - If you inspect a browser devtools, hard to say
- Is it just a "div wrapper"? It's common to see such div with a lot of tailwind classes. For example our `RtDropdown`, how did we figure out to create a `RtMenu`? It seems clear on paper but concretely - we just had a bunch of tailwind class and had to figure out what was the role/purpose of each
- If you need to change a component (e.g. for a bug), it can make things harder, leading to non-sense global search (think of DevTools again for example that wouldn't be helpful there).

🏄 This point affect **$\large{\color{teal}{\text{Consistency}}}$** and **$\large{\color{lightgreen}{\text{Scalability}}}$** on the long term, and in short term it can also affects onboarding

Resource: [https://nicolasgallagher.com/about-html-semantics-front-end-architecture/](https://nicolasgallagher.com/about-html-semantics-front-end-architecture/)

---

### **3. CSS limitations**

The configuration file is initially generated with default "standard" values. But the more you want to customize your theme by integrating your design system, the more you face limitations.

Tailwind is sometimes a regression as it doesn't support all CSS features. From our codebase see [here](https://github.com/reteach/reteach-app/blob/dev/packages/ui/src/assets/styles/css/components/table.css#L5) or [here](https://github.com/reteach/reteach-app/blob/dev/apps/admin-frontend/src/components/atomics/atoms/tooltip/RtTooltip.scss#L6) for example. We don't know when it happens but it end up in loosing time searching for a solution to finally use a workaround as in 3.

Resources: [https://scriptraccoon.dev/blog/tailwind-disadvantages#missing-features](https://scriptraccoon.dev/blog/tailwind-disadvantages#missing-features)

### **Build-time only**

Classes from Tailwind are generated only at build time. There's no way of using CSS custom properties that can be change at runtime directly, and we loose a lot of the new features CSS has to offer.

---

## **The "paradox" with Tailwind - and how do they respond**

CSS is now covering a lot of the features preprocessors and other tools were before in advance (layers, scoped styles, CSS variables, conditions etc.).

Tailwind lacks in this regard as explained before.

### **1. The maintainability concern**

From their [docs](https://v3.tailwindcss.com/docs/utility-first#maintainability-concerns):

> The biggest maintainability concern when using a utility-first approach is managing commonly repeated utility combinations.

> This is easily solved by extracting components and partials, and using editor and language features like multi-cursor editing and simple loops.

In clear, they tell to either:

- Use your editor built-in tools to solve the issues we initially didn't have without Tailwind ("multi-cursor editing")
- "extracting components and partials" - which are their in-house solution when repetition becomes a problem

---

### **2. 🌀 Resolve the lack of Abstraction and their own Paradox**

As mentioned by Tailwind themselves,

> But of course as a project grows, you’ll inevitably find yourself repeating common utility combinations to recreate the same design in many different places.

They do propose alternative solutions to reuse styles, as of:

<table role="table" class="unchanged">
<thead>
<tr>
<th>Tailwind Solutions</th>
<th>Example</th>
<th>Problem(s)</th>
</tr>
</thead>
<tbody>
<tr>
<td>Using component partials <br> <a href="https://v3.tailwindcss.com/docs/reusing-styles#extracting-components-and-partials" rel="nofollow">("Create a template partial or JavaScript component")</a>
</td>
<td><a target="_blank" rel="noopener noreferrer" href="https://github.com/user-attachments/assets/3a86ea41-24a8-435b-ae2d-854a28e373ca"><img width="744" height="324" alt="image" src="https://github.com/user-attachments/assets/3a86ea41-24a8-435b-ae2d-854a28e373ca" style="max-width: 100%; height: auto; max-height: 324px;"></a></td>
<td>It basically means or is almost equivalent to use a framework to create components - with some edge cases as they show Vue + JSX, which is not even a really common use case</td>
</tr>
<tr>
<td>By using <a href="https://v3.tailwindcss.com/docs/reusing-styles#extracting-classes-with-apply" rel="nofollow"><code class="notranslate">@apply</code></a>
</td>
<td><a target="_blank" rel="noopener noreferrer" href="https://github.com/user-attachments/assets/efea73af-35e1-461d-9fbf-fbfb104a2fc8"><img width="744" height="640" alt="image" src="https://github.com/user-attachments/assets/efea73af-35e1-461d-9fbf-fbfb104a2fc8" style="max-width: 100%; height: auto; max-height: 640px;"></a></td>
<td>That's it, so you use their own layer of utility classes <em>directly</em> inside the CSS, which they will resolve to... the CSS rule itself</td>
</tr>
<tr>
<td>By creating complex utility or even <a href="https://v3.tailwindcss.com/docs/adding-custom-styles#adding-component-classes" rel="nofollow">component classes</a>
</td>
<td><a target="_blank" rel="noopener noreferrer" href="https://github.com/user-attachments/assets/8107a9c4-2d7b-4b09-aedb-3a8074f2b3b7"><img width="447" height="227" alt="image" src="https://github.com/user-attachments/assets/8107a9c4-2d7b-4b09-aedb-3a8074f2b3b7" style="max-width: 100%; height: auto; max-height: 227px;"></a></td>
<td>Which is equivalent to using native CSS</td>
</tr>
</tbody>
</table>

These rules are a bit scary and anti-pattern on their side, it easily can lead to a messy codebase as from what I described, + this duplication HTML / CSS which is usually a not too bad norm but here we're facing a new external tool/API.

---

### **3. Tailwind v.4, drop JavaScript for CSS-oriented - complex migration and conflictual thoughts**

The new and actual version of Tailwind is now **_extremely_** based on CSS approach rather than a layer to abstract it.

[Here](https://tailwindcss.com/docs/upgrade-guide#changes-from-v3) is the upgrade guide from v3 to v4. I tried to do it a few months ago and it was quite painful, couldn't make it work...

#### **What concrete changes?**

Along from many deprecated function / utilities etc. Tailwind now is leaning towards CSS-approach first (which wasn't really well received from the initial users as I understood)

- No more [JavaScript configuration](https://tailwindcss.com/docs/upgrade-guide#using-a-javascript-config-file) and extension / referencing using Javascript [https://tailwindcss.com/docs/upgrade-guide#theme-values-in-javascript](https://tailwindcss.com/docs/upgrade-guide#theme-values-in-javascript)
- No more need (or at least not advice and not practical) for any [external preprocessor like Sass, Less, or Stylus](https://tailwindcss.com/docs/compatibility#sass-less-and-stylus)

> We've removed this in v4 in hopes that people can use the CSS variables we generate directly instead, which is much simpler and will significantly reduce your bundle size.

In short: [https://tailwindcss.com/docs/upgrade-guide#using-the-theme-function](https://tailwindcss.com/docs/upgrade-guide#using-the-theme-function)

```css
.my-class {
/* OLD */
/* background-color: theme(colors.red.500); */

/* New version */
  background-color: var(--color-red-500);
}
```

The theme is now written in pure CSS with `@theme` and is what I wanted to progressively do in the [admin-frontend theme file](https://github.com/reteach/reteach-app/pull/5547/files#diff-16d9ae670465c45d5046ee77b6b3a48825026d2791dcb695f7a6da3c7c485c04)

<details>
<summary>Quick sample of the Tailwind 4 @theme</summary>
test

```css
@theme {
  --font-sans: ui-sans-serif, system-ui, sans-serif, 'Apple Color Emoji',
    'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
  --font-serif: ui-serif, Georgia, Cambria, 'Times New Roman', Times, serif;
  --font-mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
    'Liberation Mono', 'Courier New', monospace;
  --color-red-50: oklch(97.1% 0.013 17.38);
  --color-red-100: oklch(93.6% 0.032 17.717);
  --color-red-200: oklch(88.5% 0.062 18.334);
  --color-red-300: oklch(80.8% 0.114 19.571);
  --color-red-400: oklch(70.4% 0.191 22.216);
  --color-red-500: oklch(63.7% 0.237 25.331);
  --color-red-600: oklch(57.7% 0.245 27.325);
  --color-lime-200: oklch(93.8% 0.127 124.321);
  --color-lime-300: oklch(89.7% 0.196 126.665);
  --color-lime-400: oklch(84.1% 0.238 128.85);
  --color-lime-500: oklch(76.8% 0.233 130.85);
  --color-lime-600: oklch(64.8% 0.2 131.684);
  --color-lime-700: oklch(53.2% 0.157 131.589);
  --color-lime-800: oklch(45.3% 0.124 130.933);
  --color-lime-900: oklch(40.5% 0.101 131.063);
  --color-lime-950: oklch(27.4% 0.072 132.109);
  --color-green-50: oklch(98.2% 0.018 155.826);
  --color-green-100: oklch(96.2% 0.044 156.743);
  --color-green-200: oklch(92.5% 0.084 155.995);
  --color-green-300: oklch(87.1% 0.15 154.449);
  --color-green-400: oklch(79.2% 0.209 151.711);
  --color-green-500: oklch(72.3% 0.219 149.579);
  --color-green-600: oklch(62.7% 0.194 149.214);
  --color-green-700: oklch(52.7% 0.154 150.069);
  --color-green-800: oklch(44.8% 0.119 151.328);
  --color-green-900: oklch(39.3% 0.095 152.535);
  --color-green-950: oklch(26.6% 0.065 152.934);
  --color-emerald-50: oklch(97.9% 0.021 166.113);
  --color-emerald-100: oklch(95% 0.052 163.051);
  --color-emerald-200: oklch(90.5% 0.093 164.15);
  --color-emerald-300: oklch(84.5% 0.143 164.978);
  --color-emerald-400: oklch(76.5% 0.177 163.223);
  --color-emerald-500: oklch(69.6% 0.17 162.48);
  --color-emerald-600: oklch(59.6% 0.145 163.225);
  --color-emerald-700: oklch(50.8% 0.118 165.612);
  --color-emerald-800: oklch(43.2% 0.095 166.913);
  --color-emerald-900: oklch(37.8% 0.077 168.94);
  --color-emerald-950: oklch(26.2% 0.051 172.552);
  --color-teal-50: oklch(98.4% 0.014 180.72);
  --color-teal-100: oklch(95.3% 0.051 180.801);
  --color-teal-200: oklch(91% 0.096 180.426);
  --color-teal-300: oklch(85.5% 0.138 181.071);
  --color-teal-400: oklch(77.7% 0.152 181.912);
  --color-teal-500: oklch(70.4% 0.14 182.503);
  --color-teal-600: oklch(60% 0.118 184.704);
  --color-teal-700: oklch(51.1% 0.096 186.391);
  --color-teal-800: oklch(43.7% 0.078 188.216);
  --color-teal-900: oklch(38.6% 0.063 188.416);
  --color-teal-950: oklch(27.7% 0.046 192.524);
  --color-cyan-50: oklch(98.4% 0.019 200.873);
  --color-cyan-100: oklch(95.6% 0.045 203.388);
  --color-cyan-200: oklch(91.7% 0.08 205.041);
  --color-cyan-300: oklch(86.5% 0.127 207.078);
  --color-cyan-400: oklch(78.9% 0.154 211.53);
  --color-cyan-500: oklch(71.5% 0.143 215.221);
  --color-cyan-600: oklch(60.9% 0.126 221.723);
  --color-cyan-700: oklch(52% 0.105 223.128);
  --color-cyan-800: oklch(45% 0.085 224.283);
  --color-cyan-900: oklch(39.8% 0.07 227.392);
  --color-cyan-950: oklch(30.2% 0.056 229.695);
  --color-sky-50: oklch(97.7% 0.013 236.62);
  --color-sky-100: oklch(95.1% 0.026 236.824);
  --color-sky-200: oklch(90.1% 0.058 230.902);
  --color-sky-300: oklch(82.8% 0.111 230.318);
  --color-sky-400: oklch(74.6% 0.16 232.661);
  --color-sky-500: oklch(68.5% 0.169 237.323);
  --color-sky-600: oklch(58.8% 0.158 241.966);
  --color-sky-700: oklch(50% 0.134 242.749);
  --color-sky-800: oklch(44.3% 0.11 240.79);
  --color-sky-900: oklch(39.1% 0.09 240.876);
  --color-sky-950: oklch(29.3% 0.066 243.157);
  --color-blue-50: oklch(97% 0.014 254.604);
  --color-blue-100: oklch(93.2% 0.032 255.585);
  --color-blue-200: oklch(88.2% 0.059 254.128);
  --color-blue-300: oklch(80.9% 0.105 251.813);
  --color-blue-400: oklch(70.7% 0.165 254.624);
  --color-blue-500: oklch(62.3% 0.214 259.815);
  --color-blue-600: oklch(54.6% 0.245 262.881);
  --color-blue-700: oklch(48.8% 0.243 264.376);
  --color-blue-800: oklch(42.4% 0.199 265.638);
  --color-blue-900: oklch(37.9% 0.146 265.522);
  --color-blue-950: oklch(28.2% 0.091 267.935);
  --color-indigo-50: oklch(96.2% 0.018 272.314);
  --color-indigo-100: oklch(93% 0.034 272.788);
  --color-indigo-200: oklch(87% 0.065 274.039);
  --color-indigo-300: oklch(78.5% 0.115 274.713);
  --color-indigo-400: oklch(67.3% 0.182 276.935);
  --color-indigo-500: oklch(58.5% 0.233 277.117);
  --color-indigo-600: oklch(51.1% 0.262 276.966);
  --color-indigo-700: oklch(45.7% 0.24 277.023);
  --color-indigo-800: oklch(39.8% 0.195 277.366);
  --color-indigo-900: oklch(35.9% 0.144 278.697);
  --color-indigo-950: oklch(25.7% 0.09 281.288);
  --color-violet-50: oklch(96.9% 0.016 293.756);
  --color-violet-100: oklch(94.3% 0.029 294.588);
  --color-violet-200: oklch(89.4% 0.057 293.283);
  --color-violet-300: oklch(81.1% 0.111 293.571);
  --color-violet-400: oklch(70.2% 0.183 293.541);
  --color-violet-500: oklch(60.6% 0.25 292.717);
  --color-violet-600: oklch(54.1% 0.281 293.009);
  --color-violet-700: oklch(49.1% 0.27 292.581);
  --color-violet-800: oklch(43.2% 0.232 292.759);
  --color-violet-900: oklch(38% 0.189 293.745);
  --color-violet-950: oklch(28.3% 0.141 291.089);
  --color-purple-50: oklch(97.7% 0.014 308.299);
  --color-purple-100: oklch(94.6% 0.033 307.174);
  --color-purple-200: oklch(90.2% 0.063 306.703);
  --color-purple-300: oklch(82.7% 0.119 306.383);
  --color-purple-400: oklch(71.4% 0.203 305.504);
  --color-purple-500: oklch(62.7% 0.265 303.9);
  --color-purple-600: oklch(55.8% 0.288 302.321);
  --color-purple-700: oklch(49.6% 0.265 301.924);
  --color-purple-800: oklch(43.8% 0.218 303.724);
  --color-purple-900: oklch(38.1% 0.176 304.987);
  --color-purple-950: oklch(29.1% 0.149 302.717);
  --color-fuchsia-50: oklch(97.7% 0.017 320.058);
  --color-fuchsia-100: oklch(95.2% 0.037 318.852);
  --color-fuchsia-200: oklch(90.3% 0.076 319.62);
  --color-fuchsia-300: oklch(83.3% 0.145 321.434);
  --color-fuchsia-400: oklch(74% 0.238 322.16);
  --color-fuchsia-500: oklch(66.7% 0.295 322.15);
  --color-fuchsia-600: oklch(59.1% 0.293 322.896);
  --color-fuchsia-700: oklch(51.8% 0.253 323.949);
  --color-fuchsia-800: oklch(45.2% 0.211 324.591);
  --color-fuchsia-900: oklch(40.1% 0.17 325.612);
  --color-fuchsia-950: oklch(29.3% 0.136 325.661);
  --color-pink-50: oklch(97.1% 0.014 343.198);
  --color-pink-100: oklch(94.8% 0.028 342.258);
  --color-pink-200: oklch(89.9% 0.061 343.231);
  --color-pink-300: oklch(82.3% 0.12 346.018);
  --color-pink-400: oklch(71.8% 0.202 349.761);
  --color-pink-500: oklch(65.6% 0.241 354.308);
  --color-pink-600: oklch(59.2% 0.249 0.584);
  --color-pink-700: oklch(52.5% 0.223 3.958);
  --color-pink-800: oklch(45.9% 0.187 3.815);
  --color-pink-900: oklch(40.8% 0.153 2.432);
  --color-pink-950: oklch(28.4% 0.109 3.907);
  --color-rose-50: oklch(96.9% 0.015 12.422);
  --color-rose-100: oklch(94.1% 0.03 12.58);
  --color-rose-200: oklch(89.2% 0.058 10.001);
  --color-rose-300: oklch(81% 0.117 11.638);
  --color-rose-400: oklch(71.2% 0.194 13.428);
  --color-rose-500: oklch(64.5% 0.246 16.439);
  --color-rose-600: oklch(58.6% 0.253 17.585);
  --color-rose-700: oklch(51.4% 0.222 16.935);
  --color-rose-800: oklch(45.5% 0.188 13.697);
  --color-rose-900: oklch(41% 0.159 10.272);
  --color-rose-950: oklch(27.1% 0.105 12.094);
  --color-slate-50: oklch(98.4% 0.003 247.858);
  --color-slate-100: oklch(96.8% 0.007 247.896);
  --color-slate-200: oklch(92.9% 0.013 255.508);
  --color-slate-300: oklch(86.9% 0.022 252.894);
  --color-slate-400: oklch(70.4% 0.04 256.788);
  --color-slate-500: oklch(55.4% 0.046 257.417);
  --color-slate-600: oklch(44.6% 0.043 257.281);
  --color-slate-700: oklch(37.2% 0.044 257.287);
  --color-slate-800: oklch(27.9% 0.041 260.031);
  --color-slate-900: oklch(20.8% 0.042 265.755);
  --color-slate-950: oklch(12.9% 0.042 264.695);
  --color-gray-50: oklch(98.5% 0.002 247.839);
  --color-gray-100: oklch(96.7% 0.003 264.542);
  --color-gray-200: oklch(92.8% 0.006 264.531);
  --color-gray-300: oklch(87.2% 0.01 258.338);
  --color-gray-400: oklch(70.7% 0.022 261.325);
  --color-gray-500: oklch(55.1% 0.027 264.364);
  --color-gray-600: oklch(44.6% 0.03 256.802);
  --color-gray-700: oklch(37.3% 0.034 259.733);
  --color-gray-800: oklch(27.8% 0.033 256.848);
  --color-gray-900: oklch(21% 0.034 264.665);
  --color-gray-950: oklch(13% 0.028 261.692);
  --color-zinc-50: oklch(98.5% 0 0);
  --color-zinc-100: oklch(96.7% 0.001 286.375);
  --color-zinc-200: oklch(92% 0.004 286.32);
  --color-zinc-300: oklch(87.1% 0.006 286.286);
  --color-zinc-400: oklch(70.5% 0.015 286.067);
  --color-zinc-500: oklch(55.2% 0.016 285.938);
  --color-zinc-600: oklch(44.2% 0.017 285.786);
  --color-zinc-700: oklch(37% 0.013 285.805);
  --color-zinc-800: oklch(27.4% 0.006 286.033);
  --color-zinc-900: oklch(21% 0.006 285.885);
  --color-zinc-950: oklch(14.1% 0.005 285.823);
  --color-neutral-50: oklch(98.5% 0 0);
  --color-neutral-100: oklch(97% 0 0);
  --color-neutral-200: oklch(92.2% 0 0);
  --color-neutral-300: oklch(87% 0 0);
  --color-neutral-400: oklch(70.8% 0 0);
  --color-neutral-500: oklch(55.6% 0 0);
  --color-neutral-600: oklch(43.9% 0 0);
  --color-neutral-700: oklch(37.1% 0 0);
  --color-neutral-800: oklch(26.9% 0 0);
  --color-neutral-900: oklch(20.5% 0 0);
  --color-neutral-950: oklch(14.5% 0 0);
  --color-stone-50: oklch(98.5% 0.001 106.423);
  --color-stone-100: oklch(97% 0.001 106.424);
  --color-stone-200: oklch(92.3% 0.003 48.717);
  --color-stone-300: oklch(86.9% 0.005 56.366);
  --color-stone-400: oklch(70.9% 0.01 56.259);
  --color-stone-500: oklch(55.3% 0.013 58.071);
  --color-stone-600: oklch(44.4% 0.011 73.639);
  --color-stone-700: oklch(37.4% 0.01 67.558);
  --color-stone-800: oklch(26.8% 0.007 34.298);
  --color-stone-900: oklch(21.6% 0.006 56.043);
  --color-stone-950: oklch(14.7% 0.004 49.25);
  --color-black: #000;
  --color-white: #fff;
  --spacing: 0.25rem;
  --breakpoint-sm: 40rem;
  --breakpoint-md: 48rem;
  --breakpoint-lg: 64rem;
  --breakpoint-xl: 80rem;
  --breakpoint-2xl: 96rem;
  --container-3xs: 16rem;
  --container-2xs: 18rem;
  --container-xs: 20rem;
  --container-sm: 24rem;
  --container-md: 28rem;
  --container-lg: 32rem;
  --container-xl: 36rem;
  --container-2xl: 42rem;
  --container-3xl: 48rem;
  --container-4xl: 56rem;
  --container-5xl: 64rem;
  --container-6xl: 72rem;
  --container-7xl: 80rem;
  --text-xs: 0.75rem;
  --text-xs--line-height: calc(1 / 0.75);
  --text-sm: 0.875rem;
  --text-sm--line-height: calc(1.25 / 0.875);
  --text-base: 1rem;
  --text-base--line-height: calc(1.5 / 1);
  --text-lg: 1.125rem;
  --text-lg--line-height: calc(1.75 / 1.125);
  --text-xl: 1.25rem;
  --text-xl--line-height: calc(1.75 / 1.25);
  --text-2xl: 1.5rem;
  --text-2xl--line-height: calc(2 / 1.5);
  --text-3xl: 1.875rem;
  --text-3xl--line-height: calc(2.25 / 1.875);
  --text-4xl: 2.25rem;
  --text-4xl--line-height: calc(2.5 / 2.25);
}
```

</details>

## (Short) Conclusion

I kind of feel that Tailwind came to propose a solution to the problem of CSS duplication but by going too far. They used an aggressive marketing to "break the rules" but if there's existing directions and conventions in softwares engineering, it's for a reason 😶.
I understand the appeal and purpose when you don't like CSS and feel quick with it.

- 👎 Tailwind does not resolve the separation of concerns issue initially targeted as they created an API on top of CSS used directly in HTML
- By their lack of support of many features, they invented to encapsulate logic into single semantic styled objects - looking close to CSS classes but by keeping this "risky" additional syntax
- It's interesting to see years later they now promote pure CSS-approach as it's "easier" while being not so intuitive and the quite opposite syntax to write tokens from the one they started from
  I'm more a client for V4 though

--generated-by-arthur-remis-Claude
