# Analogy - 🏠 Building a House, and how the abstraction works

Imagine that you want to build a house yourself, starting from the foundation up to the roof.

## Step 1 — You make a decision on which materials to use

You probably don't want to build your new house with not recognized materials.
You start by knowing and choosing the _**raw materials**_ you will use, which can be:

- 🪵 Wood
- 🧱 Bricks
- 🪨 Concrete
- 🔩 Metal
- 🪟 Glass

---

These are the basic ingredients of your house.
While having them is technically enough to start building your house, but it's not very practical:

- Every time you will need a wall, you will have to recalculate:

  - how many bricks
  - how much cement
  - what thickness
  - which type of reinforcement

- Nothing is standardized or reusable
- The house can be inconsistent
- If someone else joins the project later, you will need to explain EVERYTHING from scratch.

- If at some point you want to expand your house and involve other people, every new builder has to relearn everything

## 🧱 Step 2 — You create building parts to go faster

Instead of redefining everything every time, you create reusable parts:

- 🟫 Some standard walls
- 🚪 Standard doors
- 🪟 Standard windows

They allow you to be faster, and you don't have to worry about the raw materials anymore.

Instead of thinking:

> "How many bricks and cement do I need to build this wall?"

You now think:

> "I need this specific wall"

These parts are reusable, consistent, and easier to understand.

## 🚪 Step 3 — You want to create rooms with purpose

Now that you have standard parts, you want to create rooms with specific purposes:

- 🛏 bedroom (place to sleep)
- 🍳 kitchen (place to cook)
- 🚿 bathroom (place to wash)
- 💼 office (place to work)

All of these rooms are made of parts you defined earlier (walls, doors, windows, roofs), but they have a specific purpose.

When you think about building a bedroom, you don't think

> 4 blue walls, 1 red doors

you think about

> "a place to sleep".

## 🛋️ Step 4 — People live inside (Components)

Furniture, people, behavior — all of this sits on top of rooms.

No one sleeping in the bedroom wonders:

- “Is this wall brick or concrete?”

- “What thickness is the insulation?”

- “What type of screws did they use?”

They only care that it's a bedroom, and it serves its purpose.
They can then add furniture, decorate it, and use it as intended, according to the room's purpose.

## What if you want to change something?

When a house is finished, and you want to apport changes, you usually not:

- Directly change raw materials
- Rebuild rooms from scratch or change their purpose

What you do is updating what is directly visible:

- Change the paint color of the walls
- Change the type of furniture
- Swap a door for a bigger one
- Add more windows for more light
  etc.

These pieces define the style, look and feel of the house without changing its fundamental structure, or the purpose of each room.

So if you want:

a modern house → update colors, finishes, fixtures

a cozy house → use warm tones, wooden textures

a minimalist house → simplify surfaces and spacing

All these changes happen in the layer that controls the appearance,
not in the foundation, not in the room layout,
and not in the purpose of the spaces.

It's the part that's meant to be changed later
while everything else stays stable.

- **Parts with purpose**: Is
- **Abstraction layers**: Each step represents a layer of abstraction, from raw materials to functional spaces. This mirrors how design tokens abstract raw values into meaningful components.

## 🪜 The abstraction protects the user


The abstraction protects the user.

- How to screw a simple door
- Fix some wall together (which material is it even?)
- or how to properly install and even isolate a window

As:

- Components don’t care about RGB values
- Developers don’t care about the exact blue hex
- Designers don’t want to debate spacing values every time
