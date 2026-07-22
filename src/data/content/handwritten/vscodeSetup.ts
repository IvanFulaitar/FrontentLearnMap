import type { LessonOverride } from "./htmlFoundations";
import type { QuizData } from "../../../types/course";

/**
 * Module "Налаштування VS Code" (vscode-setup-basics). Onboarding course
 * taken before HTML — absolute-beginner content: no assumed prior knowledge,
 * every term (файл, папка, термінал, PATH, розширення...) defined before
 * first use. Ends with the same starter project (index.html/styles.css/
 * script.js) that the HTML course's first lesson continues from.
 */
export const vscodeSetupOverrides: Record<string, LessonOverride> = {
  "Що таке VS Code": {
    interactiveDemo: "vscode-overview-demo",
    whatIsIt:
      "Редактор коду — це програма для написання й редагування текстових файлів із кодом (HTML, CSS, JavaScript та інших мов). Visual Studio Code, або скорочено VS Code, — один із найпопулярніших безкоштовних редакторів коду. Важливо не плутати три різні речі: VS Code — редактор коду, у якому ти пишеш файли; браузер (наприклад, Chrome чи Firefox) — програма, яка відкриває й показує готову вебсторінку; а Visual Studio (без «Code» у назві) — зовсім інша, значно важча програма для інших мов програмування, яку в цьому курсі ми не використовуємо.",
    whyUseIt:
      "Технічно HTML-файл можна написати навіть у найпростішому текстовому редакторі (Блокнот на Windows, TextEdit на macOS). Але VS Code робить писання коду набагато швидшим і безпечнішим: підсвічує різні частини коду кольором (це називають підсвіткою синтаксису), одразу підкреслює явні помилки, підказує назви тегів і властивостей під час набору, і має вбудований термінал (про нього — за кілька уроків), тож не потрібно перемикатись між кількома програмами.",
    comparisonTable: {
      headers: ["Програма", "Що це", "Навіщо в цьому курсі"],
      rows: [
        ["VS Code", "Редактор коду", "Тут пишеш і зберігаєш файли з кодом"],
        ["Visual Studio", "Інше, значно більше середовище розробки", "Не використовується в цьому курсі"],
        ["Браузер (Chrome, Firefox...)", "Показує готову вебсторінку", "Тут переглядаєш результат"],
      ],
    },
    whenToUse: [
      "Щоразу, коли пишеш або редагуєш файл із кодом — HTML, CSS, JavaScript.",
      "Коли потрібно швидко знайти помилку в коді (підсвітка синтаксису одразу показує підозрілі місця).",
      "Коли потрібно виконати команду в терміналі без виходу з редактора.",
    ],
    whenNotToUse: [
      "Не пиши код у Word, Google Docs чи інших текстових процесорах — вони додають невидиме форматування, яке ламає код.",
      "Не редагуй код на телефоні як основний спосіб роботи — це можливо, але VS Code створений саме для роботи на комп'ютері.",
    ],
    commonMistakes: [
      "Плутати VS Code з Visual Studio під час пошуку в інтернеті чи завантаження.",
      "Намагатись писати HTML/CSS у Word чи Google Docs.",
      "Думати, що VS Code сам показує вебсторінку — це робить браузер, VS Code лише створює файли для нього.",
    ],
    dontDoThis: {
      code: `<!-- Файл, скопійований з Word -->\n<h1>Привіт, світ!</h1>\n<!-- виглядає нормально в редакторі Word, але може містити невидимі "фігурні" лапки й спецсимволи замість звичайних -->`,
      explanation: "Текстові процесори (Word, Google Docs) автоматично замінюють звичайні лапки \" на «фігурні» символи та додають невидиме форматування — браузер і VS Code очікують прості текстові символи, тож код, скопійований з Word, часто ламається незрозумілим чином.",
    },
    bestPractices: [
      "Завантажуй VS Code лише з офіційного сайту code.visualstudio.com.",
      "Тримай в голові чітке розмежування: VS Code створює файли, браузер їх показує.",
    ],
    remember: [
      "VS Code — редактор коду, а не браузер і не Visual Studio.",
      "Браузер показує готову сторінку, VS Code — інструмент, яким цю сторінку створюють.",
      "Код завжди пишеться у звичайному текстовому редакторі, ніколи — у Word чи Google Docs.",
    ],
    interviewQuestions: [
      { question: "Чим VS Code відрізняється від браузера?", answer: "VS Code — редактор коду: у ньому створюють і редагують файли. Браузер відкриває й показує готову вебсторінку, він нічого не редагує." },
      { question: "Чи є VS Code тим самим, що Visual Studio?", answer: "Ні. Це дві різні програми різних розробників зі схожою назвою. Visual Studio — значно більше й важче середовище для інших задач; у цьому курсі використовується лише VS Code." },
    ],
    summary: "VS Code — безкоштовний редактор коду, у якому ти будеш писати HTML, CSS і JavaScript протягом усього курсу. Це не браузер (він лише показує сторінку) і не Visual Studio (зовсім інша програма). VS Code прискорює роботу підсвіткою синтаксису, підказками й вбудованим терміналом.",
    proTip: "Якщо шукаєш VS Code в інтернеті, завжди дописуй слово «Code» — інакше пошук може привести на сторінку Visual Studio, яка тобі не потрібна.",
    nextLessonNote: "Далі — визначимо, яку операційну систему ти використовуєш, і встановимо VS Code.",
    practiceTask: {
      title: "Перше знайомство з VS Code",
      description: "Відкрий VS Code (якщо ще не встановлений — про це наступний урок) і створи файл notes.md із коротким записом.",
      checklist: ["VS Code відкрито.", "Створено файл notes.md.", "У файлі написано назву операційної системи, яку ти використовуєш.", "Файл збережено (немає крапки на вкладці)."],
      starterFiles: [{ id: "vscode-intro-notes", path: "notes.md", language: "markdown", label: "notes.md", code: "" }],
      solutionFiles: [{ id: "vscode-intro-notes-solution", path: "notes.md", language: "markdown", label: "notes.md", code: "# Мої нотатки\n\nЯ використовую: Windows (або macOS).", readOnly: true }],
      hints: ["Файл можна створити через Explorer (значок файлів в Activity Bar) кнопкою «New File»."],
      expectedOutput: "У Explorer видно файл notes.md, а на його вкладці немає індикатора незбережених змін (крапки).",
    },
    microExercises: [
      { id: "vscode-intro-choice", kind: "choice", prompt: "Що з переліченого показує готову вебсторінку користувачу?", options: ["VS Code", "Visual Studio", "Браузер", "Термінал"], correctAnswer: "Браузер", solution: "Браузер — це програма, яка відкриває й показує вебсторінки. VS Code лише створює файли для неї." },
    ],
    quiz: {
      id: "vscode-intro-quiz",
      title: "Що таке VS Code: перевір себе",
      questions: [
        {
          id: "vscode-intro-what-is-it",
          type: "single",
          question: "Що таке VS Code?",
          options: [
            "Безкоштовний редактор коду для написання файлів HTML, CSS, JavaScript",
            "Браузер для перегляду вебсторінок",
            "Те саме, що Visual Studio",
            "Онлайн-сервіс без встановлення на комп'ютер",
          ],
          correctAnswer: "Безкоштовний редактор коду для написання файлів HTML, CSS, JavaScript",
          explanation: "VS Code — редактор коду; браузер показує готову сторінку, а Visual Studio — окрема, значно важча програма.",
        },
        {
          id: "vscode-intro-vs-visual-studio",
          type: "true-false",
          question: "VS Code і Visual Studio — це одна й та сама програма.",
          options: ["Так", "Ні"],
          correctAnswer: false,
          explanation: "Це дві різні програми різних розробників зі схожою назвою — Visual Studio значно більша й для інших задач.",
        },
        {
          id: "vscode-intro-who-shows-page",
          type: "single",
          question: "Яка програма показує готову вебсторінку користувачу?",
          options: ["Браузер", "VS Code", "Visual Studio", "Термінал"],
          correctAnswer: "Браузер",
          explanation: "VS Code лише створює файли; відкриває й показує сторінку браузер.",
        },
        {
          id: "vscode-intro-word-mistake",
          type: "single",
          question: "Чому не варто писати HTML-код у Word чи Google Docs?",
          options: [
            "Вони додають невидиме форматування й спецсимволи, які ламають код",
            "Word не вміє зберігати файли",
            "Google Docs платний",
            "Це насправді нормальна практика",
          ],
          correctAnswer: "Вони додають невидиме форматування й спецсимволи, які ламають код",
          explanation: "Текстові процесори замінюють звичайні лапки на «фігурні» й додають приховане форматування — код через це може зламатись незрозумілим чином.",
        },
        {
          id: "vscode-intro-features",
          type: "single",
          question: "Що з цього НЕ є перевагою VS Code над звичайним текстовим редактором?",
          options: [
            "Автоматична публікація сайту в інтернет",
            "Підсвітка синтаксису кольором",
            "Підказки назв тегів і властивостей",
            "Вбудований термінал",
          ],
          correctAnswer: "Автоматична публікація сайту в інтернет",
          explanation: "VS Code прискорює написання коду, але публікація сайту — окрема задача, не пов'язана з самим редактором.",
        },
      ],
    },
  },

  "Встановлення VS Code": {
    interactiveDemo: "vscode-install-demo",
    whatIsIt:
      "Встановлення — це процес, коли програма (у нашому випадку VS Code) переноситься з інтернету на твій комп'ютер і стає доступною для запуску. На Windows це зазвичай виконує спеціальна програма-встановлювач, яка запитує кілька налаштувань. На macOS процес простіший: файл програми просто переміщують у папку Applications (застосунки).",
    whyUseIt:
      "Завантажувати VS Code потрібно лише з офіційного сайту code.visualstudio.com. Файли з інших сайтів, торентів чи файлообмінників можуть містити шкідливий код — офіційний сайт визначає твою операційну систему автоматично й пропонує правильний файл для завантаження.",
    whenToUse: ["Один раз, перед початком курсу — потім VS Code просто запускається зі значка чи через термінал.", "Повторно, якщо на новому комп'ютері потрібно налаштувати робоче середовище знову."],
    whenNotToUse: ["Не завантажуй VS Code із сторонніх сайтів, навіть якщо вони обіцяють «швидше» чи «простіше» встановлення.", "Не вимикай антивірус чи системний захист, щоб «дозволити» встановлення — офіційний файл VS Code такого не вимагає."],
    codeWalkthroughs: [
      {
        before: "Після встановлення завжди перевіряй результат тим самим способом — через новий термінал (як його відкрити, розберемо за кілька уроків, а зараз просто запам'ятай команду):",
        code: `code --version`,
        lineNotes: [
          "Якщо в терміналі з'явився номер версії VS Code — встановлення пройшло успішно.",
          "Якщо термінал відповідає, що команди code не існує — найчастіша причина: термінал відкрито ще до встановлення. Закрий його і відкрий новий.",
        ],
        after: "Ця команда стане звичною: у наступних курсах ти будеш перевіряти нею й інші інструменти (Node.js, Git).",
      },
    ],
    commonMistakes: [
      "Завантажувати VS Code не з офіційного сайту.",
      "На Windows — не поставити галочку «Add to PATH» під час встановлення.",
      "Перевіряти команду code --version у старому терміналі, відкритому до встановлення.",
    ],
    bestPractices: [
      "Завжди завантажуй з code.visualstudio.com.",
      "На Windows обов'язково залишай позначку «Add to PATH».",
      "Після встановлення перевіряй результат у новому терміналі командою code --version.",
    ],
    remember: [
      "Офіційне джерело — code.visualstudio.com, і жодне інше.",
      "На Windows «Add to PATH» дозволяє пізніше запускати VS Code командою code з термінала.",
      "На macOS «встановлення» — це переміщення файлу програми в Applications.",
      "Перевіряй результат лише в новому, щойно відкритому терміналі.",
    ],
    interviewQuestions: [
      { question: "Що робить параметр «Add to PATH» під час встановлення на Windows?", answer: "Дозволяє операційній системі знаходити команду code в терміналі з будь-якої папки — без нього команда code не працюватиме, хоча сам редактор все одно можна відкрити зі значка." },
    ],
    summary: "VS Code встановлюється лише з офіційного сайту code.visualstudio.com: на Windows — через встановлювач із позначкою «Add to PATH», на macOS — переміщенням файлу програми в Applications. Результат завжди перевіряється командою code --version у новому терміналі.",
    proTip: "Якщо після встановлення code --version не працює навіть у новому терміналі — спробуй просто перезапустити комп'ютер. Це вирішує проблему в більшості випадків, коли зміни PATH ще не встигли застосуватися.",
    nextLessonNote: "VS Code встановлено. Тепер створимо для нього першу робочу папку з файлами.",
    practiceTask: {
      title: "Встанови VS Code і перевір результат",
      description: "Встанови VS Code для своєї операційної системи з офіційного сайту, а потім перевір встановлення командою в терміналі.",
      checklist: ["VS Code завантажено з code.visualstudio.com.", "Встановлення завершено (Windows: із «Add to PATH»; macOS: файл у Applications).", "У новому терміналі виконано code --version.", "У відповідь з'явився номер версії."],
      starterFiles: [{ id: "vscode-install-check", path: "check-install.sh", language: "bash", label: "check-install.sh", code: "# Встав тут команду, яку ти виконав у терміналі\n" }],
      solutionFiles: [{ id: "vscode-install-check-solution", path: "check-install.sh", language: "bash", label: "check-install.sh", code: "code --version\n# Очікуваний результат: номер версії VS Code на першому рядку", readOnly: true }],
      hints: ["Старий термінал, відкритий до встановлення, не «бачить» змін — завжди відкривай новий."],
      expectedOutput: "Термінал показує номер версії VS Code замість повідомлення про невідому команду.",
    },
    microExercises: [
      { id: "vscode-install-bug", kind: "find-the-bug", prompt: "Учень встановив VS Code на Windows, забувши позначку «Add to PATH», і одразу отримав помилку «code: команда не знайдена». Що робити?", solution: "Повторно запустити встановлювач VS Code і цього разу позначити «Add to PATH», або скористатись альтернативним способом додавання в PATH з довідки VS Code." },
    ],
    quiz: {
      id: "vscode-install-quiz",
      title: "Встановлення VS Code: перевір себе",
      questions: [
        {
          id: "vscode-install-official-source",
          type: "single",
          question: "Звідки варто завантажувати VS Code?",
          options: [
            "Лише з офіційного сайту code.visualstudio.com",
            "З будь-якого сайту в топі пошуку Google",
            "З торентів чи файлообмінників, якщо швидше",
            "Джерело не має значення",
          ],
          correctAnswer: "Лише з офіційного сайту code.visualstudio.com",
          explanation: "Файли з інших джерел можуть містити шкідливий код; офіційний сайт сам визначає операційну систему і пропонує правильний файл.",
        },
        {
          id: "vscode-install-add-to-path",
          type: "single",
          question: "Що дає позначка «Add to PATH» на Windows?",
          options: [
            "Дозволяє запускати VS Code командою code з термінала з будь-якої папки",
            "Прискорює запуск VS Code",
            "Автоматично встановлює розширення",
            "Вмикає темну тему за замовчуванням",
          ],
          correctAnswer: "Дозволяє запускати VS Code командою code з термінала з будь-якої папки",
          explanation: "Без цієї позначки команда code у терміналі не працюватиме, хоча сам редактор все одно можна відкрити зі значка.",
        },
        {
          id: "vscode-install-verify-new-terminal",
          type: "true-false",
          question: "Команду code --version можна перевіряти в терміналі, відкритому ще до встановлення VS Code.",
          options: ["Так", "Ні"],
          correctAnswer: false,
          explanation: "Старий термінал не бачить змін PATH — потрібно відкрити новий термінал після встановлення.",
        },
        {
          id: "vscode-install-macos",
          type: "single",
          question: "Як виглядає \"встановлення\" VS Code на macOS?",
          options: [
            "Переміщення файлу програми в папку Applications",
            "Через спеціальний встановлювач, як на Windows",
            "Автоматично, без жодних дій",
            "Тільки через термінал",
          ],
          correctAnswer: "Переміщення файлу програми в папку Applications",
          explanation: "На macOS процес простіший, ніж на Windows: файл просто переносять у Applications.",
        },
        {
          id: "vscode-install-verify-command",
          type: "single",
          question: "Якою командою перевіряють, що VS Code встановлено успішно?",
          options: ["code --version", "code --check", "vscode --test", "install --verify"],
          correctAnswer: "code --version",
          explanation: "Якщо в терміналі з'явився номер версії — встановлення пройшло успішно.",
        },
      ],
    },
  },

  "Файли й папки": {
    interactiveDemo: "vscode-files-demo",
    whatIsIt:
      "Файл — це одна одиниця збереженої інформації на комп'ютері, наприклад текст коду. У кожного файлу є розширення — частина назви після крапки (наприклад, .html, .css, .js), яка каже комп'ютеру й VS Code, який це тип файлу. Папка — це контейнер, який може містити файли та інші папки; так утворюється вкладена структура. Проєкт у нашому курсі — це одна папка, яка містить усі файли одного сайту: HTML, CSS, JavaScript та інші.",
    whyUseIt:
      "Кожен наступний курс (HTML, CSS, JavaScript) будуватиметься на одному й тому самому проєкті — тому важливо з першого дня тримати всі його файли в одній, чітко визначеній папці, а не розкидати їх по різних місцях комп'ютера. Це також привчає до звички, яку використовують у реальній роботі: один проєкт — одна папка.",
    whenToUse: ["На початку кожного нового навчального проєкту створюй окрему папку.", "Файлам давай назви латиницею, без пробілів (index.html, styles.css, а не «мій сайт.html»)."],
    whenNotToUse: [
      "Не створюй проєкт у системних папках (наприклад, C:\\Program Files на Windows) — там обмежені права доступу.",
      "Не називай файли з пробілами чи кирилицею без потреби — це може створювати проблеми в терміналі та деяких інструментах.",
    ],
    codeWalkthroughs: [
      {
        before: "Структура папки для нашого стартового проєкту:",
        code: `frontend-start/\n├── index.html\n├── styles.css\n└── script.js`,
        lineNotes: [
          "frontend-start — коренева папка проєкту; саме її ми відкриватимемо у VS Code (детальніше — в уроці про інтерфейс).",
          "index.html, styles.css, script.js — три файли на одному рівні всередині цієї папки, кожен зі своїм розширенням.",
        ],
        after: "Ця структура — мінімальний робочий сайт: один файл розмітки, один файл стилів, один файл поведінки.",
      },
      {
        before: "Мінімальний вміст трьох файлів, щоб перевірити, що все підключено правильно:",
        code: `<!-- index.html -->\n<!doctype html>\n<html lang="uk">\n  <head>\n    <meta charset="UTF-8">\n    <title>Мій перший проєкт</title>\n    <link rel="stylesheet" href="./styles.css">\n  </head>\n  <body>\n    <h1>VS Code налаштовано</h1>\n    <button type="button" id="test-button">Перевірити JavaScript</button>\n    <script src="./script.js"></script>\n  </body>\n</html>`,
        lineNotes: [
          "link rel=\"stylesheet\" href=\"./styles.css\" підключає файл стилів — без цього рядка CSS не застосується.",
          "script src=\"./script.js\" підключає файл поведінки в самому кінці body.",
        ],
      },
    ],
    commonMistakes: [
      "Розкидати файли проєкту по різних папках замість однієї спільної.",
      "Називати файл із пробілами чи великими буквами без потреби (Index.html замість index.html).",
      "Не зауважити, що операційна система приховала справжнє розширення файлу (детальніше — в уроці про типові проблеми).",
    ],
    dontDoThis: {
      code: `Мій сайт/\n├── Index .html\n├── стилі.css`,
      explanation: "Пробіл у назві папки й файлу, пробіл перед розширенням і кирилиця в назві — усе це може створювати проблеми в терміналі та посиланнях між файлами. Латиниця без пробілів (frontend-start, index.html, styles.css) — надійніший варіант.",
    },
    bestPractices: [
      "Одна папка — один проєкт.",
      "Назви файлів — латиницею, без пробілів, у нижньому регістрі.",
      "Перевіряй розширення файлу в Explorer чи Status Bar, а не лише «на око».",
    ],
    remember: [
      "Файл — одна одиниця даних, розширення після крапки визначає його тип.",
      "Папка може містити файли та інші папки.",
      "Проєкт цього курсу — одна папка з index.html, styles.css і script.js.",
      "Windows і macOS можуть приховувати справжнє розширення файлу — про це докладніше в уроці про типові проблеми.",
    ],
    summary: "Проєкт — це одна папка з усіма файлами сайту. У нашому курсі це index.html (розмітка), styles.css (стилі) і script.js (поведінка) — три файли на одному рівні всередині папки frontend-start. Файли підключаються один до одного через теги link і script у HTML.",
    proTip: "Створюй навчальні проєкти у власній папці Documents, наприклад Documents/frontend-projects/ — це і зручно знаходити, і уникає проблем з правами доступу системних папок.",
    nextLessonNote: "Файли готові. Тепер розберемось, де що знаходиться у вікні VS Code.",
    practiceTask: {
      title: "Створи перший проєкт",
      description: "Створи папку frontend-start із файлами index.html, styles.css і script.js та мінімальним робочим вмістом.",
      checklist: ["Створено папку frontend-start.", "У ній три файли: index.html, styles.css, script.js.", "CSS і JavaScript підключені через link і script у HTML.", "У Explorer видно всі три файли з правильними розширеннями."],
      starterFiles: [
        { id: "vscode-project-html-start", path: "index.html", language: "html", label: "index.html", code: "<!-- Почни з порожнього файлу -->" },
        { id: "vscode-project-css-start", path: "styles.css", language: "css", label: "styles.css", code: "/* Почни з порожнього файлу */" },
        { id: "vscode-project-js-start", path: "script.js", language: "javascript", label: "script.js", code: "// Почни з порожнього файлу" },
      ],
      solutionFiles: [
        { id: "vscode-project-html", path: "index.html", language: "html", label: "index.html", code: `<!doctype html>\n<html lang="uk">\n  <head>\n    <meta charset="UTF-8">\n    <title>Мій перший проєкт</title>\n    <link rel="stylesheet" href="./styles.css">\n  </head>\n  <body>\n    <h1>VS Code налаштовано</h1>\n    <button type="button" id="test-button">Перевірити JavaScript</button>\n    <script src="./script.js"></script>\n  </body>\n</html>`, readOnly: true },
        { id: "vscode-project-css", path: "styles.css", language: "css", label: "styles.css", code: `body {\n  font-family: system-ui, sans-serif;\n  padding: 32px;\n}\n\nh1 {\n  color: #4f46e5;\n}`, readOnly: true },
        { id: "vscode-project-js", path: "script.js", language: "javascript", label: "script.js", code: `const button = document.querySelector("#test-button");\nbutton?.addEventListener("click", () => {\n  alert("JavaScript працює");\n});`, readOnly: true },
      ],
      hints: ["Розширення файлу пишеться одразу після назви й крапки: index.html, а не index .html чи index.HTML."],
      expectedOutput: "Папка frontend-start з трьома файлами; при відкритті index.html у браузері видно заголовок і кнопку.",
    },
    microExercises: [
      { id: "vscode-files-choice", kind: "choice", prompt: "Який файл підключає CSS до HTML-сторінки?", options: ["<script src=\"./styles.css\">", "<link rel=\"stylesheet\" href=\"./styles.css\">", "<style src=\"./styles.css\">", "CSS підключається сам, без коду"], correctAnswer: "<link rel=\"stylesheet\" href=\"./styles.css\">", solution: "Тег link з rel=\"stylesheet\" — стандартний спосіб підключити зовнішній файл стилів." },
    ],
    quiz: {
      id: "vscode-files-folders-quiz",
      title: "Файли й папки: перевір себе",
      questions: [
        {
          id: "vscode-files-extension",
          type: "single",
          question: "Що таке розширення файлу?",
          options: [
            "Частина назви після крапки, яка визначає тип файлу (.html, .css, .js)",
            "Розмір файлу на диску",
            "Кількість рядків коду у файлі",
            "Назва папки, де лежить файл",
          ],
          correctAnswer: "Частина назви після крапки, яка визначає тип файлу (.html, .css, .js)",
          explanation: "Розширення каже комп'ютеру й VS Code, який це тип файлу.",
        },
        {
          id: "vscode-files-one-project-one-folder",
          type: "true-false",
          question: "Файли одного проєкту варто тримати в одній спільній папці, а не розкидати по різних місцях.",
          options: ["Так", "Ні"],
          correctAnswer: true,
          explanation: "Один проєкт — одна папка. Це звичка, яку використовують у реальній роботі.",
        },
        {
          id: "vscode-files-naming",
          type: "single",
          question: "Яка назва файлу найбезпечніша для роботи в терміналі й посиланнях?",
          options: ["index.html", "Мій сайт.html", "Index .html", "індекс.html"],
          correctAnswer: "index.html",
          explanation: "Латиниця, без пробілів, у нижньому регістрі — надійніший варіант, що уникає проблем у терміналі.",
        },
        {
          id: "vscode-files-structure",
          type: "single",
          question: "Що підключає файл стилів до HTML-сторінки?",
          options: [
            "<link rel=\"stylesheet\" href=\"./styles.css\">",
            "<script src=\"./styles.css\">",
            "<style src=\"./styles.css\">",
            "Стилі підключаються самі, без коду",
          ],
          correctAnswer: "<link rel=\"stylesheet\" href=\"./styles.css\">",
          explanation: "Тег link з rel=\"stylesheet\" — стандартний спосіб підключити зовнішній CSS-файл.",
        },
        {
          id: "vscode-files-system-folder",
          type: "single",
          question: "Чому не варто створювати навчальний проєкт у системних папках (наприклад, C:\\Program Files)?",
          options: [
            "Там обмежені права доступу",
            "Там немає місця на диску",
            "VS Code не бачить системні папки",
            "Це насправді рекомендована практика",
          ],
          correctAnswer: "Там обмежені права доступу",
          explanation: "Системні папки мають обмежений доступ на запис — краще створювати проєкти у власній папці на кшталт Documents.",
        },
      ],
    },
  },

  "Інтерфейс VS Code": {
    interactiveDemo: "vscode-interface-demo",
    whatIsIt:
      "Інтерфейс VS Code складається з кількох областей, кожна зі своєю роллю: Activity Bar (вузька смуга значків зліва — перемикає бічні панелі), Explorer (список файлів і папок поточного проєкту), Editor (область, де редагується код), Tabs (заголовки відкритих файлів над Editor), Status Bar (службова інформація знизу), Terminal (текстовий ввід команд, розберемо в наступному уроці) і Command Palette (спливаюче поле пошуку команд).",
    whyUseIt:
      "Найважливіше правило цього уроку: для навчального проєкту потрібно відкривати саме папку проєкту (File → Open Folder), а не окремі файли по одному. Коли відкрито папку, Explorer показує всі файли проєкту одразу, посилання між HTML/CSS/JS працюють коректно, а термінал одразу відкривається в правильному місці.",
    whenToUse: [
      "File → Open Folder — щоразу, коли починаєш працювати над проєктом.",
      "Command Palette (Ctrl+Shift+P / Cmd+Shift+P) — коли не пам'ятаєш точний пункт меню для потрібної дії.",
      "Explorer — щоб створити новий файл чи папку всередині проєкту.",
    ],
    whenNotToUse: ["Не відкривай кожен файл проєкту окремо через File → Open File — так VS Code не бачитиме інших файлів проєкту одразу."],
    comparisonTable: {
      headers: ["Дія", "Що відкриває"],
      rows: [
        ["Open File", "Один файл, без бачення решти проєкту"],
        ["Open Folder", "Всю папку проєкту: HTML, CSS, JS, зображення, вкладені папки"],
      ],
    },
    commonMistakes: [
      "Відкривати проєкт через Open File замість Open Folder.",
      "Шукати команду вручну через меню, коли швидше скористатись Command Palette.",
      "Плутати Explorer (файли проєкту) з Extensions (розширення) — це різні значки на Activity Bar.",
    ],
    bestPractices: ["Завжди відкривай кореневу папку проєкту через Open Folder.", "Звикай до Command Palette (Ctrl/Cmd+Shift+P) — це найшвидший спосіб знайти будь-яку команду VS Code."],
    remember: [
      "Explorer показує файли, Editor — де їх редагують, Terminal — де виконують команди.",
      "Command Palette відкриває практично будь-яку команду за назвою.",
      "Для проєкту завжди відкривай папку (Open Folder), не окремий файл.",
    ],
    summary: "Інтерфейс VS Code складається з Activity Bar, Explorer, Editor, Tabs, Status Bar, Terminal і Command Palette. Головне правило: навчальний проєкт відкривається через File → Open Folder — це дає VS Code бачити всі файли проєкту одразу, а не лише один.",
    proTip: "Якщо VS Code запитує «Do you trust the authors of the files in this folder?» — довіряй лише папкам, які створив сам. Це називається Workspace Trust і захищає від випадкового виконання чужого коду.",
    nextLessonNote: "Тепер розберемось із Terminal — областю, яку побіжно вже бачили на цій карті інтерфейсу.",
    practiceTask: {
      title: "Відкрий проєкт правильно",
      description: "Відкрий папку frontend-start (з попереднього уроку) через File → Open Folder і перевір, що всі три файли видно в Explorer.",
      checklist: ["Проєкт відкрито через Open Folder, а не Open File.", "У Explorer видно всі три файли.", "Спробував відкрити Command Palette і знайти команду.", "Заголовок вікна VS Code показує назву папки frontend-start."],
      starterFiles: [{ id: "vscode-interface-notes", path: "interface-notes.md", language: "markdown", label: "interface-notes.md", code: "# Що я знайшов\n\n" }],
      solutionFiles: [{ id: "vscode-interface-notes-solution", path: "interface-notes.md", language: "markdown", label: "interface-notes.md", code: "# Що я знайшов\n\n- Explorer: список моїх файлів\n- Command Palette: пошук команд за назвою", readOnly: true }],
      hints: ["Command Palette: Ctrl+Shift+P на Windows, Cmd+Shift+P на macOS."],
      expectedOutput: "Заголовок вікна VS Code показує «frontend-start», Explorer показує всі три файли проєкту.",
    },
    microExercises: [
      { id: "vscode-interface-choice", kind: "choice", prompt: "Що краще відкрити для навчального проєкту?", options: ["Лише index.html", "Кореневу папку проєкту", "Випадкову папку Downloads", "Кожен файл окремо через Open File"], correctAnswer: "Кореневу папку проєкту", solution: "Open Folder дає VS Code бачити всі файли проєкту одразу — це і є правильний спосіб." },
    ],
    quiz: {
      id: "vscode-interface-quiz",
      title: "Інтерфейс VS Code: перевір себе",
      questions: [
        {
          id: "vscode-interface-open-folder-vs-file",
          type: "single",
          question: "Чому для навчального проєкту потрібно відкривати папку (Open Folder), а не окремий файл?",
          options: [
            "Explorer показує всі файли проєкту одразу, і посилання між HTML/CSS/JS працюють коректно",
            "Open File взагалі не існує у VS Code",
            "Це впливає лише на швидкість запуску",
            "Різниці немає, обидва варіанти рівноцінні",
          ],
          correctAnswer: "Explorer показує всі файли проєкту одразу, і посилання між HTML/CSS/JS працюють коректно",
          explanation: "Коли відкрито окремий файл, VS Code не бачить решти файлів проєкту одразу.",
        },
        {
          id: "vscode-interface-explorer",
          type: "single",
          question: "Що показує область Explorer у VS Code?",
          options: [
            "Список файлів і папок поточного проєкту",
            "Список встановлених розширень",
            "Історію виконаних команд у терміналі",
            "Налаштування редактора",
          ],
          correctAnswer: "Список файлів і папок поточного проєкту",
          explanation: "Explorer — це файлова панель, окрема від Extensions чи Terminal.",
        },
        {
          id: "vscode-interface-command-palette",
          type: "true-false",
          question: "Command Palette дозволяє знайти майже будь-яку команду VS Code за назвою.",
          options: ["Так", "Ні"],
          correctAnswer: true,
          explanation: "Ctrl/Cmd+Shift+P відкриває спливаюче поле пошуку команд — найшвидший спосіб знайти потрібну дію.",
        },
        {
          id: "vscode-interface-workspace-trust",
          type: "single",
          question: "Що варто робити, коли VS Code запитує «Do you trust the authors of the files in this folder?»",
          options: [
            "Довіряти лише папкам, які створив сам",
            "Завжди натискати \"Так\", не читаючи",
            "Ігнорувати запит",
            "Видалити папку",
          ],
          correctAnswer: "Довіряти лише папкам, які створив сам",
          explanation: "Це називається Workspace Trust і захищає від випадкового виконання чужого коду.",
        },
        {
          id: "vscode-interface-editor-vs-terminal",
          type: "single",
          question: "Де в VS Code виконують команди, а де редагують код?",
          options: [
            "Terminal — команди, Editor — редагування коду",
            "Editor — команди, Terminal — редагування коду",
            "Обидва однакові за призначенням",
            "Команди виконують у Explorer",
          ],
          correctAnswer: "Terminal — команди, Editor — редагування коду",
          explanation: "Це дві різні області інтерфейсу з різними ролями.",
        },
      ],
    },
  },

  Термінал: {
    interactiveDemo: "vscode-terminal-demo",
    whatIsIt:
      "Термінал — це текстовий спосіб давати команди операційній системі: замість клацання по кнопках ти вводиш команду текстом і натискаєш Enter. У VS Code є вбудований термінал, який відкривається без переходу в окрему програму. Команда — це один текстовий рядок-інструкція, яку розуміє термінал, наприклад pwd або code.",
    whyUseIt:
      "Термінал потрібен не лише backend-розробникам: у фронтенд-роботі ним відкривають проєкти (code .), перевіряють встановлені інструменти (code --version) і, у наступних курсах, запускають локальні сервери та встановлюють пакети. Найважливіший момент цього уроку: команди виконуються відносно поточної папки — тієї, у якій зараз «стоїть» термінал.",
    whenToUse: [
      "Щоб перевірити, яку папку зараз відкрито в терміналі (pwd).",
      "Щоб відкрити поточну папку у VS Code одною командою (code .).",
      "Щоб перевірити встановлені інструменти (code --version, і в майбутніх курсах — git --version, node --version).",
    ],
    whenNotToUse: ["Не виконуй команди, скопійовані з інтернету, не розуміючи, що вони роблять.", "Не використовуй команди видалення файлів у цьому курсі — вони тут не потрібні, а помилка коштує дорого."],
    codeWalkthroughs: [
      {
        before: "Відкрий термінал: Terminal → New Terminal, або сполучення клавіш нижче. Спочатку перевір, де ти знаходишся:",
        code: `pwd`,
        lineNotes: ["pwd показує повний шлях поточної папки — результат повинен закінчуватись на назву твого проєкту, наприклад frontend-start."],
      },
      {
        before: "Подивись, що лежить у цій папці:",
        code: `ls`,
        lineNotes: ["ls (в PowerShell працює як псевдонім) показує список файлів і папок усередині поточної папки — тут мають бути index.html, styles.css, script.js."],
      },
      {
        before: "Відкрий поточну папку у VS Code — найкорисніша команда цього уроку:",
        code: `code .`,
        lineNotes: ["code — запустити VS Code.", "Крапка означає «поточна папка» — команда відкриває саме її, а не окремий файл."],
        after: "Якщо VS Code відкрив ту саму папку, в якій виконано команду, — усе працює правильно.",
      },
    ],
    commonMistakes: [
      "Виконувати команду, не перевіривши спочатку pwd — і не розуміючи, у якій папці насправді знаходишся.",
      "Плутати code . (відкрити папку) з code index.html (відкрити лише один файл).",
      "Вважати термінал потрібним лише для backend-розробки.",
    ],
    bestPractices: ["Перед важливою командою перевіряй pwd.", "Для проєкту використовуй code ., а не відкриття файлів по одному.", "Читай команду перед виконанням, навіть коротку."],
    remember: [
      "Команди виконуються відносно поточної папки термінала.",
      "pwd — де я? ls — що тут лежить?",
      "code . відкриває поточну папку в VS Code.",
      "На Windows типовий термінал — PowerShell, на macOS — zsh; базові команди (pwd, ls) працюють в обох.",
    ],
    interviewQuestions: [{ question: "Що робить команда code .?", answer: "Відкриває поточну папку термінала у VS Code — крапка означає «ця папка», а не конкретний файл." }],
    summary: "Термінал — текстовий спосіб керувати комп'ютером. pwd показує поточну папку, ls — її вміст, а code . відкриває цю папку у VS Code. Головне правило: команди виконуються відносно поточної папки, тож перед важливою командою варто перевірити pwd.",
    proTip: "Якщо термінал відкрився не в тій папці, найпростіше рішення — закрити його і відкрити новий саме тоді, коли в VS Code вже відкрита потрібна папка проєкту.",
    nextLessonNote: "Тепер, коли термінал знайомий, можна безпечно встановити перше розширення.",
    practiceTask: {
      title: "Перевір термінал на своєму проєкті",
      description: "Відкрий термінал у папці frontend-start і виконай pwd, ls та code . по черзі.",
      checklist: ["Термінал відкрито через Terminal → New Terminal.", "pwd показав шлях, що закінчується на frontend-start.", "ls показав index.html, styles.css, script.js.", "code . відкрив ту саму папку в новому вікні VS Code."],
      starterFiles: [{ id: "vscode-terminal-log", path: "terminal-log.sh", language: "bash", label: "terminal-log.sh", code: "# Встав тут команди, які ти виконав, по черзі\n" }],
      solutionFiles: [{ id: "vscode-terminal-log-solution", path: "terminal-log.sh", language: "bash", label: "terminal-log.sh", code: "pwd\nls\ncode .", readOnly: true }],
      hints: ["Якщо ls показує не ті файли — ти, ймовірно, не в тій папці; перевір pwd ще раз."],
      expectedOutput: "Термінал по черзі показує шлях до frontend-start, список трьох файлів, а потім відкриває цю ж папку у VS Code.",
    },
    microExercises: [
      { id: "vscode-terminal-choice", kind: "choice", prompt: "Термінал показує шлях, що закінчується на Desktop, а не на frontend-start. Що це означає?", options: ["Все правильно", "Термінал відкритий не в тій папці", "pwd показує помилку", "Потрібно видалити термінал"], correctAnswer: "Термінал відкритий не в тій папці", solution: "pwd показує реальну поточну папку — якщо це не очікувана папка проєкту, команди виконуватимуться не там, де треба." },
    ],
    quiz: {
      id: "vscode-terminal-quiz",
      title: "Термінал: перевір себе",
      questions: [
        {
          id: "vscode-terminal-pwd",
          type: "single",
          question: "Що показує команда pwd?",
          options: [
            "Повний шлях поточної папки термінала",
            "Список файлів у папці",
            "Версію VS Code",
            "Список встановлених розширень",
          ],
          correctAnswer: "Повний шлях поточної папки термінала",
          explanation: "pwd відповідає на питання \"де я знаходжусь\" у файловій системі.",
        },
        {
          id: "vscode-terminal-relative",
          type: "true-false",
          question: "Команди в терміналі виконуються відносно поточної папки, у якій він зараз \"стоїть\".",
          options: ["Так", "Ні"],
          correctAnswer: true,
          explanation: "Це ключовий момент уроку: перед важливою командою варто перевіряти pwd.",
        },
        {
          id: "vscode-terminal-code-dot",
          type: "code",
          question: "Що робить ця команда?",
          codeSnippet: `code .`,
          options: [
            "Відкриває поточну папку термінала у VS Code",
            "Відкриває один файл під назвою \".\"",
            "Перевіряє версію VS Code",
            "Видаляє поточну папку",
          ],
          correctAnswer: "Відкриває поточну папку термінала у VS Code",
          explanation: "Крапка означає \"поточна папка\" — команда відкриває саме її, а не окремий файл.",
        },
        {
          id: "vscode-terminal-ls",
          type: "single",
          question: "Що показує команда ls?",
          options: [
            "Список файлів і папок усередині поточної папки",
            "Версію операційної системи",
            "Історію відкритих файлів",
            "Поточну дату й час",
          ],
          correctAnswer: "Список файлів і папок усередині поточної папки",
          explanation: "ls (в PowerShell працює як псевдонім) показує вміст поточної директорії.",
        },
        {
          id: "vscode-terminal-backend-only",
          type: "single",
          question: "Чи потрібен термінал лише backend-розробникам?",
          options: [
            "Ні, у фронтенд-роботі ним відкривають проєкти, перевіряють інструменти, запускають сервери",
            "Так, у фронтенді термінал взагалі не використовується",
            "Термінал потрібен лише для видалення файлів",
            "Термінал використовують лише для встановлення VS Code",
          ],
          correctAnswer: "Ні, у фронтенд-роботі ним відкривають проєкти, перевіряють інструменти, запускають сервери",
          explanation: "Термінал — базовий інструмент фронтенд-розробки, не лише backend.",
        },
      ],
    },
  },

  Розширення: {
    interactiveDemo: "vscode-extensions-demo",
    whatIsIt:
      "Розширення (extension) — це додатковий, необов'язковий модуль, який додає VS Code нову функцію — наприклад, автоматичне форматування коду. Розширення встановлюються через панель Extensions (значок квадратиків на Activity Bar) і мають доступ до частини робочого середовища, тож варто ставитись до їх кількості обережно.",
    whyUseIt:
      "Головне правило цього уроку: не встановлюй десятки розширень одразу. Кожне розширення може впливати на швидкість роботи, налаштування і — теоретично — безпеку. Для цього курсу достатньо одного: Prettier, який автоматично й одноманітно форматує HTML, CSS і JavaScript.",
    whenToUse: ["Коли розширення вирішує конкретну, реальну потребу (наприклад, форматування коду).", "Після перевірки: назва, автор (publisher), кількість встановлень і дата останнього оновлення виглядають нормально."],
    whenNotToUse: [
      "Не встановлюй розширення «про всяк випадок», без конкретної причини.",
      "Не встановлюй кілька розширень з однаковою функцією одночасно (наприклад, два різних formatter).",
      "Не встановлюй розширення з невідомим publisher і майже без встановлень.",
    ],
    codeWalkthroughs: [
      {
        before: "Після встановлення Prettier потрібно ще позначити його як форматер за замовчуванням і увімкнути форматування при збереженні. Це робиться через Settings (Ctrl/Cmd+,), але швидший спосіб — прямо в settings.json:",
        code: `{\n  "editor.defaultFormatter": "esbenp.prettier-vscode",\n  "editor.formatOnSave": true\n}`,
        lineNotes: [
          "editor.defaultFormatter вказує, яке розширення форматує код, коли встановлено кілька.",
          "editor.formatOnSave: true означає, що код форматується автоматично щоразу під час збереження (Ctrl/Cmd+S).",
        ],
        after: "Не потрібно вручну форматувати код після кожної зміни — Prettier робить це сам під час збереження.",
      },
    ],
    commonMistakes: [
      "Встановлювати одразу багато розширень.",
      "Встановлювати два formatter одночасно — вони конфліктують, і VS Code запитує, який використати.",
      "Не перевіряти publisher і кількість встановлень перед встановленням.",
    ],
    dontDoThis: {
      code: `// Встановлено одночасно:\n// - Prettier\n// - Beautify\n// - JS-CSS-HTML Formatter`,
      explanation: "Три різні formatter одночасно — VS Code не знає, якому довіряти, і форматування стає непередбачуваним. Достатньо одного formatter на проєкт.",
    },
    bestPractices: ["Встановлюй лише те розширення, потребу в якому можеш чітко назвати.", "Перевіряй publisher, кількість встановлень і дату оновлення перед встановленням.", "Тримай один formatter на проєкт."],
    remember: [
      "Розширення додає нову функцію, якої немає у VS Code за замовчуванням.",
      "Для цього курсу достатньо одного розширення: Prettier.",
      "editor.formatOnSave: true форматує код автоматично під час збереження.",
      "Два formatter одночасно — конфлікт, а не подвійна користь.",
    ],
    summary: "Розширення додають VS Code нові функції, але кожне з них варто встановлювати свідомо, а не «про всяк випадок». Для цього курсу вистачає одного розширення — Prettier, яке автоматично форматує код при збереженні файлу після налаштування editor.defaultFormatter і editor.formatOnSave.",
    proTip: "Перш ніж встановлювати розширення для якоїсь функції, перевір: можливо, ця функція вже вбудована у VS Code за замовчуванням (наприклад, базове форматування HTML вже є без жодних розширень).",
    nextLessonNote: "Розширення встановлено. Тепер розберемось детальніше з форматуванням коду.",
    practiceTask: {
      title: "Встанови й налаштуй Prettier",
      description: "Встанови розширення Prettier, зроби його форматером за замовчуванням і увімкни форматування при збереженні.",
      checklist: ["Prettier встановлено через панель Extensions.", "editor.defaultFormatter вказує на Prettier.", "editor.formatOnSave увімкнено.", "Збереження файлу автоматично виправляє відступи."],
      starterFiles: [{ id: "vscode-ext-settings-start", path: ".vscode/settings.json", language: "json", label: ".vscode/settings.json", code: "{\n\n}" }],
      solutionFiles: [{ id: "vscode-ext-settings-solution", path: ".vscode/settings.json", language: "json", label: ".vscode/settings.json", code: `{\n  "editor.defaultFormatter": "esbenp.prettier-vscode",\n  "editor.formatOnSave": true\n}`, readOnly: true }],
      hints: ["Значок Extensions — чотири квадратики на Activity Bar.", "Publisher Prettier називається esbenp."],
      expectedOutput: "Файл із неохайними відступами вирівнюється сам одразу після Ctrl/Cmd+S.",
    },
    microExercises: [
      { id: "vscode-ext-choice", kind: "choice", prompt: "Скільки formatter варто тримати активним на один проєкт?", options: ["Один", "Два, для надійності", "Якнайбільше", "Formatter не потрібен"], correctAnswer: "Один", solution: "Кілька formatter одночасно конфліктують — VS Code не знає, якому довіряти." },
    ],
    quiz: {
      id: "vscode-extensions-quiz",
      title: "Розширення: перевір себе",
      questions: [
        {
          id: "vscode-ext-what-is-it",
          type: "single",
          question: "Що таке розширення (extension) у VS Code?",
          options: [
            "Додатковий необов'язковий модуль, який додає нову функцію",
            "Обов'язковий компонент, без якого VS Code не запускається",
            "Розширення файлу типу .html",
            "Окрема програма замість VS Code",
          ],
          correctAnswer: "Додатковий необов'язковий модуль, який додає нову функцію",
          explanation: "Розширення — опційний додаток, наприклад Prettier для форматування коду.",
        },
        {
          id: "vscode-ext-many-at-once",
          type: "true-false",
          question: "Варто встановлювати якнайбільше розширень одразу \"про всяк випадок\".",
          options: ["Так", "Ні"],
          correctAnswer: false,
          explanation: "Кожне розширення впливає на швидкість роботи й налаштування — встановлюй лише те, що вирішує конкретну потребу.",
        },
        {
          id: "vscode-ext-code-two-formatters",
          type: "code",
          question: "Чому проблематично мати одночасно встановлені Prettier, Beautify і JS-CSS-HTML Formatter?",
          codeSnippet: `// Встановлено одночасно:
// - Prettier
// - Beautify
// - JS-CSS-HTML Formatter`,
          options: [
            "VS Code не знає, якому formatter довіряти — форматування стає непередбачуваним",
            "Це прискорює форматування втричі",
            "Такого конфлікту не існує",
            "Це обов'язкова конфігурація",
          ],
          correctAnswer: "VS Code не знає, якому formatter довіряти — форматування стає непередбачуваним",
          explanation: "Достатньо одного formatter на проєкт — кілька одночасно конфліктують.",
        },
        {
          id: "vscode-ext-what-to-check",
          type: "single",
          question: "Що варто перевірити перед встановленням розширення?",
          options: [
            "Назву, publisher, кількість встановлень і дату останнього оновлення",
            "Тільки назву",
            "Нічого, всі розширення безпечні за замовчуванням",
            "Тільки кількість зірок на GitHub",
          ],
          correctAnswer: "Назву, publisher, кількість встановлень і дату останнього оновлення",
          explanation: "Це базова перевірка перед встановленням будь-якого розширення.",
        },
        {
          id: "vscode-ext-formatOnSave",
          type: "single",
          question: "Що робить налаштування \"editor.formatOnSave\": true?",
          options: [
            "Форматує код автоматично щоразу під час збереження файлу",
            "Зберігає файл автоматично щохвилини",
            "Вмикає підсвітку синтаксису",
            "Встановлює нові розширення автоматично",
          ],
          correctAnswer: "Форматує код автоматично щоразу під час збереження файлу",
          explanation: "Разом з editor.defaultFormatter це налаштовує автоматичне форматування при Ctrl/Cmd+S.",
        },
      ],
    },
  },

  "Форматування коду": {
    interactiveDemo: "vscode-formatting-demo",
    whatIsIt:
      "Форматування — це зміна вигляду й відступів коду (пробіли, переноси рядків, лапки) без зміни того, що код робить. Це не те саме, що виправлення помилок: форматер (наприклад, Prettier з попереднього уроку) не виправляє логіку, лише вигляд.",
    whyUseIt:
      "Неохайний код (без відступів чи з випадковими пробілами) однаково працює, але його значно важче читати й підтримувати — особливо коли до проєкту повертаєшся через тиждень або над ним працює кілька людей. Автоматичне форматування прибирає це джерело витраченого часу.",
    whenToUse: ["Після кожного збереження файлу, якщо увімкнено formatOnSave.", "Вручну — коли потрібно відформатувати файл без збереження."],
    whenNotToUse: ["Не чекай, що форматер знайде логічні помилки в коді — це різні задачі.", "Не змінюй formatter для всіх мов одразу без перевірки, чи це не зламає інший тип файлів."],
    comparisonTable: {
      headers: ["Дія", "Windows", "macOS"],
      rows: [
        ["Форматувати документ вручну", "Shift + Alt + F", "Shift + Option + F"],
        ["Зберегти файл", "Ctrl + S", "Cmd + S"],
      ],
    },
    codeWalkthroughs: [
      {
        before: "До форматування — однаковий код, але з випадковими відступами:",
        code: `<div>\n<h1>Кав'ярня</h1>\n      <p>Опис</p>\n</div>`,
        lineNotes: ["Код працює однаково, але нерівні відступи роблять структуру важкою для читання."],
      },
      {
        before: "Після форматування Prettier (той самий код, той самий результат у браузері):",
        code: `<div>\n  <h1>Кав'ярня</h1>\n  <p>Опис</p>\n</div>`,
        lineNotes: ["Відступи стали рівними й послідовними — вкладеність тегів видно одразу, без рахування пробілів."],
        after: "У браузері обидва варіанти виглядають однаково — форматування впливає лише на те, як код виглядає в редакторі.",
      },
    ],
    commonMistakes: [
      "Плутати форматування з виправленням помилок логіки.",
      "Форматувати вручну щоразу замість увімкнення formatOnSave.",
      "Ігнорувати запит VS Code «оберіть форматер», якщо встановлено кілька.",
    ],
    bestPractices: ["Увімкни formatOnSave один раз — і більше не думай про відступи.", "Якщо VS Code запитує, який formatter використати — обирай свідомо, а не навмання."],
    remember: [
      "Форматування змінює вигляд коду, не його поведінку.",
      "Shift+Alt+F (Windows) / Shift+Option+F (macOS) — форматувати вручну.",
      "formatOnSave робить це автоматично при кожному збереженні.",
    ],
    interviewQuestions: [{ question: "Чи форматер виправляє логічні помилки в коді?", answer: "Ні. Форматер лише змінює вигляд і відступи; логічні помилки (наприклад, неправильна назва змінної) він не знаходить і не виправляє." }],
    summary: "Форматування вирівнює відступи й вигляд коду без зміни його поведінки. Prettier робить це автоматично при збереженні файлу, якщо увімкнено editor.formatOnSave, а вручну це можна викликати сполученням Shift+Alt+F (Windows) або Shift+Option+F (macOS).",
    proTip: "Якщо після формату щось виглядає несподівано (наприклад, довгий рядок розбився на кілька) — це нормально: Prettier дотримується власних правил ширини рядка, це частина одноманітного стилю, а не помилка.",
    nextLessonNote: "Код тепер охайний. Час нарешті відкрити HTML-сторінку в браузері.",
    practiceTask: {
      title: "Відформатуй неохайний HTML",
      description: "Візьми HTML-файл з випадковими відступами і відформатуй його вручну або через збереження з formatOnSave.",
      checklist: ["Файл відкрито у VS Code.", "Виконано форматування (вручну або через збереження).", "Відступи стали рівними й послідовними.", "Вигляд сторінки в браузері не змінився."],
      starterFiles: [{ id: "vscode-format-start", path: "messy.html", language: "html", label: "messy.html", code: `<div>\n<h1>Кав'ярня</h1>\n      <p>Опис</p>\n  </div>` }],
      solutionFiles: [{ id: "vscode-format-solution", path: "messy.html", language: "html", label: "messy.html", code: `<div>\n  <h1>Кав'ярня</h1>\n  <p>Опис</p>\n</div>`, readOnly: true }],
      hints: ["Windows: Shift+Alt+F. macOS: Shift+Option+F."],
      expectedOutput: "Той самий HTML, але з рівними, послідовними відступами.",
    },
    microExercises: [
      { id: "vscode-format-choice", kind: "choice", prompt: "Що робить форматер, знайшовши помилку в назві змінної?", options: ["Виправляє автоматично", "Нічого — це не його задача", "Видаляє змінну", "Зупиняє збереження файлу"], correctAnswer: "Нічого — це не його задача", solution: "Форматер працює лише з виглядом коду, а не з логікою — помилки в назвах змінних він не шукає." },
    ],
    quiz: {
      id: "vscode-formatting-quiz",
      title: "Форматування коду: перевір себе",
      questions: [
        {
          id: "vscode-format-what-is-it",
          type: "single",
          question: "Що таке форматування коду?",
          options: [
            "Зміна вигляду й відступів коду без зміни того, що код робить",
            "Виправлення логічних помилок у коді",
            "Видалення зайвих файлів проєкту",
            "Переклад коду іншою мовою програмування",
          ],
          correctAnswer: "Зміна вигляду й відступів коду без зміни того, що код робить",
          explanation: "Форматер (наприклад, Prettier) не виправляє логіку, лише вигляд: пробіли, переноси рядків, лапки.",
        },
        {
          id: "vscode-format-fixes-logic",
          type: "true-false",
          question: "Форматер знаходить і виправляє логічні помилки в коді (наприклад, неправильну назву змінної).",
          options: ["Так", "Ні"],
          correctAnswer: false,
          explanation: "Форматування й виправлення логічних помилок — різні задачі; форматер працює лише з виглядом коду.",
        },
        {
          id: "vscode-format-code-same-result",
          type: "code",
          question: "Що зміниться в браузері після форматування цього коду Prettier?",
          codeSnippet: `<div>
<h1>Кав'ярня</h1>
      <p>Опис</p>
</div>`,
          options: [
            "Нічого — форматування впливає лише на вигляд у редакторі, а не на браузер",
            "Заголовок стане більшим",
            "Сторінка почне завантажуватись швидше",
            "З'явиться нова кнопка",
          ],
          correctAnswer: "Нічого — форматування впливає лише на вигляд у редакторі, а не на браузер",
          explanation: "У браузері обидва варіанти (до і після форматування) виглядають однаково.",
        },
        {
          id: "vscode-format-shortcut",
          type: "single",
          question: "Яке сполучення клавіш форматує документ вручну на Windows?",
          options: ["Shift + Alt + F", "Ctrl + S", "Ctrl + Shift + P", "Ctrl + F"],
          correctAnswer: "Shift + Alt + F",
          explanation: "На macOS аналогічне сполучення — Shift + Option + F.",
        },
        {
          id: "vscode-format-on-save",
          type: "single",
          question: "Що дає увімкнене formatOnSave?",
          options: [
            "Код форматується автоматично при кожному збереженні файлу",
            "Файл зберігається автоматично щохвилини",
            "Розширення встановлюються автоматично",
            "Код перекладається на іншу мову",
          ],
          correctAnswer: "Код форматується автоматично при кожному збереженні файлу",
          explanation: "Це прибирає потребу форматувати вручну після кожної зміни.",
        },
      ],
    },
  },

  "Запуск першої HTML-сторінки": {
    interactiveDemo: "vscode-first-page-demo",
    whatIsIt:
      "Є щонайменше два способи побачити готову HTML-сторінку в браузері: відкрити файл напряму (адреса в браузері починається з file://) або через локальний сервер — програму, яка показує сторінку через звичайну адресу (http://localhost:...), схожу на адреси реальних сайтів. Локальний сервер існує лише на твоєму комп'ютері — це не публікація сайту в інтернет.",
    whyUseIt:
      "Просте відкриття файлу напряму (file://) працює для базового HTML/CSS/JS, але не оновлює сторінку автоматично при зміні коду і може обмежувати деякі можливості JavaScript. Локальний сервер (наприклад, через розширення Live Server) автоматично оновлює сторінку при збереженні файлу — це економить купу часу.",
    whenToUse: ["Спосіб 1 (file://) — для швидкої перевірки простого HTML/CSS без установки нічого додаткового.", "Спосіб 2 (локальний сервер) — коли хочеш, щоб сторінка сама оновлювалась при кожному збереженні файлу."],
    whenNotToUse: ["Не плутай локальний сервер (http://localhost:...) із реальною публікацією сайту в інтернет — це різні речі."],
    codeWalkthroughs: [
      {
        before: "Спосіб 1. Знайди index.html в Explorer і відкрий його двічі клацнувши, або через правий клік «Reveal in File Explorer/Finder» і подвійний клік у системному провіднику файлів:",
        code: `file:///.../frontend-start/index.html`,
        lineNotes: ["Адреса в браузері починається з file:// — це ознака, що сторінка відкрита напряму з файлу, без сервера."],
        after: "Після кожної зміни коду доведеться вручну натискати «Оновити» (F5) у браузері — автоматичного оновлення тут немає.",
      },
      {
        before: "Спосіб 2. Якщо встановлено розширення Live Server: правий клік на index.html у Explorer → «Open with Live Server»:",
        code: `http://127.0.0.1:5500/index.html`,
        lineNotes: ["Адреса тепер http://, а не file:// — сторінку показує локальний сервер, а не браузер напряму.", "Порт (число після двокрапки, тут 5500) може відрізнятись — це нормально."],
        after: "Тепер сторінка сама оновлюється в браузері одразу після збереження файлу в VS Code — без ручного F5.",
      },
    ],
    commonMistakes: [
      "Плутати http://localhost (лише на своєму комп'ютері) з реальним опублікованим сайтом.",
      "Забувати зберегти файл перед перевіркою результату в браузері.",
      "Дивуватись, що сторінка не оновилась — і не перевіряти спочатку, чи файл узагалі збережено.",
    ],
    bestPractices: ["Для простих HTML/CSS-уроків достатньо способу 1 (file://).", "Якщо хочеш автоматичне оновлення — Live Server (спосіб 2) економить час.", "Завжди перевіряй Console браузера (F12), якщо сторінка виглядає не так, як очікувалось."],
    remember: [
      "file:// — файл відкрито напряму, без сервера, оновлення лише вручну.",
      "http://localhost:... — локальний сервер, лише на твоєму комп'ютері, з автооновленням (через Live Server).",
      "Локальний сервер — це не публікація сайту в інтернет.",
    ],
    summary: "HTML-сторінку можна відкрити напряму з файлу (адреса file://, оновлення вручну) або через локальний сервер, наприклад розширення Live Server (адреса http://localhost:..., автоматичне оновлення при збереженні). Обидва способи показують сторінку лише на твоєму комп'ютері.",
    proTip: "Якщо сторінка не оновилась після зміни коду — спочатку перевір, чи файл справді збережено (немає крапки на вкладці), а вже потім шукай складнішу причину.",
    nextLessonNote: "Сторінка відкривається — робоче середовище готове, можна переходити до курсу HTML.",
    practiceTask: {
      title: "Відкрий свій проєкт у браузері",
      description: "Відкрий index.html з проєкту frontend-start у браузері хоча б одним із двох способів і перевір, що кнопка працює.",
      checklist: ["index.html відкрито в браузері.", "Видно заголовок і кнопку зі стилями.", "Клік по кнопці показує alert.", "Спробував внести дрібну зміну в HTML і оновити сторінку."],
      starterFiles: [{ id: "vscode-run-html-notes", path: "run-notes.md", language: "markdown", label: "run-notes.md", code: "# Яким способом я відкрив сторінку\n\n" }],
      solutionFiles: [{ id: "vscode-run-html-notes-solution", path: "run-notes.md", language: "markdown", label: "run-notes.md", code: "# Яким способом я відкрив сторінку\n\nНапряму з файлу (file://) через подвійний клік на index.html.", readOnly: true }],
      hints: ["Якщо кнопка не реагує — перевір, чи підключено script.js в кінці body."],
      expectedOutput: "У браузері видно заголовок «VS Code налаштовано» і кнопку, клік по якій показує спливаюче повідомлення.",
    },
    microExercises: [
      { id: "vscode-run-choice", kind: "choice", prompt: "Яка адреса вказує, що сторінку показує локальний сервер, а не файл напряму?", options: ["file:///index.html", "http://127.0.0.1:5500", "C:\\index.html", "index.html"], correctAnswer: "http://127.0.0.1:5500", solution: "Адреси, що починаються з http://localhost або http://127.0.0.1, означають роботу через локальний сервер." },
    ],
    quiz: {
      id: "vscode-first-page-quiz",
      title: "Запуск першої HTML-сторінки: перевір себе",
      questions: [
        {
          id: "vscode-run-file-vs-server",
          type: "single",
          question: "Чим відкриття файлу напряму (file://) відрізняється від локального сервера (http://localhost:...)?",
          options: [
            "file:// не оновлюється автоматично при зміні коду, локальний сервер (з Live Server) — оновлюється",
            "file:// працює лише для CSS, а localhost — лише для HTML",
            "Різниці немає, це те саме",
            "localhost — це публікація сайту в реальний інтернет",
          ],
          correctAnswer: "file:// не оновлюється автоматично при зміні коду, локальний сервер (з Live Server) — оновлюється",
          explanation: "Локальний сервер економить час завдяки автоматичному оновленню сторінки при збереженні файлу.",
        },
        {
          id: "vscode-run-localhost-is-not-public",
          type: "true-false",
          question: "Сторінка, відкрита через http://localhost:..., вже опублікована в реальному інтернеті і доступна іншим людям.",
          options: ["Так", "Ні"],
          correctAnswer: false,
          explanation: "Локальний сервер існує лише на твоєму комп'ютері — це не публікація сайту в інтернет.",
        },
        {
          id: "vscode-run-code-address",
          type: "code",
          question: "Що означає ця адреса в рядку браузера?",
          codeSnippet: `http://127.0.0.1:5500/index.html`,
          options: [
            "Сторінку показує локальний сервер (наприклад, Live Server), а не файл напряму",
            "Сторінка вже опублікована в інтернеті",
            "Це помилка адреси",
            "Файл відкрито напряму з диска",
          ],
          correctAnswer: "Сторінку показує локальний сервер (наприклад, Live Server), а не файл напряму",
          explanation: "Адреса http:// (на відміну від file://) означає, що сторінку віддає локальний сервер.",
        },
        {
          id: "vscode-run-forgot-save",
          type: "single",
          question: "Сторінка в браузері не оновилась після зміни коду. Що перевірити першим?",
          options: [
            "Чи файл справді збережено (немає крапки на вкладці)",
            "Чи встановлено VS Code",
            "Чи є інтернет-з'єднання",
            "Чи змінено назву файлу",
          ],
          correctAnswer: "Чи файл справді збережено (немає крапки на вкладці)",
          explanation: "Найчастіша причина \"сторінка не оновилась\" — забутий Ctrl/Cmd+S перед перевіркою результату.",
        },
        {
          id: "vscode-run-live-server-benefit",
          type: "single",
          question: "Яка головна перевага Live Server над простим відкриттям файлу?",
          options: [
            "Сторінка автоматично оновлюється в браузері одразу після збереження файлу",
            "Live Server робить сайт видимим для всього інтернету",
            "Live Server прискорює написання коду в редакторі",
            "Live Server замінює потребу в HTML взагалі",
          ],
          correctAnswer: "Сторінка автоматично оновлюється в браузері одразу після збереження файлу",
          explanation: "Це економить ручні натискання F5 після кожної зміни коду.",
        },
      ],
    },
  },
};

