const express = require('express')
const { engine } = require('express-handlebars')

const app = express()

const fortunes = [
  "Победи свои страхи, или они победят тебя.",
  "Рекам нужны истоки.",
  "Не бойся неведомого.",
  "Тебя ждет приятный сюрприз.",
  "Будь проще везде, где только можно.",
]

// Настройка механизма представлений Handlebars
app.engine('handlebars', engine({
  defaultLayout: 'main',
}))
app.set('view engine', 'handlebars')

const port = process.env.PORT || 3000

app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) => res.render('home'))

app.get('/about', (req, res) => {
  const randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)]
  res.render('about', { fortune: randomFortune })
})

// Пользовательская страница 404
app.use((req, res) => {
  res.type('text/plain')
  res.status(404)
  res.send('404 - не найдено')
})

// Пользовательская страница 500
app.use((err, req, res, next) => {
  console.error(err.message)
  res.type('text/plain')
  res.status(500)
  res.send('500 - Ошибка сервера')
})

app.listen(port, () => console.log(
  `Express запущен на http://localhost:${port}; ` +
  `нажмите Ctrl+C для завершения.`
))