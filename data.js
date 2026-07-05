// ============================================
// RPG英语闯关 - 游戏数据
// ============================================

const GAME_DATA = {
  // 玩家初始数据
  player: {
    name: "勇者",
    level: 1,
    hp: 100,
    maxHp: 100,
    exp: 0,
    maxExp: 100,
    gold: 0,
    potions: 3,
    stars: 0,
    totalStars: 0,
    achievements: [],
    currentChapter: 1,
    currentStage: 0,
    completedStages: {}
  },

  // ============================================
  // 10个章节
  // ============================================
  chapters: [
    // ========== 第1章：字母王国 ==========
    {
      id: 1,
      title: "字母王国",
      subtitle: "The Kingdom of Letters",
      description: "欢迎来到字母王国！在这里你将学习26个英文字母和基础发音，击败字母魔王，开启你的英语冒险之旅！",
      bgTheme: "kingdom",
      bossName: "字母魔王",
      bossEmoji: "👑",
      stages: [
        {
          type: "vocabulary",
          title: "认识元音字母",
          instruction: "选择正确的元音字母！",
          questions: [
            { q: "以下哪个是元音字母？", options: ["A", "B", "C", "D"], answer: 0, hint: "元音字母有5个：A E I O U" },
            { q: "以下哪个是元音字母？", options: ["F", "E", "G", "H"], answer: 1, hint: "E 是元音字母" },
            { q: "以下哪个不是元音字母？", options: ["I", "O", "U", "B"], answer: 3, hint: "B 是辅音字母" },
            { q: "元音字母一共有几个？", options: ["3个", "5个", "7个", "6个"], answer: 1, hint: "A E I O U" },
            { q: "以下哪个是元音字母？", options: ["P", "Q", "O", "R"], answer: 2, hint: "O 是元音字母" }
          ]
        },
        {
          type: "vocabulary",
          title: "字母大小写配对",
          instruction: "选择大写字母对应的小写字母！",
          questions: [
            { q: "'A' 的小写是？", options: ["a", "b", "c", "d"], answer: 0 },
            { q: "'G' 的小写是？", options: ["e", "f", "g", "h"], answer: 2 },
            { q: "'K' 的小写是？", options: ["i", "j", "k", "l"], answer: 2 },
            { q: "'M' 的小写是？", options: ["m", "n", "o", "p"], answer: 0 },
            { q: "'T' 的小写是？", options: ["q", "r", "s", "t"], answer: 3 }
          ]
        },
        {
          type: "spelling",
          title: "字母拼写挑战",
          instruction: "听发音，拼写出正确的字母！",
          questions: [
            { q: "拼写：/eɪ/（发音）", answer: "A", hint: "这个字母是元音，发音像中文'诶'的长音" },
            { q: "拼写：/biː/", answer: "B", hint: "发音像中文'必'" },
            { q: "拼写：/siː/", answer: "C", hint: "发音像中文'西'" },
            { q: "拼写：/ef/", answer: "F", hint: "发音像中文'艾弗'" },
            { q: "拼写：/eɪtʃ/", answer: "H", hint: "发音像中文'诶奇'" }
          ]
        },
        {
          type: "battle",
          title: "⚔️ Boss战：字母魔王",
          instruction: "回答问题来攻击字母魔王！答错会被魔王攻击！",
          monsterHp: 5,
          monsterName: "字母魔王",
          monsterEmoji: "👑",
          questions: [
            { q: "字母表中第一个字母是？", options: ["A", "B", "C", "Z"], answer: 0 },
            { q: "字母表中最后一个字母是？", options: ["X", "Y", "Z", "W"], answer: 2 },
            { q: "'C' 和 'D' 中间是哪个字母？", options: ["B", "E", "F", "没有"], answer: 1, hint: "A B C D E..." },
            { q: "以下哪个字母的发音是 /siː/？", options: ["C", "S", "G", "J"], answer: 0 },
            { q: "字母表一共有多少个字母？", options: ["24", "25", "26", "28"], answer: 2 }
          ]
        }
      ]
    },

    // ========== 第2章：你好世界 ==========
    {
      id: 2,
      title: "你好世界！",
      subtitle: "Hello World!",
      description: "学习打招呼和自我介绍，你将遇到来自世界各地的新朋友！",
      bgTheme: "world",
      bossName: "沉默守卫",
      bossEmoji: "🤫",
      stages: [
        {
          type: "vocabulary",
          title: "打招呼用语",
          instruction: "选择正确的打招呼方式！",
          questions: [
            { q: "早上好，你应该说？", options: ["Good morning", "Good night", "Goodbye", "Sorry"], answer: 0 },
            { q: "下午好，你应该说？", options: ["Good morning", "Good afternoon", "Good evening", "Good night"], answer: 1 },
            { q: "晚上好，你应该说？", options: ["Good morning", "Good afternoon", "Good evening", "Goodbye"], answer: 2 },
            { q: "再见，你应该说？", options: ["Hello", "Sorry", "Goodbye", "Thanks"], answer: 2 },
            { q: "很高兴认识你，你应该说？", options: ["I'm sorry", "Nice to meet you", "Excuse me", "Thank you"], answer: 1 }
          ]
        },
        {
          type: "sentence",
          title: "自我介绍",
          instruction: "选择正确的句子来完成自我介绍！",
          questions: [
            { q: "我想说'我叫小明'，应该说？", options: ["My name is Xiaoming", "I name Xiaoming", "Me name Xiaoming", "My name are Xiaoming"], answer: 0 },
            { q: "我想说'我10岁'，应该说？", options: ["I am 10 year old", "I am 10 years old", "I is 10 years old", "Me am 10 years old"], answer: 1 },
            { q: "我想说'我来自中国'，应该说？", options: ["I come from China", "I from China", "I am come from China", "I comes from China"], answer: 0 },
            { q: "我想说'我是一个学生'，应该说？", options: ["I am a student", "I is a student", "Me am a student", "I a student"], answer: 0 },
            { q: "别人说 Nice to meet you，你应该回答？", options: ["Nice to meet you too", "Thank you", "Sorry", "Goodbye"], answer: 0 }
          ]
        },
        {
          type: "spelling",
          title: "拼写基础问候语",
          instruction: "拼写正确的问候语！",
          questions: [
            { q: "拼写'你好'", answer: "HELLO", hint: "H-E-L-L-O" },
            { q: "拼写'谢谢'", answer: "THANK YOU", hint: "T-H-A-N-K Y-O-U" },
            { q: "拼写'再见'", answer: "GOODBYE", hint: "G-O-O-D-B-Y-E" },
            { q: "拼写'请'", answer: "PLEASE", hint: "P-L-E-A-S-E" },
            { q: "拼写'对不起'", answer: "SORRY", hint: "S-O-R-R-Y" }
          ]
        },
        {
          type: "battle",
          title: "⚔️ Boss战：沉默守卫",
          instruction: "用正确的问候语击败沉默守卫！",
          monsterHp: 5,
          monsterName: "沉默守卫",
          monsterEmoji: "🤫",
          questions: [
            { q: "遇到老师，你应该说？", options: ["Good morning, teacher!", "Goodbye, teacher!", "Sorry, teacher!", "Thank you, teacher!"], answer: 0 },
            { q: "朋友问 How are you? 你应该回答？", options: ["How old are you?", "I'm fine, thank you!", "My name is...", "Goodbye!"], answer: 1 },
            { q: "你想问别人名字，应该问？", options: ["How are you?", "What's your name?", "How old are you?", "Where are you from?"], answer: 1 },
            { q: "你想问别人年龄，应该问？", options: ["What's your name?", "How are you?", "How old are you?", "Where are you from?"], answer: 2 },
            { q: "你想说'我也很高兴认识你'，应该说？", options: ["Nice to meet you", "Nice to meet you too", "Thank you", "Hello"], answer: 1 }
          ]
        }
      ]
    },

    // ========== 第3章：数字与购物 ==========
    {
      id: 3,
      title: "数字与购物",
      subtitle: "Numbers & Shopping",
      description: "学习数字和购物用语，在魔法商店里用英语买东西吧！",
      bgTheme: "shop",
      bossName: "贪婪商人",
      bossEmoji: "💰",
      stages: [
        {
          type: "vocabulary",
          title: "数字1-20",
          instruction: "选择正确的数字英文！",
          questions: [
            { q: "'5' 的英文是？", options: ["three", "five", "seven", "nine"], answer: 1 },
            { q: "'12' 的英文是？", options: ["ten", "eleven", "twelve", "thirteen"], answer: 2 },
            { q: "'15' 的英文是？", options: ["fourteen", "fifteen", "sixteen", "fifty"], answer: 1 },
            { q: "'20' 的英文是？", options: ["twelve", "twenty", "thirty", "two ten"], answer: 1 },
            { q: "'8' 的英文是？", options: ["six", "seven", "eight", "nine"], answer: 2 }
          ]
        },
        {
          type: "sentence",
          title: "购物对话",
          instruction: "选择正确的购物用语！",
          questions: [
            { q: "你想问价格，应该问？", options: ["How many?", "How much?", "How old?", "How are you?"], answer: 1 },
            { q: "你想买东西，应该说？", options: ["I want this", "Can I have this, please?", "Give me this", "This is mine"], answer: 1 },
            { q: "店员说 Here you are，你应该回答？", options: ["Here you are too", "Thank you", "I don't want it", "How much?"], answer: 1 },
            { q: "你想说'太贵了'，应该说？", options: ["It's too cheap", "It's too expensive", "It's too big", "It's too small"], answer: 1 },
            { q: "你想说'我要这个'，应该说？", options: ["I don't like this", "I'll take this one", "I can't see this", "I don't know this"], answer: 1 }
          ]
        },
        {
          type: "spelling",
          title: "拼写数字",
          instruction: "拼写正确的数字英文！",
          questions: [
            { q: "拼写'3'", answer: "THREE", hint: "T-H-R-E-E" },
            { q: "拼写'7'", answer: "SEVEN", hint: "S-E-V-E-N" },
            { q: "拼写'10'", answer: "TEN", hint: "T-E-N" },
            { q: "拼写'100'", answer: "ONE HUNDRED", hint: "O-N-E H-U-N-D-R-E-D" },
            { q: "拼写'50'", answer: "FIFTY", hint: "F-I-F-T-Y" }
          ]
        },
        {
          type: "battle",
          title: "⚔️ Boss战：贪婪商人",
          instruction: "用正确的英语和商人交易，击败他！",
          monsterHp: 5,
          monsterName: "贪婪商人",
          monsterEmoji: "💰",
          questions: [
            { q: "商人问：Can I help you? 你应该回答？", options: ["No, go away", "Yes, I'm looking for a book", "I don't know", "Goodbye"], answer: 1 },
            { q: "这本书10元，你想说'好的我买了'，应该说？", options: ["No thanks", "OK, I'll take it", "I don't like it", "It's too expensive"], answer: 1 },
            { q: "你想问'有红色的吗'，应该问？", options: ["Do you have red?", "Do you have it in red?", "Is it red?", "Are you red?"], answer: 1 },
            { q: "你想说'可以便宜点吗'，应该说？", options: ["Can it be cheaper?", "Is it cheap?", "You are cheap", "Give me money"], answer: 0 },
            { q: "付钱后你想说'不用找了'，应该说？", options: ["Don't find it", "Keep the change", "Where is my money?", "I don't have change"], answer: 1 }
          ]
        }
      ]
    },

    // ========== 第4章：美食天下 ==========
    {
      id: 4,
      title: "美食天下",
      subtitle: "Food & Restaurant",
      description: "学习食物和餐厅用语，在魔法餐厅里用英语点餐吧！",
      bgTheme: "food",
      bossName: "饥饿巨龙",
      bossEmoji: "🐉",
      stages: [
        {
          type: "vocabulary",
          title: "常见食物",
          instruction: "选择正确的食物英文！",
          questions: [
            { q: "'苹果' 的英文是？", options: ["banana", "apple", "orange", "grape"], answer: 1 },
            { q: "'面包' 的英文是？", options: ["rice", "bread", "cake", "egg"], answer: 1 },
            { q: "'牛奶' 的英文是？", options: ["water", "juice", "milk", "tea"], answer: 2 },
            { q: "'鸡肉' 的英文是？", options: ["beef", "pork", "chicken", "fish"], answer: 2 },
            { q: "'米饭' 的英文是？", options: ["noodle", "rice", "soup", "salad"], answer: 1 }
          ]
        },
        {
          type: "sentence",
          title: "餐厅点餐",
          instruction: "选择正确的点餐用语！",
          questions: [
            { q: "在餐厅你想看菜单，应该问？", options: ["Where is the toilet?", "Can I see the menu, please?", "What time is it?", "How are you?"], answer: 1 },
            { q: "你想点一个汉堡，应该说？", options: ["I want a hamburger", "I'd like a hamburger, please", "Give me hamburger", "Hamburger is mine"], answer: 1 },
            { q: "服务员问你 Anything else? 你想再要杯水，应该说？", options: ["Nothing", "Yes, a glass of water, please", "I don't know", "Go away"], answer: 1 },
            { q: "你想说'很好吃'，应该说？", options: ["It's very bad", "It's delicious", "I don't like it", "It's too much"], answer: 1 },
            { q: "吃完想买单，应该说？", options: ["I want more", "Can I have the bill, please?", "Where is the kitchen?", "I'm hungry"], answer: 1 }
          ]
        },
        {
          type: "spelling",
          title: "拼写食物名称",
          instruction: "拼写正确的食物英文！",
          questions: [
            { q: "拼写'汉堡'", answer: "HAMBURGER", hint: "H-A-M-B-U-R-G-E-R" },
            { q: "拼写'比萨'", answer: "PIZZA", hint: "P-I-Z-Z-A" },
            { q: "拼写'三明治'", answer: "SANDWICH", hint: "S-A-N-D-W-I-C-H" },
            { q: "拼写'巧克力'", answer: "CHOCOLATE", hint: "C-H-O-C-O-L-A-T-E" },
            { q: "拼写'冰淇淋'", answer: "ICE CREAM", hint: "I-C-E C-R-E-A-M" }
          ]
        },
        {
          type: "battle",
          title: "⚔️ Boss战：饥饿巨龙",
          instruction: "用正确的食物英语喂饱巨龙，击败它！",
          monsterHp: 5,
          monsterName: "饥饿巨龙",
          monsterEmoji: "🐉",
          questions: [
            { q: "巨龙想吃水果，你想推荐苹果，应该说？", options: ["How about an apple?", "I don't have apple", "Apple is bad", "Eat nothing"], answer: 0 },
            { q: "巨龙问 Do you like spicy food? 你想说'不，我喜欢甜的'，应该说？", options: ["No, I like sweet food", "Yes, I like spicy", "I don't know", "Food is food"], answer: 0 },
            { q: "你想问巨龙想喝什么，应该问？", options: ["What do you want to eat?", "What would you like to drink?", "Are you hungry?", "Do you have water?"], answer: 1 },
            { q: "巨龙说 I'm full，你想说'很高兴你喜欢'，应该说？", options: ["I'm hungry too", "I'm glad you enjoyed it!", "Eat more!", "I don't care"], answer: 1 },
            { q: "你想请巨龙一起吃饭，应该说？", options: ["Go away", "Would you like to eat with me?", "I eat alone", "No eating here"], answer: 1 }
          ]
        }
      ]
    },

    // ========== 第5章：问路与出行 ==========
    {
      id: 5,
      title: "问路与出行",
      subtitle: "Directions & Travel",
      description: "学习问路和交通工具，在魔法城市里找到你的方向！",
      bgTheme: "city",
      bossName: "迷路幽灵",
      bossEmoji: "👻",
      stages: [
        {
          type: "vocabulary",
          title: "方向与地点",
          instruction: "选择正确的方向和地点英文！",
          questions: [
            { q: "'左边' 的英文是？", options: ["right", "left", "straight", "back"], answer: 1 },
            { q: "'医院' 的英文是？", options: ["school", "hospital", "park", "library"], answer: 1 },
            { q: "'火车站' 的英文是？", options: ["bus stop", "train station", "airport", "subway"], answer: 1 },
            { q: "'超市' 的英文是？", options: ["supermarket", "museum", "cinema", "bank"], answer: 0 },
            { q: "'在...旁边' 的英文是？", options: ["next to", "far from", "in front of", "behind"], answer: 0 }
          ]
        },
        {
          type: "sentence",
          title: "问路对话",
          instruction: "选择正确的问路用语！",
          questions: [
            { q: "你想问路，应该先说？", options: ["Go away", "Excuse me, can you help me?", "I don't know", "Tell me now"], answer: 1 },
            { q: "你想问'医院在哪里'，应该问？", options: ["Where is the hospital?", "What is the hospital?", "Who is the hospital?", "How is the hospital?"], answer: 0 },
            { q: "别人给你指路说 Turn left，意思是？", options: ["向右转", "向左转", "直走", "回头"], answer: 1 },
            { q: "你想问'远不远'，应该问？", options: ["Is it near?", "Is it far from here?", "Is it big?", "Is it open?"], answer: 1 },
            { q: "你想说'走路5分钟'，应该说？", options: ["It's 5 minutes by car", "It's about 5 minutes on foot", "It's 5 o'clock", "It's 5 dollars"], answer: 1 }
          ]
        },
        {
          type: "vocabulary",
          title: "交通工具",
          instruction: "选择正确的交通工具英文！",
          questions: [
            { q: "'公交车' 的英文是？", options: ["bus", "car", "taxi", "train"], answer: 0 },
            { q: "'地铁' 的英文是？", options: ["bus", "taxi", "subway", "bicycle"], answer: 2 },
            { q: "'飞机' 的英文是？", options: ["train", "plane", "ship", "car"], answer: 1 },
            { q: "'自行车' 的英文是？", options: ["motorcycle", "bus", "bicycle", "truck"], answer: 2 },
            { q: "'出租车' 的英文是？", options: ["bus", "taxi", "subway", "train"], answer: 1 }
          ]
        },
        {
          type: "battle",
          title: "⚔️ Boss战：迷路幽灵",
          instruction: "用正确的问路英语帮幽灵找到回家的路！",
          monsterHp: 5,
          monsterName: "迷路幽灵",
          monsterEmoji: "👻",
          questions: [
            { q: "幽灵问 How do I get to the park? 你想说'直走然后左转'，应该说？", options: ["Go back", "Go straight and turn left", "Turn right", "I don't know"], answer: 1 },
            { q: "你想问'这附近有银行吗'，应该问？", options: ["Is there a bank near here?", "Where is the bank far away?", "Do you like banks?", "Bank is good"], answer: 0 },
            { q: "幽灵说 It's next to the school，意思是？", options: ["在学校里面", "在学校旁边", "离学校很远", "学校对面"], answer: 1 },
            { q: "你想说'你可以坐公交车去'，应该说？", options: ["You can walk there", "You can take a bus there", "You can fly there", "You can't go there"], answer: 1 },
            { q: "幽灵说 Thank you for your help! 你应该回答？", options: ["Go away", "You're welcome!", "I don't help", "No thanks"], answer: 1 }
          ]
        }
      ]
    },

    // ========== 第6章：时间与日常 ==========
    {
      id: 6,
      title: "时间与日常",
      subtitle: "Time & Daily Life",
      description: "学习时间和日常作息，安排好你的冒险日程！",
      bgTheme: "time",
      bossName: "时间巫师",
      bossEmoji: "⏰",
      stages: [
        {
          type: "vocabulary",
          title: "时间表达",
          instruction: "选择正确的时间英文！",
          questions: [
            { q: "'7点' 的英文是？", options: ["seven o'clock", "seven clock", "seven time", "seven hour"], answer: 0 },
            { q: "'半小时' 的英文是？", options: ["half hour", "half an hour", "half of hour", "thirty minute"], answer: 1 },
            { q: "'上午' 的英文是？", options: ["afternoon", "evening", "morning", "night"], answer: 2 },
            { q: "'今天' 的英文是？", options: ["tomorrow", "yesterday", "today", "tonight"], answer: 2 },
            { q: "'星期一' 的英文是？", options: ["Monday", "Tuesday", "Wednesday", "Sunday"], answer: 0 }
          ]
        },
        {
          type: "sentence",
          title: "日常作息",
          instruction: "选择正确的日常用语！",
          questions: [
            { q: "你想说'我每天7点起床'，应该说？", options: ["I get up at 7 every day", "I go to bed at 7 every day", "I eat at 7 every day", "I sleep at 7 every day"], answer: 0 },
            { q: "你想说'我早餐吃面包'，应该说？", options: ["I eat bread for breakfast", "I eat bread for dinner", "I drink bread for breakfast", "I make bread for lunch"], answer: 0 },
            { q: "你想问'现在几点了'，应该问？", options: ["What day is it?", "What time is it now?", "How old are you?", "Where are you?"], answer: 1 },
            { q: "你想说'我6点吃晚饭'，应该说？", options: ["I have breakfast at 6", "I have dinner at 6", "I have lunch at 6", "I have lunch at 6 pm"], answer: 1 },
            { q: "你想说'然后我去上学'，应该说？", options: ["Then I go to school", "Then I go to home", "Then I go to bed", "Then I go to play"], answer: 0 }
          ]
        },
        {
          type: "sentence",
          title: "约定时间",
          instruction: "选择正确的约定用语！",
          questions: [
            { q: "你想约朋友明天见面，应该说？", options: ["See you yesterday", "Let's meet tomorrow", "Go away tomorrow", "I don't like tomorrow"], answer: 1 },
            { q: "你想问'什么时候'，应该问？", options: ["Where?", "Who?", "When?", "Why?"], answer: 2 },
            { q: "你想说'周末你做什么'，应该问？", options: ["What do you do on weekends?", "Where do you go on weekends?", "Who are you?", "How old are you?"], answer: 0 },
            { q: "朋友说 See you at 3pm，你想确认，应该说？", options: ["No", "OK, see you at 3pm", "I don't know", "3 what?"], answer: 1 },
            { q: "你想说'我通常在周末看书'，应该说？", options: ["I usually read books on weekends", "I never read books", "I always sleep on weekends", "I don't like books"], answer: 0 }
          ]
        },
        {
          type: "battle",
          title: "⚔️ Boss战：时间巫师",
          instruction: "用正确的时间英语击败时间巫师！",
          monsterHp: 5,
          monsterName: "时间巫师",
          monsterEmoji: "⏰",
          questions: [
            { q: "时间巫师问 What time do you get up? 你想回答'我6点半起床'，应该说？", options: ["I get up at 6:30", "I go to bed at 6:30", "I eat at 6:30", "I sleep at 6:30"], answer: 0 },
            { q: "你想问巫师'你什么时候吃午饭'，应该问？", options: ["What do you eat?", "When do you have lunch?", "Where do you eat?", "Do you like lunch?"], answer: 1 },
            { q: "巫师说 It's half past eight，意思是？", options: ["8点整", "8点半", "9点", "7点半"], answer: 1 },
            { q: "你想说'我放学后做作业'，应该说？", options: ["I do homework before school", "I do homework after school", "I don't do homework", "I play after school"], answer: 1 },
            { q: "你想说'该睡觉了'，应该说？", options: ["It's time to wake up", "It's time to go to school", "It's time to go to bed", "It's time to eat"], answer: 2 }
          ]
        }
      ]
    },

    // ========== 第7章：兴趣与爱好 ==========
    {
      id: 7,
      title: "兴趣与爱好",
      subtitle: "Hobbies & Interests",
      description: "学习表达喜好和爱好，结交志同道合的冒险伙伴！",
      bgTheme: "hobby",
      bossName: "无聊怪",
      bossEmoji: "😴",
      stages: [
        {
          type: "vocabulary",
          title: "兴趣爱好",
          instruction: "选择正确的爱好英文！",
          questions: [
            { q: "'游泳' 的英文是？", options: ["running", "swimming", "cooking", "reading"], answer: 1 },
            { q: "'画画' 的英文是？", options: ["dancing", "singing", "drawing", "writing"], answer: 2 },
            { q: "'踢足球' 的英文是？", options: ["play basketball", "play football", "play tennis", "play volleyball"], answer: 1 },
            { q: "'看书' 的英文是？", options: ["watching TV", "reading books", "playing games", "listening to music"], answer: 1 },
            { q: "'听音乐' 的英文是？", options: ["listening to music", "watching movies", "playing sports", "cooking food"], answer: 0 }
          ]
        },
        {
          type: "sentence",
          title: "表达喜好",
          instruction: "选择正确的喜好表达！",
          questions: [
            { q: "你想说'我喜欢游泳'，应该说？", options: ["I like swimming", "I don't like swimming", "I can swim", "I want to swim"], answer: 0 },
            { q: "你想问'你喜欢什么'，应该问？", options: ["What do you like?", "What do you have?", "Where do you go?", "How are you?"], answer: 0 },
            { q: "你想说'我最喜欢的颜色是蓝色'，应该说？", options: ["I like blue", "My favorite color is blue", "Blue is bad", "I don't like blue"], answer: 1 },
            { q: "你想说'我不喜欢跑步'，应该说？", options: ["I like running", "I don't like running", "I can't run", "I want to run"], answer: 1 },
            { q: "你想问'你的爱好是什么'，应该问？", options: ["What's your name?", "What's your hobby?", "How old are you?", "Where are you from?"], answer: 1 }
          ]
        },
        {
          type: "sentence",
          title: "原因表达",
          instruction: "选择正确的表达原因的句子！",
          questions: [
            { q: "你想说'因为很有趣'，应该说？", options: ["Because it's interesting", "Because it's boring", "Because it's bad", "Because it's hard"], answer: 0 },
            { q: "你想说'因为可以交朋友'，应该说？", options: ["Because I can make friends", "Because I can eat food", "Because I can sleep", "Because I can go home"], answer: 0 },
            { q: "你想说'我也喜欢篮球'，应该说？", options: ["I don't like basketball", "I like basketball too", "I hate basketball", "I can't play basketball"], answer: 1 },
            { q: "你想说'为什么你喜欢音乐'，应该问？", options: ["What do you like?", "Do you like music?", "Why do you like music?", "When do you listen?"], answer: 2 },
            { q: "你想说'因为它让我快乐'，应该说？", options: ["Because it makes me sad", "Because it makes me happy", "Because it makes me tired", "Because it makes me angry"], answer: 1 }
          ]
        },
        {
          type: "battle",
          title: "⚔️ Boss战：无聊怪",
          instruction: "用有趣的爱好英语唤醒无聊怪！",
          monsterHp: 5,
          monsterName: "无聊怪",
          monsterEmoji: "😴",
          questions: [
            { q: "无聊怪问 What do you do in your free time? 你想回答'我通常踢足球'，应该说？", options: ["I usually play football", "I usually sleep", "I usually do nothing", "I don't know"], answer: 0 },
            { q: "你想邀请无聊怪一起玩，应该说？", options: ["Go away", "Would you like to play with me?", "I don't want you", "Play alone"], answer: 1 },
            { q: "无聊怪说 I have no hobby，你想说'你可以试试画画'，应该说？", options: ["You can try drawing", "That's too bad, goodbye", "I don't care", "You're boring"], answer: 0 },
            { q: "你想问'你觉得音乐怎么样'，应该问？", options: ["Do you like music?", "What do you think of music?", "Can you play music?", "Where is music?"], answer: 1 },
            { q: "无聊怪被唤醒了！它说 Thank you! 你应该回答？", options: ["Nothing", "You're welcome! Let's be friends!", "I know", "Go away"], answer: 1 }
          ]
        }
      ]
    },

    // ========== 第8章：家庭与朋友 ==========
    {
      id: 8,
      title: "家庭与朋友",
      subtitle: "Family & Friends",
      description: "学习描述家人和朋友，用英语介绍你最重要的人！",
      bgTheme: "family",
      bossName: "孤独骑士",
      bossEmoji: "🗡️",
      stages: [
        {
          type: "vocabulary",
          title: "家庭成员",
          instruction: "选择正确的家庭成员英文！",
          questions: [
            { q: "'爸爸' 的英文是？", options: ["mother", "father", "brother", "sister"], answer: 1 },
            { q: "'奶奶' 的英文是？", options: ["grandmother", "grandfather", "aunt", "uncle"], answer: 0 },
            { q: "'哥哥/弟弟' 的英文是？", options: ["sister", "brother", "cousin", "father"], answer: 1 },
            { q: "'阿姨' 的英文是？", options: ["uncle", "aunt", "cousin", "niece"], answer: 1 },
            { q: "'婴儿' 的英文是？", options: ["child", "baby", "adult", "teenager"], answer: 1 }
          ]
        },
        {
          type: "sentence",
          title: "描述人物",
          instruction: "选择正确的描述用语！",
          questions: [
            { q: "你想介绍爸爸，应该说？", options: ["This is my father", "That is my father", "These are my father", "My father is here"], answer: 0 },
            { q: "你想说'他很高'，应该说？", options: ["He is tall", "He is short", "He is old", "He is young"], answer: 0 },
            { q: "你想说'她很友善'，应该说？", options: ["She is mean", "She is kind", "She is angry", "She is sad"], answer: 1 },
            { q: "你想说'他戴着眼镜'，应该说？", options: ["He wears glasses", "He has no eyes", "He is glasses", "He makes glasses"], answer: 0 },
            { q: "你想说'她有长长的头发'，应该说？", options: ["She has short hair", "She has long hair", "She has no hair", "She is hair"], answer: 1 }
          ]
        },
        {
          type: "sentence",
          title: "描述性格",
          instruction: "选择正确的性格描述！",
          questions: [
            { q: "'有趣的' 的英文是？", options: ["boring", "funny", "sad", "angry"], answer: 1 },
            { q: "'聪明的' 的英文是？", options: ["stupid", "smart", "lazy", "slow"], answer: 1 },
            { q: "你想说'我最好的朋友是小红'，应该说？", options: ["My best friend is Xiaohong", "My good friend are Xiaohong", "Xiaohong is my enemy", "I don't have friends"], answer: 0 },
            { q: "你想说'他经常帮助别人'，应该说？", options: ["He never helps others", "He often helps others", "He hates others", "He doesn't like others"], answer: 1 },
            { q: "你想说'我们在一起很开心'，应该说？", options: ["We are sad together", "We have fun together", "We fight together", "We sleep together"], answer: 1 }
          ]
        },
        {
          type: "battle",
          title: "⚔️ Boss战：孤独骑士",
          instruction: "用温暖的英语融化孤独骑士的心！",
          monsterHp: 5,
          monsterName: "孤独骑士",
          monsterEmoji: "🗡️",
          questions: [
            { q: "孤独骑士问 Do you have any friends? 你想回答'是的，我有很多朋友'，应该说？", options: ["No, I have no friends", "Yes, I have many friends", "I don't like friends", "Friends are bad"], answer: 1 },
            { q: "你想说'你可以做我的朋友'，应该说？", options: ["Go away", "You can be my friend", "I don't want you", "You are bad"], answer: 1 },
            { q: "孤独骑士说 I'm lonely，你想安慰他说？", options: ["That's your problem", "Don't worry, I'm here for you!", "I don't care", "Go home"], answer: 1 },
            { q: "你想描述你的家人，应该说？", options: ["I have a happy family", "I have no family", "My family is bad", "Family is boring"], answer: 0 },
            { q: "孤独骑士笑了！你想说'我们现在是朋友了'，应该说？", options: ["We are enemies now", "We are friends now!", "I don't know you", "Goodbye forever"], answer: 1 }
          ]
        }
      ]
    },

    // ========== 第9章：天气与感受 ==========
    {
      id: 9,
      title: "天气与感受",
      subtitle: "Weather & Feelings",
      description: "学习天气和感受表达，在任何情况下都能畅快交流！",
      bgTheme: "weather",
      bossName: "暴风雨魔王",
      bossEmoji: "⛈️",
      stages: [
        {
          type: "vocabulary",
          title: "天气词汇",
          instruction: "选择正确的天气英文！",
          questions: [
            { q: "'晴天' 的英文是？", options: ["rainy", "sunny", "cloudy", "snowy"], answer: 1 },
            { q: "'下雨' 的英文是？", options: ["sunny", "windy", "rainy", "hot"], answer: 2 },
            { q: "'多云' 的英文是？", options: ["sunny", "cloudy", "snowy", "foggy"], answer: 1 },
            { q: "'冷' 的英文是？", options: ["hot", "warm", "cold", "cool"], answer: 2 },
            { q: "'刮风' 的英文是？", options: ["rainy", "sunny", "windy", "snowy"], answer: 2 }
          ]
        },
        {
          type: "sentence",
          title: "谈论天气",
          instruction: "选择正确的天气对话！",
          questions: [
            { q: "你想问'今天天气怎么样'，应该问？", options: ["How are you today?", "How's the weather today?", "What time is it?", "Where are you?"], answer: 1 },
            { q: "你想说'今天天气很好'，应该说？", options: ["The weather is bad today", "The weather is nice today", "The weather is terrible", "I don't like today"], answer: 1 },
            { q: "外面下雨了，你想说'记得带伞'，应该说？", options: ["Remember to bring an umbrella", "Remember to bring sunglasses", "Remember to bring a swimsuit", "Don't bring anything"], answer: 0 },
            { q: "你想说'太热了'，应该说？", options: ["It's too cold", "It's too hot", "It's too windy", "It's too rainy"], answer: 1 },
            { q: "你想说'明天会下雨'，应该说？", options: ["It will be sunny tomorrow", "It will rain tomorrow", "It will snow tomorrow", "Tomorrow is today"], answer: 1 }
          ]
        },
        {
          type: "sentence",
          title: "表达感受",
          instruction: "选择正确的感受表达！",
          questions: [
            { q: "你想说'我很开心'，应该说？", options: ["I feel happy", "I feel sad", "I feel angry", "I feel tired"], answer: 0 },
            { q: "你想说'我有点累'，应该说？", options: ["I'm very energetic", "I'm a little tired", "I'm very hungry", "I'm very cold"], answer: 1 },
            { q: "朋友看起来不舒服，你想问'怎么了'，应该问？", options: ["What's wrong?", "What's your name?", "Where are you?", "How old are you?"], answer: 0 },
            { q: "你想说'我生病了'，应该说？", options: ["I'm healthy", "I'm sick", "I'm strong", "I'm happy"], answer: 1 },
            { q: "你想说'别担心'，应该说？", options: ["Be worried", "Don't worry", "Worry about it", "I'm worried"], answer: 1 }
          ]
        },
        {
          type: "battle",
          title: "⚔️ Boss战：暴风雨魔王",
          instruction: "用正确的天气英语平息暴风雨魔王的怒火！",
          monsterHp: 5,
          monsterName: "暴风雨魔王",
          monsterEmoji: "⛈️",
          questions: [
            { q: "暴风雨魔王制造了雷暴，你想说'暴风雨要来了'，应该说？", options: ["A storm is coming!", "A rainbow is coming!", "The sun is coming!", "Nothing is happening"], answer: 0 },
            { q: "魔王问 How do you feel in the rain? 你想回答'我有点冷'，应该说？", options: ["I feel hot", "I feel a little cold", "I feel great", "I feel hungry"], answer: 1 },
            { q: "你想说'暴风雨会过去的'，应该说？", options: ["The storm will never end", "The storm will pass", "The storm is forever", "I hate storms"], answer: 1 },
            { q: "雨停了，你想说'看，彩虹！'，应该说？", options: ["Look, a rainbow!", "Look, a storm!", "Look, nothing!", "Close your eyes"], answer: 0 },
            { q: "魔王被感化了，你想说'阳光总在风雨后'，应该说？", options: ["Storms are bad", "After rain comes sunshine!", "I don't like rain", "Go away storm"], answer: 1 }
          ]
        }
      ]
    },

    // ========== 第10章：终极冒险 ==========
    {
      id: 10,
      title: "终极冒险",
      subtitle: "The Final Adventure",
      description: "综合运用所学的英语，在真实场景中完成终极对话挑战！通关后你就能和外国人简单对话了！",
      bgTheme: "final",
      bossName: "黑暗领主",
      bossEmoji: "😈",
      stages: [
        {
          type: "sentence",
          title: "机场过关",
          instruction: "在机场用英语完成过关对话！",
          questions: [
            { q: "海关问 What's your name? 你应该回答？", options: ["How are you?", "My name is...", "I don't know", "Goodbye"], answer: 1 },
            { q: "海关问 Where are you from? 你应该回答？", options: ["I'm from China", "I'm fine", "I'm hungry", "I like China"], answer: 0 },
            { q: "海关问 What's the purpose of your visit? 你想说'旅游'，应该说？", options: ["I'm here to study", "I'm here for travel", "I'm here to work", "I don't know"], answer: 1 },
            { q: "海关问 How long will you stay? 你想说'一周'，应该说？", options: ["I will stay one week", "I will stay forever", "I don't stay", "One year"], answer: 0 },
            { q: "过关后你想说'谢谢'，应该说？", options: ["Go away", "Thank you very much", "I don't like you", "See you never"], answer: 1 }
          ]
        },
        {
          type: "sentence",
          title: "酒店入住",
          instruction: "在酒店前台用英语办理入住！",
          questions: [
            { q: "你想说'我想订一间房'，应该说？", options: ["I want to buy a house", "I'd like to book a room", "I don't need a room", "Where is the room?"], answer: 1 },
            { q: "前台问 How many nights? 你想说'两晚'，应该说？", options: ["One night", "Two nights", "Three nights", "Forever"], answer: 1 },
            { q: "你想问'早餐几点开始'，应该问？", options: ["What time does breakfast start?", "Do you have breakfast?", "I don't like breakfast", "Where is breakfast?"], answer: 0 },
            { q: "你想问'WiFi密码是什么'，应该问？", options: ["What is the WiFi password?", "Do you have WiFi?", "I don't need WiFi", "WiFi is bad"], answer: 0 },
            { q: "前台说 Enjoy your stay! 你应该回答？", options: ["I won't", "Thank you!", "Go away", "I don't like it"], answer: 1 }
          ]
        },
        {
          type: "sentence",
          title: "交新朋友",
          instruction: "在聚会上用英语交新朋友！",
          questions: [
            { q: "你想和新朋友打招呼，应该说？", options: ["Go away", "Hi, I'm [your name]. Nice to meet you!", "I don't talk to strangers", "Are you a bad person?"], answer: 1 },
            { q: "新朋友问 Where are you from? 你应该回答？", options: ["I don't know", "I'm from China. How about you?", "I don't tell you", "Why do you ask?"], answer: 1 },
            { q: "你想问'你会说中文吗'，应该问？", options: ["Do you speak Chinese?", "Can you eat Chinese food?", "Are you Chinese?", "Do you like China?"], answer: 0 },
            { q: "你想说'我们可以做朋友吗'，应该说？", options: ["I don't want friends", "Can we be friends?", "Go away from me", "I hate you"], answer: 1 },
            { q: "聚会结束，你想说'保持联系'，应该说？", options: ["I'll never see you", "Let's keep in touch!", "Goodbye forever", "I don't have a phone"], answer: 1 }
          ]
        },
        {
          type: "battle",
          title: "⚔️ 终极Boss战：黑暗领主",
          instruction: "运用所有学过的英语，击败黑暗领主，完成终极冒险！",
          monsterHp: 8,
          monsterName: "黑暗领主",
          monsterEmoji: "😈",
          questions: [
            { q: "黑暗领主问 Who are you? 你想说'我是来自中国的勇者'，应该说？", options: ["I am nobody", "I am a brave hero from China", "I don't know", "You tell me"], answer: 1 },
            { q: "领主说 You can't defeat me! 你想说'我不会放弃的'，应该说？", options: ["I give up", "I will never give up!", "OK you win", "I'm scared"], answer: 1 },
            { q: "领主问 Why are you here? 你想说'为了学习英语'，应该说？", options: ["I'm here to learn English", "I don't know why", "I'm lost", "I'm here to sleep"], answer: 0 },
            { q: "你想说'英语让我更强大'，应该说？", options: ["English makes me weak", "English makes me stronger!", "I don't like English", "English is useless"], answer: 1 },
            { q: "领主说 I'm impressed! 你想说'谢谢你的认可'，应该说？", options: ["I don't care", "Thank you, that means a lot!", "Whatever", "Go away"], answer: 1 },
            { q: "领主问 Can we be friends? 你想说'当然可以！'，应该说？", options: ["No way", "Of course! Let's be friends!", "I don't want to", "Maybe never"], answer: 1 },
            { q: "通关了！你想说'这趟冒险太棒了'，应该说？", options: ["This adventure was terrible", "This adventure was amazing!", "I hate adventures", "Nothing happened"], answer: 1 },
            { q: "最后，你想说'我会继续学习英语'，应该说？", options: ["I will stop learning", "I will keep learning English!", "English is too hard", "I give up English"], answer: 1 }
          ]
        }
      ]
    }
  ],

  // ============================================
  // 成就系统
  // ============================================
  achievements: [
    { id: "first_win", name: "初出茅庐", desc: "完成第一个关卡", emoji: "🌟" },
    { id: "chapter1", name: "字母大师", desc: "通关第1章", emoji: "👑" },
    { id: "chapter2", name: "社交达人", desc: "通关第2章", emoji: "🤝" },
    { id: "chapter3", name: "购物专家", desc: "通关第3章", emoji: "🛒" },
    { id: "chapter4", name: "美食家", desc: "通关第4章", emoji: "🍽️" },
    { id: "chapter5", name: "探险家", desc: "通关第5章", emoji: "🗺️" },
    { id: "chapter6", name: "时间管理师", desc: "通关第6章", emoji: "⏰" },
    { id: "chapter7", name: "兴趣广泛", desc: "通关第7章", emoji: "🎨" },
    { id: "chapter8", name: "人气之星", desc: "通关第8章", emoji: "⭐" },
    { id: "chapter9", name: "气象预报员", desc: "通关第9章", emoji: "🌤️" },
    { id: "chapter10", name: "英语勇者", desc: "通关全部章节！", emoji: "🏆" },
    { id: "no_hint", name: "独立思考", desc: "不使用提示完成一关", emoji: "🧠" },
    { id: "perfect", name: "完美通关", desc: "一关中全部答对", emoji: "💎" },
    { id: "all_stars", name: "全星收集者", desc: "所有关卡获得3星", emoji: "✨" }
  ],

  // ============================================
  // 药水商店
  // ============================================
  shop: [
    { id: "hint_potion", name: "提示药水", desc: "在答题时获得提示", cost: 50, emoji: "🧪" },
    { id: "heal_potion", name: "治疗药水", desc: "恢复50点生命值", cost: 30, emoji: "❤️" },
    { id: "shield", name: "护盾", desc: "抵挡一次错误答案", cost: 80, emoji: "🛡️" }
  ]
};
