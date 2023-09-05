import express from "express";

const emojis = [
  { id: 1, character: "😀", name: "Grinning Face" },
  { id: 2, character: "🚀", name: "Rocket" },
  { id: 3, character: "🌟", name: "Star" },
  { id: 4, character: "🎉", name: "Party Popper" },
  { id: 5, character: "🐱", name: "Cat Face" },
  { id: 6, character: "🌺", name: "Hibiscus" },
  { id: 7, character: "🍔", name: "Hamburger" },
  { id: 8, character: "🚲", name: "Bicycle" },
  { id: 9, character: "📚", name: "Books" },
  { id: 10, character: "🎈", name: "Balloon" },
  { id: 11, character: "🍕", name: "Pizza" },
  { id: 12, character: "🏖️", name: "Beach with Umbrella" },
  { id: 13, character: "🎸", name: "Guitar" },
  { id: 14, character: "🌈", name: "Rainbow" },
  { id: 15, character: "🌊", name: "Ocean Wave" },
  { id: 16, character: "🍦", name: "Ice Cream" },
  { id: 17, character: "🎨", name: "Artist Palette" },
  { id: 18, character: "🐶", name: "Dog Face" },
  { id: 19, character: "🌄", name: "Sunrise Over Mountains" },
  { id: 20, character: "🎓", name: "Graduation Cap" },
  { id: 21, character: "🍂", name: "Fallen Leaf" },
  { id: 22, character: "🍁", name: "Maple Leaf" },
  { id: 23, character: "🎃", name: "Jack-O-Lantern" },
  { id: 24, character: "🎄", name: "Christmas Tree" },
  { id: 25, character: "❄️", name: "Snowflake" },
  { id: 26, character: "🌻", name: "Sunflower" },
  { id: 27, character: "🌍", name: "Earth Globe Europe-Africa" },
  { id: 28, character: "🌞", name: "Sun with Face" },
  { id: 29, character: "🌚", name: "New Moon Face" },
  { id: 30, character: "🎶", name: "Musical Notes" },
];

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send({ success: true, test: "Hello Word" });
});

app.get("/emojis", (req, res) => {
  res.send({ success: true, emojis });
});

app.get("/emojis/:id", (req, res) => {
  const { id } = req.params;
  const emoji = findEmoji(id);
  if (!emoji) {
    return res.send({ success: false, error: "The emoji does not exist!" });
  }
  return res.send({ success: true, emoji });
});

app.post("/emojis", (req, res) => {
  const { name, character } = req.body;
  const result = validateEmoji(name, character);
  if (result !== "valid") {
    return res.send(result);
  }
  const emoji = { id: emojis.length + 1, name, character };
  emojis.push(emoji);
  return res.send({ success: true, emoji });
});

app.delete("/emojis/:id", (req, res) => {
  const { id } = req.params;
  const index = findIndex(id);
  if (index === -1) {
    return res.send({ success: false, error: "Emoji not found!" });
  }
  const emoji = emojis.splice(index, 1)[0];
  return res.send({ success: true, emoji });
});

app.put("/emojis/:id", (req, res) => {
  const { id } = req.params;
  const index = findIndex(id);
  if (index === -1) {
    return res.send({ success: false, error: "Emoji not found!" });
  }
  const { name, character } = req.body;
  const result = validateEmoji(name, character);
  if (result !== "valid") {
    return res.send(result);
  }
  const emoji = { id, character, name };
  emojis.splice(index, 1, emoji);
  return res.send({ success: true, emoji });
});

app.use((req, res) => {
  res.send({ success: false, error: "No route found." });
});

app.use((error, req, res, next) => {
  res.send({ success: false, error: error.message });
});

function findEmoji(id) {
  const emoji = emojis.find((emoji) => emoji.id === Number(id));
  return emoji;
}

function findIndex(id) {
  const index = emojis.findIndex((emoji) => emoji.id === Number(id));
  return index;
}

function validateEmoji(name, character) {
  if (!name) {
    return { success: false, error: "You must provide a name" };
  }
  if (!character) {
    return { success: false, error: "You must provide a character" };
  }
  return "valid";
}

const PORT = process.env.PORT || 3030;

app.listen(PORT, () => console.log(`Listening on port ${PORT}!`));
