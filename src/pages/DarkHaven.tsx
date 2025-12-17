import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

function DarkHaven() {
  const [activeTab, setActiveTab] = useState('главная');
  const [serverOnline] = useState(42);

  const newsItems = [
    {
      id: 1,
      title: 'Запуск нового сервера Dark Haven',
      date: '15 декабря 2024',
      content: 'Мы рады объявить о запуске нашего нового сервера с улучшенными характеристиками и увеличенным онлайном.',
      tag: 'Важное'
    },
    {
      id: 2,
      title: 'Обновление экономической системы',
      date: '10 декабря 2024',
      content: 'Проработанная экономика: цены на шаттлы значительно повышены, добавлена возможность открытия собственных станций.',
      tag: 'Разработка'
    },
    {
      id: 3,
      title: 'Новые антагонисты и роли',
      date: '5 декабря 2024',
      content: 'Возвращение классических антагонистов: воры, агенты синдиката, ядерные оперативники, ниндзя и многое другое!',
      tag: 'Контент'
    }
  ];

  const rules = [
    { id: 1, title: 'Уважение к игрокам', text: 'Не оскорбляйте других игроков, не используйте нецензурную лексику.' },
    { id: 2, title: 'Ролевая игра', text: 'Следуйте своей роли, не мешайте другим игрокам играть.' },
    { id: 3, title: 'Метагейминг запрещён', text: 'Не используйте внешнюю информацию в игре.' },
    { id: 4, title: 'Гриферство', text: 'Запрещено намеренное вредительство без ролевых причин.' }
  ];

  const wikiSections = [
    { id: 1, title: 'Начало игры', icon: 'Rocket', description: 'Первые шаги на станции Dark Haven' },
    { id: 2, title: 'Роли и профессии', icon: 'Users', description: 'Все доступные роли и их обязанности' },
    { id: 3, title: 'Экономика', icon: 'DollarSign', description: 'Система торговли и заработка' },
    { id: 4, title: 'Корабли и станции', icon: 'Cpu', description: 'Информация о шаттлах и станциях' }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-primary/20 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <Icon name="Orbit" className="h-8 w-8 text-primary text-shadow-glow" />
            <h1 className="text-xl font-bold text-primary text-shadow-glow">DARK HAVEN</h1>
          </div>
          <nav className="hidden md:flex gap-6">
            {['Главная', 'Вики', 'Правила', 'Новости', 'Мониторинг', 'Развитие', 'Видео', 'Чат', 'Контакты'].map((item) => (
              <button
                key={item}
                onClick={() => setActiveTab(item.toLowerCase())}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  activeTab === item.toLowerCase() ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                {item}
              </button>
            ))}
          </nav>
          <Button size="sm" className="bg-secondary hover:bg-secondary/80">
            <Icon name="LogIn" className="mr-2 h-4 w-4" />
            Войти
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      {activeTab === 'главная' && (
        <>
          <section className="relative overflow-hidden border-b border-primary/20">
            <div className="absolute inset-0 grid-background opacity-30" />
            <div className="scan-line absolute inset-0" />
            <div className="container relative px-4 py-24 text-center">
              <Badge className="mb-4 bg-primary/20 text-primary border-primary">
                <Icon name="Zap" className="mr-1 h-3 w-3" />
                Онлайн: {serverOnline} игроков
              </Badge>
              <h2 className="mb-6 text-5xl md:text-7xl font-black text-primary text-shadow-glow animate-fade-in">
                DARK HAVEN
              </h2>
              <p className="mb-4 text-xl md:text-2xl text-secondary font-semibold">
                Space Station 14
              </p>
              <p className="mx-auto mb-8 max-w-2xl text-muted-foreground">
                Симуляция жизни в космосе за пределами станций. MMO с масштабными сессиями, 
                проработанной экономикой, войнами и неограниченными возможностями.
              </p>
              <div className="flex justify-center gap-4">
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                  <Icon name="Play" className="mr-2 h-5 w-5" />
                  Начать играть
                </Button>
                <Button size="lg" variant="outline" className="border-secondary text-secondary hover:bg-secondary/10">
                  <Icon name="BookOpen" className="mr-2 h-5 w-5" />
                  Узнать больше
                </Button>
              </div>
            </div>
          </section>

          {/* Features */}
          <section className="container px-4 py-16">
            <h3 className="mb-8 text-center text-3xl font-bold">Особенности проекта</h3>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card className="cyber-border bg-card/50 backdrop-blur hover-scale transition-all">
                <CardHeader>
                  <Icon name="Globe" className="mb-2 h-10 w-10 text-primary" />
                  <CardTitle>Масштабность</CardTitle>
                  <CardDescription>
                    Десятки смен без перезапуска сервера
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="cyber-border bg-card/50 backdrop-blur hover-scale transition-all">
                <CardHeader>
                  <Icon name="DollarSign" className="mb-2 h-10 w-10 text-secondary" />
                  <CardTitle>Экономика</CardTitle>
                  <CardDescription>
                    Проработанная система торговли и производства
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="cyber-border bg-card/50 backdrop-blur hover-scale transition-all">
                <CardHeader>
                  <Icon name="Swords" className="mb-2 h-10 w-10 text-accent" />
                  <CardTitle>Войны и рейды</CardTitle>
                  <CardDescription>
                    Налёты на сектора и военные операции
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="cyber-border bg-card/50 backdrop-blur hover-scale transition-all">
                <CardHeader>
                  <Icon name="Save" className="mb-2 h-10 w-10 text-primary" />
                  <CardTitle>Сохранения</CardTitle>
                  <CardDescription>
                    Сохранение шаттлов и станций игроков
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="cyber-border bg-card/50 backdrop-blur hover-scale transition-all">
                <CardHeader>
                  <Icon name="Users" className="mb-2 h-10 w-10 text-secondary" />
                  <CardTitle>Новые роли</CardTitle>
                  <CardDescription>
                    Множество новых профессий и возможностей
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="cyber-border bg-card/50 backdrop-blur hover-scale transition-all">
                <CardHeader>
                  <Icon name="Skull" className="mb-2 h-10 w-10 text-accent" />
                  <CardTitle>Антагонисты</CardTitle>
                  <CardDescription>
                    Воры, ниндзя, синдикат и ядерные оперативники
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </section>

          {/* Server Specs */}
          <section className="border-y border-primary/20 bg-card/30 backdrop-blur">
            <div className="container px-4 py-16">
              <h3 className="mb-8 text-center text-3xl font-bold">Характеристики сервера</h3>
              <div className="mx-auto max-w-3xl">
                <Card className="cyber-border bg-card/80">
                  <CardContent className="p-6">
                    <div className="grid gap-4 md:grid-cols-3">
                      <div className="text-center">
                        <Icon name="Cpu" className="mx-auto mb-2 h-12 w-12 text-primary" />
                        <p className="text-sm text-muted-foreground">Процессор</p>
                        <p className="font-bold">AMD Ryzen 9 9950X</p>
                        <p className="text-sm text-primary">5.7 ГГц</p>
                      </div>
                      <div className="text-center">
                        <Icon name="HardDrive" className="mx-auto mb-2 h-12 w-12 text-secondary" />
                        <p className="text-sm text-muted-foreground">ОЗУ</p>
                        <p className="font-bold">64 ГБ</p>
                      </div>
                      <div className="text-center">
                        <Icon name="Wifi" className="mx-auto mb-2 h-12 w-12 text-accent" />
                        <p className="text-sm text-muted-foreground">Интернет</p>
                        <p className="font-bold">600 Мбит/с</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* Latest News */}
          <section className="container px-4 py-16">
            <h3 className="mb-8 text-center text-3xl font-bold">Последние новости</h3>
            <div className="grid gap-6 md:grid-cols-3">
              {newsItems.map((news) => (
                <Card key={news.id} className="cyber-border bg-card/50 backdrop-blur hover-scale transition-all">
                  <CardHeader>
                    <Badge className="mb-2 w-fit bg-primary/20 text-primary">{news.tag}</Badge>
                    <CardTitle className="text-lg">{news.title}</CardTitle>
                    <CardDescription className="flex items-center gap-2">
                      <Icon name="Calendar" className="h-4 w-4" />
                      {news.date}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{news.content}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        </>
      )}

      {/* Wiki Tab */}
      {activeTab === 'вики' && (
        <section className="container px-4 py-16">
          <h2 className="mb-8 text-4xl font-bold text-center">Энциклопедия Dark Haven</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {wikiSections.map((section) => (
              <Card key={section.id} className="cyber-border bg-card/50 backdrop-blur hover-scale transition-all cursor-pointer">
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="rounded-lg bg-primary/10 p-3">
                      <Icon name={section.icon} className="h-8 w-8 text-primary" />
                    </div>
                    <div>
                      <CardTitle>{section.title}</CardTitle>
                      <CardDescription className="mt-2">{section.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>
      )}

      {/* Rules Tab */}
      {activeTab === 'правила' && (
        <section className="container px-4 py-16">
          <h2 className="mb-8 text-4xl font-bold text-center">Правила сервера</h2>
          <div className="mx-auto max-w-3xl space-y-4">
            {rules.map((rule, index) => (
              <Card key={rule.id} className="cyber-border bg-card/50 backdrop-blur animate-fade-in">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Badge className="h-8 w-8 flex items-center justify-center rounded-full bg-primary text-primary-foreground">
                      {index + 1}
                    </Badge>
                    {rule.title}
                  </CardTitle>
                  <CardDescription className="mt-2 text-base">{rule.text}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>
      )}

      {/* News Tab */}
      {activeTab === 'новости' && (
        <section className="container px-4 py-16">
          <h2 className="mb-8 text-4xl font-bold text-center">Новости разработки</h2>
          <div className="mx-auto max-w-4xl space-y-6">
            {newsItems.map((news) => (
              <Card key={news.id} className="cyber-border bg-card/50 backdrop-blur animate-fade-in">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Badge className="bg-primary/20 text-primary">{news.tag}</Badge>
                    <span className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Icon name="Calendar" className="h-4 w-4" />
                      {news.date}
                    </span>
                  </div>
                  <CardTitle className="mt-4">{news.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{news.content}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}

      {/* Monitoring Tab */}
      {activeTab === 'мониторинг' && (
        <section className="container px-4 py-16">
          <h2 className="mb-8 text-4xl font-bold text-center">Мониторинг сервера</h2>
          <div className="mx-auto max-w-4xl space-y-6">
            <Card className="cyber-border bg-card/50 backdrop-blur">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Статус сервера</span>
                  <Badge className="bg-green-500/20 text-green-400 border-green-500">
                    <div className="mr-2 h-2 w-2 rounded-full bg-green-400 animate-pulse" />
                    Онлайн
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">IP Адрес:</span>
                  <code className="text-primary">95.31.51.216:1212</code>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Игроков онлайн:</span>
                  <span className="text-2xl font-bold text-primary">{serverOnline}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Максимум игроков:</span>
                  <span className="font-semibold">128</span>
                </div>
              </CardContent>
            </Card>

            <Card className="cyber-border bg-card/50 backdrop-blur">
              <CardHeader>
                <CardTitle>График онлайна</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-end justify-around gap-2">
                  {[25, 38, 42, 35, 48, 40, 42, 38, 45, 42, 40, 42].map((value, i) => (
                    <div key={i} className="flex flex-col items-center gap-2 flex-1">
                      <div 
                        className="w-full bg-gradient-to-t from-primary to-secondary rounded-t transition-all hover:opacity-80"
                        style={{ height: `${(value / 50) * 100}%` }}
                      />
                      <span className="text-xs text-muted-foreground">{i * 2}:00</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      )}

      {/* Development Tab */}
      {activeTab === 'развитие' && (
        <section className="container px-4 py-16">
          <h2 className="mb-8 text-4xl font-bold text-center">Развитие проекта</h2>
          <div className="mx-auto max-w-4xl">
            <Card className="cyber-border bg-card/50 backdrop-blur">
              <CardHeader>
                <CardTitle>Концепция Dark Haven</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  Создать симуляцию жизни в космосе в секторе за пределами одной или нескольких станций, 
                  которая полностью раскрывает игровой процесс, позволяя взаимодействовать с окружающим миром.
                </p>
                <h4 className="text-lg font-semibold text-foreground mt-6">Ключевые особенности:</h4>
                <ul className="space-y-2 list-disc list-inside">
                  <li>Масштабность и массовость с продолжительными сессиями</li>
                  <li>Смена экипажей в рамках одной сессии без перезапуска</li>
                  <li>Проработанная экономика с высокими ценами на шаттлы</li>
                  <li>Возможность открытия собственных станций</li>
                  <li>Войны, налёты на сектора и военные операции</li>
                  <li>Разнообразные типы станций: гарнизон, космопорт, тюрьма, электростанция</li>
                  <li>Возвращение антагонистов: воры, агенты синдиката, ниндзя</li>
                  <li>Сохранение шаттлов и станций игроков</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>
      )}

      {/* Video Tab */}
      {activeTab === 'видео' && (
        <section className="container px-4 py-16">
          <h2 className="mb-8 text-4xl font-bold text-center">Видео с проекта</h2>
          <div className="mx-auto max-w-4xl">
            <Card className="cyber-border bg-card/50 backdrop-blur">
              <CardContent className="p-6 text-center">
                <Icon name="Video" className="mx-auto mb-4 h-16 w-16 text-primary" />
                <p className="text-muted-foreground mb-4">
                  Видео из TikTok и Telegram канала будут загружаться здесь
                </p>
                <div className="flex gap-4 justify-center">
                  <Button variant="outline" className="border-primary text-primary" asChild>
                    <a href="https://www.tiktok.com/@gameserverx" target="_blank" rel="noopener noreferrer">
                      <Icon name="Instagram" className="mr-2 h-4 w-4" />
                      TikTok @gameserverx
                    </a>
                  </Button>
                  <Button variant="outline" className="border-secondary text-secondary" asChild>
                    <a href="https://t.me/DarkHavenSS14" target="_blank" rel="noopener noreferrer">
                      <Icon name="MessageCircle" className="mr-2 h-4 w-4" />
                      Telegram канал
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      )}

      {/* Chat Tab */}
      {activeTab === 'чат' && (
        <section className="container px-4 py-16">
          <h2 className="mb-8 text-4xl font-bold text-center">Общий чат</h2>
          <div className="mx-auto max-w-4xl">
            <Card className="cyber-border bg-card/50 backdrop-blur">
              <CardContent className="p-6 text-center">
                <Icon name="MessageSquare" className="mx-auto mb-4 h-16 w-16 text-primary" />
                <p className="text-muted-foreground mb-4">
                  Публичный чат будет доступен после авторизации
                </p>
                <Button className="bg-primary hover:bg-primary/90">
                  <Icon name="LogIn" className="mr-2 h-4 w-4" />
                  Войти для доступа к чату
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>
      )}

      {/* Contacts Tab */}
      {activeTab === 'контакты' && (
        <section className="container px-4 py-16">
          <h2 className="mb-8 text-4xl font-bold text-center">Контакты</h2>
          <div className="mx-auto max-w-4xl grid gap-6 md:grid-cols-2">
            <Card className="cyber-border bg-card/50 backdrop-blur hover-scale transition-all">
              <CardHeader>
                <Icon name="MessageCircle" className="mb-2 h-10 w-10 text-primary" />
                <CardTitle>Telegram канал</CardTitle>
                <CardDescription>Новости и обновления проекта</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full border-primary text-primary" asChild>
                  <a href="https://t.me/DarkHavenSS14" target="_blank" rel="noopener noreferrer">
                    Подписаться
                  </a>
                </Button>
              </CardContent>
            </Card>
            <Card className="cyber-border bg-card/50 backdrop-blur hover-scale transition-all">
              <CardHeader>
                <Icon name="Instagram" className="mb-2 h-10 w-10 text-secondary" />
                <CardTitle>TikTok</CardTitle>
                <CardDescription>Видео с игрового процесса</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full border-secondary text-secondary" asChild>
                  <a href="https://www.tiktok.com/@gameserverx" target="_blank" rel="noopener noreferrer">
                    Смотреть видео
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="border-t border-primary/20 bg-card/30 backdrop-blur">
        <div className="container px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Icon name="Orbit" className="h-8 w-8 text-primary text-shadow-glow" />
              <div>
                <p className="font-bold text-primary">DARK HAVEN</p>
                <p className="text-sm text-muted-foreground">Space Station 14</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 Dark Haven. Все права защищены.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default DarkHaven;