export const vscodeSetupModuleQuiz: QuizData = {
  id: "vscode-setup-basics-module-quiz",
  title: "Налаштування VS Code: контрольний тест",
  questions: [
    {
      id: "vscode-module-what-is-it",
      type: "single",
      question: "VS Code — це:",
      options: [
        "Безкоштовний редактор коду, не браузер і не Visual Studio",
        "Браузер для перегляду сайтів",
        "Те саме, що Visual Studio",
        "Онлайн-сервіс без встановлення",
      ],
      correctAnswer: "Безкоштовний редактор коду, не браузер і не Visual Studio",
      explanation: "VS Code створює файли з кодом; браузер їх показує, а Visual Studio — окрема, значно важча програма.",
    },
    {
      id: "vscode-module-add-to-path",
      type: "single",
      question: "Навіщо потрібна позначка «Add to PATH» під час встановлення на Windows?",
      options: [
        "Дозволяє запускати VS Code командою code з термінала",
        "Прискорює запуск редактора",
        "Автоматично встановлює Prettier",
        "Вмикає темну тему",
      ],
      correctAnswer: "Дозволяє запускати VS Code командою code з термінала",
      explanation: "Без неї команда code у терміналі не працюватиме.",
    },
    {
      id: "vscode-module-code-open-folder",
      type: "code",
      question: "Чому для навчального проєкту краще відкривати папку, а не окремий файл?",
      codeSnippet: `code .`,
      options: [
        "VS Code бачить усі файли проєкту одразу, і посилання між HTML/CSS/JS працюють коректно",
        "Це єдиний спосіб взагалі відкрити файл у VS Code",
        "Це впливає лише на швидкість запуску",
        "Немає жодної різниці",
      ],
      correctAnswer: "VS Code бачить усі файли проєкту одразу, і посилання між HTML/CSS/JS працюють коректно",
      explanation: "code . відкриває поточну папку термінала — саме так рекомендують відкривати проєкт.",
    },
    {
      id: "vscode-module-one-formatter",
      type: "true-false",
      question: "Кілька розширень-форматерів (Prettier, Beautify тощо), встановлені одночасно, працюють без конфліктів.",
      options: ["Так", "Ні"],
      correctAnswer: false,
      explanation: "VS Code не знає, якому formatter довіряти — достатньо одного formatter на проєкт.",
    },
    {
      id: "vscode-module-localhost",
      type: "single",
      question: "Що означає адреса http://127.0.0.1:5500 у браузері?",
      options: [
        "Сторінку показує локальний сервер, доступний лише на цьому комп'ютері",
        "Сайт уже опубліковано в реальному інтернеті",
        "Файл відкрито напряму з диска",
        "Це адреса помилки",
      ],
      correctAnswer: "Сторінку показує локальний сервер, доступний лише на цьому комп'ютері",
      explanation: "Локальний сервер (наприклад, Live Server) — не публікація сайту в інтернет.",
    },
    {
      id: "vscode-module-facts",
      type: "multiple",
      question: "Які з цих тверджень правильні?",
      options: [
        "pwd показує повний шлях поточної папки термінала",
        "Форматер виправляє логічні помилки в коді",
        "Файли проєкту варто тримати в одній спільній папці",
        "Розширення варто встановлювати лише під конкретну потребу",
      ],
      correctAnswer: [
        "pwd показує повний шлях поточної папки термінала",
        "Файли проєкту варто тримати в одній спільній папці",
        "Розширення варто встановлювати лише під конкретну потребу",
      ],
      explanation: "Форматер змінює лише вигляд коду (відступи, пробіли) — логічні помилки він не шукає і не виправляє.",
      optionExplanations: {
        "Форматер виправляє логічні помилки в коді": "Це не так: форматування і виправлення логіки — різні задачі.",
      },
    },
  ],
};
