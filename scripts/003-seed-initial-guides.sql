-- Seed the database with the 4 manually created guides and pin them.
-- Using $$ to avoid issues with single quotes in the JSON content.

INSERT INTO guides (slug, game_name, guide_data, is_pinned) VALUES
('settlers-of-catan', 'Settlers of Catan', $$
{
  "gameName": "Settlers of Catan",
  "creatorName": "RDS Game Club",
  "gameSubtitle": "A game of trading, building, and settling an uncharted island.",
  "thinkAndShare": [
    "Favorite part of playing Catan?",
    "What is one thing YOU would change or add?"
  ],
  "allMechanics": [
    { "id": 1, "column": "biggest_ideas", "icon": "ShoppingBasket", "title": "Resource Collecting & Spending", "subTitle": "Resource Management", "gameRule": "You collect resources from tiles your settlements (🏠) touch when that number is rolled.", "strategyTip": "Try to build near numbers that get rolled a lot (like 6 and 8)!", "whatItMeans": "You get resources like 🧱 (bricks), 🪵 (wood), 🐑 (sheep), 🌾 (wheat), and ⛰️ (ore)... and use them to build things!" },
    { "id": 3, "column": "biggest_ideas", "icon": "Puzzle", "title": "Set Making (Building to Win!)", "subTitle": "Set Collection", "gameRule": "Each building or card has its own recipe (e.g., 1 🪵 + 1 🧱 = ↔️ road).", "strategyTip": "Always think about what you're saving up for—aim for the sets that help you win!", "whatItMeans": "You collect specific sets of resources to build ↔️ roads, 🏠 settlements, 🏙️ cities, or buy development cards." },
    { "id": 4, "column": "biggest_ideas", "icon": "Home", "title": "Building on the Board", "subTitle": "Area Control", "gameRule": "New settlements must be at least two road spaces away from any other settlement. Roads connect to your existing pieces.", "strategyTip": "Settle where you can get lots of different resources. And try to connect your roads!", "whatItMeans": "You choose where to put your ↔️ roads and 🏠 settlements (which can become 🏙️ cities!)." },
    { "id": 6, "column": "more_mechanics", "icon": "TrendingUp", "title": "Getting Stronger Over Time", "subTitle": "Engine Building", "gameRule": "🏙️ Cities give you 2 of that resource card when their tile's number is rolled (instead of 1 for a 🏠 settlement).", "strategyTip": "Build early and keep growing your settlements and cities so you get more resources every turn.", "whatItMeans": "The more you build, the more resources you can potentially get each turn. Your game 'engine' gets better!" },
    { "id": 9, "column": "more_mechanics", "icon": "UserX", "title": "The Robber (Watch Out!)", "subTitle": "Take-That / Player Interaction", "gameRule": "Roll a 7: move the Robber to any hex. It stops that hex from producing resources. Steal 1 random resource card from someone with a building on that hex. Also, if you have more than 7 cards, you lose half (rounded down).", "strategyTip": "Use the Robber to slow down the player who is in the lead, or to unblock a tile you really need!", "whatItMeans": "If anyone rolls a 7, the 🕵️ Robber moves! They block a tile and can steal a card." },
    { "id": 14, "column": "more_mechanics", "icon": "Repeat", "title": "Always In the Game", "subTitle": "Passive Resource Gain / Non-Turn Interaction", "gameRule": "Players get resource cards whenever a hex they have a 🏠 settlement or 🏙️ city on has its number rolled (unless the Robber 🕵️ is there).", "strategyTip": "Build on hexes with numbers that are rolled often (like 6 or 8) so you get cards frequently, no matter whose turn it is.", "whatItMeans": "You can get resources even when it's not your turn, if the dice roll a number your buildings are on!" },
    { "id": 8, "column": "secret_sauce", "icon": "EyeOff", "title": "Secret Cards (Mystery Points!)", "subTitle": "Hidden Information", "gameRule": "Victory Point cards from Development Cards stay hidden until you have enough points to win the game.", "strategyTip": "Don't let others know exactly how close you are to winning if you have secret Victory Point cards!", "whatItMeans": "Some Development Cards (like Victory Points) stay secret until the end or when you use them." },
    { "id": 12, "column": "secret_sauce", "icon": "Megaphone", "title": "Comeback Time!", "subTitle": "Catch-Up Mechanic", "gameRule": "Longest Road (at least 5 continuous roads) and Largest Army (at least 3 Knight cards played) are each worth 2 Victory Points. These can change owners!", "strategyTip": "If you're behind, build the Longest Road or buy Dev Cards for Largest Army or Victory Points.", "whatItMeans": "Even if you fall behind, there are ways to catch up, like getting Longest Road or Largest Army." },
    { "id": 2, "column": "secret_sauce", "icon": "Handshake", "title": "Making Trades", "subTitle": "Trading / Negotiation", "gameRule": "You can trade with anyone on your turn. You can also trade 4 of one card to the bank for 1 you need (or fewer at a port).", "strategyTip": "Trade smart—make sure the trade helps you more than them!", "whatItMeans": "You swap resource cards with other players or the bank." }
  ]
}
$$, true),
('legends-of-andor', 'Legends of Andor', $$
{
  "gameName": "Legends of Andor",
  "creatorName": "RDS Game Club",
  "gameSubtitle": "A cooperative fantasy adventure to defend a realm and rescue wolf cubs.",
  "thinkAndShare": [
    "How did your team work together to beat the dragon?",
    "If you could add a new hero to the game, what would their special power be?"
  ],
  "allMechanics": [
    { "id": 1, "column": "biggest_ideas", "icon": "Users", "title": "Working Together", "subTitle": "Cooperative Gameplay", "gameRule": "All players must work together to complete the mission before the dragon reaches the castle.", "strategyTip": "Talk about your plans before moving. Make sure everyone's actions help the team goal!", "whatItMeans": "Everyone plays on the same team! You win or lose together as you try to rescue the 🐺 wolf cubs." },
    { "id": 3, "column": "biggest_ideas", "icon": "Sun", "title": "Moving with Sun Discs", "subTitle": "Action Point Allowance", "gameRule": "Each hero has sun discs for movement. Moving one space costs one disc. Wells refill your supply.", "strategyTip": "Plan your movement carefully! Visit wells to refill your sun discs when needed.", "whatItMeans": "You use ☀️ sun discs to move around the board. When you run out, you need to rest!" },
    { "id": 4, "column": "biggest_ideas", "icon": "Map", "title": "Exploring the Unknown", "subTitle": "Fog of War / Exploration", "gameRule": "When a hero enters a space with a fog token, flip it over to reveal what's underneath (resources, coins, enemies, etc.).", "strategyTip": "Explore efficiently by splitting up, but be careful not to get caught alone with enemies!", "whatItMeans": "The board starts covered in fog tiles. When you move to a new space, you flip the tile to see what's there!" },
    { "id": 5, "column": "more_mechanics", "icon": "Sword", "title": "Fighting the Gors", "subTitle": "Dice-Based Combat", "gameRule": "Roll the dice and place your hero's strength tokens on the Gor's card until all spaces are filled to defeat it.", "strategyTip": "Sometimes it's better to avoid fights if you can. Other times, you need to defeat Gors to protect the castle!", "whatItMeans": "You fight enemies (Gors) by rolling the 🎲 dice. Fill up their strength spaces to defeat them!" },
    { "id": 10, "column": "more_mechanics", "icon": "Mountain", "title": "Saving the Wolf Cubs", "subTitle": "Final Objective / Rescue Mission", "gameRule": "To win the game, heroes must locate and rescue all the wolf cubs from the mine before the dragon reaches the castle.", "strategyTip": "Everything you do should help you get closer to saving the wolf cubs. Keep the main goal in mind!", "whatItMeans": "Your ultimate goal is to find and rescue the baby 🐺 wolf cubs from the dangerous mine before the dragon reaches the castle!" },
    { "id": 7, "column": "more_mechanics", "icon": "ListChecks", "title": "Completing Quests", "subTitle": "Mission-Based Objectives", "gameRule": "Each quest has specific objectives that must be completed in order. The goal is always to rescue the wolf cubs.", "strategyTip": "Focus on the main quest objectives. Don't get distracted by side adventures unless they help your mission!", "whatItMeans": "You need to complete different tasks (like getting past Mart the bridge guard) before you can rescue the 🐺 wolf cubs." },
    { "id": 2, "column": "secret_sauce", "icon": "Shield", "title": "Special Hero Powers", "subTitle": "Asymmetric Character Abilities", "gameRule": "Each character has unique abilities that affect how they move, fight, or complete tasks.", "strategyTip": "Use each hero's strengths—the warrior fights better, the archer moves faster, etc.", "whatItMeans": "Each hero (🧙‍♂️ magician, ⚔️ warrior, 🏹 archer, or 👷 dwarf) has different special abilities!" },
    { "id": 9, "column": "secret_sauce", "icon": "Footprints", "title": "Planning Your Path", "subTitle": "Route Optimization", "gameRule": "Heroes can move in any direction as long as they have enough sun discs. Some terrain may be harder to traverse.", "strategyTip": "Look at the whole board and plan several moves ahead. The shortest path isn't always the best one!", "whatItMeans": "You need to find the most efficient path through Andor to complete your quests before time runs out!" },
    { "id": 6, "column": "secret_sauce", "icon": "Bird", "title": "Racing Against the Dragon", "subTitle": "Escalating Threat / Timer", "gameRule": "At the end of each round, the dragon moves one space closer to the castle. Gors reaching the castle make it move faster.", "strategyTip": "Keep track of how many moves the dragon has left. Sometimes you need to slow it down by fighting Gors!", "whatItMeans": "The 🐉 dragon moves closer to the castle each round. If it reaches the castle before you save the 🐺 wolf cubs, everyone loses!" }
  ]
}
$$, true),
('machi-koro', 'Machi Koro', $$
{
  "gameName": "Machi Koro",
  "creatorName": "RDS Game Club",
  "gameSubtitle": "A fast-paced game of dice rolling and city building to construct landmarks.",
  "thinkAndShare": [
    "What new card or card combo would you add?",
    "What about this game is fun?"
  ],
  "allMechanics": [
    { "id": 1, "column": "biggest_ideas", "icon": "Landmark", "title": "Build to Win", "subTitle": "Set Collection + Progression", "gameRule": "The first player to build all their landmarks wins!", "strategyTip": "Build in a smart order. Start with landmarks that boost your income or unlock key abilities.", "whatItMeans": "You’re building landmarks in your city. Each one unlocks a new power and gets you closer to winning!" },
    { "id": 10, "column": "biggest_ideas", "icon": "Store", "title": "The Shared Shop", "subTitle": "Drafting", "gameRule": "The marketplace has a limited supply of each card. Once they're gone, they're gone.", "strategyTip": "Plan ahead for the second stage of the game where pairs of cards work together.", "whatItMeans": "Everyone buys from the same shared shop. Every card you buy is one your opponents can't have!" },
    { "id": 3, "column": "biggest_ideas", "icon": "Dice", "title": "Make Your Luck", "subTitle": "Randomness + Smart Planning", "gameRule": "You start rolling 1 die. After you build the 🚉 Train Station, you can roll 2 dice. With two dice, numbers like 6, 7, and 8 become the most common.", "strategyTip": "At first, numbers 1–6 are equally likely—but once two dice are in play, the odds will change. Plan ahead!", "whatItMeans": "You can’t control the dice, but you can choose cards that make the most of whatever numbers come up. Your choices shape how 'lucky' you get." },
    { "id": 4, "column": "more_mechanics", "icon": "Puzzle", "title": "Combo Power", "subTitle": "Synergy + Engine Building", "gameRule": "The Cheese Factory earns more coins if you have lots of 🐄 Ranches. Stack them!", "strategyTip": "Look for pairs—like Factories and the basic cards they feed on.", "whatItMeans": "Some cards give extra coins based on how many of another card you own." },
    { "id": 5, "column": "more_mechanics", "icon": "Users", "title": "Take That!", "subTitle": "Player Interaction", "gameRule": "Red cards trigger on other players’ turns. Purple cards let you target someone directly.", "strategyTip": "Play mean when someone’s close to winning—or just to even things up.", "whatItMeans": "Some cards steal from other players or block them. Use them to slow down leaders!" },
    { "id": 2, "column": "more_mechanics", "icon": "Coins", "title": "Passive Income", "subTitle": "Engine Building + Non-Turn Interaction", "gameRule": "Blue cards give you coins whenever their number is rolled, even on another player’s turn.", "strategyTip": "Get lots of cards that trigger often. That way, you’re always earning!", "whatItMeans": "You can earn coins even when it’s not your turn—if the dice roll matches your cards." },
    { "id": 7, "column": "secret_sauce", "icon": "Key", "title": "Unlocking", "subTitle": "Player-Gated Progression", "gameRule": "After you build the 🚉 Train Station, you can choose to roll 1 or 2 dice. That opens up high-number cards (7–12).", "strategyTip": "Don’t rush it! Unlock 2-dice mode only when your cards are ready for it.", "whatItMeans": "Some parts of the game stay locked until you build something special to unlock them—like rolling 2 dice." },
    { "id": 8, "column": "secret_sauce", "icon": "Palette", "title": "Beauty & Color", "subTitle": "Visual Language", "gameRule": "Every card is color-coded and has fun, simple art to help you know what it does at a glance.", "strategyTip": "Each card color has meaning: Blue = always, Red = opponents’ turn, Green = your turn, Purple = special powers.", "whatItMeans": "The game’s bright colors and clean icons help your brain understand things quickly—and make it more fun!" },
    { "id": 9, "column": "secret_sauce", "icon": "Repeat", "title": "One Goal, Many Paths", "subTitle": "Replayability + Strategy Variety", "gameRule": "Everyone has the same goal: build your landmarks. But the cards you collect change how you get there.", "strategyTip": "Try different builds each time. There’s no perfect path, only clever combos.", "whatItMeans": "Everyone is trying to do the same thing—but there are many ways to get there!" }
  ]
}
$$, true),
('azul', 'Azul', $$
{
  "gameName": "Azul",
  "creatorName": "RDS Game Club",
  "gameSubtitle": "An elegant game of pattern building and competitive tile drafting.",
  "thinkAndShare": [
    "If you could add one rule or special tile, what would it be?",
    "What is fun about Azul?"
  ],
  "allMechanics": [
    { "id": 1, "column": "biggest_ideas", "icon": "LayoutGrid", "title": "Build Your Wall", "subTitle": "Tile Placement", "gameRule": "You score when you finish rows. Full rows, columns, or colors give bonus points later.", "strategyTip": "Try to finish rows and columns. They give you the most points.", "whatItMeans": "You place tiles to make your wall. Where you put them changes your score." },
    { "id": 2, "column": "biggest_ideas", "icon": "Puzzle", "title": "Match for Points", "subTitle": "Pattern Building", "gameRule": "Tiles score based on how many other tiles they touch on your wall.", "strategyTip": "Place tiles where they connect to others. More connections = more points.", "whatItMeans": "Tiles score more when they touch others." },
    { "id": 3, "column": "biggest_ideas", "icon": "Grab", "title": "Take What They Want", "subTitle": "Drafting", "gameRule": "Take all tiles of one color from a factory or the center. The rest go to the middle.", "strategyTip": "Watch what other players need. Steal it first!", "whatItMeans": "You can pick tiles to help you—or to mess up someone else." },
    { "id": 4, "column": "more_mechanics", "icon": "AlertTriangle", "title": "Tile Overload!", "subTitle": "Risk Management", "gameRule": "Extra tiles go to the floor line and cost you points at the end of the round.", "strategyTip": "Plan ahead for moments where you have to take extra tiles. Sacrifice is part of the strategy!", "whatItMeans": "If you can't use all your tiles, they fall to the floor and lose you points." },
    { "id": 5, "column": "more_mechanics", "icon": "Brain", "title": "Think Ahead", "subTitle": "Planning", "gameRule": "Tiles stay in rows until the round ends—so think a few moves ahead.", "strategyTip": "Set up big scoring turns. Don't just grab random tiles.", "whatItMeans": "Good moves now are great—but big combos later win the game." },
    { "id": 6, "column": "more_mechanics", "icon": "Star", "title": "Big Bonus Points", "subTitle": "Endgame Scoring", "gameRule": "+2 points for each full row, +7 for a column, +10 for all of one color.", "strategyTip": "Go for those bonuses, but don't forget to score along the way.", "whatItMeans": "You get extra points for finishing rows, columns, or all 5 of one color." },
    { "id": 8, "column": "secret_sauce", "icon": "Eye", "title": "Everything's Out in the Open", "subTitle": "Open Info", "gameRule": "Nothing is hidden. Everyone can see everything.", "strategyTip": "Don't just focus on your wall—watch what others are doing too.", "whatItMeans": "You can see everyone's boards and what they need." },
    { "id": 9, "column": "secret_sauce", "icon": "Repeat", "title": "Picks Change Everything", "subTitle": "Interactive Turns", "gameRule": "Players take turns picking tiles until there are none left for that round.", "strategyTip": "Think about what you leave behind for the next player.", "whatItMeans": "What one player picks changes what everyone else can get." },
    { "id": 7, "column": "secret_sauce", "icon": "Palette", "title": "Beauty That Works", "subTitle": "Visual Design", "gameRule": "Tiles are bright, clear, and color-coded. The wall grid helps you see scoring patterns at a glance.", "strategyTip": "The colors and layout make it easy to plan ahead and spot good moves.", "whatItMeans": "Azul looks awesome—and that actually helps you play better." }
  ]
}
$$, true)
ON CONFLICT (slug) DO NOTHING;
